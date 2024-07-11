import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function DropDown({ ToggleButton, children }) {
  const dropdownRef = useRef();

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleToggle() {
    setOpen(!isOpen);
  }
  return (
    <div ref={dropdownRef} className="relative flex flex-col">
      <ToggleButton onClick={handleToggle} className="h-5 w-5" />
      {isOpen && (
        <div className="p-2 rounded-lg bg-primary absolute top-5 left-2">
          {children}
        </div>
      )}
    </div>
  );
}
