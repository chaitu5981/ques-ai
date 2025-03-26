import Project from "../models/projectModel.js";
import User from "../models/userModel.js";
export const createProject = async (req, res) => {
  const { name } = req.body;
  try {
    const project = new Project({ name });
    const user = await User.findById(req.user.userId);
    user.projects = [...user.projects, project._id];
    await project.save();
    await user.save();
    res.status(201).json({
      success: true,
      message: "Project created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getProjects = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const projects = user?.projects;
  const projects1 = [];
  // if (projects.length === 0)
  //   return res.status(400).json({
  //     success: false,
  //     message: "No projects found",
  //   });
  for (let i = 0; i < projects.length; i++) {
    const project1 = await Project.findById(projects[i]);
    projects1.push({
      projectId: project1?.id,
      name: project1?.name,
      noOfFiles: project1?.podcasts.length,
      lastEdited: project1?.updatedAt,
    });
  }
  res.status(200).json({
    success: true,
    projects: projects1,
  });
};
