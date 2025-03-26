import axios from "axios";
import { server } from "../utils/constants";
import { toast } from "react-toastify";

const PodcastList = ({
  podcasts,
  setPodcast,
  setViewPodcast,
  getPodcasts,
  projectId,
}) => {
  const getDateAndTime = (timeString) => {
    const dateTime = new Date(timeString);
    const date = dateTime.toLocaleDateString("en-in", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
    const time = dateTime.toLocaleTimeString("en-in", {
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
    });
    return `${date} | ${time}`;
  };
  const deletePodcast = async (podcastId) => {
    try {
      const { data } = await axios.delete(
        `${server}/podcasts/${podcastId}/${projectId}`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast("Podcast deleted successfully", {
          type: "success",
          position: "top-right",
        });
        getPodcasts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white px-24 py-4 rounded-md shadow-md space-y-6">
      <p className="font-semibold text-xl">Your Files</p>
      <table className="w-full">
        <thead>
          <tr className=" bg-slate-200 rounded-md">
            <th>No.</th>
            <th>Name</th>
            <th>Upload Date & Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center space-y-3">
          {podcasts.map((podcast, i) => (
            <tr className="border-b-2 border-b-slate-300 " key={podcast._id}>
              <td className="py-2">{i + 1}</td>
              <td className="py-2">{podcast?.name}</td>
              <td className="py-2">{getDateAndTime(podcast?.createdAt)}</td>
              <td className="py-2">
                <div className="flex justify-center">
                  <button
                    className="px-3 border-2 border-gray-300 rounded-sm"
                    onClick={() => {
                      setPodcast(podcast);
                      setViewPodcast(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => deletePodcast(podcast._id)}
                    className="px-3  border-2 border-gray-300 text-red-500 rounded-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PodcastList;
