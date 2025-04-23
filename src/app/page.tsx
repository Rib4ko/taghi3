import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <AspectRatio ratio={16 / 9} className="w-48 mb-8">
          <img
            src="/logo.png"
            alt="JiexTrading Logo"
            className="object-contain"
          />
        </AspectRatio>
        <h1 className="text-4xl font-bold mb-4">
          Votre fournisseur de confiance en pièces automobiles en gros
        </h1>
        <div className="flex flex-wrap items-center justify-around max-w-2xl mt-6 sm:w-full">
          <Button size="lg">Découvrir les produits</Button>
          <Button variant="secondary" size="lg">
            Créer un compte
          </Button>
        </div>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Catégories populaires</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <CategoryCard title="Huiles moteur" imageUrl="/images/engine-oil.jpg" />
            <CategoryCard title="Filtres" imageUrl="/images/oil-filter.jpg" />
            <CategoryCard title="Batteries" imageUrl="/images/battery.jpg" />
          </div>
        </section>
      </main>
    </div>
  );
}

interface CategoryCardProps {
  title: string;
  imageUrl: string;
}

function CategoryCard({ title, imageUrl }: CategoryCardProps) {
  return (
    <div className="w-64 h-64 rounded-md shadow-md overflow-hidden">
      <AspectRatio ratio={1 / 1}>
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
      </AspectRatio>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
}
