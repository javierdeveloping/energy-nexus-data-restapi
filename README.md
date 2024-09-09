<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

#Energy Nexus Data RESTful API

1.Clone the project

2.Install dependencies

```
pnpm install
```

3.Copy `.env.example` file and rename it to `.env`

4.Set up .env file with appropiate environment variables

5.Run postgreSQL database local instance define in `docker-compose.yaml`

```
docker-compose up -d
```

6.Start NestJS server

```
pnpm run start:dev
```

7.Execute seed (if available)

```
http://localhost:{{PORT}}/api/seed
```
