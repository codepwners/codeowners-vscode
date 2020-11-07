import { extensions } from 'vscode';
import { API, Remote } from './git';

enum GitState {
    initialized = 'initialized',
    uninitialized = 'uninitialized',
}

export class GitAdapter implements VCSAdapter {
    readonly type = 'git';
    private api: API;

    constructor() {
        const gitExtension = extensions.getExtension('vscode.git')?.exports;

        if (!gitExtension) {
            throw new Error('Git extension is undefined');
        }

        this.api = gitExtension?.getAPI(1);
    }

    isRepository(): boolean {
        return this.api.state === GitState.initialized;
    }

    async getRepositoryRemotes(): Promise<string[]> {
        const repo = this.api.repositories[0];
        const blame = await repo.blame('src/index.js');

        console.log('blame --> ', blame);
        try {
            const remotes: Remote[] = this.api.repositories[0].state.remotes;
            const urlSet: Set<string> = new Set();

            for (const remote of remotes) {
                if (remote.fetchUrl) {
                    urlSet.add(remote.fetchUrl);
                }
            }

            return [...urlSet];
        } catch (e) {
            console.error('Can not define fetch url of repository: ', e);

            return [];
        }
    }
}
