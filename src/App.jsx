import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Core/Dashboard/Dashboard";
import Timeline from "./pages/Core/Timeline/Timeline";
import AIAssistant from "./pages/Engagement/AIAssistant/AIAssistant";
import FAQs from "./pages/HelpSupport/FAQs/FAQs";
import Support from "./pages/HelpSupport/Support/Support";
import GraduationProject from "./pages/Learning/GraduationProject/GraduationProject";
import LiveSessions from "./pages/Learning/LiveSessions/LiveSessions";
import Security from "./pages/Settings/Security/Security";
import Sidebar from "./Components/Sidebar/Sidebar";
import LanguageSettings from "./pages/Settings/Language/Language";
import NotificationsSettings from "./pages/Settings/Notifications/Notifications";
import AccountDetails from "./pages/Settings/AccountDetails/AccountDetails";
import Assignment from "./pages/Learning/Assignment/Assignment";
import { AuthProvider } from "./Components/Context/Context";
import SessionDetails from "./pages/Learning/SessionDetails/SessionDetails";
import SubmitProblem from "./pages/HelpSupport/Support/SubmitProblem";
import MainLayout from "./Components/mainLayout/MainLayout";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
    const location = useLocation();
  return (
    <AuthProvider>
  <div className="flex w-full min-h-screen bg-[#FAFBFF] overflow-x-hidden">
      
      {/* السايد بار هيظهر في كل الصفحات ما عدا صفحة الـ Login */}
        {location.pathname !== "/" && <Sidebar />}
   <Routes>
  <Route path="/" element={<Login />} />

  <Route element={<MainLayout />}>
    <Route path="/Dashboard" element={<Dashboard />} />
    <Route path="/Timeline" element={<Timeline />} />
    <Route path="/AIassistant" element={<AIAssistant />} />
    <Route path="/FAQs" element={<FAQs />} />
    <Route path="/Support" element={<Support />} />
    <Route path="/SubmitProblem" element={<SubmitProblem />} />
    <Route path="/GraduationProject" element={<GraduationProject />} />
    <Route path="/LiveSessions" element={<LiveSessions />} />
    <Route path="/SessionDetails/:id" element={<SessionDetails />} />
    <Route path="/Assignment" element={<Assignment />} />
    <Route path="/Security" element={<Security />} />
    <Route path="/Language" element={<LanguageSettings />} />
    <Route path="/Notifications" element={<NotificationsSettings />} />
    <Route path="/Account-details" element={<AccountDetails />} />
  </Route>

  <Route path="*" element={<NotFound />} />
</Routes>
    </div>
  </AuthProvider>
  );
}
export default App;
