// components/cards/EventList.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEvents, deleteEvent } from "../../../../src/app/utilities";

const EventList = () => {
    const [events, setEvents] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getAllEvents();
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        try {
            await deleteEvent(eventId);
            setEvents(events.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="card glass w-96">
                    <div className="card-body">
                        <h2 className="card-title">My Events</h2>
                        <button 
                            className="btn btn-primary mb-4" 
                            onClick={() => navigate('/myevents/create')}
                        >
                            Create New Event
                        </button>
                        {events && events.map((event) => (
                            <div key={event.id} className="collapse collapse-arrow bg-base-200 mb-2">
                                <input type="checkbox" /> 
                                <div className="collapse-title text-xl font-medium">
                                    {event.name}
                                </div>
                                <div className="collapse-content">
                                    <p>Date: {event.date}</p>
                                    <p>Location: {event.location}</p>
                                    <p>Game: {event.game_of_the_day}</p>
                                    <p>Description: {event.description}</p>
                                    <div className="card-actions justify-end mt-4">
                                        <button 
                                            onClick={() => navigate(`/myevents/edit/${event.id}`)}
                                            className="btn btn-sm btn-primary"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(event.id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventList;