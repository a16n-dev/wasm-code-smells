// Compiles the plist files from each analysed repo into a signle "results.json" file
import * as fs from "fs";
import { OUTPUT_DIR } from "../lib/constants";

// Get the list of repos
process.chdir(`${OUTPUT_DIR}/processed`)

const repos = fs.readdirSync('.');

// For each repo
repos.forEach((value) => {

    process.chdir(value);

    const files = fs.readdirSync('.');

    files.forEach(f => {
        if(f === '.analyzed') {
            console.log(`Deleting ${f}`)
            fs.unlinkSync(f)
        }
    }) 

    process.chdir("../");
})




// Types

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
    line: 3952;
    col: 24;
    file: 0;
}

export interface BugReport {
    category: string;
    type: string;
    check: string;
    line: number;
    col: number;
    file: string;
}