// src/components/Header.tsx
import { useEffect, useState } from "react";
import type { Language } from "../data/graphs";
import { TEXTS } from "../i18n/texts";
import "./Header.css";

type HeaderProps = {
  language: Language;
  onLanguageChange: (lang: Language) => void;
};

const Header = ({ language, onLanguageChange }: HeaderProps) => {
  const t = TEXTS[language];

  const [totalData, setTotalData] = useState<number | null>(null);

  // 🔥 weekly_rankings.json 불러오기
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await fetch(
          "https://logfryaxmjntuxfqfmtr.supabase.co/storage/v1/object/public/yahoo-results/latest/weekly_rankings.json"
        );

        if (!res.ok) return;

        const data = await res.json();
        setTotalData(data.meta?.raw_total_rows ?? null);
      } catch (e) {
        console.error(e);
      }
    };

    fetchMeta();
  }, [language]); // 언어 변경 시 다시 로딩(텍스트 변환용)

  return (
    <header className="Header">
      <div className="Header__text">
        <h1 className="Header__title">{t.title}</h1>

        <p className="Header__subtitle">
          {t.subtitle}
          {totalData !== null && (
            <span className="Header__dataCount">total: {totalData.toLocaleString()}</span>
          )}
        </p>
      </div>

      <div className="Header__langToggle">
        <button
          type="button"
          className={
            "Header__langButton" + (language === "ja" ? " is-active" : "")
          }
          onClick={() => onLanguageChange("ja")}
        >
          <span className="Header__langFlag" aria-hidden="true">🇯🇵</span>
          <span>日本語</span>
        </button>

        <button
          type="button"
          className={
            "Header__langButton" + (language === "ko" ? " is-active" : "")
          }
          onClick={() => onLanguageChange("ko")}
        >
          <span className="Header__langFlag" aria-hidden="true">🇰🇷</span>
          <span>한국어</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
