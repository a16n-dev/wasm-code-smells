import fs from "fs";
import { execSync } from "child_process";
import process from "process";
import { parse } from 'plist';
import { ClangDiagnostic, BugReport, ClangResults } from "../types";
import { OUTPUT_DIR } from "../lib/constants";

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

const generatePlistFiles = (count: number, totalRepos: number) => {
    const files = fs.readdirSync('.');

    const filesToAnalyze = files.filter(f => f.endsWith(".c") || f.endsWith(".cpp"))

    filesToAnalyze.forEach((file, index) => {
        console.log(`[${count + 1}/${totalRepos}](${index + 1}/${filesToAnalyze.length}) analyzing ${file} `)
        try {
            execSync(`clang --analyze -Xclang -analyzer-checker=wasm ${file}`)

        } catch (error) {
            console.log(`Error analyzing`)
        }
    })

    fs.writeFileSync('.analyzed', '')
}

const getAnalysisSummary = () => {
 // Define an output array
 const output: BugReport[] = []

 // get all plist files
 const plistFiles = fs.readdirSync('.').filter(f => f.endsWith('.plist'));

 // for each plist file
 plistFiles.forEach(file => {

     // Read in the file
     const contents = fs.readFileSync(file, 'utf-8');

     // Convert to json output format
     const res = parse(contents) as unknown as ClangResults;

     const reports = res.diagnostics.map((diagnostic) =>
         mapDiagnosticToBugReport(res.files, diagnostic),
     );
     // Append all entries to output array
     output.push(...reports)

    // Delete the plist file
    fs.unlinkSync(file)
 })

 // Write the file as results.json
 fs.writeFileSync('results.json', JSON.stringify(output, undefined, 2));
}


const main = () => {
    process.chdir(`${OUTPUT_DIR}/processed`)

    const repos = fs.readdirSync('.');

    let count = 0;

    repos.forEach((value, index) => {
        console.log(`Analyzing ${value}`)
        process.chdir(value);

        if (!fs.existsSync('.analyzed') && !fs.existsSync('.skip')) {

            generatePlistFiles(count, repos.length);
            getAnalysisSummary();
        } else {
            console.log('skipping...')
        }
        process.chdir("../");
        count++;
    });
}

main();


