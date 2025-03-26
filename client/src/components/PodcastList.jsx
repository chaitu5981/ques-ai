const PodcastList = ({ podcasts, setPodcast, setViewPodcast }) => {
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
            <tr className="border-b-2 border-b-slate-300" key={podcast._id}>
              <td>{i + 1}</td>
              <td>{podcast?.name}</td>
              <td>{podcast?.createdAt}</td>
              <td>
                <div className="flex justify-center">
                  <button
                    className="px-3 border-2 border-gray-300"
                    onClick={() => {
                      setPodcast(podcast);
                      setViewPodcast(true);
                    }}
                  >
                    View
                  </button>
                  <button className="px-3  border-2 border-gray-300 text-red-500">
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
