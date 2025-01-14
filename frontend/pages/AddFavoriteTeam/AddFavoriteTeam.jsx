import AddFavoriteTeamCard from "../../components/Cards/Pages/AddFavoriteTeam/AddFavoriteTeam";
import { fetchAllNFLTeams } from "../../src/app/utilities";


const AddFavoriteTeam = () => {

    return (
        <div className="relative h-screen w-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/assets/RedZone_Getaway_Smaller_File.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
            <AddFavoriteTeamCard />
        </div>
      </div>
    );
}

export default AddFavoriteTeam;