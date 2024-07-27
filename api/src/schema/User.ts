import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class BaseUser {
    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;
}

export class UserDetails extends BaseUser {
    @IsUUID()
    public id: string
}

export class UserCreateDetails extends BaseUser {
    @IsNotEmpty()
    public password: string;
}

export class LoginUserInDetails {
    @IsNotEmpty()
    public email: string

    @IsNotEmpty()
    public password: string
}

export class LoginUserDetails {
    @IsNotEmpty()
    public id: string;
}
