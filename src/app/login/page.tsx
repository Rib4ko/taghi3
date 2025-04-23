"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (email === "hassanzaghmane30@gmail.com" && password === "hasszagh3006") {
      window.location.href = "/admin/dashboard";
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Connexion</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full">
          <Input
            type="email"
            placeholder="Email"
            className="mb-4 w-full max-w-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            className="mb-4 w-full max-w-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full max-w-md">
            Se connecter
          </Button>
        </form>
      </main>
    </div>
  );
}
