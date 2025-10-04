"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserPlus,
  faUserShield,
  faUserCheck,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminUsersPage() {
  const mockUsers = [
    {
      id: 1,
      name: "Admin Sistema",
      email: "admin@dominio.com.br",
      role: "Admin",
      status: "Ativo",
    },
    {
      id: 2,
      name: "João Silva",
      email: "joao@email.com",
      role: "Usuário",
      status: "Ativo",
    },
    {
      id: 3,
      name: "Maria Santos",
      email: "maria@email.com",
      role: "Usuário",
      status: "Inativo",
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      email: "pedro@email.com",
      role: "Moderador",
      status: "Ativo",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header da página */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-500 mb-2 flex items-center gap-3">
            <FontAwesomeIcon icon={faUsers} />
            Gerenciar Usuários
          </h1>
          <p className="text-gray-400">
            Administre usuários e permissões do sistema
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      {/* Cartões de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#0d1118] border border-blue-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">
                  Total Usuários
                </p>
                <p className="text-2xl font-bold text-blue-300">127</p>
              </div>
              <FontAwesomeIcon
                icon={faUsers}
                className="text-3xl text-blue-400"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-green-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">
                  Usuários Ativos
                </p>
                <p className="text-2xl font-bold text-green-300">112</p>
              </div>
              <FontAwesomeIcon
                icon={faUserCheck}
                className="text-3xl text-green-400"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-purple-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">
                  Moderadores
                </p>
                <p className="text-2xl font-bold text-purple-300">8</p>
              </div>
              <FontAwesomeIcon
                icon={faUserShield}
                className="text-3xl text-purple-400"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-red-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm font-medium">
                  Administradores
                </p>
                <p className="text-2xl font-bold text-red-300">3</p>
              </div>
              <FontAwesomeIcon
                icon={faUserShield}
                className="text-3xl text-red-400"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Usuários */}
      <Card className="bg-[#0d1118] border border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-300">Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Nome
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    E-mail
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Função
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-800 hover:bg-gray-800/30"
                  >
                    <td className="py-3 px-4 text-gray-300">{user.name}</td>
                    <td className="py-3 px-4 text-gray-400">{user.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === "Admin"
                            ? "bg-red-500/20 text-red-400"
                            : user.role === "Moderador"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "Ativo"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <FontAwesomeIcon
                          icon={faEllipsisV}
                          className="w-4 h-4"
                        />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
