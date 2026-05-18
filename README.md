# 🌵 Raízes do Nordeste - Foodtech & Delivery

![Status do Projeto](https://img.shields.io/badge/Status-Conclu%C3%ADdo-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 📌 Sobre o Projeto
**Raízes do Nordeste** é uma aplicação web de ponta a ponta que simula o ecossistema digital de uma rede de restaurantes em expansão. O sistema foi projetado com uma **Arquitetura Omnichannel**, oferecendo interfaces adaptadas para três cenários reais de atendimento:
1. **Web App (Mobile-First):** Experiência fluida e nativa para smartphones de clientes.
2. **Web Desktop:** Navegação ampla e responsiva para computadores.
3. **Totem de Autoatendimento:** Interface exclusiva em *Kiosk Mode* para lojas físicas, com recursos de *timeout* (anti-abandono) e botões adaptados para toque.

Este projeto consolida os conhecimentos práticos do curso de Análise e Desenvolvimento de Sistemas (ADS), aplicando conceitos de Clean Code, separação de responsabilidades (HTML, CSS e JS puros) e manipulação do DOM.

---

## 🚀 Principais Funcionalidades

* **🍽️ Cardápio Dinâmico:** Listagem de produtos filtrável por categorias (Pratos, Bebidas, Sobremesas).
* **🛒 Carrinho de Compras:** Cálculo em tempo real de subtotal, frete, descontos e valor final.
* **📍 Múltiplas Unidades:** Seleção de restaurantes baseada em geolocalização e status de funcionamento (Aberto/Fechado).
* **⭐ Clube de Fidelidade:** Sistema de gamificação onde o usuário acumula pontos a cada pedido para trocar por pratos gratuitos.
* **💳 Simulação de Checkout:** Fluxo de pagamento com conformidade explícita à **LGPD** (Lei Geral de Proteção de Dados).
* **💾 Persistência de Dados:** Gerenciamento de sessão, carrinho e status de login utilizando a `LocalStorage` do navegador (sem necessidade de banco de dados externo para a prova de conceito).

---

## 🛠️ Tecnologias e Arquitetura

O projeto foi desenvolvido **sem frameworks**.

* **HTML5:** Estruturação semântica.
* **CSS3:** Layouts complexos com Flexbox e CSS Grid, variáveis globais para o Design System (tema do restaurante) e media queries para responsividade.
* **Vanilla JavaScript (ES6+):** Lógica de negócios modularizada em múltiplos arquivos (`app.js`, `cardapio.js`, `carrinho.js`, `totem.js`, etc.) para facilitar a manutenção.

---

## ⚙️ Como Executar Localmente

Como o projeto é 100% Client-Side (Front-end puro), não é necessário instalar dependências pesadas como Node.js ou bancos de dados.

1. Faça o clone deste repositório:
   ```bash
   git clone [https://github.com/SeuUsuario/raizes-do-nordeste.git](https://github.com/SeuUsuario/raizes-do-nordeste.git)
2. Abra a pasta do projeto no seu editor de códigos (ex: VS Code).
3. Utilize a extensão Live Server para rodar o projeto localmente, ou simplesmente abra o arquivo index.html em qualquer navegador moderno.
4. Para visualizar o Modo Totem, clique no link discreto na página de login ou acesse diretamente totem.html na barra de endereços.

## 👨‍💻 Autor

**Allan Crisanto** *Técnico de TI & Estudante de Análise e Desenvolvimento de Sistemas (UNINTER)*
