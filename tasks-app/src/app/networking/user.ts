/**
 * Handle user related networking functionality.
 */

import { InvalidCredentialsError, UserNotFoundError, UserSignupError } from "../lib/errors/UserError";
import { AuthData } from "../lib/features/authDataSlice";
import { UserCredentials, UserSessionDetails, UserSignupDetails } from "../types/user";

export const signupUser = async (details: UserSignupDetails): Promise<void> => {
    /**
     * Signup the user
     */
    const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(details)
    })

    if (!res.ok) throw new UserSignupError;

    return;
}

export const loginUser = async (details: UserCredentials): Promise<AuthData> => {
    /**
     * Login the user by using the passed details and return the
     * authentication data if successful.
     * 
     * Throw an error if invalid.
     */
    const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
    });

    if (!res.ok) throw new InvalidCredentialsError;

    const { id } = await res.json();

    return {
        userId: id,
        password: details.password
    }
}

export const getUserDetails = async (authToken: string): Promise<UserSessionDetails> => {
    /**
     * Get the details of the logged in user.
     */
    const res = await fetch("/api/users/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${authToken}`
        },
    });

    if (!res.ok) throw new UserNotFoundError;

    return await res.json();
}
