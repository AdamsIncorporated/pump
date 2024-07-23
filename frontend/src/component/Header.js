import Nav from "./Nav";
import SideBar from "./SideBar";

export default function Header() {
  return (
    <header className="sticky top-0 mx-auto flex w-full flex-nowrap items-center justify-start bg-inherit border-b-4 border-slate-600 bg-slate-950 p-[2em] font-bold uppercase text-white dark:border-gray-800 dark:bg-d-background dark:text-d-text-primary">
      <SideBar />
      <Nav />
    </header>
  );
}
