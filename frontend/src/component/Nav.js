import { Navbar } from "flowbite-react";

const Nav = () => {
  return (
    <Navbar fluid rounded className="flex-auto">
      <Navbar.Brand href="/">
        <span className="align-bottom whitespace-nowrap text-2xl font-semibold dark:text-white">💪 Pump</span>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Nav;
