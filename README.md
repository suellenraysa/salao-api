Sistema de Gerenciamento de Salão de Beleza
Bem-vindo ao projeto final da faculdade: Sistema de Gerenciamento de Salão de Beleza. Este sistema foi desenvolvido para facilitar a administração de um salão de beleza, incluindo agendamentos, controle de clientes, serviços oferecidos e gerenciamento de funcionários.

Funcionalidades
Cadastro de Clientes: Permite o registro de novos clientes com informações pessoais e preferências.
Agendamento de Serviços: Sistema de agendamento para serviços oferecidos pelo salão, permitindo aos clientes marcar horários com facilidade.
Gerenciamento de Funcionários: Cadastro e gerenciamento de informações dos funcionários, incluindo horários de trabalho e especialidades.
Controle de Estoque: Monitoramento e gerenciamento do estoque de produtos utilizados no salão.
Relatórios e Análises: Geração de relatórios sobre o desempenho do salão, frequência de clientes, serviços mais populares, entre outros.

Tecnologias Utilizadas
Frontend:

HTML
CSS
TypeScript
React.js

Backend:

Node.js
Express.js

Banco de Dados: Postgres

JWT (JSON Web Tokens)
Instalação e Configuração
Siga os passos abaixo para configurar e executar o projeto localmente:

Clone o repositório:

bash
Copiar código
git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/suellenraysa/salao-api.git)
Navegue até o diretório do projeto:
cd nome-do-repositorio

Instale as dependências do backend:

bash
cd backend
npm install
npm install yarn
npm install express

Inicie o servidor backend:

bash
yarn start

Configuração do Banco de Dados:

Certifique-se de ter o Postgres está instalado e rodando em sua máquina.
Crie um arquivo .env no diretório backend e adicione a string de conexão do MongoDB:
Autenticação:
DB_HOST=localhost
DB_DATABASE=BeautyHair
DB_USER=postgres
DB_PASSWORD=123456


Esse projeto precisa no Front End para ser visualizado: https://github.com/suellenraysa/salao-web.git
