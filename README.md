## Data persistence 

Com base no que foi discutido, em grupos, construam uma aplicação (web ou console) capaz de gerenciar a persistência de dados abaixo. Inserir, consultar, deletar e atualizar os registros.

Utilize TypeORM ou Prisma ORM e JUSTIFIQUE o motivo pela escolha do framework e também a abordagem escolhida (3 slides máximo + github repo).

User (name, email, id)
Author (tags, surname, completeName, is a User)
Post (title, text, belongs to author)
Comment (text, belongs to post, belongs to user)


Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

## Integrantes
- Luma Góes
- Maria Junqueira
- Rafael Baptista
- Robert Alexandre
