interface VCSAdapter {
    readonly type: string;
    isRepository(path: string): Promise<boolean>;
    getRepositoryRemotes(path: string): Promise<string[]>;
}
