import { authentication } from 'vscode';

export enum AuthProviders {
    github = 'github',
    microsoft = 'microsoft',
}

export class Auth {
    async request(provider: AuthProviders, scopes: string[]): Promise<void> {
        await authentication.getSession(provider, scopes, { createIfNone: true });
    }
}
