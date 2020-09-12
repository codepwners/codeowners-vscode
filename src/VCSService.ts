import { VCSAdapterFactory, SupportedAdapterType } from './adapters/vcs/VCSAdapterFactory';
import { asyncFind } from './AsyncUtils';

interface VCSInfo {
    type: string;
    remotes: string[];
}

/**
 * This service will memoize some repository data that
 * might change in rare cases (like origin). This trade-off
 * has been taken consciously to avoid multiple system calls
 */
export class VCSService {
    private adapters: VCSAdapter[];
    private checkupMap = new Map();

    constructor(supportedAdapterTypes: SupportedAdapterType[] = [SupportedAdapterType.git]) {
        this.adapters = supportedAdapterTypes.map(VCSAdapterFactory.create);
    }

    async getVCSInfo(path: string): Promise<Readonly<VCSInfo> | null> {
        if (this.checkupMap.has(path)) {
            return this.checkupMap.get(path);
        }

        const adapter = await asyncFind(this.adapters, async (adapter: VCSAdapter) => await adapter.isRepository(path));

        if (adapter) {
            return {
                type: adapter.type,
                remotes: await adapter.getRepositoryRemotes(path),
            };
        }

        return null;
    }
}
