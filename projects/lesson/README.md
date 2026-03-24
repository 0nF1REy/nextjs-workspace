<h1 align="center">
   Lesson Next.js
</h1>

<div align="center">

![Maintenance](https://img.shields.io/maintenance/yes/2025?style=for-the-badge)
![License MIT](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

</div>

## 📖 Descrição

Este é um projeto de aprendizado Next.js que demonstra conceitos fundamentais do framework, incluindo roteamento, componentes, middleware, Server Actions e muito mais.

## 🧭 Guia de Navegação (Índice)

- **[🎯 Sobre o Projeto](#sobre-o-projeto)**
- **[📸 Ilustração](#ilustracao)**
- **[🚀 Tecnologias Utilizadas](#tecnologias-utilizadas)**
- **[📁 Estrutura do Projeto](#estrutura-do-projeto)**
- **[💻 Instalação e Execução](#instalacao-e-execucao)**
- **[✨ Funcionalidades](#funcionalidades)**
- **[🛣️ Rotas Disponíveis](#rotas-disponiveis)**
- **[🧩 Componentes](#componentes)**
- **[🛡️ Middleware](#middleware)**
- **[🔄 Estratégias de Cache](#estrategias-de-cache)**
- **[📄 Licença](#licenca)**

## 🎯 Sobre o Projeto <a name="sobre-o-projeto"></a>

Este projeto foi desenvolvido para ensinar e demonstrar os principais conceitos do Next.js 15, incluindo:

- App Router
- Server Components e Client Components
- Server Actions
- Middleware para autenticação
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- API Routes
- Tratamento de erros e páginas 404

## 📸 Ilustração <a name="ilustracao"></a>

- ### _HOME:_

![Print da página inicial](./readme_images/01-home.png)

- ### _POSTS:_

![Print da página de posts](./readme_images/02-posts.png)

- ### _POST:_

![Print da página de post](./readme_images/03-post.png)

## 🚀 Tecnologias Utilizadas <a name="tecnologias-utilizadas"></a>

- **Next.js 15.4.1** - Framework React para produção
- **React 19.1.0** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset tipado do JavaScript
- **Tailwind CSS 4** - Framework CSS utilitário
- **PostCSS** - Ferramenta para transformação CSS

## 📁 Estrutura do Projeto <a name="estrutura-do-projeto"></a>

```
lesson/
├── src/
│   ├── app/
│   │   ├── api/info/           # API Route para informações de perfil
│   │   ├── posts/              # Páginas de posts
│   │   │   └── [id]/           # Página dinâmica de post individual
│   │   ├── dashboard/          # Página protegida do dashboard
│   │   ├── contatos/           # Página de contatos
│   │   ├── layout.tsx          # Layout raiz da aplicação
│   │   ├── page.tsx            # Página inicial
│   │   ├── not-found.tsx       # Página 404 customizada
│   │   └── globals.css         # Estilos globais
│   ├── components/
│   │   ├── header/             # Componente de cabeçalho
│   │   └── button/             # Componente de botão interativo
│   └── middleware.ts           # Middleware de autenticação
├── public/                     # Arquivos estáticos
├── package.json               # Dependências e scripts
├── tsconfig.json              # Configuração TypeScript
├── next.config.ts             # Configuração Next.js
└── postcss.config.mjs         # Configuração PostCSS
```

## 💻 Instalação e Execução <a name="instalacao-e-execucao"></a>

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm, yarn, pnpm ou bun

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/0nF1REy/lesson-next-js.git
   cd lesson-next-js
   ```

2. Navegue até a pasta do projeto:

   ```bash
   cd lesson
   ```

3. Instale as dependências:

   ```bash
   npm install

   # ou
   yarn install

   # ou
   pnpm install
   ```

### Execução

Para executar o projeto em modo de desenvolvimento:

```bash
npm run dev

# ou
yarn dev

# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## ✨ Funcionalidades <a name="funcionalidades"></a>

### 🏠 Página Inicial

- Geração de números aleatórios
- Revalidação automática a cada 60 segundos
- Meta tags otimizadas para SEO

### 📝 Sistema de Posts

- Lista de posts fetchados da API DummyJSON
- Página individual para cada post
- Sistema de loading com Suspense
- Cache e revalidação configurados
- Busca de posts por usuário

### 🔐 Dashboard Protegido

- Middleware de autenticação
- Redirecionamento automático para não autenticados

### 🎨 Componentes Interativos

- Botão com estado local (useState)

## 🛣️ Rotas Disponíveis <a name="rotas-disponiveis"></a>

| Rota          | Descrição               | Tipo      |
| ------------- | ----------------------- | --------- |
| `/`           | Página inicial          | Static    |
| `/posts`      | Lista de posts          | ISR (60s) |
| `/posts/[id]` | Post individual         | Dynamic   |
| `/dashboard`  | Dashboard protegido     | Protected |
| `/contatos`   | Página de contatos      | Static    |
| `/api/info`   | API com dados de perfil | API Route |

## 🧩 Componentes <a name="componentes"></a>

### HeaderComponent

Localizado em [`src/components/header/header.tsx`](lesson/src/components/header/header.tsx)

- Navegação responsiva
- Links para todas as páginas
- Design com Tailwind CSS

### ButtonComponent

Localizado em [`src/components/button/button.tsx`](lesson/src/components/button/button.tsx)

- Componente client-side
- Gerenciamento de estado com useState
- Funcionalidade de alteração de nome

## 🛡️ Middleware <a name="middleware"></a>

O middleware em [`src/middleware.ts`](lesson/src/middleware.ts) implementa:

- Proteção de rotas do dashboard
- Redirecionamento para usuários não autenticados
- Verificação de autenticação (atualmente configurado como `false` para demonstração)

## 🔄 Estratégias de Cache <a name="estrategias-de-cache"></a>

- **ISR**: Posts revalidados a cada 60 segundos
- **Force Cache**: Cache forçado para dados de posts
- **Revalidate**: Configuração de revalidação personalizada

## 👤 Sobre o Desenvolvedor

<div align="center">

<table>
  <tr>
    <td align="center">
        <br>
        <a href="https://github.com/0nF1REy" target="_blank">
          <img src="./readme_images/alan-ryan.jpg" height="160" alt="Foto de Alan Ryan" style="border-radius:50%;border:3px solid #0077B5;">
        </a>
        </p>
        <a href="https://github.com/0nF1REy" target="_blank">
          <strong>Alan Ryan</strong>
        </a>
        </p>
        ☕ Peopleware | Tech Enthusiast | Code Slinger ☕
        <br>
        Apaixonado por código limpo, arquitetura escalável e experiências digitais envolventes
        </p>
          Conecte-se comigo:
        </p>
        <a href="https://www.linkedin.com/in/alan-ryan-b115ba228" target="_blank">
          <img src="https://img.shields.io/badge/LinkedIn-Alan_Ryan-0077B5?style=flat&logo=linkedin" alt="LinkedIn">
        </a>
        <a href="https://gitlab.com/alanryan619" target="_blank">
          <img src="https://img.shields.io/badge/GitLab-@0nF1REy-FCA121?style=flat&logo=gitlab" alt="GitLab">
        </a>
        <a href="mailto:alanryan619@gmail.com" target="_blank">
          <img src="https://img.shields.io/badge/Email-alanryan619@gmail.com-D14836?style=flat&logo=gmail" alt="Email">
        </a>
        </p>
    </td>
  </tr>
</table>

</div>

---

## 📫 Contribuir

Contribuições são muito bem-vindas! Se você deseja contribuir com o projeto, por favor, siga estes passos:

1.  **Faça um Fork** do repositório.

2.  **Crie uma nova Branch** para sua feature ou correção:

    ```bash
    git checkout -b feature/nome-da-feature
    ```

3.  **Faça suas alterações** e realize o commit:

    ```bash
    git commit -m "feat: Adiciona nova feature"
    ```

4.  **Envie suas alterações** para o seu fork:

    ```bash
    git push origin feature/nome-da-feature
    ```

5.  **Abra um pull request** para a branch `main` do repositório original.

## 📚 Recursos Adicionais

- **<a href="https://www.atlassian.com/br/git/tutorials/making-a-pull-request" target="_blank">📝 Como criar um Pull Request</a>**

- **<a href="https://www.conventionalcommits.org/en/v1.0.0/" target="_blank">💾 Padrão de Commits Convencionais</a>**

## 📜 Licença <a name="licenca"></a>

Este projeto está sob a **licença MIT**. Consulte o arquivo **[LICENSE](LICENSE)** para obter mais detalhes.

> ℹ️ **Aviso de Licença:** © 2025 Alan Ryan da Silva Domingues. Este projeto está licenciado sob os termos da licença MIT. Isso significa que você pode usá-lo, copiá-lo, modificá-lo e distribuí-lo com liberdade, desde que mantenha os avisos de copyright.

⭐ Se este repositório foi útil para você, considere dar uma estrela!
