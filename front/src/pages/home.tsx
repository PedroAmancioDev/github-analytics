import "../styles/home.css";
import Button from "../assets/components/ui/button";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const name = username.trim()
    if (!name) return
    navigate(`/user/${name}`)
  }

  return (
    <div>

      <h1>Home</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome de um usuario:"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button variant="secondary">Buscar</Button>
      </form>

    </div>
  );
}
