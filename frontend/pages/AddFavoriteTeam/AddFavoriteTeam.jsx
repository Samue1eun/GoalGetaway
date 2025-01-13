import AddFavoriteTeamCard from "../../components/Cards/Pages/AddFavoriteTeam/AddFavoriteTeam";
import { fetchAllNFLTeams } from "../../src/app/utilities";


const AddFavoriteTeam = () => {

    return (
        <>
            <div className="card bg-base-100 w-full shadow-xl">
                <AddFavoriteTeamCard />
            </div>

        </>
    )
}

export default AddFavoriteTeam;