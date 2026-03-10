# mission-cards

Página estática com os 8 estudos de caso da disciplina, no formato de mission cards para os grupos acessarem os desafios.

## Estrutura
- `index.html`: estrutura da página e seções principais.
- `styles.css`: identidade visual, layout responsivo e animações.
- `app.js`: dados dos 8 cards e renderização dos conteúdos.
- `vercel.json`: configuração mínima para deploy estático na Vercel.

## Executar localmente
Abra o arquivo `index.html` no navegador ou use um servidor estático simples.

Exemplo com Python:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080/mission-cards`.

## Deploy na Vercel
1. Crie o repositório `mission-cards` no GitHub.
2. Envie estes arquivos para o repositório.
3. Na Vercel, clique em **Add New... > Project**.
4. Importe o repositório `mission-cards`.
5. Mantenha as configurações padrão (framework `Other`, build command vazio).
6. Clique em **Deploy**.

A publicação será automática a cada novo push na branch principal.
