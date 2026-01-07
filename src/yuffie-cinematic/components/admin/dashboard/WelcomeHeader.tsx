import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface WelcomeHeaderProps {
  adminName?: string;
}

export function WelcomeHeader({ adminName = "Admin" }: WelcomeHeaderProps) {
  return (
    <div className="text-center p-4 relative z-10">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-5xl text-emerald-500"
          />
          <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl animate-pulse" />
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
          Bem-vindo, {adminName}!
        </h1>
        <p className="text-lg text-slate-300">
          Seu login foi realizado com sucesso.
        </p>
        <p className="text-slate-400 max-w-lg mx-auto leading-relaxed pt-2">
          Você agora tem acesso completo ao painel administrativo do
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">
            {" "}
            Yuffie Cinematic
          </span>
          .
        </p>
      </div>
    </div>
  );
}
