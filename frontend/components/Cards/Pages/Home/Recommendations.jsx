import { useState } from 'react';

const Recommendations = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const cardData = [
        {
            title: 'Events',
            description: ['Event description line 1', 'Event description line 2'],
        },
        {
            title: 'Restaurants',
            description: ['Restaurant description line 1', 'Restaurant description line 2'],
        },
        {
            title: 'Bars',
            description: ['Bar description line 1', 'Bar description line 2'],
        },
        {
            title: 'Hotels',
            description: ['Hotel description line 1', 'Hotel description line 2'],
        },
    ];

    const data = cardData[currentPage];

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
          <h2 className="card-title">{data.title}</h2>
            {data.description.map((desc, index) => (
                <p key={index}>{desc}</p>
            ))}
            <div className="join">
                <button className="join-item btn" onClick={() => setCurrentPage(0)}>1</button>
                <button className="join-item btn" onClick={() => setCurrentPage(1)}>2</button>
                <button className="join-item btn" onClick={() => setCurrentPage(2)}>3</button>
            </div>
          </div>
        </div>
        </>
    )
}

export default Recommendations;