/**
 * Define all errors related to users.
 */

export class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid credentials passed');
    }
}

export class UserNotFoundError extends Error {
    constructor() {
        super('User not found')
    }
}
