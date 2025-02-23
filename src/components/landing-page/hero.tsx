import CreateNow from "@/modules/create/components/create-now";
import ProjectCard from "../commons/project-card";
import TotalVisits from "../commons/total-visits";
import UserCard from "../commons/user-card/user-card";

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
        <CreateNow />
      </header>
      <div className="flex w-full items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_55%)]">
        <div className="relative">
          <UserCard />
          <div className="absolute -bottom-[7%] -right-[45%]">
            <TotalVisits />
          </div>
          <div className="absolute -left-[45%] top-[25%] -z-10">
            <ProjectCard
              name="Projeto 1"
              description="Descrição do projeto 1"
              img="project1.jpg"
            />
          </div>
          <div className="absolute -left-[55%] -top-[5%] -z-10">
            <ProjectCard
              name="Projeto 2"
              description="Descrição do projeto 2"
              img="project2.jpg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
