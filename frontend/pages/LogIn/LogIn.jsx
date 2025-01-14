import LogInForm from "../../components/Forms/LogInForm/LogInForm"


const LogIn = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/RedZone_Getaway_Smaller_File.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-center text-white text-8xl mt-60 mb-50">Red Zone Getaway</h1>
        <div className="w-full max-w-md">
          <LogInForm />
        </div>
      </div>
    </div>
  );
}

export default LogIn;