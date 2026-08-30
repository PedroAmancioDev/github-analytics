import "../styles/userProfile.css";
import Header from "../assets/components/header";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { GithubProfile, GithubRepo } from "../types/github";
import { fetchUserProfile, fetchUserRepos, fetchUserLanguages } from "../services/githubService";

import { ArrowUpRight } from "lucide-react";

export default function userProfile() {

    const { username } = useParams() // pega userName na URL  

    const [perfil, setPerfil] = useState<GithubProfile | null>(null)
    const [repos, setRepos] = useState<GithubRepo[]>([])
    const [languages, setLanguages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => { // executa toda vez que a URL mida
        if (!username) return
        setIsLoading(true)
        setError(null)

        Promise.all([ // os 3 fetch são idenpendentes rodam ao mesmo tempo, n precisa esperar um terminar para começar outro
            fetchUserProfile(username),
            fetchUserRepos(username),
            fetchUserLanguages(username)
        ])

            .then(([perfil, repos, languages]) => { // then -> quando a api responder guarda no useState
                setPerfil(perfil);
                setRepos(repos);
                setLanguages(languages)
            })

            .catch(() => setError("Usuario não encontrado")) // se erro - mensagem
            .finally(() => setIsLoading(false)) // parar de rodar loading

    }, [username]) // re-executa de houver alteração

    const createdDate = perfil?.createdAt ? new Date(perfil.createdAt) : null;
    const joinYear = createdDate ? createdDate.getFullYear() : new Date().getFullYear();
    const currentYear = new Date().getFullYear();
    const yearsActive = Math.max(1, currentYear - joinYear);
    const formattedDate = createdDate ? createdDate.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) : "";

    return (
        <>
            <Header />
            <div className="profile-container">
                {isLoading && <p className="loading-state">Loading...</p>}
                {error && <p className="error-state">{error}</p>}

                {perfil && (
                    <>
                        {/* Informações do Perfil */}
                        <div className="profile-header">
                            <img src={perfil.avatarUrl} alt={perfil.name || username} className="profile-avatar" />
                            <div className="profile-info">
                                <h1 className="profile-name">{perfil.name || username}</h1>
                                {perfil.bio && <p className="profile-bio">{perfil.bio}</p>}
                                <div className="profile-links">
                                    <a href={perfil.profileUrl} target="_blank" rel="noreferrer" className="profile-link">
                                        github.com/{username}
                                    </a>
                                    {perfil.blog && (
                                        <a href={perfil.blog.startsWith("http") ? perfil.blog : `https://${perfil.blog}`} target="_blank" rel="noreferrer" className="profile-link">
                                            {perfil.blog}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Seção Work Experience / Developer Journey */}
                        <section className="experience-section">
                            <div className="experience-sidebar">
                                <div className="experience-badge-wrapper">
                                    <span className="experience-badge">Work Experience</span>
                                </div>
                                <div className="experience-arrow-container">
                                    <svg className="experience-arrow" width="38" height="38" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 8 C 28 8, 38 18, 26 32 C 22 38, 30 42, 38 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                        <path d="M30 35 L 39 40 L 35 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <p className="experience-sidebar-text">
                                    Have been designing and building since my past {yearsActive} {yearsActive === 1 ? 'year' : 'years'}
                                </p>
                            </div>

                            <div className="experience-box">
                                {/* Item 1 - Repositórios / Código */}
                                <div className="experience-item">
                                    <div className="experience-number yellow">1</div>
                                    <div className="experience-content">
                                        <h3 className="experience-title">
                                            Open Source Developer at <strong>GitHub</strong>
                                        </h3>
                                        <p className="experience-desc">
                                            Published and maintained {perfil.publicRepos} public repositories
                                            {languages.length > 0 && ` using ${languages.join(", ")}`}
                                        </p>
                                        <span className="experience-date">{languages.length > 0 ? `${languages.length} languages used` : "Active contributor"}</span>
                                    </div>
                                </div>

                                {/* Item 2 - Comunidade & Seguidores */}
                                <div className="experience-item">
                                    <div className="experience-number blue">2</div>
                                    <div className="experience-content">
                                        <h3 className="experience-title">
                                            Community Member & <strong>Network</strong>
                                        </h3>
                                        <p className="experience-desc">
                                            Engaged with {perfil.followers} followers and following {perfil.following} developers
                                        </p>
                                        <span className="experience-date">Active network in open source</span>
                                    </div>
                                </div>

                                {/* Item 3 - Início da Jornada */}
                                <div className="experience-item">
                                    <div className="experience-number pink">3</div>
                                    <div className="experience-content">
                                        <h3 className="experience-title">
                                            Joined Developer <strong>Ecosystem</strong>
                                        </h3>
                                        <p className="experience-desc">
                                            Created GitHub account and started software development journey
                                        </p>
                                        <span className="experience-date">{formattedDate || `Since ${joinYear}`}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="projects-section">
                            <h2 className="projects-title">
                                My <span>Projects</span>
                            </h2>
                            <div className="projects-grid">
                                {repos.map((repo) => (
                                    <div key={repo.name} className="project-card">
                                        <div className="project-header">
                                            <h3 className="project-name">{repo.name}</h3>
                                            <a
                                                href={`https://github.com/${username}/${repo.name}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="project-arrow-btn"
                                                title="Ver projeto"
                                            >
                                                <ArrowUpRight size={18} />
                                            </a>
                                        </div>
                                        <div className="project-details">
                                            {repo.language && (
                                                <span className="project-tag">{repo.language}</span>
                                            )}
                                            {repo.description && (
                                                <p className="project-desc">{repo.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </>
    );
}