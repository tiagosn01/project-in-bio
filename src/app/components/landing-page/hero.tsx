import ProjectCard from "../commons/project-card";
import TotalVisits from "../commons/total-visits";
import UserCard from "../commons/user-card";
import Button from "../ui/button";
import TextInput from "../ui/text-input";

export default function Hero() {
  return (
    <section className="flex h-screen">
      <header className="mt-[35vh] flex w-full flex-col gap-2">
        <h1 className="text-5xl font-bold leading-[64px] text-white">
          Seus projetos e redes sociais em um único link
        </h1>
        <h2 className="text-xl leading-6">
          Crie sua própria página de projetos e compartilhe eles com o mundo.
          <br />
          Acompanhe o engajamento com Analytics de cliques
        </h2>
        <div className="mt-[10vh] flex w-full items-center gap-2">
          <span className="text-xl text-white">projectinbio.com</span>
          <TextInput placeholder="Seu link" />
          <Button>Criar agora</Button>
        </div>
      </header>
      <div className="flex w-full items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_55%)]">
        <div className="relative">
          <UserCard />
          <div className="absolute -bottom-[7%] -right-[45%]">
            <TotalVisits />
          </div>
          <div className="absolute -left-[45%] top-[20%] -z-10">
            <ProjectCard />
          </div>
          <div className="absolute -left-[55%] -top-[5%] -z-10">
            <ProjectCard />
          </div>
        </div>
      </div>
    </section>
  );
}
