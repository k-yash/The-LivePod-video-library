import "./styles.css";
import { useState } from "react";
import { NavBar } from "./components/navbar";
import { MainSection } from "./components/mainsection";

export default function App() {
  const [openBars, setOpenBars] = useState(false);
  return (
    <div className="App">
      <NavBar setOpenBars={setOpenBars} />
      <MainSection setOpenBars={setOpenBars} openBars={openBars} />
    </div>
  );
}
