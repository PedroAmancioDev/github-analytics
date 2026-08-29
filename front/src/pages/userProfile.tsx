import "../styles/userProfile.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { GithubProfile, GithubRepo } from "../types/github";
import { fetchUserProfile, fetchUserRepos, fetchUserLanguages } from "../services/githubService";

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

    return (
        <>
            <div>

                {isLoading && <p>carregando...</p>}
                {error && <p>{error}</p>}

                {perfil && (
                    <>
                        <img src={perfil.avatarUrl} alt="" />
                        <h1>{perfil.name}</h1>

                        <p>Seguidores: {perfil.followers} | Seguindo: {perfil.following}</p>

                        <p>{perfil.profileUrl}</p>
                        <p>{perfil.bio}</p>
                        <p>{perfil.blog}</p>

                        <h1>Repos</h1>
                        <p>{perfil.publicRepos}</p>

                        <h2>Languages</h2>
                        <ul>
                            {languages.map((lang) => (
                                <li key={lang}>{lang}</li>
                            ))}
                        </ul>

                        <h1>Repositorios</h1>
                        <ul>
                            {repos.map((repo) => (
                                <li key={repo.name}>
                                    <strong>{repo.name}</strong>
                                    <p>{repo.language}</p>
                                    <p>{repo.description}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

            </div>
        </>
    )
}