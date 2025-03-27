import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { useState } from "react";
const Account = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const projectName = searchParams.get("projectName");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  const [name, setName] = useState(user.name);
  return (
    <div className="space-y-10">
      <div className="flex gap-2 text-3xl font-semibold items-center">
        <button
          onClick={() =>
            navigate(
              `/podcasts?projectId=${projectId}&projectName=${projectName}`
            )
          }
        >
          <FaArrowLeftLong />
        </button>
        <p>Account Settings</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <FaRegCircleUser className="text-6xl" />
        <div className="flex flex-col gap-1">
          <p>User Name</p>
          <input
            type="text"
            value={name}
            className="border-2 border-gray-400 w-[15rem] px-1"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Email</p>
          <div className="border-2 border-gray-400 w-[15rem] px-1">
            {user.email}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
