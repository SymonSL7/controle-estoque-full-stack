# Documentação da API de Produtos

## Base URL

```
/api/v1
```

---

### 1. Listar Produtos

- **Endpoint:** `/listar`
- **Método:** `GET`
- **Descrição:** Retorna a lista de todos os produtos cadastrados.
- **Resposta de Sucesso (200):**
  ```json
  [
    {
      "sku": 1,
      "nome": "Produto A",
      "quantidade": 10,
      "precoCompra": 5.0,
      "precoVenda": 10.0
    }
  ]
  ```

---

### 2. Cadastrar Produto

- **Endpoint:** `/cadastrar`
- **Método:** `POST`
- **Descrição:** Cadastra um novo produto.
- **Body (form-data ou x-www-form-urlencoded):**
  - `sku` (obrigatório)
  - `nome` (obrigatório)
  - `precoCompra` (obrigatório)
  - `precoVenda` (obrigatório)
- **Resposta de Sucesso (200):**
  ```
  Produto cadastrado com sucesso
  ```
- **Erros comuns:**
  - Campos obrigatórios não preenchidos: 400
  - SKU já cadastrado: 400
  - Preço negativo: 400
  - Preço de compra maior que o de venda: 400

---

### 3. Editar Produto

- **Endpoint:** `/editar/{sku}`
- **Método:** `PUT`
- **Descrição:** Edita os dados de um produto existente.
- **Body (JSON):**
  - `sku` (opcional)
  - `nome` (opcional)
  - `precoCompra` (opcional)
  - `precoVenda` (opcional)
- **Resposta de Sucesso (200):**
  ```
  Produto editado com sucesso
  ```
- **Erros comuns:**
  - Produto não encontrado: 404

---

### 4. Entrada de Estoque

- **Endpoint:** `/entrada/{sku}`
- **Método:** `PUT`
- **Descrição:** Adiciona quantidade ao estoque de um produto.
- **Body (JSON):**
  - `quantidade` (obrigatório)
- **Resposta de Sucesso (200):**
  ```
  Entrada realizada com sucesso
  ```
- **Erros comuns:**
  - Produto não encontrado: 404

---

### 5. Saída de Estoque

- **Endpoint:** `/saida/{sku}`
- **Método:** `PUT`
- **Descrição:** Remove quantidade do estoque de um produto.
- **Body (JSON):**
  - `quantidade` (obrigatório)
- **Resposta de Sucesso (200):**
  ```
  Saida realizada com sucesso
  ```
- **Erros comuns:**
  - Produto não encontrado: 404
  - Quantidade negativa: 400

---

### 6. Deletar Produto

- **Endpoint:** `/deletar/{sku}`
- **Método:** `DELETE`
- **Descrição:** Remove um produto do sistema.
- **Resposta de Sucesso (200):**
  ```
  Produto deletado com sucesso
  ```
- **Erros comuns:**
  - Produto não encontrado: 404
