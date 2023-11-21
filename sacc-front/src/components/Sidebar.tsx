import { useState } from "react";
import logo from "../logo.svg";

function Sidebar({ setSelectedMenu }: { setSelectedMenu: Function }) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (label: string) => {
    setSelectedMenu(label);
    setSelectedItem(label);
  };

  return (
    <main className="w-[17%] h-full bg-blue-700">
      <header className="w-full h-1/6 bg-blue-500 flex items-center justify-center">
        <img src={logo} className="h-1/3" alt="logo" />
        <h1 className="text-center text-white text-3xl">SACC Panel</h1>
      </header>
      <article className="h-[78%]  flex flex-col items-center justify-center gap-4">
        <SidebarItem
          label="Locker Stations"
          selected={selectedItem === "Locker Stations"}
          onClick={handleItemClick}
        />
        <SidebarItem
          label="Locker States"
          selected={selectedItem === "Locker States"}
          onClick={handleItemClick}
        />
        <SidebarItem
          label="Dashboards"
          selected={selectedItem === "Dashboards"}
          onClick={handleItemClick}
        />
        <SidebarItem
          label="Reservations"
          selected={selectedItem === "Reservations"}
          onClick={handleItemClick}
        />
      </article>
      <footer className="w-full h-[5%] bg-blue-500 flex items-center justify-end p-5">
        <h1 className="text-center text-white text-3xl">Settings</h1>
      </footer>
    </main>
  );
}

function SidebarItem({
  label,
  selected,
  onClick,
  ...props
}: {
  label: string;
  selected: boolean;
  onClick: (label: string) => void;
}) {
  return (
    <button
      className={`w-[75%] h-[10%] rounded-md bg-blue-500 flex items-center justify-center ${
        selected ? "bg-blue-300" : ""
      }`}
      onClick={() => onClick(label)}
      {...props}
    >
      <h1 className="text-center text-white text-3xl">{label}</h1>
    </button>
  );
}

export default Sidebar;
