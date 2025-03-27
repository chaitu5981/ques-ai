import { useEffect, useState } from "react";
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
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
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
    route: "/podcasts/repurpose",
  },
  {
    id: 3,
    icon: <MdOutlineWidgets />,
    text: "Podcast Widget",
    route: "/podcasts/widget",
  },
  {
    id: 4,
    icon: <GrUpgrade />,
    text: "Upgrade",
    route: "/podcasts/upgrade",
  },
];
const Podcasts = () => {
  const [searchParams] = useSearchParams();
  const [activeLink, setActiveLink] = useState("");
  const projectName = searchParams.get("projectName");
  const projectId = searchParams.get("projectId");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
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
  useEffect(() => {
    axios
      .get(`${server}/auth/check-auth`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) setUser(res.data.user);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);
  return (
    <div className="flex flex-col sm:flex-row  w-full">
      <div className="flex gap-7">
        <button
          className="sm:hidden"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <GiHamburgerMenu />
        </button>
        <Link to="/" className=" sm:hidden flex gap-1 items-center">
          <img
            src={logo2}
            alt=""
            className="w-[1rem] h-[1rem] object-contain"
          />
          <p className="text-[#8833d8] text-2xl">
            <span className="font-bold">Ques.</span>
            <span className="font-thin">AI</span>
          </p>
        </Link>
      </div>
      {showMenu && (
        <div className="flex flex-col gap-2 py-2 mt-3">
          {links.map((link) => (
            <div
              key={link.id}
              onClick={() => {
                setActiveLink(link.text);
                navigate(
                  `${link.route}?projectId=${projectId}&projectName=${projectName}`
                );
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
          <div className="flex gap-3 items-center">
            <IoSettingsOutline />
            <p>Help</p>
          </div>
          <div className="flex gap-2.5 items-center">
            <button
              onClick={() => {
                setActiveLink("Account Settings");
                navigate(
                  `/podcasts/account?projectId=${projectId}&projectName=${projectName}`,
                  {
                    state: {
                      user,
                    },
                  }
                );
              }}
            >
              <FaRegCircleUser className="text-2xl" />
            </button>
            <div className="flex flex-col">
              <p>{user.name}</p>
            </div>
          </div>
        </div>
      )}
      <div className="hidden sm:flex flex-col justify-between p-8 w-[50%] lg:w-[20%]">
        <div className="flex flex-col gap-6">
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
                setActiveLink(link.text);
                navigate(
                  `${link.route}?projectId=${projectId}&projectName=${projectName}`
                );
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
        <div className="space-y-4">
          <div className="flex gap-3 items-center border-b-2 pb-4 border-b-gray-300">
            <IoSettingsOutline />
            <p>Help</p>
          </div>
          <div className="flex gap-2.5 items-center">
            <button
              onClick={() => {
                setActiveLink("Account Settings");
                navigate(
                  `/podcasts/account?projectId=${projectId}&projectName=${projectName}`,
                  {
                    state: {
                      user,
                    },
                  }
                );
              }}
            >
              <FaRegCircleUser className="text-3xl" />
            </button>
            <div className="flex flex-col">
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-[50%] lg:w-[80%] bg-slate-200 min-h-screen py-6 px-8 md:px-20 space-y-9">
        <div className="w-full justify-between flex items-center">
          <p className="flex items-center gap-1 text-slate-700 font-semibold">
            <MdOutlineHome className="text-xl" />
            <span>Home Page / {projectName} /</span>
            <span className="text-[#8833b8] font-bold">{activeLink}</span>
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
