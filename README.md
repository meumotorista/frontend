# Meu Motorista - Frontend

Este é o frontend da aplicação **Meu Motorista**, desenvolvido com React e Vite. A aplicação permite a gestão de usuários (motoristas e passageiros) e veículos, integrada a uma API simulada (JSON Server).

## Tecnologias Utlizadas
- **React** (v19)
- **Vite**
- **Axios** para consumo de API
- **React Router Dom** para navegação
- **Lucide React** para ícones
- **CSS Modules / Global Styles** para estilização

## Funcionalidades

### Autenticação
- Tela de Login (Simulação).
- Rotas Protegidas.

### Gestão de Usuários (CRUD)
- **Listagem**: Visualização de todos os usuários cadastrados com indicador de tipo (Motorista/Passageiro/Admin).
- **Cadastro**: Adição de novos usuários via modal.
- **Edição**: Atualização de dados cadastrais.
- **Exclusão**: Remoção de usuários do sistema.

### Gestão de Veículos (CRUD)
- **Listagem**: Visualização de veículos em cards com foto, modelo e placa.
- **Cadastro**: Adição de novos veículos via modal.
- **Edição**: Atualização de status e informações do veículo.
- **Exclusão**: Remoção de veículos.
- **Associação**: Novos veículos são associados a um motorista padrão (Demo).

## Como Executar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acesse a aplicação:**
   Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

## Estrutura do Projeto

- `/src/pages`: Componentes de página (Login, UsersPage, VehiclesPage).
- `/src/components`: Componentes reutilizáveis (Modais, Sidebar).
- `/src/services`: Configuração do Axios e chamadas à API.
- `/src/context`: Contexto de Autenticação.

## API
O frontend espera uma API rodando. Certifique-se de que o backend (JSON Server) está ativo ou a URL da API em `src/services/api.js` está correta.
