

const TopOffensivePlayers = () => {
    return (
        <>
        <div className="card bg-base-100 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-xl">
            <figure className="px-10 pt-10">
            <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="rounded-xl" />
            </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Top 5 Offensive Players Stats</h2>
              <p>Player 1</p>
              <p>Player 2</p>
              <p>Player 3</p>
              <p>Player 4</p>
              <p>Player 5</p>
          {/* <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div> */}
          </div>
        </div>

        </>
    )
}

export default TopOffensivePlayers;