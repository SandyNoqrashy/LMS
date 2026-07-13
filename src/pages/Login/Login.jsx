import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOff, Eye, AlertCircle } from "lucide-react";
import { useAuth } from "../../Components/Context/Context.jsx";
import Error from "../../Components/Error/Error.jsx";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  
  const [isForgot, setIsForgot] = useState(() => sessionStorage.getItem("isForgotMode") === "true");
  const [forgotStep, setForgotStep] = useState("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [serverDown, setServerDown] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    setServerDown(false);
    const newErrors = {
      email: userInfo.email.trim() === "",
      password: userInfo.password.trim() === "",
    };

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      const url = import.meta.env.VITE_API_URL;
      const response = await fetch(`${url}/api/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userInfo.email.trim(),
          password: userInfo.password.trim(),
        }),
      });
      const data = await response.json();
      
      if (data && data.token) {
        login(data.token);
        navigate("/LiveSessions");
      } else {
        setErrors({ email: true, password: true });
      }
    } catch (e) {
      console.error("خطأ في الاتصال بالسيرفر:", e);
      setServerDown(true);
    }
  }; 

  const handleSendResetLink = async () => {
    setMessage("");
    if (!forgotEmail.trim()) { setMessage("يرجى إدخال البريد الإلكتروني"); return; }

    try {
      const url = import.meta.env.VITE_API_URL;
      const response = await fetch(`${url}/users`);
      const users = await response.json();
      const userExists = users.find(u => u.email.toLowerCase() === forgotEmail.toLowerCase());

      if (userExists) {
        setForgotStep("password");
      } else {
        setMessage("عذراً، هذا البريد الإلكتروني غير مسجل");
      }
    } catch (e) { setMessage("حدث خطأ تقني"); setServerDown(true); }
  };

  const handleSaveNewPassword = async () => {
    setMessage("");
    if (!newPassword.trim()) { setMessage("يرجى إدخال كلمة المرور الجديدة"); return; }
    
    try {
      const url = import.meta.env.VITE_API_URL;
      const response = await fetch(`${url}/users`);
      const users = await response.json();
      const user = users.find(u => u.email.toLowerCase() === forgotEmail.toLowerCase());

      await fetch(`${url}/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      setMessage("تم تغيير كلمة المرور بنجاح! جاري العودة...");
      setTimeout(() => {
        setIsForgot(false);
        setForgotStep("email");
        setMessage("");
      }, 2000);
    } catch (e) { setMessage("فشل تحديث كلمة المرور"); setServerDown(true); }
  };

  useEffect(() => {
    sessionStorage.setItem("isForgotMode", isForgot);
  }, [isForgot]);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row overflow-x-hidden font-sans relative" style={{ backgroundColor: "var(--light-gray)" }}>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] bg-[url('/background.jpg')] bg-cover bg-center"></div>

      {/* الجزء الأيسر - مخفي في الموبايل */}
      <div className="relative hidden md:flex w-[48%] h-screen bg-[linear-gradient(327.43deg,#344987_37.7%,#5C80ED_83.65%)] [clip-path:ellipse(100%_100%_at_0%_50%)] flex-col justify-center items-center text-white p-10 lg:p-16 z-10">
        <img src="/Ministry.png" alt="Logo" className="absolute top-[7px] left-[68px] w-[200px] lg:w-[243px] h-[100px] lg:h-[121px] object-contain z-20" />
        <div className="text-center max-w-sm lg:max-w-md">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">Welcome to DEPI Digital Egypt Pioneers</h1>
          <p className="text-base lg:text-lg opacity-85 font-light leading-relaxed">Experience interactive, secure, and high-quality digital education.</p>
        </div>
        <div className="absolute bottom-32 lg:bottom-56 text-center w-full px-10 text-[11px] opacity-70">Powered by the Ministry of Communications and Information Technology (MCIT).</div>
      </div>
      
      {/* الجزء الأيمن */}
      <div className="flex-1 min-h-screen flex flex-col justify-center items-center p-6 md:p-12 lg:p-20 z-20">
        <div className="w-full max-w-md">
          {serverDown ? (
            <Error onRetry={() => window.location.reload()} />
          ) : isForgot ? (
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-[var(--primary)]">
                {forgotStep === "email" ? "Forgot Password" : "New Password"}
              </h2>
              
              {forgotStep === "email" ? (
                <>
                  <p className="mb-6 md:mb-10 text-base md:text-lg text-[var(--dark-gray)]">Enter your email to reset your password</p>
                  <input placeholder="enter your email" className="w-full p-3 mb-4 rounded-xl border border-[var(--gray-base)] shadow-sm outline-none" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
                  <button onClick={handleSendResetLink} className="w-full text-white py-3 rounded-xl font-bold text-lg md:text-xl mb-4 transition-all hover:brightness-110" style={{ background: "var(--main-gradient)" }}>Next</button>
                </>
              ) : (
                <>
                  <p className="mb-6 md:mb-10 text-base md:text-lg text-[var(--dark-gray)]">Enter your new password</p>
                  <input type="password" placeholder="enter new password" className="w-full p-3 mb-4 rounded-xl border border-[var(--gray-base)] shadow-sm outline-none" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  <button onClick={handleSaveNewPassword} className="w-full text-white py-3 rounded-xl font-bold text-lg md:text-xl mb-4 transition-all hover:brightness-110" style={{ background: "var(--main-gradient)" }}>Save Password</button>
                </>
              )}

              {message && <p className={`text-center font-bold text-sm mb-4 ${message.includes("تم") ? "text-green-600" : "text-red-500"}`}>{message}</p>}
              <button onClick={() => {setIsForgot(false); setForgotStep("email")}} className="text-[var(--primary)] font-bold">Back to Login</button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-[var(--primary)]">Welcome Back</h2>
              <p className="mb-6 md:mb-10 text-base md:text-lg text-[var(--dark-gray)]">Please enter your data to log in</p>
              <form className="space-y-6 md:space-y-8" onSubmit={submitLogin}>
                <div className="space-y-2 md:space-y-3 relative">
                  <label className="font-bold text-lg md:text-xl block text-black">Email Address</label>
                  <div className="relative">
                    <input placeholder="enter your email" className={`w-full p-3 rounded-xl border bg-white shadow-sm focus:ring-2 outline-none transition-all duration-300 ${errors.email ? "shake-error" : ""}`} style={{ borderColor: errors.email ? "#ff4d4d" : "var(--gray-base)" }} value={userInfo.email} onChange={(e) => { setUserInfo({ ...userInfo, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: false }); }} />
                    {errors.email && <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5 animate-pulse" />}
                  </div>
                </div>
                <div className="space-y-2 md:space-y-3 relative">
                  <label className="font-bold text-lg md:text-xl block text-black">Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} placeholder="enter your Password" className={`w-full p-3 rounded-xl border bg-white shadow-sm focus:ring-2 outline-none transition-all duration-300 ${errors.password ? "shake-error" : ""}`} style={{ borderColor: errors.password ? "#ff4d4d" : "var(--gray-base)" }} value={userInfo.password} onChange={(e) => { setUserInfo({ ...userInfo, password: e.target.value }); if (errors.password) setErrors({ ...errors, password: false }); }} />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {errors.password && <AlertCircle className="text-red-500 w-5 h-5 animate-pulse" />}
                      <div className="cursor-pointer text-gray-400 hover:text-[var(--primary)]" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}</div>
                    </div>
                  </div>
                  <div className="text-right cursor-pointer text-sm font-semibold text-[var(--primary)] hover:underline" onClick={() => setIsForgot(true)}>Forgot Password?</div>
                </div>
                <button type="submit" className="w-full text-white py-3 rounded-xl font-bold text-lg md:text-xl shadow-lg transition-all active:scale-95 hover:brightness-110" style={{ background: "var(--main-gradient)" }}>Login</button>
              </form>
            </>
          )}
        </div>
        <div className="flex justify-center items-center gap-8 mt-10 md:mt-12">
          <img src="/depi (1).png" alt="Logo 2" className="h-10 md:h-12 object-contain" />
          <img src="/eyouth .png" alt="Logo 1" className="h-10 md:h-12 object-contain" />
        </div>
      </div>
    </div>
  );
};
export default Login;
// const submitLogin = async (e) => {
//   e.preventDefault();

//   // 1. التحقق من الحقول الفارغة
//   const newErrors = {
//     email: userInfo.email.trim() === "",
//     password: userInfo.password.trim() === "",
//   };

//   if (newErrors.email || newErrors.password) {
//     setErrors(newErrors);
//     return;
//   }

//   try {
//     // 2. جلب كل المستخدمين من السيرفر
//     const response = await fetch("http://localhost:3000/users");
//     const users = await response.json();

//     // 3. البحث عن المستخدم يدوياً (تأكد من عدم وجود مسافات زائدة)
//     const foundUser = users.find(
//       (u) => 
//         u.email.trim().toLowerCase() === userInfo.email.trim().toLowerCase() && 
//         String(u.password) === userInfo.password.trim()
//     );

//     // 4. التحقق من وجود المستخدم
//     if (foundUser) {
//       login(foundUser.accessToken);
//       navigate("/LiveSessions");
//     } else {
//       alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
//     }
//   } catch (e) {
//     console.error("خطأ في الاتصال بالسيرفر:", e);
//     alert("حدث خطأ أثناء الاتصال بالسيرفر، تأكد أنه يعمل!");
//   }
// };