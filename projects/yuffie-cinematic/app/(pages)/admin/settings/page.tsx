"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCog, 
  faDatabase, 
  faShield,
  faBell,
  faUsers,
  faServer,
  faChartLine,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

export default function AdminSettingsPage() {
  const settingsCategories = [
    {
      title: "Sistema",
      icon: faServer,
      items: [
        { name: "Configurações Gerais", description: "Configurações básicas do sistema" },
        { name: "Cache e Performance", description: "Otimizações e configurações de cache" },
        { name: "Logs do Sistema", description: "Visualizar logs e atividades" }
      ]
    },
    {
      title: "Segurança",
      icon: faShield,
      items: [
        { name: "Políticas de Senha", description: "Requisitos e validações de senha" },
        { name: "Controle de Acesso", description: "Permissões e roles de usuários" },
        { name: "Sessões Ativas", description: "Gerenciar sessões de usuários" }
      ]
    },
    {
      title: "Banco de Dados",
      icon: faDatabase,
      items: [
        { name: "Backup Automático", description: "Configurar backups regulares" },
        { name: "Limpeza de Dados", description: "Remover dados antigos e temporários" },
        { name: "Otimização", description: "Melhorar performance do banco" }
      ]
    },
    {
      title: "Notificações",
      icon: faBell,
      items: [
        { name: "E-mail SMTP", description: "Configurar servidor de e-mail" },
        { name: "Notificações Push", description: "Configurações de notificações" },
        { name: "Alertas do Sistema", description: "Alertas de monitoramento" }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-500 mb-2 flex items-center gap-3">
            <FontAwesomeIcon icon={faCog} />
            Configurações
          </h1>
          <p className="text-gray-400">
            Gerencie configurações do sistema e preferências
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#0d1118] border border-blue-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Uptime Sistema</p>
                <p className="text-2xl font-bold text-blue-300">99.8%</p>
              </div>
              <FontAwesomeIcon icon={faChartLine} className="text-3xl text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-green-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Usuários Online</p>
                <p className="text-2xl font-bold text-green-300">47</p>
              </div>
              <FontAwesomeIcon icon={faUsers} className="text-3xl text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-yellow-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm font-medium">Uso do Servidor</p>
                <p className="text-2xl font-bold text-yellow-300">68%</p>
              </div>
              <FontAwesomeIcon icon={faServer} className="text-3xl text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-purple-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">E-mails Enviados</p>
                <p className="text-2xl font-bold text-purple-300">1,234</p>
              </div>
              <FontAwesomeIcon icon={faEnvelope} className="text-3xl text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsCategories.map((category, index) => (
          <Card key={index} className="bg-[#0d1118] border border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-gray-300 flex items-center gap-3">
                <FontAwesomeIcon icon={category.icon} className="text-blue-400" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-4 border border-gray-700/30 rounded-lg hover:bg-gray-800/30 transition-colors">
                  <div>
                    <h4 className="text-gray-300 font-medium">{item.name}</h4>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    Configurar
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Information */}
      <Card className="bg-[#0d1118] border border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-300">Informações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-700/30 rounded-lg">
              <h4 className="text-gray-300 font-medium mb-2">Versão</h4>
              <p className="text-blue-400">Yuffie Cinematic v1.0.0</p>
            </div>
            <div className="p-4 border border-gray-700/30 rounded-lg">
              <h4 className="text-gray-300 font-medium mb-2">Última Atualização</h4>
              <p className="text-green-400">15/01/2025 - 14:30</p>
            </div>
            <div className="p-4 border border-gray-700/30 rounded-lg">
              <h4 className="text-gray-300 font-medium mb-2">Ambiente</h4>
              <p className="text-yellow-400">Produção</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
