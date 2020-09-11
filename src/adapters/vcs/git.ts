import { promisify } from 'util';
import { exec } from 'child_process';

const execPromise = promisify(exec);

export class GitAdapter implements VCSAdapter {
    async isRepository(path: string): Promise<boolean> {
        try {
            await execPromise(`git -C ${path} rev-parse --git-dir 2>/dev/null`);
            return true;
        } catch (e) {
            return false;
        }
    }
}
