import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../models/User';

import { EntityRepository, Repository } from 'typeorm';

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
}
