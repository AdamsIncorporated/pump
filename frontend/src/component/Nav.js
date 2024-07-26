import { Navbar } from "flowbite-react";

const Nav = () => {
  return (
    <Navbar fluid rounded className="flex-auto !bg-slate-950">
      <Navbar.Brand href="/">
        <span className="whitespace-nowrap text-2xl font-semibold">💪 Pump</span>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Nav;
