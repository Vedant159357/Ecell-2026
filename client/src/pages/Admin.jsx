import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2 } from "lucide-react";
import Skeleton from "@/components/Skeleton";

/* Simple modal component (inline for admin use) */
function Modal({ open, setOpen, title, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={() => setOpen(false)} className="text-gray-400">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const SECTIONS = ["Overview", "Events", "Team", "Guests", "Faculty"];
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Admin() {
  const [activeSection, setActiveSection] = useState("Overview");

  const [events, setEvents] = useState([]);
  const [team, setTeam] = useState([]);
  const [guests, setGuests] = useState([]);
  const [faculty, setFaculty] = useState([]);

  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEntity, setModalEntity] = useState(null); // "event" | "team" | "guest" | "faculty"
  const [formData, setFormData] = useState({});

  // --------- FETCH ALL DATA ON LOAD ----------
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${API_URL}/events`),
      axios.get(`${API_URL}/team`),
      axios.get(`${API_URL}/guests`),
      axios.get(`${API_URL}/faculty`),
    ])
      .then(([eventsRes, teamRes, guestsRes, facultyRes]) => {
        setEvents(eventsRes.data || []);
        setTeam(teamRes.data || []);
        setGuests(guestsRes.data || []);
        setFaculty(facultyRes.data || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // ---------- OPEN MODAL HELPERS ----------
  const openModalFor = (entity, initial = {}) => {
    setModalEntity(entity);
    setFormData(initial);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ---------- SUBMIT HANDLER ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalEntity === "event") {
        const res = await axios.post(`${API_URL}/events`, {
          title: formData.title,
          description: formData.description,
          shortDescription: formData.shortDescription,
          banner: formData.banner,
          date: formData.date,
          price: Number(formData.price) || 0,
          isUpcoming: formData.isUpcoming === "true",
        });
        setEvents((prev) => [res.data, ...prev]);
      }

      if (modalEntity === "team") {
        const res = await axios.post(`${API_URL}/team`, {
          name: formData.name,
          role: formData.role,
          image: formData.image,
          linkedin: formData.linkedin,
          instagram: formData.instagram,
          github: formData.github,
        });
        setTeam((prev) => [res.data, ...prev]);
      }

      if (modalEntity === "guest") {
        const res = await axios.post(`${API_URL}/guests`, {
          name: formData.name,
          role: formData.role,
          image: formData.image,
          linkedin: formData.linkedin,
          instagram: formData.instagram,
          website: formData.website,
          description: formData.description,
        });
        setGuests((prev) => [res.data, ...prev]);
      }

      if (modalEntity === "faculty") {
        const res = await axios.post(`${API_URL}/faculty`, {
          name: formData.name,
          title: formData.title,
          department: formData.department,
          image: formData.image,
        });
        setFaculty((prev) => [res.data, ...prev]);
      }

      setModalOpen(false);
      setFormData({});
    } catch (err) {
      console.log(err);
      alert("Error saving data");
    }
  };

  // ---------- DELETE HANDLERS ----------
  const deleteItem = async (entity, id) => {
    if (!confirm("Are you sure you want to delete this?")) return;

    try {
      if (entity === "event") {
        await axios.delete(`${API_URL}/events/${id}`);
        setEvents((prev) => prev.filter((e) => e._id !== id));
      }
      if (entity === "team") {
        await axios.delete(`${API_URL}/team/${id}`);
        setTeam((prev) => prev.filter((m) => m._id !== id));
      }
      if (entity === "guest") {
        await axios.delete(`${API_URL}/guests/${id}`);
        setGuests((prev) => prev.filter((g) => g._id !== id));
      }
      if (entity === "faculty") {
        await axios.delete(`${API_URL}/faculty/${id}`);
        setFaculty((prev) => prev.filter((f) => f._id !== id));
      }
    } catch (err) {
      console.log(err);
      alert("Error deleting item");
    }
  };

  // ---------- RENDER HELPERS PER SECTION ----------

  const renderOverview = () => (
    <div className="grid md:grid-cols-4 gap-6">
      <Card className="p-6 bg-[#0b0b0b] border-white/10">
        <h3 className="text-sm text-gray-400">Total Events</h3>
        <p className="text-3xl font-bold mt-2 text-[#00eaff]">
          {events.length}
        </p>
      </Card>
      <Card className="p-6 bg-[#0b0b0b] border-white/10">
        <h3 className="text-sm text-gray-400">Team Members</h3>
        <p className="text-3xl font-bold mt-2 text-[#00eaff]">{team.length}</p>
      </Card>
      <Card className="p-6 bg-[#0b0b0b] border-white/10">
        <h3 className="text-sm text-gray-400">Guest Speakers</h3>
        <p className="text-3xl font-bold mt-2 text-[#00eaff]">
          {guests.length}
        </p>
      </Card>
      <Card className="p-6 bg-[#0b0b0b] border-white/10">
        <h3 className="text-sm text-gray-400">Faculty Advisors</h3>
        <p className="text-3xl font-bold mt-2 text-[#00eaff]">
          {faculty.length}
        </p>
      </Card>
    </div>
  );

  const renderEvents = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Events</h2>
        <Button
          className="flex items-center gap-2 bg-[#00eaff] text-black hover:bg-[#0ff]"
          onClick={() => openModalFor("event")}
        >
          <Plus size={18} />
          Add Event
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-40 w-full rounded-xl bg-white/10" />
      ) : events.length === 0 ? (
        <p className="text-gray-400">No events added yet.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <Card
              key={event._id}
              className="p-4 bg-[#101010] border-white/10 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-400">
                  {event.shortDescription || "No short description"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {event.isUpcoming ? "Upcoming Event" : "Past / General Event"}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  className="border border-white/10 px-3 py-1"
                >
                  <Edit2 size={16} />
                </Button>
                <Button
                  variant="ghost"
                  className="border border-red-500/40 px-3 py-1 text-red-400 hover:bg-red-500/10"
                  onClick={() => deleteItem("event", event._id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );

  const renderTeam = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Team Members</h2>
        <Button
          className="flex items-center gap-2 bg-[#00eaff] text-black hover:bg-[#0ff]"
          onClick={() => openModalFor("team")}
        >
          <Plus size={18} />
          Add Member
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-40 w-full rounded-xl bg-white/10" />
      ) : team.length === 0 ? (
        <p className="text-gray-400">No team members added yet.</p>
      ) : (
        <div className="space-y-4">
          {team.map((member) => (
            <Card
              key={member._id}
              className="p-4 bg-[#101010] border-white/10 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-[#00eaff]">{member.role}</p>
              </div>
              <Button
                variant="ghost"
                className="border border-red-500/40 px-3 py-1 text-red-400 hover:bg-red-500/10"
                onClick={() => deleteItem("team", member._id)}
              >
                <Trash2 size={16} />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </>
  );

  const renderGuests = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Guest Speakers</h2>
        <Button
          className="flex items-center gap-2 bg-[#00eaff] text-black hover:bg-[#0ff]"
          onClick={() => openModalFor("guest")}
        >
          <Plus size={18} />
          Add Guest
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-40 w-full rounded-xl bg-white/10" />
      ) : guests.length === 0 ? (
        <p className="text-gray-400">No guests added yet.</p>
      ) : (
        <div className="space-y-4">
          {guests.map((guest) => (
            <Card
              key={guest._id}
              className="p-4 bg-[#101010] border-white/10 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{guest.name}</h3>
                <p className="text-sm text-[#00eaff]">{guest.role}</p>
              </div>
              <Button
                variant="ghost"
                className="border border-red-500/40 px-3 py-1 text-red-400 hover:bg-red-500/10"
                onClick={() => deleteItem("guest", guest._id)}
              >
                <Trash2 size={16} />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </>
  );

  const renderFaculty = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Faculty Advisors</h2>
        <Button
          className="flex items-center gap-2 bg-[#00eaff] text-black hover:bg-[#0ff]"
          onClick={() => openModalFor("faculty")}
        >
          <Plus size={18} />
          Add Faculty
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-40 w-full rounded-xl bg-white/10" />
      ) : faculty.length === 0 ? (
        <p className="text-gray-400">No faculty added yet.</p>
      ) : (
        <div className="space-y-4">
          {faculty.map((prof) => (
            <Card
              key={prof._id}
              className="p-4 bg-[#101010] border-white/10 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{prof.name}</h3>
                <p className="text-sm text-[#00eaff]">{prof.title}</p>
                <p className="text-xs text-gray-400">{prof.department}</p>
              </div>
              <Button
                variant="ghost"
                className="border border-red-500/40 px-3 py-1 text-red-400 hover:bg-red-500/10"
                onClick={() => deleteItem("faculty", prof._id)}
              >
                <Trash2 size={16} />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </>
  );

  // ---------- RENDER MODAL CONTENT PER ENTITY ----------
  const renderModalContent = () => {
    if (!modalEntity) return null;

    if (modalEntity === "event") {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            placeholder="Event Title"
            value={formData.title || ""}
            onChange={handleChange}
          />
          <Input
            name="shortDescription"
            placeholder="Short Description"
            value={formData.shortDescription || ""}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Full Description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full rounded-md bg-black/40 border border-white/10 text-white p-3 focus:outline-none focus:ring-2 focus:ring-[#00eaff]"
          />
          <Input
            name="banner"
            placeholder="Banner Image URL"
            value={formData.banner || ""}
            onChange={handleChange}
          />
          <Input
            name="date"
            type="date"
            value={formData.date || ""}
            onChange={handleChange}
          />
          <Input
            name="price"
            type="number"
            placeholder="Price (₹)"
            value={formData.price || ""}
            onChange={handleChange}
          />
          <select
            name="isUpcoming"
            value={formData.isUpcoming || "false"}
            onChange={handleChange}
            className="w-full rounded-md bg-black/40 border border-white/10 text-white p-2"
          >
            <option value="false">Regular / Past Event</option>
            <option value="true">Mark as Upcoming Event</option>
          </select>

          <Button
            type="submit"
            className="w-full bg-[#00eaff] text-black hover:bg-[#0ff]"
          >
            Save Event
          </Button>
        </form>
      );
    }

    if (modalEntity === "team") {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Name"
            value={formData.name || ""}
            onChange={handleChange}
          />
          <Input
            name="role"
            placeholder="Role"
            value={formData.role || ""}
            onChange={handleChange}
          />
          <Input
            name="image"
            placeholder="Profile Image URL"
            value={formData.image || ""}
            onChange={handleChange}
          />
          <Input
            name="linkedin"
            placeholder="LinkedIn URL"
            value={formData.linkedin || ""}
            onChange={handleChange}
          />
          <Input
            name="instagram"
            placeholder="Instagram URL"
            value={formData.instagram || ""}
            onChange={handleChange}
          />
          <Input
            name="github"
            placeholder="GitHub URL"
            value={formData.github || ""}
            onChange={handleChange}
          />

          <Button
            type="submit"
            className="w-full bg-[#00eaff] text-black hover:bg-[#0ff]"
          >
            Save Member
          </Button>
        </form>
      );
    }

    if (modalEntity === "guest") {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Guest Name"
            value={formData.name || ""}
            onChange={handleChange}
          />
          <Input
            name="role"
            placeholder="Role / Designation"
            value={formData.role || ""}
            onChange={handleChange}
          />
          <Input
            name="image"
            placeholder="Profile Image URL"
            value={formData.image || ""}
            onChange={handleChange}
          />
          <Input
            name="linkedin"
            placeholder="LinkedIn URL"
            value={formData.linkedin || ""}
            onChange={handleChange}
          />
          <Input
            name="instagram"
            placeholder="Instagram URL"
            value={formData.instagram || ""}
            onChange={handleChange}
          />
          <Input
            name="website"
            placeholder="Website URL"
            value={formData.website || ""}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Short Description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full rounded-md bg-black/40 border border-white/10 text-white p-3 focus:outline-none focus:ring-2 focus:ring-[#00eaff]"
          />

          <Button
            type="submit"
            className="w-full bg-[#00eaff] text-black hover:bg-[#0ff]"
          >
            Save Guest
          </Button>
        </form>
      );
    }

    if (modalEntity === "faculty") {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Name"
            value={formData.name || ""}
            onChange={handleChange}
          />
          <Input
            name="title"
            placeholder="Title (e.g. Faculty Coordinator)"
            value={formData.title || ""}
            onChange={handleChange}
          />
          <Input
            name="department"
            placeholder="Department"
            value={formData.department || ""}
            onChange={handleChange}
          />
          <Input
            name="image"
            placeholder="Profile Image URL"
            value={formData.image || ""}
            onChange={handleChange}
          />

          <Button
            type="submit"
            className="w-full bg-[#00eaff] text-black hover:bg-[#0ff]"
          >
            Save Faculty
          </Button>
        </form>
      );
    }

    return null;
  };

  // ---------- MAIN RENDER ----------

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20">
      <div className="max-w-7xl mx-auto flex">
        {/* SIDEBAR */}
        <aside className="w-56 border-r border-white/10 bg-black/40 min-h-[calc(100vh-5rem)] hidden md:block">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              Admin <span className="text-[#00eaff]">Dashboard</span>
            </h2>
            <nav className="space-y-2">
              {SECTIONS.map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm ${activeSection === sec
                      ? "bg-[#00eaff]/20 text-[#00eaff]"
                      : "text-gray-300 hover:bg-white/5"
                    }`}
                >
                  {sec}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {activeSection === "Overview" && renderOverview()}
            {activeSection === "Events" && renderEvents()}
            {activeSection === "Team" && renderTeam()}
            {activeSection === "Guests" && renderGuests()}
            {activeSection === "Faculty" && renderFaculty()}
          </motion.div>
        </main>
      </div>

      {/* MODAL */}
      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        title={
          modalEntity === "event"
            ? "Add Event"
            : modalEntity === "team"
              ? "Add Team Member"
              : modalEntity === "guest"
                ? "Add Guest"
                : modalEntity === "faculty"
                  ? "Add Faculty"
                  : ""
        }
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}
