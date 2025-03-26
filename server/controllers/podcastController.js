import Podcast from "../models/podcastModel.js";
import Project from "../models/projectModel.js";

export const createPodcast = async (req, res) => {
  const { name, transcript, projectId } = req.body;
  try {
    const podcast = new Podcast({
      name,
      transcript,
    });
    const project = await Project.findById(projectId);
    project.podcasts = [...project.podcasts, podcast._id];
    await podcast.save();
    await project.save();
    res.status(201).json({
      success: true,
      message: "Podcast created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getPodcasts = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  const podcasts = [];
  const podcastIds = project.podcasts;
  for (let i = 0; i < podcastIds.length; i++) {
    const podcastId = podcastIds[i];
    const podcast = await Podcast.findById(podcastId);
    podcasts.push(podcast);
  }
  res.status(200).json({
    success: true,
    podcasts,
  });
};
