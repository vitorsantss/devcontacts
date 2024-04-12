/* eslint-disable no-unused-vars */
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import { useState } from "react";


const Home = () => {
  
  return (
    <div className="min-h-[89vh] flex flex-col">
      <Header />
      <Gallery />
    </div>
  );
};

export default Home;
