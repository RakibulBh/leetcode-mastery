package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type Details struct {
	Inputs          string         `bson:"inputs" json:"inputs"`
	Outputs         string         `bson:"outputs" json:"outputs"`
	Constraints     string         `bson:"constraints" json:"constraints"`
	CoreQuestion    string         `bson:"core_question" json:"coreQuestion"`
	EdgeCases       string         `bson:"edge_cases" json:"edgeCases"`
	Ideas           []Idea         `bson:"ideas" json:"ideas"`
	ChosenIdea      string         `bson:"chosen_idea" json:"chosenIdea"`
	Rationale       string         `bson:"rationale" json:"rationale"`
	Pseudocode      string         `bson:"pseudocode" json:"pseudocode"`
	Implementation  string         `bson:"implementation" json:"implementation"`
	Bugs            string         `bson:"bugs" json:"bugs"`
	MissedEdgeCases string         `bson:"missed_edge_cases" json:"missedEdgeCases"`
	SolutionSummary string         `bson:"solution_summary" json:"solutionSummary"`
	KeyLearnings    KeyLearnings   `bson:"key_learnings" json:"keyLearnings"`
	SelfReflection  SelfReflection `bson:"self_reflection" json:"selfReflection"`
}

type Idea struct {
	Title string `bson:"title" json:"title"`
	Pros  string `bson:"pros" json:"pros"`
	Cons  string `bson:"cons" json:"cons"`
}

type KeyLearnings struct {
	CoreIdea              string `bson:"core_idea" json:"coreIdea"`
	DataStructureInsights string `bson:"data_structure_insights" json:"dataStructureInsights"`
	AlgorithmInsights     string `bson:"algorithm_insights" json:"algorithmInsights"`
}

type SelfReflection struct {
	WhatWentWell      string `bson:"what_went_well" json:"whatWentWell"`
	WhatCouldBeBetter string `bson:"what_could_be_better" json:"whatCouldBeBetter"`
	FutureStudy       string `bson:"future_study" json:"futureStudy"`
	ConfidenceLevel   string `bson:"confidence_level" json:"confidenceLevel"`
}

type JournalEntry struct {
	ID          string    `bson:"_id" json:"id"`
	ProblemName string    `bson:"problem_name" json:"problemName"`
	ProblemID   string    `bson:"problem_id" json:"problemId"`
	DateDone    time.Time `bson:"date_done" json:"dateDone"`
	Topic       string    `bson:"topic" json:"topic"`
	Difficulty  string    `bson:"difficulty" json:"difficulty"`
	Details     Details   `bson:"details" json:"details"`
}

type DB struct {
	Client *mongo.Client
}

func New(mongUri string) (*mongo.Client, error) {
	client, err := mongo.Connect(options.Client().ApplyURI(mongUri))
	if err != nil {
		return nil, err
	}

	return client, err
}

func (db *DB) GetJournalEntries() ([]JournalEntry, error) {
	collection := db.Client.Database("journcode").Collection("journal")

	cursor, err := collection.Find(context.Background(), bson.D{})
	if err != nil {
		return nil, err
	}

	var entries []JournalEntry
	if err := cursor.All(context.Background(), &entries); err != nil {
		return nil, err
	}

	return entries, nil
}

func (db *DB) AddJournalEntry(entry JournalEntry) error {
	collection := db.Client.Database("journcode").Collection("journal")

	_, err := collection.InsertOne(context.Background(), entry)
	if err != nil {
		return err
	}

	return nil
}
