# Task CRUD
- [x] This is gonna be a Task List with Authentication and a Task CRUD
- [x] The test frontend code needs to be built using Javascript or Typescript with a React Framework
- [x] For the backend code, it needs to be built using a Javascript or Typescript BaaS platform or backend web framework
- [x] The communication between backend and frontend needs be using one of these 3 strategies
- [x] Authentication has to be done using an Authentication provider
- [x] For the UI of the project, you have to use a components library
- [x] For the specific task of Mark a Task as Done is required to be using a Cloud Function
- [x] Automatic Tests: Is required to implement at least 2 different tests

# Stack

This app uses the [t3 stack](https://init.tips/) which basically means:

- Next.js
- TRPC
- Prisma ORM
- Postgresql
- Docker-compose
- NextAuth.js
- Material UI

# Setup

1. Create a `.env` file with the variables showed in the `.env-example`
   - For the `DATABASE_URL` variable use
     `postgresql://postgres:example@localhost:5432/mydb`
   - For the `NEXTAUTH_SECRET` variable just run `openssl rand -base64 32` and
     get the output
   - For the `NEXTAUTH_URL` use `http://localhost:3000`
   - For the `GITHUB_ID` and `GITHUB_SECRET` go to github.com **Settings >
     Developer Settings > OAuth Apps > New OAuth app**
1. `docker-compose up -d`
1. `pnpm prisma db push`
1. `pnpm dev`

# How to run e2e test?

1. Sign in and go to the chrome devtools `(CTRL+SHIFT+I)`, then go to the application panel, in the cookies section copy the
  value of `next-auth.session-token`
  ![image](https://user-images.githubusercontent.com/30637426/179214288-52040efb-041c-4970-95ea-0096cec094c1.png)

1. Create a `cypress.env.json` file and paste the value of `next-auth.session-token` in the `COOKIE_TOKEN` variable:

```json
{
  "COOKIE_TOKEN": "<YOUR_COOKIE_TOKEN>"
}
```
