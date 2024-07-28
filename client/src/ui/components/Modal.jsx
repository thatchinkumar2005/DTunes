import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { RxCross1 } from "react-icons/rx";

const ModalContext = createContext();

export default function Modal({
  children,
  ToggleElement,
  className,
  ...props
}) {
  const [isOpen, setOpen] = useState(false);
  function handleToggle() {
    setOpen((state) => !state);
  }

  const modalRef = useRef();
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef?.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <ModalContext.Provider
      value={{ isOpen, setOpen, children, modalRef, ...props }}
    >
      <ToggleElement onClick={handleToggle} />
      <div className="relative z-50">
        {isOpen && <ModalWindow className={className} />}
      </div>
    </ModalContext.Provider>
  );
}

function ModalWindow({ className }) {
  const { children, setOpen, isOpen, modalRef, ...props } =
    useContext(ModalContext);
  function handleClose() {
    setOpen((state) => !state);
  }
  return (
    <div
      className={`backdrop-blur-sm fixed top-0 bottom-0 left-0 right-0 w-screen h-screen flex flex-col justify-center items-center`}
    >
      <div
        ref={modalRef}
        className={` p-5 bg-secondary rounded-lg absolute ${className}`}
      >
        <div className="flex flex-col mb-2">
          <button onClick={handleClose} className="self-start">
            <RxCross1 />
          </button>
          <div className="h-0.5 border-solid border-b-2"></div>
        </div>

        {cloneElement(children, { setOpen, isOpen, ...props })}
      </div>
    </div>
  );
}
