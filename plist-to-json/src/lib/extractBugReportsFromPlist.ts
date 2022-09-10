import { writeFileSync } from 'fs';
import { parse } from 'plist';
import { ClangDiagnostic, ClangResults } from '../types/ClangResults';
import { BugReport } from '../types/output';

/**
 * Extracts a list of bug reports from a given plist file
 * @param xml the xml data of the plist file to extract bug reports
 * from
 */
export const extractBugReportsFromPlist = async (xml: string) => {
  // convert to js object
  const res = parse(xml) as unknown as ClangResults;

  const reports = res.diagnostics.map((diagnostic) =>
    mapDiagnosticToBugReport(res.files, diagnostic),
  );

  return reports;
};

const mapDiagnosticToBugReport = (
  files: string[],
  diagnostic: ClangDiagnostic,
): BugReport => ({
  category: diagnostic.category,
  type: diagnostic.type,
  check: diagnostic.check_name,
  line: diagnostic.location.line,
  col: diagnostic.location.col,
  file: files[diagnostic.location.file],
});
