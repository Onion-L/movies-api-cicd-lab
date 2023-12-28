import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LangSchema = new Schema({
  iso_639_1: { type: String },
  english_name: { type: String },
  name: { type: String },
});

export default mongoose.model("Languages", LangSchema);
