import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ClientOnly } from "@/components/client-only";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AccessInfoProps {
  email: string;
  level: string;
  lastActivity: Date;
}

export function AccessInfo({ email, level, lastActivity }: AccessInfoProps) {
  return (
    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
      <div className="flex items-center gap-3 mb-4">
        <FontAwesomeIcon icon={faUser} className="text-green-400 text-xl" />
        <h3 className="text-lg font-semibold text-green-400">
          Informações de Acesso
        </h3>
      </div>
      <div className="space-y-2 text-gray-300">
        <p>
          <span className="text-gray-400">E-mail:</span> {email}
        </p>
        <p>
          <span className="text-gray-400">Nível:</span> {level}
        </p>
        <p>
          <span className="text-gray-400">Última atividade:</span>{" "}
          <ClientOnly fallback="--/--/----, --:--:--">
            {format(lastActivity, "dd/MM/yyyy, HH:mm:ss", { locale: ptBR })}
          </ClientOnly>
        </p>
      </div>
    </div>
  );
}
