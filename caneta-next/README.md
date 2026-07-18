# Artools Precision Pen - Modernização para Next.js

Este é o repositório do projeto **Artools Precision Pen**, totalmente modernizado de páginas HTML estáticas e scripts CDN para uma aplicação web performática, escalável e de alto padrão desenvolvida com o ecossistema moderno do **Node.js**, **Next.js** e **React**.

---

## 🚀 Tecnologias Utilizadas & Motivação

A escolha da pilha de tecnologia foi feita com base nas melhores práticas do mercado de desenvolvimento frontend para projetos de portfólio premium e plataformas de e-commerce de alta conversão:

*   **[Next.js (v16 App Router)](https://nextjs.org/)**: Framework React industrial. A motivação para o uso do Next.js está no suporte nativo ao **Static Site Generation (SSG)** para a Landing Page (garantindo carregamento inicial instantâneo e pontuação máxima no Lighthouse de SEO), aliado ao roteamento otimizado de pastas para as páginas dinâmicas de checkout e painel de usuário.
*   **[React.js](https://react.dev/)**: Utilizado para componentizar elementos repetidos (como a navegação de cabeçalho global) e para gerenciar o estado da aplicação de forma declarativa e limpa.
*   **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática que previne erros em tempo de desenvolvimento e facilita refatorações, além de prover auto-completar inteligente nos componentes e hooks.
*   **[Tailwind CSS (v4)](https://tailwindcss.com/)**: Nova versão da ferramenta de estilos utilitários. Substitui o uso do Tailwind por CDN estático. Agora, os estilos são compilados e minimizados durante o build do projeto, gerando um bundle CSS extremamente leve e eliminando o "flash" de renderização sem estilos (FOUC).
*   **[GSAP (GreenSock Animation Platform) & @gsap/react](https://gsap.com/)**: O padrão da indústria para animações robustas. Integrado nativamente no React por meio do hook `useGSAP`, garantindo que todas as animações de scroll e de entrada sejam limpas da memória automaticamente ao trocar de rotas.
*   **[Iconify React](https://iconify.design/)**: Permite usar a biblioteca de ícones sem carregar fontes de ícones completas, importando sob demanda somente os ícones renderizados na tela.

---

## 📂 Estrutura de Páginas & Seções

### 1. Landing Page (`/`)
Localizada em [src/app/page.tsx](file:///d:/asimov/designer/caneta/caneta-next/src/app/page.tsx), esta página é a vitrine principal do produto e conta com as seguintes seções interativas:

*   **Hero Sequence (Canvas 3D ao Scroll)**: 
    *   **Funcionamento**: Renderiza um elemento `<canvas>` que desenha uma sequência sincronizada de **192 fotos de alta qualidade** (localizadas na pasta `/public/assets/video_frames`). 
    *   **Animação**: Utilizando o plugin **GSAP ScrollTrigger**, o frame desenhado no canvas avança de forma linear conforme o usuário rola a página, criando um efeito cinematográfico de rotação 3D do produto de forma super leve e responsiva (muito superior a decodificar um vídeo real no navegador).
    *   **Entrada staggered**: Os textos e botões da Hero surgem de forma sequencial de baixo para cima (`stagger: 0.15`) ao carregar a página.
*   **Especificações Técnicas (`#tech-specs`)**:
    *   **Funcionamento**: Seção que detalha as propriedades mecânicas da caneta com imagens e painéis informativos HUD flutuantes.
    *   **Animação**: As caixas informativas e os itens da lista utilizam a animação `.reveal-up` (gatilho ScrollTrigger que aciona a classe `.active` no CSS para suavizar a entrada do elemento com opacidade, translação Y e desfoque). O chassi da imagem possui efeito 3D ao passar o mouse.
*   **Design & Arquitetura de Ideias (`#design`)**:
    *   **Funcionamento**: Grid composto por três cards destacando diferenciais ergonômicos da caneta.
    *   **Efeito Flashlight**: Cada card é um `.flashlight-card`. Um ouvinte de movimento do mouse (`onMouseMove` no React) calcula as coordenadas do cursor e atualiza as variáveis CSS `--mouse-x` e `--mouse-y` em tempo real. Isso gera um gradiente radial de iluminação que segue o mouse suavemente.
*   **Área de Compra/Assinatura (`#buy`)**:
    *   **Funcionamento**: Apresentação de três opções comerciais sobrepostas a um vídeo de fundo em loop com desfoque e overlay fosco.

### 2. Página de Compra & Checkout (`/compra`)
Localizada em [src/app/compra/page.tsx](file:///d:/asimov/designer/caneta/caneta-next/src/app/compra/page.tsx), esta página possui duas visões baseadas em estado React:

*   **Fluxo de Checkout (`checkout`)**:
    *   **Formulário Flexível**: Um formulário de entrega e pagamento otimizado com inputs flutuantes modernos. Os atributos `required` dos inputs foram suspensos para permitir a livre navegação no portfólio.
    *   **Facilitador de Portfólio (Preencher Demo)**: Adicionamos um botão **"Preencher Demo"** na parte superior. Ao clicar, o React popula instantaneamente todo o formulário com dados fictícios prontos para submissão.
*   **Confirmação Cinematográfica (`success`)**:
    *   **Animação**: Ao finalizar a compra, o estado muda para a tela de sucesso. O GSAP orquestra uma entrada suave e cinematográfica do recibo do pedido e mensagens de sucesso sob um vídeo de fundo em loop.

### 3. Área do Usuário & Painel (`/user`)
Localizada em [src/app/user/page.tsx](file:///d:/asimov/designer/caneta/caneta-next/src/app/user/page.tsx), simula o ecossistema pós-compra do cliente:

*   **Identificação (Login / Cadastro)**:
    *   Formulário de credenciais com botão **"Demo"** dedicado para preencher automaticamente os dados de login ou registro com credenciais fictícias de teste.
*   **Painel do Cliente (Dashboard Integrado)**:
    *   Menu lateral interativo com abas dinâmicas gerenciadas no estado do React (Dashboard, Pedidos, Perfil, Endereços, Pagamentos e Segurança).
    *   **Animações de Aba**: Ao alternar as abas, o GSAP executa uma animação de fade-in e desfoque suave (`reveal-content`) para apresentar a nova seção de forma extremamente fluida e premium.
    *   **Notificações Toast**: Sistema integrado de alertas flutuantes no canto inferior direito para sinalizar as ações do usuário (ex: atualizar dados, alterar senhas).

---

## 🛠️ Executando o Projeto Localmente

1. Instale as dependências necessárias da pasta raiz:
   ```bash
   cd caneta-next
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
