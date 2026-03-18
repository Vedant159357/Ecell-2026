import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegistrationPopup({ open, setOpen, event }) {
  if (!event) return null;

  return (
    <Dialog
      trigger={
        <Button className="bg-[#00eaff] text-black hover:bg-[#0ff]">
          Register
        </Button>
      }
    >
      <div className="text-white">
        <h2 className="text-2xl font-semibold mb-4">
          Register for {event.title}
        </h2>

        <Input placeholder="Your Name" className="mb-3" />
        <Input placeholder="Your Email" className="mb-3" />
        <Input placeholder="Phone Number" className="mb-3" />

        <Button
          className="w-full mt-4 bg-[#00eaff] text-black hover:bg-[#0ff]"
          onClick={() => {
            alert("Registration details submitted!");
            setOpen(false);
          }}
        >
          Proceed to Payment
        </Button>
      </div>
    </Dialog>
  );
}
