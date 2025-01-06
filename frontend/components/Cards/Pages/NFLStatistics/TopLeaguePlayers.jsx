import React from "react";

const TopQuarterbacks = ({ qbs }) => {
  return (
    <div className="card bg-base-100 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Top Quarterbacks"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Top 5 Quarterbacks</h2>
        {qbs && qbs.length > 0 ? (
          qbs.map((playerItem, index) => (
            <p key={index}>
              {playerItem.player.first_name} {playerItem.player.last_name}
              {" - "}
              {playerItem.player.position_abbreviation} 
            </p>
          ))
        ) : (
          <p>No QBs found.</p>
        )}
      </div>
    </div>
  );
};

export default TopQuarterbacks;
