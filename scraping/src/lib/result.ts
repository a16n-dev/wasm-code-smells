export interface RepositoryQueryResult {
  id: number;
  name: string;
  url: string;
  user?: {
    id: number;
    name: string;
  };
  createdAt: string;
  modifiedAt: string;
  stars: number;
  watchers: number;
  size: number;
  forks: number;
  openIssues: number;
  topics: string[];
}
