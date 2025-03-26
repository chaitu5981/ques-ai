import { useState } from "react";
import logo2 from "../assets/images/logo-2.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../utils/constants";
import { toast } from "react-toastify";
const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server}/auth/register`, formData, {
        withCredentials: true,
      });
      console.log(res);
      if (res.error)
        return toast(res.error.response.data.message, {
          type: "error",
          position: "top-right",
        });
      toast(res.data.message, {
        type: "success",
        position: "top-right",
      });
      navigate("/");
    } catch (error) {
      toast(error.response.data.message, {
        type: "error",
        position: "top-right",
      });
    }
  };
  return (
    <div className="w-full flex h-screen">
      <div className="w-[70%] bg-[#8833b8] h-full"></div>
      <div className="w-[30%] flex flex-col  gap-4 justify-center items-center px-16">
        <img src={logo2} alt="" className="w-[4rem] h-[4rem] object-contain" />
        <div className="text-[#8833b8] text-3xl text-center">
          <p>Welcome to</p>
          <p className="font-semibold">Ques.AI</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center w-full"
        >
          <input
            type="text"
            value={formData.email}
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="border-2 border-slate-200 px-2 py-1 rounded-md w-full"
          />
          <input
            type="password"
            value={formData.password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="border-2 border-slate-200 px-2 py-1 rounded-md w-full"
          />
          <button
            type="submit"
            className="w-full bg-[#8833b8] text-white py-1.5 rounded-md"
          >
            Register
          </button>
        </form>
        <p>
          Already have an Account?&nbsp;
          <Link to="/" className="text-[#8833b8] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
