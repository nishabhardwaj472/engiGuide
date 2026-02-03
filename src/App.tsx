import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { Navbar } from "@/components/layout/Navbar";

import Landing from "@/pages/Landing";
import Onboarding from "@/pages/Onboarding";

import JustPass from "@/pages/Just-pass/justPass";
import CgpaSubjects from "@/pages/cgpa-subjects/cgpaSubjects";

import Dashboard from "@/pages/Dashboard";
import AICompanion from "@/pages/AICompanion";
import Career from "@/pages/Career";

const AppLayout = () => {
  const location = useLocation();

  // ✅ Navbar ONLY on landing page
  const showNavbar = location.pathname === "/";

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Goals */}
        <Route path="/just-pass" element={<JustPass />} />
        <Route path="/cgpa-subjects" element={<CgpaSubjects />} />
        <Route path="/placements" element={<Dashboard />} />

        {/* Other pages */}
        <Route path="/ai-companion" element={<AICompanion />} />
        <Route path="/career" element={<Career />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
