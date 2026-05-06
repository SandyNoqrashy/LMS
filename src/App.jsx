import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Core/Dashboard/Dashboard";
import Timeline from "./pages/Core/Timeline/Timeline";
import AIAssistant from "./pages/Engagement/AIAssistant/AIAssistant";
import Community from "./pages/Engagement/Community/Community";
import FAQs from "./pages/HelpSupport/FAQs/FAQs";
import Support from "./pages/HelpSupport/Support/Support";
import GraduationProject from "./pages/Learning/GraduationProject/GraduationProject"; 
import LiveSessions from "./pages/Learning/LiveSessions/LiveSessions";
import Tasksmaterials from "./pages/Learning/TasksMaterials/TaskMaterials";
import Nav from "./Components/Nav/Nav";
const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Timeline" element={<Timeline/>} />
        <Route path="/AIassistant" element={<AIAssistant/>} />
        <Route path="/Community" element={<Community />} />
        <Route path="/FAQs" element={<FAQs />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/GraduationProject" element={<GraduationProject />} />
        <Route path="/LiveSessions" element={<LiveSessions/>} />
        <Route path="/TasksMaterials" element={<tasksmaterials />} />
        
      </Routes>
    </div>
  );
};

export default App;
