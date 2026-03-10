# mission-cards

Página estática com os 10 estudos de caso da disciplina, no formato de mission cards para os grupos acessarem os desafios.

## Recursos
- Visualização dos 10 mission cards com links diretos para os repositórios.
- Seção de autor da atividade com perfil e certificações.
- Gerador de distribuição automática de equipes (até 10 equipes), com redistribuição e cópia do resultado.

## Estrutura
- `index.html`: estrutura principal da página, seção de autor e grade de desafios.
- `styles.css`: identidade visual, responsividade e animações.
- `app.js`: dados dos 10 cards, renderização dinâmica, distribuição automática de equipes e efeitos de interação.
- `assets/logo-mission-cards.svg`: logo oficial do projeto exibida no topo.
- `assets/favicon.svg`: favicon vetorial da aplicação.
- `assets/arimateia-junior.png`: foto do autor exibida na página.
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
