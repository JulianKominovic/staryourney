import React from "react";
import { Button } from "../ui/button";
import { Sidebar } from "@phosphor-icons/react";
import useUI from "@/stores/ui";

type Props = {};

const Navbar = (props: Props) => {
  const toggleSidebarOpen = useUI((state) => state.toggleSidebarOpen);
  return (
    <nav
      data-tauri-drag-region
      className="fixed flex items-center top-0 left-0 w-full h-[48px]"
    >
      <Button
        onClick={toggleSidebarOpen}
        variant={"ghost"}
        className="p-0 ml-20 text-lg w-7 h-7"
      >
        <Sidebar />
      </Button>
    </nav>
  );
};

export default Navbar;
