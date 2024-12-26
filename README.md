# API de Gerenciamento de Tarefas

## 📝 Sobre
API RESTful para gerenciamento de tarefas e etiquetas, permitindo que usuários organizem suas atividades de forma eficiente através de um sistema de tags personalizáveis.

## 🚀 Funcionalidades Principais

- Gerenciamento completo de tarefas
- Sistema de etiquetas (tags) personalizáveis
- Vinculação de múltiplas tags às tarefas
- Autenticação segura via JWT
- Sistema de priorização de tarefas
- Datas de expiração para tarefas

## 🛠️ Endpoints

### 1. **Autenticação**

#### Login
**Endpoint**: `POST /auth/login`

Realiza a autenticação do usuário e retorna o token JWT.

**Corpo da Requisição**:
```json
{
    "email": "usuario_exemplo",
    "password": "senha"
}
```

**Resposta**:
```json
{
    "token": "jwt_token_exemplo",

}
```

### 2. **Usuários**

#### Criar Usuário
**Endpoint**: `POST /users`

Cria um novo usuário no sistema.

**Corpo da Requisição**:
```json
{
    "email": "usuario_exemplo",
    "password": "senha"
}
```

### 3. **Tarefas (Tasks)**

#### Listar Tarefas
**Endpoint**: `GET /tasks`

Retorna todas as tarefas do usuário autenticado. Aceita filtros via query params.

**Exemplo de Requisição**:
```http
GET /tasks?priority=1&expirationDate=2024-12-31
```

**Resposta**:
```json
[
    {
        "id": 1,
        "title": "Nova Tarefa",
        "description": "Descrição detalhada da tarefa",
        "priority": 1,
        "expirationDate": "2024-12-31",
    },
    ...
]
```

#### Criar Tarefa
**Endpoint**: `POST /tasks`

Cria uma nova tarefa.

**Corpo da Requisição**:
```json
{
    "title": "Nova Tarefa",
    "description": "Descrição detalhada da tarefa",
    "priority": 1,
    "expirationDate": "2024-12-31"
}
```

**Resposta**:
```json
{
    "id": 1,
    "title": "Nova Tarefa",
    "description": "Descrição detalhada da tarefa",
    "priority": 1,
    "expirationDate": "2024-12-31"
}
```

#### Atualizar Tarefa
**Endpoint**: `PATCH /tasks/:id`

Atualiza campos específicos de uma tarefa.

**Corpo da Requisição**:
```json
{
    "title": "Nova Tarefa Atualizada",
    "description": "Descrição detalhada da tarefa",
    "priority": 2,
    "expirationDate": "2024-12-31"
}
```

**Resposta**:
```json
{
    "id": 1,
    "title": "Nova Tarefa Atualizada",
    "description": "Descrição detalhada da tarefa",
    "priority": 2,
    "expirationDate": "2024-12-31"
}
```

#### Excluir Tarefa
**Endpoint**: `DELETE /tasks/:id`

Exclui uma tarefa específica.

**Resposta**:
```json
{
    "message": "Tarefa excluída com sucesso"
}
```

### 4. **Etiquetas (Tags)**

#### Listar Etiquetas
**Endpoint**: `GET /tags`

Retorna todas as etiquetas associadas ao usuário.

**Resposta**:
```json
[
    {
        "id": 1,
        "name": "Importante",
        "color": "red"
    },
    {
        "id": 2,
        "name": "Urgente",
        "color": "yellow"
    }
]
```

#### Criar Etiqueta
**Endpoint**: `POST /tags`

Cria uma nova etiqueta.

**Corpo da Requisição**:
```json
{
    "name": "Importante",
    "color": "red"
}
```

**Resposta**:
```json
{
    "id": 1,
    "name": "Importante",
    "color": "red"
}
```

### 5. **Relacionamento Task-Tag**

#### Vincular Tag à Task
**Endpoint**: `POST /tasktags`

Vincula uma tag a uma tarefa.

**Corpo da Requisição**:
```json
{
    "taskId": 1,
    "tagId": 1
}
```

**Resposta**:
```json
{
    "message": "Tag vinculada à tarefa com sucesso"
}
```

#### Buscar Tasks por Tag
**Endpoint**: `GET /tasktags/:tagId`

Busca tarefas associadas a uma tag específica.

**Resposta**:
```json
[
    {
        "id": 1,
        "title": "Nova Tarefa",
        "description": "Descrição detalhada da tarefa",
        "priority": 1,
        "expirationDate": "2024-12-31"
    }
]
```

---

## 🔒 Autenticação

A API utiliza autenticação via Bearer Token JWT. Inclua o token no cabeçalho de autorização de todas as requisições (exceto login e criação de usuário):

**Exemplo de cabeçalho**:
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
