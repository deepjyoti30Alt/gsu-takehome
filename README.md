# Tasks App

This is a monorepo for the tasks app. Please read ahead to get started running it locally.

## Running with single command

The entire app can be run with a single docker command. The env variables need to be setup beforehand in order for the app to run properly.

```sh
docker build -t gsu-takehome-fullstack .
```

Once the image is built, run it with:

```sh
docker run --env-file=./tasks-app/.env.local -p 3000:3000 gsu-app --name gsu-app
```

The app will now be available at [http://localhost:3000](http://localhost:3000)

## API

API is built with express and is part of the `api` directory.

It can be run with the following commands inside that directory:

```sh
bun install && bun dev
```

### Environment Variables

Some environment variables are required in order to run the API. Refer to the `env.example` file in that directory.

> Note that a PostgreSQL database is also required.

## Web

The web-app is built with Next.JS (with TypeScript) and uses TailwindCSS. All the content is in the `tasks-app` directory.

It can be run with the following commands inside that directory:

```sh
bun install && bun dev
```

### Environment Variables

The web just needs access to the API in order to run. Refer to the `env.example`file in that directory.
