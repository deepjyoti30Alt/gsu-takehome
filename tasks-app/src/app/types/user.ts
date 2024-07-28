/**
 * Store all types related to user handling.
 */

export interface UserCredentials {
    email: string
    password: string
}

export interface UserSignupDetails extends UserCredentials {
    firstName: string
    lastName: string
}

export interface UserSessionDetails {
    id: string
    first_name: string
    last_name: string
    email: string
    createdAt: Date
}
