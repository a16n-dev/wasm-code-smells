export interface BugReport {
  category: string;
  type: string;
  check: string;
  line: number;
  col: number;
  file: string;
}
