import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import youtube from "../assets/images/youtube.png";
import { toast } from "react-toastify";
import { server } from "../utils/constants";
import axios from "axios";
const CreatePodcast = ({ setShowUpload, projectId, getPodcasts }) => {
  const [name, setName] = useState("");
  const [transcript, setTranscript] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !transcript)
      return toast("Enter both name and transcript", {
        type: "warning",
        position: "top-right",
      });
    try {
      const { data } = await axios.post(
        `${server}/podcasts/create`,
        { projectId, name, transcript },
        { withCredentials: true }
      );
      if (data.success) {
        toast(data.message, { type: "success", position: "top-right" });
        getPodcasts();
        setName("");
        setTranscript("");
        setShowUpload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="inset-0 fixed bg-black/60 flex justify-center items-center">
      <div className="bg-white w-[60%] p-6 rounded-xl flex flex-col gap-7">
        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center">
            <img src={youtube} className="w-[3rem] h-[3rem] object-cover" />
            <p className="text-3xl font-semibold">Upload from Youtube</p>
          </div>
          <button onClick={() => setShowUpload(false)} className="text-3xl">
            <IoCloseSharp />
          </button>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              className="border-2 border-slate-300 px-4 py-2 rounded-md"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="transcript">Transcript </label>
            <textarea
              id="transcript"
              rows={5}
              value={transcript}
              className="border-2 border-slate-300 px-4 py-2 rounded-md"
              onChange={(e) => setTranscript(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-black text-white w-fit ml-auto rounded-md px-4 py-2"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreatePodcast;
