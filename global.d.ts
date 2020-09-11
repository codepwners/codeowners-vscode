interface VCSAdapter {
    isRepository(path: string): Promise<boolean>;
    getFileRepositoryRoot(file: string): Promise<string | null>;
}
