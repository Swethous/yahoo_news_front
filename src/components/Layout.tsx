// src/components/Layout.tsx
// src/components/Layout.tsx
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import type { Section, Language } from "../data/graphs";

type LayoutProps = {
  section: Section;
  onSectionChange: (s: Section) => void;
  language: Language;                  
  onLanguageChange: (lang: Language) => void;
  children: ReactNode;
};

const Layout = ({
  section,
  onSectionChange,
  language,
  onLanguageChange,
  children,
}: LayoutProps) => {
  return (
    <div className="AppLayout">
      <Sidebar active={section} onChange={onSectionChange} language={language}/>
      <div className="AppLayout__main">
        <Header
          language={language}
          onLanguageChange={onLanguageChange}
        />
        <main className="Main">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
