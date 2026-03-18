import { useEffect, useState } from "react";
import axios from "axios";
import RegistrationPopup from "@/components/RegistrationPopup";
import Loader from "@/components/Loader";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function UpcomingEvent() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch upcoming event from backend
  useEffect(() => {
    axios
      .get(`${API_URL}/events/upcoming`)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // While Loading
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader />
      </div>
    );

  // No event found in backend
  if (!event)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 pt-32 text-center">
        <h2 className="text-2xl text-gray-400">
          No upcoming event has been announced yet.
        </h2>
      </div>
    );

  // Event exists → Show details
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 pt-32">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold">{event.title}</h1>

        <p className="text-gray-400 mt-4">{event.description}</p>

        <div className="mt-8 flex justify-center">
          <RegistrationPopup event={event} />
        </div>
      </div>
    </div>
  );
}
