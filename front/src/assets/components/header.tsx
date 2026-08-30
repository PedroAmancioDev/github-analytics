import "./header.css";
import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa6";
import { Moon, Sun } from "lucide-react";

export default function Header() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) {
                return savedTheme === "dark";
            }
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    function toggleDarkMode() {
        setIsDark((prev) => !prev);
    }

    return (
        <header className="site-header">
            <div className="header-actions">
                <a
                    href="https://github.com/PedroAmancioDev/github-analytics"
                    target="_blank"
                    rel="noreferrer"
                    className="header-icon-btn"
                    title="GitHub Repository"
                >
                    <FaGithub size={20} />
                </a>

                <button
                    type="button"
                    onClick={toggleDarkMode}
                    className="header-icon-btn"
                    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    aria-label="Toggle dark mode"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </header>
    );
}