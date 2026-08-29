import { Request, Response } from 'express';

type GithubUser = {
    login: string,
    avatar_url: string, 
    html_url: string, // link profile
    name: string,
    bio: string | null,
    blog?: string,
    public_repos: number,
    followers: number,
    following: number,
    created_at: string
}

export async function getAnalytics(req: Request, res: Response): Promise<void> {
    const { username } = req.params
    try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (!response.ok) {
            res.status(404).json({ error: 'Usuário não encontrado' })
            return
        }

        const user = await response.json() as GithubUser

        const userinfo = {
            login: user.login,
            avatar_url: user.avatar_url,
            html_url: user.html_url,
            name: user.name,
            bio: user.bio,
            blog: user.blog,
            public_repos: user.public_repos,
            followers: user.followers,
            following: user.following,
            created_at: user.created_at
        }

        res.status(200).json(userinfo)
    } catch (error) {
        res.status(500).json({ error: 'Erro interno' })
    }
}

type GithubRepo = {
    name: string,
    description?: string | null,
    language: string | null
}

export async function getUserRepos(req: Request, res: Response): Promise<void> { // add links + stars  
    const { username } = req.params
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`)
        if (!response.ok) {
            res.status(404).json({ error: 'Repositórios não encontrado' })
            return
        }
        const repos = await response.json() as GithubRepo[]

        const reposInfo = repos.map(repo => ({
            name: repo.name,
            description: repo.description,
            language: repo.language
        }))

        res.status(200).json(reposInfo)
    } catch (error) {
        res.status(500).json({ error: 'Erro interno' })
    }
}

export async function getUserLanguages(req: Request, res: Response) {
    const { username } = req.params
    try {
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`)
        if (!reposResponse.ok) {
            res.status(404).json({ error: 'Usuário ou repositórios não encontrados' })
            return
        }

        const repos = await reposResponse.json() as GithubRepo[] // usar no formato GithubRepo

        const languages = repos.map(repo => repo.language) // somente languges

        const clean: string[] = languages.filter( // filter -> percorre cada elemento e pergunta se ele deve continuar na nova lista 
            (item): item is string => item != null // se o item for != de null continua
        ) // remover nulls 

        const unicos: string[] = [...new Set(clean)] // remover repetidos  // pega todos os valores de clan e cria um set com valores unicos

        res.status(200).json(unicos)
    } catch (error) {
        res.status(500).json({ error: 'Erro interno' })
    }
}
