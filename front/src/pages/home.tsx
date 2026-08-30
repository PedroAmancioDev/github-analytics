import "../styles/home.css";
import Button from "../assets/components/ui/button";
import Header from "../assets/components/header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

export default function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = username.trim();
    if (!name) return;
    navigate(`/user/${name}`);
  }

  function handleQuickSearch(suggestedUser: string) {
    navigate(`/user/${suggestedUser}`);
  }

  return (
    <>
      <Header />
      <main className="home-container">
        {/* Hero Section */}
        <section className="home-hero">
          <div className="home-badge-wrapper">
            <span className="home-badge">GitHub Analytics & Portfolio</span>
          </div>

          <h1 className="home-title">
            Turn any GitHub profile into a <span>Visual Showcase</span>
          </h1>

          <p className="home-subtitle">
            Instantly generate a blueprint-styled portfolio, analyze repositories, and uncover developer insights directly from the GitHub API.
          </p>

          {/* Search Box */}
          <div className="home-search-wrapper">
            <form onSubmit={handleSubmit} className="home-search-form">
              <div className="search-input-group">
                <Search className="search-icon" size={22} />
                <input
                  type="text"
                  placeholder="Enter GitHub username (e.g. torvalds, antfu)..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="search-input"
                  autoFocus
                />
              </div>
              <Button type="submit" variant="primary" className="search-submit-btn">
                <span>Generate</span>
                <ArrowRight size={18} />
              </Button>
            </form>

            {/* Quick Suggestions */}
            <div className="quick-suggestions">
              <span className="suggestions-label">Try searching:</span>
              {["PedroAmancioDev", "antfu", "shadcn", "gaearon"].map((user) => (
                <button
                  key={user}
                  type="button"
                  className="suggestion-tag"
                  onClick={() => handleQuickSearch(user)}
                >
                  @{user}
                </button>
              ))}
            </div>
          </div>

          {/* Hand-drawn annotation with arrow */}
          <div className="home-annotation">
            <svg
              className="home-annotation-arrow"
              width="36"
              height="36"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8 C 28 8, 38 18, 26 32 C 22 38, 30 42, 38 40"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M30 35 L 39 40 L 35 48"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="home-annotation-text">Live metrics and showcase generated in seconds!</span>
          </div>
        </section>

        {/* Feature Highlights (Blueprint Wireframe Box) */}
        <section className="home-features-section">
          <div className="home-features-box">
            <div className="feature-item">
              <div className="feature-number yellow">1</div>
              <div className="feature-content">
                <h3 className="feature-title">
                  Visual <strong>Portfolio Cards</strong>
                </h3>
                <p className="feature-desc">
                  Converts repositories into clean, blueprint-styled project cards with direct GitHub links and tech stacks.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-number blue">2</div>
              <div className="feature-content">
                <h3 className="feature-title">
                  Developer <strong>Timeline & Metrics</strong>
                </h3>
                <p className="feature-desc">
                  Extracts account creation timeline, community reach, and repository engagement with zero friction.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-number pink">3</div>
              <div className="feature-content">
                <h3 className="feature-title">
                  Dark Mode & <strong>Sketch Aesthetics</strong>
                </h3>
                <p className="feature-desc">
                  Crafted with hand-drawn accents, geometric typography, and seamless light and dark mode themes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
