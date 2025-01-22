import Button from "../ui/button";
export default function Header() {
  return (
    <header className="absolute left-0 right-0 top-0 mx-auto flex max-w-7xl items-center justify-between py-10">
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="ProjectInBio Logo" />
        <h3 className="text-2xl font-bold text-white">ProjectInBio</h3>
      </div>
      <div className="flex items-center gap-4">
        <Button>Minha Página</Button>
        <Button>Sair</Button>
      </div>
    </header>
  );
}
