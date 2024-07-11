import React, { createContext, useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const ModalContext = createContext();

export default function Modal({ children, ToggleElement, parentOpen = true }) {
  const [isOpen, setOpen] = useState(false);
  function handleToggle() {
    setOpen((state) => !state);
    console.log(isOpen);
  }
  return (
    <ModalContext.Provider value={{ isOpen, setOpen, children }}>
      <ToggleElement onClick={handleToggle} />
      <div className="relative">{isOpen && parentOpen && <ModalWindow />}</div>
    </ModalContext.Provider>
  );
}

function ModalWindow() {
  const { children, setOpen } = useContext(ModalContext);
  function handleClose() {
    setOpen((state) => !state);
  }
  return (
    <div className=" backdrop-blur-sm fixed top-0 bottom-0 left-0 right-0 w-screen h-screen flex flex-col justify-center items-center">
      <div className=" p-5 bg-secondary rounded-lg">
        <div className="flex flex-col mb-2">
          <button onClick={handleClose} className="self-start">
            <RxCross1 />
          </button>
          <div className="h-0.5 border-solid border-b-2"></div>
        </div>

        {children}
      </div>
    </div>
  );
}
