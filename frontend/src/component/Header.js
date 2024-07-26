import Nav from "./Nav";
import SideBar from "./SideBar";

export default function Header() {
  return (
    <header className="sticky top-0 mx-auto flex w-full flex-nowrap justify-start border-b-4 border-slate-600 p-[2em] font-bold uppercase text-white">
      <SideBar />
      <Nav />
    </header>
  );
}
