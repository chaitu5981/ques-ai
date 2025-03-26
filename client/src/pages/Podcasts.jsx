import { useState } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import logo2 from "../assets/images/logo-2.png";
import { FaPlus } from "react-icons/fa6";
import { GrFormEdit } from "react-icons/gr";
import { MdOutlineHome } from "react-icons/md";
import { GrUpgrade } from "react-icons/gr";
import { MdOutlineWidgets } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../utils/constants";
const links = [
  {
    id: 1,
    icon: <FaPlus />,
    text: "Add your Podcast(s)",
    route: "/podcasts/add",
  },
  {
    id: 2,
    icon: <GrFormEdit />,
    text: "Create a Repurpose",
  },
  {
    id: 3,
    icon: <MdOutlineWidgets />,
    text: "Podcast Widget",
  },
  {
    id: 4,
    icon: <GrUpgrade />,
    text: "Upgrade",
  },
];
const Podcasts = () => {
  const [searchParams] = useSearchParams();
  const [activeLink, setActiveLink] = useState(0);
  const projectName = searchParams.get("projectName");
  const projectId = searchParams.get("projectId");
  const navigate = useNavigate();
  const logout = async () => {
    console.log("hi");
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
    <div className="flex  w-full">
      <div className="flex flex-col gap-6 p-8 w-[20%]">
        <Link to="/" className="flex gap-1 items-center">
          <img
            src={logo2}
            alt=""
            className="w-[2rem] h-[2rem] object-contain"
          />
          <p className="text-[#8833d8] text-3xl">
            <span className="font-bold">Ques.</span>
            <span className="font-thin">AI</span>
          </p>
        </Link>
        {links.map((link) => (
          <div
            key={link.id}
            onClick={() => {
              setActiveLink(link.id);
              navigate(`${link.route}?projectId=${projectId}`);
            }}
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
        <div className="w-full justify-between flex items-center">
          <p className="flex items-center gap-1 text-slate-700 font-semibold">
            <MdOutlineHome className="text-xl" />
            <span>Home Page / {projectName} /</span>
            <span className="text-[#8833b8] font-bold">
              {links[activeLink - 1]?.text}
            </span>
          </p>
          <div className="flex gap-3 items-center text-xl">
            <button>
              <FaRegBell />
            </button>
            <button className="text-red-500" onClick={logout}>
              <MdLogout />
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default Podcasts;
