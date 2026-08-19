import { Request, Response } from 'express';

export async function getAnalytics(req: Request, res: Response): Promise<void> {
    const { username } = req.params

    try {
        const response = await fetch(`https://api.github.com/users/${username}`)

        if (!response.ok) {
            res.status(404).json({ error: 'Usuário não encontrado' })
            return
        }

        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: 'Erro interno' })
    }
}