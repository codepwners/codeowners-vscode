import { TextEditorAdapter } from './adapters/editor/TextEditorAdapter';
import { VCSAdapterFactory, SupportedAdapterType } from './adapters/vcs/VCSAdapterFactory';
import { asyncFind } from './AsyncUtils';
import { Cache } from './Cache';

/**
 * This service will memoize some repository data that
 * might change in rare cases (like origin). This trade-off
 * has been taken consciously to avoid multiple system calls
 */
export class VCSService {
    private adapters: VCSAdapter[];
    private cache = new Cache<VCSInfo>();

    constructor(supportedAdapterTypes: SupportedAdapterType[] = [SupportedAdapterType.git]) {
        this.adapters = supportedAdapterTypes.map(VCSAdapterFactory.create);
    }

    async getVCSInfo(editorAdapter: TextEditorAdapter): Promise<Readonly<VCSInfo> | null> {
        const path = editorAdapter.getPath();

        if (this.cache.get(path) !== null) {
            return this.cache.get(path);
        }

        const adapter = await asyncFind(this.adapters, async (adapter: VCSAdapter) => await adapter.isRepository(path));

        if (adapter) {
            this.cache.set(path, {
                type: adapter.type,
                remotes: await adapter.getRepositoryRemotes(path),
            });
            return this.cache.get(path);
        }

        return null;
    }
}
