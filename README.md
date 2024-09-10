<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Energy Nexus Data RESTful API

### Live Demo

:warning: App deployed on AWS is using insecure HTTP protocol.

:warning: HTTP protocol DOES NOT encrypt passwords and they can be intercepted and read by anyone with access to the network traffic.

:warning: In this application, when entering passwords to create new users or login as an already existing, DO NOT ENTER passwords that could compromise any of your external online services or accounts.

[http:51.92.82.16:3001/api](http:51.92.82.16:3001/api)

```
User: user@user.com
Password: Abc123456

User: admin@admin.com
Password: Abc123456
(with admin roles)
```

### Instructions for local setup

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

7.Execute seed

```
http://localhost:{{PORT}}/api/seed
```

8.Ater creating a new user, go to your database and set up admin role for this user. (pending seed or an endpoint to promote users)

9.Enjoy the API in swagger

```
http://localhost:{{PORT}}/api
```
