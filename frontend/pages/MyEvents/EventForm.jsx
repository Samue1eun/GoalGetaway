// components/forms/EventForm/EventForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../src/app/utilities";

const EventForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [gameOfTheDay, setGameOfTheDay] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = {
            'name': name,
            'date': date,
            'location': location,
            'game_of_the_day': gameOfTheDay,
            'description': description
        };
        try {
            await createEvent(formData);
            navigate('/myevents/');
        } catch (error) {
            console.error('Error in "EventForm.jsx": ', error.message);
        }
    };

    const handleCancelClick = () => {
        navigate('/myevents/')
    }

    return (
        <>
            <form type="submit" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="card glass w-96">
                        <div className="card-body">
                            <h2 className="card-title">Create New Event</h2>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    <path d="M12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Event Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7ZM4 6h8v1H4V6Zm8 2H4v1h8V8Zm-8 2h8v1H4v-1Z" />
                                </svg>
                                <input
                                    type="date"
                                    className="grow"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path d="M8 0a5 5 0 0 1 5 5c0 2.761-2.239 5-5 5S3 7.761 3 5a5 5 0 0 1 5-5zM0 13.5c0-2.209 2.686-4 6-4s6 1.791 6 4V16H0v-2.5z" />
                                </svg>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1 0-1h6z" />
                                </svg>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Game of the Day"
                                    value={gameOfTheDay}
                                    onChange={(e) => setGameOfTheDay(e.target.value)}
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" type="button" onClick={handleCancelClick}>Cancel</button>
                                <button className="btn btn-primary" type="submit">Create Event</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EventForm;