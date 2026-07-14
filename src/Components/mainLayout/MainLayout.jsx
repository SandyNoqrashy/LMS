import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { useState } from "react";
const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    // الأب الأساسي flex عشان السايد بار يجي جمب المحتوى
    <div className="flex min-h-screen bg-[var(--color-bg-main)]">
      
      {/* 1. السايد بار */}
      <Sidebar />

      {/* 2. محتوى الصفحة الرئيسي */}
      <div className="flex-1 flex flex-col">
        <Header  setSearchQuery={setSearchQuery}/>
        
        {/* الـ Outlet بيتحط هنا عشان يتغير محتوى الصفحات */}
        <main >
          <Outlet context={[searchQuery]}/>
        </main>
      </div>
      
    </div>
  );
};

export default MainLayout;