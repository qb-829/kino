// This Home.jsx imports additional components to make up the Home page.

import React from "react";
import "./assets/styles/baselayout.css";
import Nav from "../components/sub-components/Nav";
import Footer from "./sub-components/Footer";
import Getkino from "./sub-components/Getkino";

export default function Home() {
  return (
    <>
      <div >
        <Nav />
        <div >
          <body>
        <Getkino />
          </body>
        </div>
        <Footer />
      </div>
    </>
  );
}
