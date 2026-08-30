// forma que a api devolve devolve (snake_case) 
export type GithubProfileResponse = {
    login: string
    avatar_url: string
    html_url: string
    name: string
    bio: string | null
    blog?: string | null
    public_repos: number
    followers: number
    following: number
    created_at: string
}

export type GithubRepoResponse = {
    name: string
    description: string | null
    language: string | null
}

// renomeando os paramentros (camelCase) // oq a UI consome 

export type GithubProfile = {
    login: string
    avatarUrl: string
    profileUrl: string
    name: string
    bio: string | null
    blog?:  string | null
    publicRepos: number
    followers: number
    following: number
    createdAt: string
}

export type GithubRepo = {
    name: string
    description: string | null
    language: string | null
}

export type GithubLanguages = string[]