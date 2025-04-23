"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const languages = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

export function Navbar() {
  const [language, setLanguage] = useState(languages[0].code);
  const router = useRouter();

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
  };

  return (
    <nav className="bg-secondary p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/logo.png" alt="JiexTrading Logo" className="h-8 mr-4" />
        <span className="font-bold text-lg">JiexTrading</span>
      </div>
      <div className="flex items-center space-x-4">
        <a href="/" className="hover:text-primary">
          Accueil
        </a>
        <a href="/products" className="hover:text-primary">
          Produits
        </a>
        <a href="/categories" className="hover:text-primary">
          Catégories
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{language}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={() => router.push('/login')}>Connexion / Inscription</Button>
      </div>
    </nav>
  );
}
