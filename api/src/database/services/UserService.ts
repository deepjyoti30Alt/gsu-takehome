import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../models/User';

import { EntityRepository, Repository } from 'typeorm';
import { UserNotFoundError } from '../../api/errors/UserNotFoundError';
import { InvalidCredentialsError } from '../../api/errors/InvalidCredentialsError';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
    ) { }

    public findById(id: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: {
                id,
            }
        });
    }

    public async create(user: User): Promise<User> {
        user.id = uuidv4();
        const newUser = await this.userRepository.save(user);
        return newUser;
    }

    public async validateCredentials(email: string, password: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        })

        if (!user) throw UserNotFoundError;

        if (!await User.comparePassword(user, password)) throw new InvalidCredentialsError;

        return user;
    }
}
