

const MyUpcomingEvents = () => {
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
            <h2 className="card-title">My Upcoming Events</h2>
              <p>Date</p>
              <p>Time</p>
              <p>Location</p>
              <p>Description</p>
          </div>
        </div>
        </>
    )
}

export default MyUpcomingEvents;