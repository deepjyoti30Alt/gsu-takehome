/**
 * Handle user related networking functionality.
 */

import { InvalidCredentialsError } from "../lib/errors/UserError";
import { AuthData } from "../lib/features/authDataSlice";
import { UserCredentials } from "../types/user";

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
