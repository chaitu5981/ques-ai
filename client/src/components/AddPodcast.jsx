import rss from "../assets/images/rss.png";
import youtube from "../assets/images/youtube.png";
import upload from "../assets/images/upload.png";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { server } from "../utils/constants";
import PodcastList from "./PodcastList";
import ViewPodcast from "./ViewPodcast";
const options = [
  {
    id: 1,
    text: "Rss Feed",
    image: rss,
  },
  {
    id: 2,
    text: "Youtube Video",
    image: youtube,
  },
  {
    id: 3,
    text: "Upload Files",
    image: upload,
  },
];
const AddPodcast = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [podcasts, setPodcasts] = useState([]);
  const [podcast, setPodcast] = useState({});
  const [viewPodcast, setViewPodcast] = useState(false);
  const [name, setName] = useState("");
  const [transcript, setTranscript] = useState("");
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const getPodcasts = async () => {
    try {
      const { data } = await axios.get(`${server}/podcasts/all/${projectId}`, {
        withCredentials: true,
      });
      setPodcasts(data.podcasts);
    } catch (error) {
      console.log(error);
    }
  };
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
        setShowUpload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPodcasts();
  }, []);
  if (!viewPodcast)
    return (
      <div className="space-y-8">
        <p className="text-3xl font-bold">Add Podcast</p>
        <div className="justify-between flex">
          {options.map((option) => (
            <div
              onClick={() => setShowUpload(true)}
              key={option.id}
              className="flex justify-between gap-10 px-4 py-8 cursor-pointer bg-white shadow-md rounded-md w-[20rem] items-center"
            >
              <div className="">
                <p className="text-2xl font-semibold">{option.text}</p>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>
              </div>
              <img
                src={option.image}
                alt=""
                className="w-[3.5rem] h-[3.5rem] object-cover"
              />
            </div>
          ))}
        </div>
        {showUpload && (
          <div className="inset-0 fixed bg-black/60 flex justify-center items-center">
            <div className="bg-white w-[60%] p-6 rounded-xl flex flex-col gap-7">
              <div className="flex justify-between w-full">
                <div className="flex gap-2 items-center">
                  <img
                    src={youtube}
                    className="w-[3rem] h-[3rem] object-cover"
                  />
                  <p className="text-3xl font-semibold">Upload from Youtube</p>
                </div>
                <button
                  onClick={() => setShowUpload(false)}
                  className="text-3xl"
                >
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
        )}
        {podcasts.length > 0 && (
          <PodcastList
            podcasts={podcasts}
            setPodcast={setPodcast}
            setViewPodcast={setViewPodcast}
          />
        )}
      </div>
    );
  else
    return (
      <ViewPodcast podcastId={podcast._id} setViewPodcast={setViewPodcast} />
    );
};
export default AddPodcast;
