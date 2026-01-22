import { useState } from "react";

export function Dialog({ trigger, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>

      {open && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-black border border-white/10 rounded-xl p-6 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
