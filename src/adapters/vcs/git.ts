import { dirname } from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

const execPromise = promisify(exec);

export class GitAdapter implements VCSAdapter {
    readonly type = 'git';

    async isRepository(path: string): Promise<boolean> {
        try {
            const { stdout } = await execPromise(`git -C ${dirname(path)} rev-parse --git-dir 2>/dev/null`);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async getRepositoryRemotes(path: string): Promise<string[]> {
        try {
            const { stdout } = await execPromise(`git -C ${dirname(path)} remote -v`);
            return [...new Set(stdout.match(/((?:git|https).+.git)/))];
        } catch (e) {
            return [];
        }
    }
}
