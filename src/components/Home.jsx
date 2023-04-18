import React from "react";
import "./assets/styles/baselayout.css";
import Nav from "../components/sub-components/Nav";
import Footer from "./sub-components/Footer";
import GetKino from "./sub-components/GetKino";

export default function Home() {
  return (
    <>
      <div className="">
        <Nav />
        <div className="">
          <body>
        <GetKino />
          </body>
        </div>
        <Footer />
      </div>
    </>
  );
}
