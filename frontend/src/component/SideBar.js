"use client";

import { useState, useEffect, useRef } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards, HiMenuAlt2 } from "react-icons/hi";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="p-2 focus:outline-none z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiMenuAlt2 className="w-6 h-6 text-white" />
      </button>
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-1/3 h-full bg-slate-900 text-white transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} z-999`}
      >
        <Sidebar aria-label="Sidebar">
          <Sidebar.Items className="flex flex-col p-4">
            <Sidebar.ItemGroup className="text-left">
              <Sidebar.Item href="#" icon={HiChartPie}>
                Squat
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiViewBoards}>
                Deadlift
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiInbox}>
                Bench Press
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiUser}>
                Dumbbell Press
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiShoppingBag}>
                Overhead Press
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiArrowSmRight}>
                Leg Press
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiTable}>
                Leg Extension
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </>
  );
}
