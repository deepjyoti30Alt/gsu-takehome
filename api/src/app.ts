import { Application } from 'express';
import { createExpressServer } from 'routing-controllers';
import { createConnection, getConnectionOptions } from 'typeorm';
import { useContainer as classValidatorUseContainer } from 'class-validator';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { useContainer as ormUseContainer } from 'typeorm';
import * as express from 'express';
import { configure, format, transports } from 'winston';

import { authorizationChecker } from './api/auth/authorizationChecker';
import { currentUserChecker } from './api/auth/currentUserChecker';
import { env } from './env';

configure({
    transports: [
        new transports.Console({
            level: env.log.level,
            handleExceptions: true,
            format: env.node !== 'development'
                ? format.combine(
                    format.json()
                )
                : format.combine(
                    format.colorize(),
                    format.simple()
                ),
        }),
    ],
});

const startup = async () => {
    routingUseContainer(Container);
    ormUseContainer(Container);
    classValidatorUseContainer(Container);

    const loadedConnectionOptions = await getConnectionOptions();

    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: env.db.type as any,
        host: env.db.host,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        synchronize: env.db.synchronize,
        logging: env.db.logging,
        ssl: true,
    });
    const connection = await createConnection(connectionOptions);

    const expressApp: Application = createExpressServer({
        cors: false,
        classTransformer: true,
        routePrefix: env.app.routePrefix,
        defaultErrorHandler: false,
        /**
         * We can add options about how routing-controllers should configure itself.
         * Here we specify what controllers should be registered in our express server.
         */
        controllers: env.app.dirs.controllers,
        middlewares: env.app.dirs.middlewares,

        /**
         * Authorization features
         */
        authorizationChecker: authorizationChecker(connection),
        currentUserChecker: currentUserChecker(connection),
    });

    expressApp.get(
        env.app.routePrefix,
        (req: express.Request, res: express.Response) => {
            return res.json({
                name: env.app.name,
                version: env.app.version,
                description: env.app.description,
            });
        }
    );

    expressApp.listen(5001)
}

startup();
