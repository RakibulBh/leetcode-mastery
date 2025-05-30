package main

import (
	"net/http"
	"time"

	"github.com/RakibulBh/journcode/internal/db"
	"github.com/RakibulBh/journcode/internal/env"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"google.golang.org/genai"
)

type mongoConfig struct {
	mongoUri string
}
type geiminiConfig struct {
	model           string
	apiKey          string
	maxOutputTokens int
}
type application struct {
	config config
	llm    *genai.Client
	db     *db.DB
}

type config struct {
	addr    string
	env     string
	geimini geiminiConfig
	mongo   mongoConfig
}

func (app *application) serve() http.Handler {

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// CORS
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{env.GetString("FRONTEND_URL", "http://localhost:3000")},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Healthcheck
	r.Get("/health", app.healthCheck)

	r.Get("/journal", app.getJournalEntries)
	r.Post("/journal", app.addJournalEntry)

	return r
}

func (app *application) run(mux http.Handler) error {
	srv := http.Server{
		Addr:              app.config.addr,
		Handler:           mux,
		WriteTimeout:      80 * time.Second,
		ReadTimeout:       80 * time.Second,
		IdleTimeout:       time.Minute,
		ReadHeaderTimeout: 50 * time.Second,
	}

	return srv.ListenAndServe()
}
