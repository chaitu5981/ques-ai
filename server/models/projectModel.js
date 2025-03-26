import mongoose from "mongoose";
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    podcasts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "podcasts",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("projects", projectSchema);
export default Project;
