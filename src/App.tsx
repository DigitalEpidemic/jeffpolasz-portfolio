import React from "react";
import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Resume } from "./pages/Resume";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default App;
