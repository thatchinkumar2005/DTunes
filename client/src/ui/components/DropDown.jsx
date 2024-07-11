import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function DropDown({ ToggleButton, children, dir }) {
  const dropdownRef = useRef();

  const [isOpen, setOpen] = useState(false);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  function handleToggle() {
    setOpen((state) => !state);
  }
  return (
    <>
      <ToggleButton onClick={handleToggle} />
      <div ref={dropdownRef} className="relative flex flex-col">
        {isOpen && (
          <div
            className={`p-0.5 md:p-2 rounded-lg bg-primary absolute  ${
              dir === "right" ? "top-5 left-2" : "top-5 right-2"
            }`}
          >
            {children}
          </div>
        )}
      </div>
    </>
  );
}
