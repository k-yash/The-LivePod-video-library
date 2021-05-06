import "./styles.css";
import { useState } from "react";
import { NavBar } from "./components/Navbar/navbar";
import { MainSection } from "./components/Section/mainsection";
import {toast} from "react-toastify";

toast.configure();
export default function App() {
  const [openBars, setOpenBars] = useState(false);
  return (
    <div className="App">
      <NavBar setOpenBars={setOpenBars} />
      <MainSection setOpenBars={setOpenBars} openBars={openBars} />
    </div>
  );
}
