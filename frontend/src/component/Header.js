import Nav from "./Nav";

export const Header = () => {
  return (
    <header className="sticky top-0 z-[1] mx-auto flex w-full flex-nowrap items-center justify-start bg-inherit border-b-4 border-slate-600 bg-slate-950 p-[2em] font-bold uppercase text-white backdrop-blur-[100px] dark:border-gray-800 dark:bg-d-background dark:text-d-text-primary">
      <Nav />
    </header>
  );
};

export default Header;