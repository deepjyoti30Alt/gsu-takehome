import * as express from 'express';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../../database/models/User';
import { UserRepository } from '../../database/services/UserService';
import { Logger, LoggerInterface } from '../../decorators/Logger';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        @OrmRepository() private userRepository: UserRepository
    ) { }

    public parseBasicAuthFromRequest(req: express.Request): { userId: string, password: string } {
        const authorization = req.header('authorization');

        if (authorization && authorization.split(' ')[0] === 'Basic') {
            this.log.info("Credentials found, parsing them.")
            const decodedBase64 = Buffer.from(authorization.split(' ')[1], 'base64').toString('ascii');
            const userId = decodedBase64.split(':')[0];
            const password = decodedBase64.split(':')[1];
            if (userId && password) {
                return { userId, password };
            }
        }

        this.log.info('Credentials not provided, cannot authorize')
        return undefined;
    }

    public async validateUser(id: string, password: string): Promise<User> {
        // Validate the user's password and accordingly populate the
        // details of the logged in user.
        const user = await this.userRepository.findOne({
            where: {
                id,
            },
        });

        if (await User.comparePassword(user, password)) {
            return user;
        }

        return undefined;
    }

}