import { extensions } from 'vscode';
import { GitState, Remotes } from './types';

// const gitExtension = extensions?.getExtension('vscode.git')?.exports;
// console.log('gitExtension --> ', gitExtension);
// const api = gitExtension?.getAPI(1);
// const repo = api.repositories[0];
// const head = repo.state.HEAD;

// // Get the branch and commit 
// const {commit,name: branch} = head;

// // Get head of any other branch
// const mainBranch = 'main'
// const branchDetails = await repo.getBranch(mainBranch);

// // Get last merge commit
// const lastMergeCommit = await repo.getMergeBase(branch, mainBranch);

// const status = await repo.status(); uninitialized initialized

export class GitAdapter implements VCSAdapter {
    readonly type = 'git';
    private api: any;

    constructor() {
      const gitExtension = extensions.getExtension('vscode.git')?.exports;

      this.api = gitExtension?.getAPI(1);
    }

    isRepository(): boolean {
        try {
            if (this.api.state === GitState.initialized) {

              return true;
            }

            return false;
        } catch (e) {
            console.error('Can not define state of repository: ', e);

            return false;
        }
    }

    getRepositoryRemotes(): string[] {
      try {
        const remotes: Remotes[] = this.api.repositories[0].state.remotes;
        const urlSet: Set<string> = new Set();

        for (const remote of remotes) {
          urlSet.add(remote.fetchUrl);
        }

        return [...urlSet];
      } catch (e) {
        console.error('Can not define fetch url of repository: ', e);

        return [];
      }
    }
}
