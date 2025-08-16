// src/layouts/PublicLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header"; // adjust path to where Header is
import Footer from "../components/Footer"; // optional

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* renders the child route */}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
