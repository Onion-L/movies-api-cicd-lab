import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GenresSchema = new Schema({
  id: { type: Number },
  name: { type: String },
});

export default mongoose.model("genres", GenresSchema);
