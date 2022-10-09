export interface ClangResults {
    clang_version: string;
    diagnostics: ClangDiagnostic[];
    files: string[];
}

export interface ClangDiagnostic {
    path: ClangDiagnosticPath[];
    description: string;
    category: string;
    type: string;
    check_name: string;
    issue_hash_content_of_line_in_context: string;
    issue_context_kind: string;
    issue_context: string;
    issue_hash_function_offset: string;
    location: {
        line: number;
        col: number;
        file: number;
    };
    ExecutedLines: Record<string, number[]>;
}

export interface ClangDiagnosticPath {
    kind: string;
    location: {
        line: number;
        col: number;
        file: number;
    };
    ranges: ClangDiagnosticPathRange[][];
    depth: number;
    extended_message: string;
    message: string;
}

interface ClangDiagnosticPathRange {
    line: number;
    col: number;
    file: number;
}

export interface BugReport {
    category: string;
    type: string;
    check: string;
    line: number;
    col: number;
    file: string;
}

export interface WasmHeuristic {
    file: string;
    reason: string;
}

export interface DatasetEntry {
    _id: string;
    url: string;
    user: {
        name: string
    },
    name: string
}