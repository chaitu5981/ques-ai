import { useEffect, useState } from "react";
import { server } from "../utils/constants";
import axios from "axios";
import projectImage from "../assets/images/project.png";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo2 from "../assets/images/logo-2.png";
import { IoSettingsOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { MdLogout } from "react-icons/md";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  ``;
  console.log(loading);
  const getProjects = async () => {
    try {
      const { data } = await axios.get(`${server}/projects`, {
        withCredentials: true,
      });
      setProjects(data.projects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getShortName = (name) => {
    const arr = name.trim().split(" ");
    if (arr.length < 2) return arr[0][0].toUpperCase();
    else return arr[0][0].toUpperCase() + arr[1][0].toUpperCase();
  };
  const getDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/auth/check-auth`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) getProjects();
      })
      .catch(() => {
        setLoading(false);
        navigate("/");
      });
  }, []);
  const createProject = async () => {
    if (!newProjectName) return setError("Project Name can't be empty");
    setError("");
    try {
      const res = await axios.post(
        `${server}/projects/create`,
        { name: newProjectName },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast(res.data.message, { type: "success", position: "top-right" });
        setNewProjectName("");
        getProjects();
        setShowModal(false);
      }
    } catch (error) {
      toast(error?.response?.data?.message, {
        type: "error",
        position: "top-right",
      });
    }
  };
  const logout = async () => {
    try {
      const { data } = await axios.get(`${server}/auth/logout`, {
        withCredentials: true,
      });
      console.log(data);
      if (data.success) {
        toast(data.message, {
          type: "success",
          position: "top-right",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full h-full md:px-30 py-8">
      <div className="flex justify-between w-full">
        <div className="flex gap-1 items-center">
          <img
            src={logo2}
            alt=""
            className="w-[2rem] h-[2rem] object-contain"
          />
          <p className="text-[#8833d8] text-3xl">
            <span className="font-bold">Ques.</span>
            <span className="font-thin">AI</span>
          </p>
        </div>
        <div className="flex gap-3 items-center text-2xl">
          <IoSettingsOutline />
          <GoBell />
          <button className="text-red-500" onClick={logout}>
            <MdLogout />
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-6xl">Loading...</div>
      ) : projects && projects?.length > 0 ? (
        <div className="w-full flex flex-col gap-6">
          <div className="flex w-full flex-col md:flex-row items-center gap-8 justify-between">
            <p className="text-3xl text-[#8833b8] font-bold">Projects</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-black text-white px-5 py-1.5 rounded-md w-fit flex items-center gap-2"
            >
              <FaPlusCircle className="text-xl" />
              Create New Project
            </button>
          </div>
          {projects.map((project) => (
            <div
              onClick={() =>
                navigate(
                  `/podcasts?projectId=${project.projectId}&projectName=${project.name}`
                )
              }
              className="border-2 border-slate-300 rounded-2xl p-1 w-fit flex gap-5 items-center cursor-pointer"
              key={project?.projectId}
            >
              <div className="text-3xl text-white bg-amber-500 rounded-xl w-[4rem] h-[4rem] p-3">
                {getShortName(project?.name)}
              </div>
              <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col">
                  <p className="text-[#8833b8] font-semibold">
                    {project?.name}
                  </p>
                  <p className="text-[9px]">{project?.noOfFiles} Files</p>
                </div>
                <p className="text-[9px]">
                  Last edited on {getDate(project?.lastEdited)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-10 text-center px-5  w-full">
          <p className="text-3xl font-bold text-[#8833b8]">
            Create a New Project
          </p>
          <img
            src={projectImage}
            className="w-[28rem] h-[18rem] object-cover"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            ipsum sint repudiandae quaerat hic earum magnam maiores quas
            dolores? Cum ducimus aperiam accusamus nemo deleniti fugit ullam
            necessitatibus, beatae atque voluptates magni voluptate? Officiis,
            quis! Asperiores totam nam eius dignissimos. Tenetur dolorum hic
            odio numquam at sed sapiente eos recusandae.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-5 py-1.5 rounded-md w-fit flex items-center gap-2"
          >
            <FaPlusCircle className="text-xl" />
            Create New Project
          </button>
        </div>
      )}
      {showModal && (
        <div className="fixed bg-black/60 flex justify-center items-center inset-0 ">
          <div className="bg-white w-[60%] flex flex-col gap-8 rounded-xl p-8">
            <p className="text-2xl font-bold">Create Project</p>
            <div className="space-y-1.5">
              <p>Enter Project Name :</p>
              <input
                type="text"
                value={newProjectName}
                placeholder="Type here"
                className="border-2 border-slate-200 p-3 rounded-xl w-full"
                onChange={(e) => setNewProjectName(e.target.value)}
              />
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="ml-auto flex gap-5 items-center">
              <button
                className="text-red-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#8833b8] text-white rounded-md px-5 py-1"
                onClick={createProject}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Projects;
