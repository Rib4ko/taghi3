"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";

const languages = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 border rounded-md"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export function Navbar() {
    const [language, setLanguage] = useState(languages[0].code);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleLanguageChange = (code: string) => {
        setLanguage(code);
    };

    return (
      <nav className="bg-secondary p-4 flex flex-col items-center">
        <div className="flex flex-col w-full">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex items-center justify-between w-full">
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
              <Button onClick={() => router.push("/login")}>
                Connexion / Inscription
              </Button>
              <Button onClick={() => router.push("/admin/dashboard")}>
                Admin Panel
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
}

