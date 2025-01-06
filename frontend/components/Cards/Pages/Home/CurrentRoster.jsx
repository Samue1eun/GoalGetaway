

const CurrentRoster = () => {
    return (
        <>
        <div className="card bg-base-100 w-full shadow-xl">
            <figure className="px-10 pt-10">
            <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="rounded-xl" />
            </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Current Roster</h2>
              <p>Player 1</p>
              <p>Player 2</p>
              <p>Player 3</p>
          </div>
        </div>
        </>
    )
}

export default CurrentRoster;