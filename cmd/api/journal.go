package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/RakibulBh/journcode/internal/db"
)

func (app *application) getJournalEntries(w http.ResponseWriter, r *http.Request) {
	entries, err := app.db.GetJournalEntries()
	if err != nil {
		appErr := NewInternalServerError("Failed to fetch journal entries", err)
		appErr.WriteJSON(w)
		return
	}

	app.writeJSON(w, http.StatusOK, "success", entries)
}

func (app *application) addJournalEntry(w http.ResponseWriter, r *http.Request) {
	// First decode into a temporary struct with string date
	type tempEntry struct {
		ID          int        `json:"id"`
		ProblemName string     `json:"problemName"`
		ProblemID   string     `json:"problemId"`
		DateDone    string     `json:"dateDone"`
		Topic       string     `json:"topic"`
		Difficulty  string     `json:"difficulty"`
		Details     db.Details `json:"details"`
	}

	temp := tempEntry{}
	if err := json.NewDecoder(r.Body).Decode(&temp); err != nil {
		appErr := NewBadRequestError("Invalid request body", err)
		appErr.WriteJSON(w)
		return
	}

	// Validate required fields
	if temp.ProblemName == "" || temp.ProblemID == "" || temp.Topic == "" || temp.Difficulty == "" {
		appErr := NewBadRequestError("Missing required fields", nil)
		appErr.WriteJSON(w)
		return
	}

	// Convert the string date to time.Time
	dateDone := time.Now() // Default to current time
	if temp.DateDone != "" {
		// Try parsing as YYYY-MM-DD
		if parsed, err := time.Parse("2006-01-02", temp.DateDone); err == nil {
			dateDone = parsed
		} else if parsed, err := time.Parse(time.RFC3339, temp.DateDone); err == nil {
			dateDone = parsed
		}
	}

	// Create the final entry with the parsed date
	entry := db.JournalEntry{
		ID:          fmt.Sprintf("%d", temp.ID),
		ProblemName: temp.ProblemName,
		ProblemID:   temp.ProblemID,
		DateDone:    dateDone,
		Topic:       temp.Topic,
		Difficulty:  temp.Difficulty,
		Details:     temp.Details,
	}

	if err := app.db.AddJournalEntry(entry); err != nil {
		appErr := NewInternalServerError("Failed to add journal entry", err)
		appErr.WriteJSON(w)
		return
	}

	app.writeJSON(w, http.StatusOK, "Entry added successfully", nil)
}
