import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { server } from "../utils/constants";
import logo2 from "../assets/images/logo-2.png";
import { FaPlus } from "react-icons/fa6";
import { GrFormEdit } from "react-icons/gr";
import AddPodcast from "../components/AddPodcast";
import CreateRepurpose from "../components/CreateRepurpose";
import { MdOutlineHome } from "react-icons/md";
const links = [
  {
    id: 1,
    icon: <FaPlus />,
    text: "Add your Podcast(s)",
    component: <AddPodcast />,
  },
  {
    id: 2,
    icon: <GrFormEdit />,
    text: "Create a Repurpose",
    component: <CreateRepurpose />,
  },
];
const Podcasts = () => {
  const [searchParams] = useSearchParams();
  const [activeLink, setActiveLink] = useState(0);
  const projectId = searchParams.get("projectId");
  const projectName = searchParams.get("projectName");

  return (
    <div className="flex  w-full">
      <div className="flex flex-col gap-6 p-8 w-[20%]">
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
        {links.map((link) => (
          <div
            key={link.id}
            onClick={() => setActiveLink(link.id)}
            className="flex gap-3 cursor-pointer items-center px-3 py-1 rounded-md"
            style={
              activeLink == link.id
                ? {
                    backgroundColor: "lightgray",
                    color: "#8833b8",
                    fontWeight: "bold",
                  }
                : {}
            }
          >
            {link.icon}
            <p>{link.text}</p>
          </div>
        ))}
      </div>
      <div className="w-[80%] bg-slate-200 min-h-screen py-6 px-20 space-y-9">
        <div className="w-full justify-between">
          <p className="flex items-center gap-1 text-slate-700 font-semibold">
            <MdOutlineHome className="text-xl" />
            <span>Home Page / {projectName} /</span>
            <span className="text-[#8833b8] font-bold">
              {links[activeLink - 1]?.text}
            </span>
          </p>
        </div>
        {activeLink > 0 && links[activeLink - 1].component}
      </div>
    </div>
  );
};
export default Podcasts;
