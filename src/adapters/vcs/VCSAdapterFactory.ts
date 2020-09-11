import { GitAdapter } from './git';

const NO_ADAPTER = 'No adapter is selected';

export enum SupportedAdapterType {
    git,
}

export class VCSAdapterFactory {
    static create(adapter: SupportedAdapterType): VCSAdapter {
        switch (adapter) {
            case SupportedAdapterType.git:
                return new GitAdapter();
            default:
                throw Error(NO_ADAPTER);
        }
    }
}
