import Nav from "./Nav";
import SideBar from "./SideBar";

export default function Header() {
  return (
    <header className="sticky top-0 mx-auto flex w-full flex-nowrap justify-start border-b-4 border-slate-700 p-[2em] font-bold uppercase text-white bg-slate-950">
      <SideBar />
      <Nav />
    </header>
  );
}
