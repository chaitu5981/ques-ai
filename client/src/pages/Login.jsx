import { useEffect, useState } from "react";
import logo2 from "../assets/images/logo-2.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../utils/constants";
import Banner from "../components/Banner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password)
      return toast("All fields are required", {
        type: "warning",
        position: "top-right",
      });
    try {
      setLoading(true);
      const { data, error } = await axios.post(
        `${server}/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (error)
        return toast(error.response.data.message, {
          type: "error",
          position: "top-right",
        });
      toast(data.message, {
        type: "success",
        position: "top-right",
      });
      navigate("/projects");
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message, {
        type: "error",
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    axios
      .get(`${server}/auth/check-auth`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) navigate("/projects");
      })
      .catch(() => {
        console.log("stay here");
      });
  }, []);
  return (
    <div className="w-full flex   h-screen flex-col md:flex-row">
      <Banner />
      <div className="w-full md:w-[50%] lg:w-[30%] flex flex-col  gap-4 justify-center items-center px-16">
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
            className="w-full bg-[#8833b8] text-white py-1.5 rounded-md flex justify-center"
          >
            {loading ? (
              <div className="w-[1rem] h-[1rem] border-2 border-white border-t-[#8833b8] rounded-full animate-spin"></div>
            ) : (
              <p>Login</p>
            )}
          </button>
        </form>
        <p>
          Don't have an Account?&nbsp;
          <Link to="/register" className="text-[#8833b8] font-semibold">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
