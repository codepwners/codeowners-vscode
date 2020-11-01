interface VCSAdapter {
    readonly type: string;
    isRepository(path?: string): Promise<boolean> | boolean;
    getRepositoryRemotes(path: string): Promise<string[]> | string[];
}

interface VCSInfo {
    type: string;
    remotes: string[];
}

interface Serializable {
    toJSON(): string;
}

interface TextEditorLocationInfo {}
