import EditEventForm from "../../components/Forms/EventForm/EditEventForm";
import eventPicture from "../../assets/event_pic.jpg";

const EditEvent = () => {

    return (
        <>
            <div
            className="hero flex justify-center justify-items-center min-h-screen w-full"
            style={{ backgroundImage: `url(${eventPicture})` }}
            >
                <div className="hero-overlay justify-center justify-items-center w-full p-4 bg-transparent">
                    <div className="hero-content flex flex-col items-center">
                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <div className="w-full p-4 flex justify-center">
                                <EditEventForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditEvent;