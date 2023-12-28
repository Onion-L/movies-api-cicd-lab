import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  adult: { type: Boolean },
  gender: { type: Number },
  id: { type: Number },
  known_for_department: { type: String },
  name: { type: String },
  original_name: { type: String },
  popularity: { type: Number },
  profile_path: { type: String },
  known_for: [
    {
      adult: { type: Boolean },
      backdrop_path: { typr: String },
      id: { type: Number },
      title: { type: String },
      original_language: { type: String },
      original_title: { type: String },
      overview: { type: String },
      poster_path: { type: String },
      media_type: { type: String },
      genre_ids: { type: Array },
      popularity: { type: Number },
      release_date: { type: String },
      video: { type: Boolean },
      vote_average: { type: Number },
      vote_count: { type: Number },
    },
  ],
});

export default mongoose.model("actor", ActorSchema);
