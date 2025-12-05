// src/App.tsx
import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import type { Section } from "./data/graphs";
import type { Language } from "./data/graphs";

function App() {
  const [section, setSection] = useState<Section>("timeseries");
  const [language, setLanguage] = useState<Language>("ja"); // 👈 언어 상태

  return (
    <Layout
      section={section}
      onSectionChange={setSection}
      language={language}
      onLanguageChange={setLanguage}
    >
      <Dashboard section={section} language={language} />
    </Layout>
  );
}

export default App;
