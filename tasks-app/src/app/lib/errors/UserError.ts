/**
 * Define all errors related to users.
 */

export class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid credentials passed');
    }
}
