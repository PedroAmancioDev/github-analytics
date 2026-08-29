import type { GithubProfileResponse, GithubRepoResponse, GithubProfile, GithubRepo, GithubLanguages } from "../types/github";

const BASE_URL: string = "http://localhost:3000/api"

async function apiFetch<T>(path: string): Promise<T> { // chama o apiFetch e preenche o <T> com GithubProfile
    const response = await fetch(`${BASE_URL}${path}`)

    if (!response.ok) {
        throw new Error(`Erro ao buscar dados (staus ${response.status})`)
    }

    return response.json() as Promise<T>
}

export async function fetchUserProfile(username: string): Promise<GithubProfile> { // Promise<GithubProfile> // busca a estrutura so type GithubProfile 
    const user = await apiFetch<GithubProfileResponse>( //  apiFetch<GithubProfileResponse> === recebe os dados da forma que a api entrega
        `/github/${encodeURIComponent(username)}` // busca a função contatena com /github/ + username
    )

    return {
        login: user.login,
        avatarUrl: user.avatar_url,
        profileUrl: user.html_url,
        name: user.name,
        bio: user.bio,
        blog: user.blog ?? null,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        createdAt: user.created_at,
    };  // retorna os paramentros renomeados 

}

export async function fetchUserRepos(username: string): Promise<GithubRepo[]> {
    const repos = await apiFetch<GithubRepoResponse[]>(
        `/github/repos/${encodeURIComponent(username)}`
    )

    return repos.map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language
    }))

}

export async function fetchUserLanguages(username: string): Promise<GithubLanguages> {
    return apiFetch<GithubLanguages>(
        `/github/repos/${encodeURIComponent(username)}/languages`
    )
}