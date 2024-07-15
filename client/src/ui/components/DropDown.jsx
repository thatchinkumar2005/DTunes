import React, { cloneElement, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function DropDown({
  ToggleButton,
  children,
  dir,
  className,
  ...props
}) {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  function handleToggle() {
    setOpen((state) => !state);
  }
  return (
    <>
      <ToggleButton onClick={handleToggle} />
      <div ref={dropdownRef} className="relative z-50">
        {isOpen && (
          <div
            className={`p-1 md:p-2 rounded-lg bg-primary absolute ${
              dir === "right" ? "top-0 left-2" : "top-0 right-2"
            } ${className}`}
          >
            {cloneElement(children, { setOpen, isOpen, dropdownRef, ...props })}
          </div>
        )}
      </div>
    </>
  );
}
