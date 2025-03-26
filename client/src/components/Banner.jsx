import logo from "../assets/images/logo.png";
const Banner = () => {
  return (
    <div className="w-full md:w-[50%] lg:w-[70%] bg-[#8833b8] h-full flex flex-col p-12 gap-16">
      <div className="flex gap-1  items-center">
        <img src={logo} alt="" className="w-[2.2rem] h-[2.2rem] object-cover" />

        <p className="text-4xl text-white font-semibold">
          Ques.<span className="font-thin">AI</span>
        </p>
      </div>
      <p className="text-white text-xl md:text-6xl w-[45%]">
        Your podcast will no longer be just a hobby
      </p>
      <p className="text-white text-xl ">
        Super charge Your Distribution using our AI assistant!
      </p>
    </div>
  );
};
export default Banner;
