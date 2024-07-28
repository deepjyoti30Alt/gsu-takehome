/**
 * Store all types related to user handling.
 */

export interface UserCredentials {
    email: string
    password: string
}

export interface UserSignupDetails extends UserCredentials {
    first_name: string
    last_name: string
}

export interface UserSessionDetails {
    id: string
    first_name: string
    last_name: string
    email: string
    createdAt: Date
}
