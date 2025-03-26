import mongoose from "mongoose";
const podcastSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
    },
    transcript: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Podcast = mongoose.model("podcasts", podcastSchema);
export default Podcast;
