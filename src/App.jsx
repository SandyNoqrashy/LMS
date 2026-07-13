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
import Security from "./pages/Settings/Security/Security";
import LanguageSettings from "./pages/Settings/Language/Language";
import NotificationsSettings from "./pages/Settings/Notifications/Notifications";
import AccountDetails from "./pages/Settings/AccountDetails/AccountDetails";
import Sidebar from "./Components/sidebar/Sidebar";
const App = () => {
  return (
  <div className="flex w-full min-h-screen bg-[#FAFBFF] overflow-x-hidden">
      
      {/* السايد بار هيظهر في كل الصفحات ما عدا صفحة الـ Login */}
      <Sidebar />
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
        <Route path="/Assignment" element={<Tasksmaterials />} />
        <Route path="/security" element={<Security />} />
        <Route path="/language" element={<LanguageSettings />} />
        <Route path="/notifications" element={<NotificationsSettings />} />
        <Route path="/account-details" element={<AccountDetails />} />

      </Routes>
    </div>
  );
};

export default App;
