import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
const ViewPodcast = ({ podcast, setViewPodcast }) => {
  const [editable, setEditable] = useState(false);
  const [transcript, setTranscript] = useState("");
  const handleEdit = () => {
    setTranscript(podcast.transcript);
    setEditable(true);
  };
  return (
    <div className="space-y-6">
      <div className="w-full flex  justify-between items-center">
        <div className="text-3xl font-semibold flex items-center gap-2">
          <button onClick={() => setViewPodcast(false)}>
            <FaArrowLeftLong />
          </button>
          <span>Edit Podcast</span>
        </div>
        {!editable ? (
          <button
            className="bg-black text-white px-10 py-2 rounded-md"
            onClick={handleEdit}
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              className="bg-white text-red-500 px-10 py-2 rounded-md"
              onClick={() => {
                setEditable(false);
              }}
            >
              Discard
            </button>
            <button className="bg-black text-white px-10 py-2 rounded-md">
              Edit
            </button>
          </div>
        )}
      </div>
      <div className="bg-white p-9 rounded-xl w-full">
        <p className="text-[#8833b8] text-xl font-semibold">Speaker</p>
        {!editable ? (
          <div>{podcast.transcript}</div>
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
