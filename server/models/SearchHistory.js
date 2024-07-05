import mongoose from "mongoose";
import { Schema } from "mongoose";

const searchHistorySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  query: {
    type: "String",
  },
  searchType: {
    type: String,
  },
  resultsCount: {
    type: Number,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

export const SearchHistory = mongoose.model(
  "SearchHistory",
  searchHistorySchema
);
