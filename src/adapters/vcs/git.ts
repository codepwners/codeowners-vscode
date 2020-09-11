import { promisify } from 'util';
import { exec } from 'child_process';

const execPromise = promisify(exec);

export class GitAdapter implements VCSAdapter {
    async getFileRepositoryRoot(file: string): Promise<string | null> {
        try {
            const { stdout } = await execPromise(`git rev-parse --show-toplevel`);
            return stdout;
        } catch (e) {
            return null;
        }
    }

    async isRepository(path: string): Promise<boolean> {
        try {
            await execPromise(`git -C ${path} rev-parse --git-dir 2>/dev/null`);
            return true;
        } catch (e) {
            return false;
        }
    }
}
