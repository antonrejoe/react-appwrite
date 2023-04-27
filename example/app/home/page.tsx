import React from "react";
import Home from "../../components/Home";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
function page() {
  return (
    <>
      <Navbar />

      <div>
        <Sidebar />
        <Home />
      </div>
    </>
  );
}

export default page;
