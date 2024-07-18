## Tech Stack

# Backend

- Nest JS
- GraphQL
- Apollo Server
- JWT

# Database

- postgres

# ORM

- TypeORM

# Frontend

- React
- Next
- ShadCN UI
- Apollo Client
- GraphQL

## Installation

```bash
git clone https://github.com/ankitdev10/-Ankit-Poudel-SimplifiedDashboard-Task.git or git@github.com:ankitdev10/-Ankit-Poudel-SimplifiedDashboard-Task.git
```

The api directory contains the backend code and the client directory contains the frontend code.

# With docker

A little side note. There are two ways to run compose file. One is using docker-compose and another is using docker compose. One is written in Python while other is written in go.

```bash
Prefarably please use docker compose and not docker-compose(I have incosistent issue with docker-compose. You may not face the issue)

- Run `docker compose down -v` to remove all containers and volumes (Crucial becaue there might be postgres instance with same creds already in docker container)
- Run `docker compose build --no-cache` to build the containers
- Run `docker compose up` to start the containers
```

- Now you can access the API at `localhost:4000/graphql`
- The frontend is at `localhost:3000`

I have not ignored the env file for the reviewer's convience. So you can just start the container b following steps mentioned above

## VERY IMPORTANT

- Please clear the cache of your browser because the localhost may already have the cookie set.
- Takes 8 minutes to build on my machine. May differ on yours.

# Key Points

- Whenever a new container is initialized, the program automatically creates a database and inserts dummy data so that the tables are not empty.

You can login to fronend with the following credentials

```
username: superadmin
password: password123
```

- Due to time constraint, I was not able to make the sidebar collapsible.
