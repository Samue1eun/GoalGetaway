import { useEffect, useState } from "react";
import { getInfo } from "../src/app/utilities";

const UpcomingTripsDisplayed = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getInfo(); // Assuming getInfo fetches user data
      setUser(userInfo);
    };
    getUserInfo();
  }, []);

  console.log(user);

  if (!user) {
    // Optionally, you can return a loading state while user data is being fetched.
    return <span className="loading loading-ring loading-lg"></span>;
  }

  return (
    <>
      <div className="flex justify-start grow overflow-y-auto max-h-[700px]">
            <div className="card glass bg-opacity-10  backdrop-blur-sm border border-white border-opacity-30 shadow-xl w-[650px] pb-10">
                <h1 className='text-4xl text-center mt-20 text-white mb-10'>My Upcoming Trips</h1>

      {user.trips && user.trips.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {user.trips.slice(0, 2).map((trip, index) => (
            <div
            key={index}
            className="card w-[450px] overflow-hidden h-[190px] bg-base-100 shadow-xl rounded-lg"
            >
              <div className="card-body p-0 flex flex-row">
                {/* Left side - Image */}
                <div className="w-1/3 overflow-hidden">
                  <img
                    src={trip.image_url}
                    alt={trip.name}
                    className="object-cover overflow-hidden w-full h-full rounded-l-lg"
                    />
                </div>

                {/* Right side - Trip Name */}
                <div className="w-2/3 p-4 flex items-center">
                  <h2 className="text-xl font-semibold text-gray-900 truncate">
                    {trip.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="self-center text-3xl text-white">No upcoming trips planned</p>
      )}
      </div>
      </div>
    </>
  );
};

export default UpcomingTripsDisplayed;
