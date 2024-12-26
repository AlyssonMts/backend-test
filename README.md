# API de Gerenciamento de Tarefas

## 📝 Sobre
API RESTful para gerenciamento de tarefas e etiquetas, permitindo que usuários organizem suas atividades de forma eficiente através de um sistema de tags customizáveis.

## 🚀 Funcionalidades Principais

- Gerenciamento completo de tarefas (tasks)
- Sistema de etiquetas (tags) personalizáveis
- Vinculação de múltiplas tags às tarefas
- Autenticação segura via JWT
- Sistema de priorização de tarefas
- Datas de expiração para tarefas

## 🛠️ Endpoints

### Autenticação

#### Login
```
POST /auth/login
```
Realiza autenticação do usuário e retorna token JWT.

**Corpo da Requisição:**
```json
{
    "username": "usuario_exemplo",
    "password": "senha"
}
```

**Resposta:**
```json
{
    "token": "jwt_token_exemplo"
}
```

### Usuários

#### Criar Usuário
```
POST /users
```
Cria novo usuário no sistema.

**Corpo da Requisição:**
```json
{
    "username": "usuario_exemplo",
    "password": "senha"
}
```

### Tarefas (Tasks)

#### Listar Tarefas
```
GET /tasks
```
Retorna todas as tarefas do usuário. Aceita filtros via query params.

#### Criar Tarefa
```
POST /tasks
```
**Corpo da Requisição:**
```json
{
    "title": "Nova Tarefa",
    "description": "Descrição detalhada da tarefa",
    "priority": 1,
    "expirationDate": "2024-12-31"
}
```

#### Atualizar Tarefa
```
PATCH /tasks/:id
```
Atualiza campos específicos da tarefa.

#### Excluir Tarefa
```
DELETE /tasks/:id
```

### Etiquetas (Tags)

#### Listar Etiquetas
```
GET /tags
```
Retorna todas as etiquetas do usuário.

#### Criar Etiqueta
```
POST /tags
```
**Corpo da Requisição:**
```json
{
    "name": "Importante",
    "color": "red"
}
```

### Relacionamento Task-Tag

#### Vincular Tag à Task
```
POST /tasktags
```
**Corpo da Requisição:**
```json
{
    "taskId": 1,
    "tagId": 1
}
```

#### Buscar Tasks por Tag
```
GET /tasktags/:tagId
```

## 🔒 Autenticação

A API utiliza autenticação via Bearer Token JWT. Inclua o token em todas as requisições (exceto login e criação de usuário):

```
Authorization: Bearer jwt_token_exemplo
```

## 📊 Status de Resposta

- `200` - OK: Requisição bem-sucedida
- `201` - Created: Recurso criado com sucesso
- `204` - No Content: Operação realizada com sucesso (sem retorno)
- `400` - Bad Request: Erro nos parâmetros da requisição
- `401` - Unauthorized: Token inválido ou ausente
- `404` - Not Found: Recurso não encontrado
- `500` - Internal Server Error: Erro interno no servidor
