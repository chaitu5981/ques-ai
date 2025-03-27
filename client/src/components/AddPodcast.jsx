import rss from "../assets/images/rss.png";
import youtube from "../assets/images/youtube.png";
import upload from "../assets/images/upload.png";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { server } from "../utils/constants";
import PodcastList from "./PodcastList";
import CreatePodcast from "./CreatePodcast";
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
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const projectName = searchParams.get("projectName");
  const getPodcasts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/podcasts/all/${projectId}`, {
        withCredentials: true,
      });
      setPodcasts(data.podcasts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPodcasts();
  }, [projectId]);
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <p className="text-3xl font-bold">Add Podcast</p>
      <div className="justify-between gap-6 flex flex-col lg:flex-row">
        {options.map((option) => (
          <div
            onClick={() => setShowUpload(true)}
            key={option.id}
            className="flex justify-between gap-10 px-4 py-8 cursor-pointer bg-white shadow-md rounded-md w-[80%] lg:w-[30%] items-center"
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
        <CreatePodcast
          setShowUpload={setShowUpload}
          projectId={projectId}
          getPodcasts={getPodcasts}
        />
      )}
      {loading ? (
        <div className="w-[4rem] h-[4rem] border-4 border-[#8833b8] border-t-[#E2E8F0] rounded-full animate-spin"></div>
      ) : (
        podcasts.length > 0 && (
          <PodcastList
            podcasts={podcasts}
            getPodcasts={getPodcasts}
            projectId={projectId}
            projectName={projectName}
          />
        )
      )}
    </div>
  );
};
export default AddPodcast;
