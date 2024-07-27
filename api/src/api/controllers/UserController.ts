import {
    Authorized, Body, Get, JsonController, Post, Req
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { User } from '../../database/models/User';
import { UserService } from '../../database/services/UserService';
import { LoginUserDetails, LoginUserInDetails, UserCreateDetails, UserDetails } from '../../schema/User';
import { plainToClass } from 'class-transformer';


@JsonController('/users')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Authorized()
    @Get('/me')
    @ResponseSchema(UserDetails)
    public findMe(@Req() req: any): Promise<User> {
        return req.user;
    }

    @Post("/signup")
    @ResponseSchema(UserDetails)
    public create(@Body() body: UserCreateDetails): Promise<User> {
        const user = new User();
        user.email = body.email;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.password = body.password;

        return this.userService.create(user);
    }

    @Post("/login")
    @ResponseSchema(LoginUserDetails)
    public async handleUserLogin(@Body() body: LoginUserInDetails): Promise<LoginUserDetails> {
        const user = await this.userService.validateCredentials(body.email, body.password);
        return plainToClass(LoginUserDetails, { id: user.id });
    }
}