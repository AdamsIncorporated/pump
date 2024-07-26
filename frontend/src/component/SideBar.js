import React, { useState, useRef, useEffect } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const sidebarButtonRef = useRef(null);

  const handleButtonClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      sidebarButtonRef.current &&
      !sidebarButtonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Toggle button visibility based on sidebar state
    if (isOpen) {
      sidebarButtonRef.current.style.opacity = '0';
    } else {
      sidebarButtonRef.current.style.opacity = '1';
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={sidebarButtonRef}
        className="p-2 focus:outline-none z-20 transition-opacity duration-300"
        onClick={handleButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6">
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        ref={sidebarRef}
        className={`z-10 fixed top-0 left-0 w-1/4 h-full bg-slate-900 text-white transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4 mt-10 h-screen max-h-fit">
          <h2 className="text-2xl font-semibold mb-4">Lifts</h2>
          <div className='overflow-y-auto h-3/4'>
            <div className='border-y border-slate-500 '>
              <div className='my-4 text-1xl'>Arms</div>
              <ul className="space-y-2">
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Bench Press</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Incline Bench</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Decline Bench</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Overhead Press</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Dumbell Bench Press</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Dumbell Tricep</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Barbell Curl</a></li>
              </ul>
            </div>
            <div className='border-y border-slate-500'>
              <div className='my-4 text-1xl'>Legs</div>
              <ul className="space-y-2">
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Squat</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Hack Squat</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Belt Squat</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Split Squat</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Calf Raises</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Leg Curl</a></li>
              </ul>
            </div>
            <div className='border-y border-slate-500'>
              <div className='my-4 text-1xl'>Back</div>
              <ul className="space-y-2">
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Deadlift</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">T-Bar Row</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Lat Pulldown</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Bent-Over Row</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-slate-700 rounded duration-300 ease-in-out transform hover:text-orange-500">Weighted Plank</a></li>
              </ul>
            </div>
          </div>
          {isOpen && (
            <div className='my-5 flex justify-end'>
              <button
                className="p-2 focus:outline-none duration-300 ease-in-out transform hover:text-orange-500"
                onClick={handleButtonClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
