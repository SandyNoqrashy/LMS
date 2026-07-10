import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Core/Dashboard/Dashboard";
import Timeline from "./pages/Core/Timeline/Timeline";
import AIAssistant from "./pages/Engagement/AIAssistant/AIAssistant";

import FAQs from "./pages/HelpSupport/FAQs/FAQs";
import Support from "./pages/HelpSupport/Support/Support";
import GraduationProject from "./pages/Learning/GraduationProject/GraduationProject";
import LiveSessions from "./pages/Learning/LiveSessions/LiveSessions";
import Assignment from "./pages/Learning/Assignment/Assignment";

import { AuthProvider } from "./Components/Context/Context";
import SessionDetails from "./pages/Learning/SessionDetails/SessionDetails";
import SubmitProblem from "./pages/HelpSupport/Support/SubmitProblem";
import MainLayout from "./Components/mainLayout/MainLayout";
const App = () => {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Timeline" element={<Timeline />} />
          <Route path="/AIassistant" element={<AIAssistant />} />
          
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/Support" element={<Support />} />
          <Route path="/SubmitProblem" element={<SubmitProblem />} />
          <Route path="/GraduationProject" element={<GraduationProject />} />
          <Route path="/LiveSessions" element={<LiveSessions />} />
          <Route path="/SessionDetails/:id" element={<SessionDetails />} />
          <Route path="/Assignment" element={<Assignment />} />
        </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
