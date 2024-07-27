import { Action } from 'routing-controllers';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { AuthService } from './AuthService';

export function authorizationChecker(connection: Connection): (action: Action, roles: any[]) => Promise<boolean> | boolean {
    const authService = Container.get<AuthService>(AuthService);

    return async function innerAuthorizationChecker(action: Action, roles: string[]): Promise<boolean> {
        // Parse the basic auth received in the request and check if
        // the password matches.
        //
        // The function should return a boolean value depending on whether validation
        // was successful or not.
        const credentials = authService.parseBasicAuthFromRequest(action.request);

        if (credentials === undefined) {
            return false;
        }

        action.request.user = await authService.validateUser(credentials.userId, credentials.password);
        if (action.request.user === undefined) {
            return false;
        }

        return true;
    };
}
