import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { scroller } from "react-scroll";
import Navbar from "./components/navbar/Navbar";
import { Home } from "./pages/Home";
import { Resume } from "./pages/Resume";

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as {
      target?: string;
      isMobile?: boolean;
    };

    if (state?.target) {
      setTimeout(() => {
        scroller.scrollTo(state?.target ?? "", {
          duration: 400,
          smooth: "easeInOutQuint",
          offset: -61,
          ignoreCancelEvents: true,
        });

        navigate(location.pathname, { replace: true, state: {} });
      }, 300);
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar sticky />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" key={location.key} element={<Resume />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default App;
