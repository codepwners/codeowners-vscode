interface VCSAdapter {
    isRepository(path: string): Promise<boolean>;
}
