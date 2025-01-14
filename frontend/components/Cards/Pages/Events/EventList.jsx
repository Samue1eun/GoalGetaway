import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEvents, deleteEvent } from "../../../../src/app/utilities";

const EventList = () => {
    const [events, setEvents] = useState([]);  // Initialize as empty array instead of null
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getAllEvents();
                console.log('Fetched events:', response); // Add this
                // Check if response.data exists and is an array
                if (response.data && Array.isArray(response.data)) {
                    setEvents(response.data);
                } else {
                    console.error('Events data is not in expected format:', response);
                    setEvents([]); // Set to empty array if data is invalid
                }
            } catch (error) {
                console.error('Error fetching events:', error);
                setEvents([]); // Set to empty array on error
            }
        };
        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        try {
            await deleteEvent(eventId);
            setEvents(prev => prev.filter(event => event.id !== eventId));
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
                        {Array.isArray(events) && events.length > 0 ? (
                            events.map((event) => (
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
                            ))
                        ) : (
                            <p>No events found. Create a new event to get started!</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventList;