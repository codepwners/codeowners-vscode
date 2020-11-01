export enum GitState {
  initialized = 'initialized',
  uninitialized = 'uninitialized',
}

export type Remotes = {
  name: string;
  isReadOnly: boolean;
  fetchUrl: string;
  pushUrl: string;
};