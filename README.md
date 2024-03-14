# Cat Hunter

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

---

## Project structure

- `cat-hunter` - Frontend application (Vite & React-ts)
- `cat-hunter-backend` - Backend application (Nest.js)
- `@cathunt/*` - Shared code between the frontend and backend (All in TypeScript)

---

## Each technology used and its purposes

- Docker*: To run the MySQL database in a container
- Prisma*: ORM used to interact with the database, so that we can use TypeScript and don't have to write raw SQL
- Vite (React frontend): Frontend application
- Nest.js (Express.js): Backend application
- Nx: Monorepo management. This allows me to share code between the backend and frontend via packages I create (one example of the package I created is `@cathunt/types`)

_* Items with asterisks are optional and not relevant to the base project (or there are alternatives to the problem)_

---

## Setup database

To set up the database, you have two options:

### Option 1: Via Docker (Make sure Docker is installed)

1. Run `docker compose up` to start the database
2. Run `prisma db push` to create the database and tables

### Option 2: Via MySQL (Make sure MySQL is installed)

1. Create a database called `cathunter`
2. Run the SQL in `prisma/generated.sql` to create the tables (init SQL script)

## Run

1. Install dependencies by running `yarn`
2. Set up the database (see above)
3. Copy `.env.example` to `.env` and fill in the environment variables

```shell
nx run cat-hunter:serve # Starts the frontend
nx run cat-hunter-backend:serve:development # Starts the backend
```
