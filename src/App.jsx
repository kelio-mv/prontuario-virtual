import { useState } from "react";
import HomePage from "./HomePage";
import MainPage from "./MainPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  return (
    <>
      {currentPage === "Home" && <HomePage onAuth={() => setCurrentPage("Main")} />}
      {currentPage === "Main" && <MainPage />}
    </>
  );
}
