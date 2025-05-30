package main

import (
	"context"
	"log"
	"time"

	"github.com/RakibulBh/journcode/internal/db"
	"github.com/RakibulBh/journcode/internal/env"
	"github.com/RakibulBh/journcode/internal/llm"
	"github.com/joho/godotenv"
)

func main() {
	startTime := time.Now()
	log.Printf("Application starting at %s", startTime.Format(time.RFC3339))

	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Printf("Warning: .env file not found or could not be loaded: %v", err)
	}

	environment := env.GetString("ENV", "development")
	if environment != "development" {
		log.Printf("Running in %s environment", environment)
	} else {
		log.Printf("Running in development environment")
	}

	// Load configuration
	cfg := config{
		addr: ":" + env.GetString("PORT", "8080"),
		env:  environment,
		geimini: geiminiConfig{
			model:           env.GetString("GEIMINI_MODEL", "gemini-1.5-flash"),
			apiKey:          env.GetString("GEIMINI_API_KEY", ""),
			maxOutputTokens: env.GetInt("MAX_OUTPUT_TOKENS", 4096),
		},
		mongo: mongoConfig{
			mongoUri: env.GetString("MONGO_URI", "mongodb://localhost:27017"),
		},
	}

	log.Printf("Configuration loaded: LLM model=%s, max_tokens=%d",
		cfg.geimini.model, cfg.geimini.maxOutputTokens)

	// Initialize LLM client with warmup
	log.Printf("Initializing LLM client...")
	llmStartTime := time.Now()
	llmClient := llm.New(cfg.geimini.model, cfg.geimini.apiKey)

	// Verify LLM client was initialized properly
	if llmClient != nil {
		log.Printf("LLM client initialized successfully in %v", time.Since(llmStartTime))
	} else {
		log.Printf("WARNING: LLM client may not have initialized properly")
	}

	// Initialize MongoDB client
	client, err := db.New(cfg.mongo.mongoUri)
	if err != nil {
		log.Printf("WARNING: Logger service encountered an error: %d", err)
	}
	defer func() {
		if err = client.Disconnect(context.Background()); err != nil {
			panic(err)
		}
	}()
	dbService := &db.DB{Client: client}

	app := &application{
		config: cfg,
		llm:    llmClient,
		db:     dbService,
	}

	// Prepare server
	log.Printf("Setting up HTTP server on %s", cfg.addr)
	mux := app.serve()

	// Record startup metrics
	log.Printf("Application ready in %v", time.Since(startTime))

	// Start listening for requests
	log.Printf("Starting HTTP server, listening on %s", cfg.addr)
	log.Fatal(app.run(mux))
}
