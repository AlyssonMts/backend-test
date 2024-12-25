# API de Gerenciamento de Tarefas

## Descrição Geral

Esta API permite que usuários gerenciem tarefas (tasks) e etiquetas (tags), possibilitando a vinculação entre elas. Uma tarefa pode ter múltiplas tags e uma tag pode estar vinculada a várias tarefas.

## Principais Funcionalidades

- Gerenciamento de usuários (criar conta e autenticar)
- Gerenciamento de tarefas (CRUD)
- Gerenciamento de etiquetas (CRUD)
- Vinculação entre tarefas e etiquetas

## Autenticação

A API utiliza autenticação via Token JWT.

### Login

```
POST /auth/login

Requisição:
{
    "email": "email_exemplo",
    "password": "senha"
}

Resposta:
{
    "token": "jwt_token_exemplo",
    "expiresIn": "3600"
}
```

Para usar o token nas requisições, adicione no header:
```
Authorization: Bearer jwt_token_exemplo
```

## Endpoints

### Tasks

#### Listar Tarefas
```
GET /tasks

Resposta:
[
    {
        "id": 1,
        "title": "Task 1",
        "description": "Descrição da Task 1",
        "status": "IN_PROGRESS",
        "priority": 1,
        "expirationDate": "2024-12-31"
    }
]
```

#### Criar Tarefa
```
POST /tasks

Requisição:
{
    "title": "Task 1",
    "description": "Descrição da Task 1",
    "priority": 1,
    "expirationDate": "2024-12-31"
}
```

#### Atualizar Tarefa
```
PATCH /tasks/:id

Requisição:
{
    "title": "Task Atualizada",
    "description": "Nova descrição da Task",
    "status": "FINISHED",
    "priority": 5,
    "expirationDate": "2024-12-30"
}
```

#### Deletar Tarefa
```
DELETE /tasks/:id
```

### Tags

#### Listar Tags
```
GET /tags

Resposta:
{
    "id": 1,
    "name": "Tag 1",
    "color": "white"
}
```

#### Criar Tag
```
POST /tags

Requisição:
{
    "name": "Tag 1",
    "color": "white"
}
```

#### Atualizar Tag
```
PATCH /tags/:id

Requisição:
{
    "name": "Tag Atualizada",
    "color": "white"
}
```

#### Deletar Tag
```
DELETE /tags/:id
```

### Relações Task-Tag

#### Listar Relações
```
GET /tasktags

Resposta:
[
    {
        "taskId": 1,
        "tagId": 1
    }
]
```

#### Criar Relação
```
POST /tasktags

Requisição:
{
    "taskId": 1,
    "tagId": 1
}
```

#### Buscar Tasks por Tag
```
GET /tasktags/:id

Resposta:
[
    {
        "task": {
            "id": 1,
            "title": "Task 1",
            "description": "Descrição da Task 1",
            "status": "IN_PROGRESS",
            "priority": 1,
            "expirationDate": "2024-12-31T23:59:59Z"
        },
        "tag": {
            "id": 1,
            "name": "Tag 1",
            "color": "white"
        }
    }
]
```

#### Deletar Relação
```
DELETE /tasktags/:id
```

### Usuários

#### Listar Informações do Usuário
```
GET /users/:id

Resposta:
{
    "id": 1,
    "email": "email_exemplo",
    "password": "senha_criptografada"
}
```

#### Criar Usuário
```
POST /users

Requisição:
{
    "email": "email_exemplo",
    "password": "senha"
}
```

#### Deletar Usuário
```
DELETE /users/:id
```


- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `204 No Content`: Requisição bem-sucedida sem conteúdo de resposta
- `400 Bad Request`: Erro nos parâmetros da requisição
- `401 Unauthorized`: Token de autenticação inválido ou ausente
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro interno no servidor
