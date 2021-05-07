import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  title: String,
  body: String,
});
mongoose.models = {};

export default mongoose.models.Note || mongoose.model("Note", noteSchema);
