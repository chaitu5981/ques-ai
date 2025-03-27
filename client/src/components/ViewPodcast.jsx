import { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { server } from "../utils/constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
const ViewPodcast = () => {
  const [editable, setEditable] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [searchParams] = useSearchParams();
  const podcastId = searchParams.get("podcastId");
  const projectId = searchParams.get("projectId");
  const projectName = searchParams.get("projectName");
  const oldTranscriptRef = useRef();
  const navigate = useNavigate();
  const getPodcast = async () => {
    try {
      const { data } = await axios.get(`${server}/podcasts/${podcastId}`, {
        withCredentials: true,
      });
      console.log(data);
      if (data.success) {
        setTranscript(data.podcast.transcript);
        oldTranscriptRef.current = data.podcast.transcript;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updatePodcast = async () => {
    try {
      const { data } = await axios.post(
        `${server}/podcasts/update`,
        {
          podcastId,
          transcript,
        },
        { withCredentials: true }
      );
      if (data.success) {
        toast("Podcast updated successfully", {
          type: "success",
          position: "top-right",
        });
        getPodcast();
        setEditable(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPodcast();
  }, []);
  return (
    <div className="space-y-6">
      <div className="w-full flex  justify-between items-center">
        <div className="text-3xl font-semibold flex items-center gap-2">
          <button
            onClick={() =>
              navigate(
                `/podcasts/add?projectId=${projectId}&projectName=${projectName}`
              )
            }
          >
            <FaArrowLeftLong />
          </button>
          <span>Edit Podcast</span>
        </div>
        {!editable ? (
          <button
            className="bg-black text-white px-10 py-2 rounded-md"
            onClick={() => setEditable(true)}
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              className="bg-white text-red-500 px-10 py-2 rounded-md"
              onClick={() => {
                setTranscript(oldTranscriptRef.current);
                setEditable(false);
              }}
            >
              Discard
            </button>
            <button
              className="bg-black text-white px-10 py-2 rounded-md"
              onClick={updatePodcast}
            >
              Save
            </button>
          </div>
        )}
      </div>
      <div className="bg-white p-9 rounded-xl w-full">
        <p className="text-[#8833b8] text-xl font-semibold">Speaker</p>
        {!editable ? (
          <div>{transcript}</div>
        ) : (
          <textarea
            className="w-full"
            rows={15}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};
export default ViewPodcast;
