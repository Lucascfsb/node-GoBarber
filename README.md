# GoBarber API

## Sobre o Projeto

A **GoBarber API** é um back-end desenvolvido em TypeScript para gerenciar um sistema de agendamentos de serviços de barbearia. Ele oferece funcionalidades para clientes e prestadores de serviços, como agendamento de horários, notificações em tempo real, recuperação de senha, entre outros.

---

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias e bibliotecas:

- **[Node.js](https://nodejs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[TypeORM](https://typeorm.io/)**
- **[Redis](https://redis.io/)**
- **[MongoDB](https://www.mongodb.com/)**
- **[Socket.io](https://socket.io/)**
- **[Amazon SES](https://aws.amazon.com/ses/)** e **[Mailtrap](https://mailtrap.io/)**
- **[Nodemailer](https://nodemailer.com/)**
- **[Celebrate](https://github.com/arb/celebrate)**
- **[JWT](https://jwt.io/)**

---

## 🎯 Funcionalidades

### **Recuperação de Senha**
- Recuperação de senha por e-mail.
- Envio de e-mails com instruções de recuperação usando Mailtrap (dev) ou Amazon SES (produção).
- Link de reset de senha com validade de 2 horas.

### **Atualização de Perfil**
- Atualização de nome, e-mail e senha.
- Validação da senha antiga ao atualizar a senha.
- Confirmação da nova senha.

### **Painel do Prestador**
- Listagem de agendamentos de um dia específico.
- Notificações em tempo real para novos agendamentos.
- Controle de notificações lidas e não lidas.

### **Agendamento de Serviços**
- Listagem de prestadores de serviço disponíveis.
- Visualização de horários disponíveis por dia/mês.
- Criação de novos agendamentos.
- Restrições:
  - Agendamentos disponíveis apenas entre 8h e 18h.
  - Um agendamento dura 1 hora.
  - Não é possível agendar em horários passados ou já ocupados.
  - Não é possível agendar consigo mesmo.

---

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura modular organizada em diretórios como:

```
src/
├── modules/
├── config/
├── shared/
├── infra/
│   ├── http/
│   ├── typeorm/
│   ├── redis/
│   └── mongodb/
```

---

## 🛠 Instalação e Execução

### Pré-requisitos
- **Node.js** (v16 ou superior)
- **Yarn**
- **PostgreSQL**
- **Redis**
- **MongoDB**

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/Lucascfsb/node-GoBarber.git
   cd node-GoBarber
Instale as dependências:

```bash
yarn install
````
Configure as variáveis de ambiente: Crie um arquivo .env baseado no .env.example e configure as credenciais do banco de dados e serviços externos.

Execute as migrações do banco de dados:

```bash
yarn typeorm migration:run
```
Inicie o servidor:

```bash
yarn dev
```
🧪 Testes
O projeto utiliza o Jest para os testes. Para executar os testes, use:

```bash
yarn test
```
