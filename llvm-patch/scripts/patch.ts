import fs from 'fs';
import { join } from 'path';
import { exit } from 'process';
import { ANALYSIS_CONSUMER_CODE, ANALYSIS_CONSUMER_FILE_PATH, CHECKERS_FILE_PATH, CHECKERS_LIST_CODE, CHECKERS_PACKAGE_CODE, CMAKE_LISTS_CODE, CMAKE_LISTS_FILE_PATH } from './constants';

const llvmPath = process.argv[2];

if(!fs.existsSync(llvmPath)){
    console.error("Provided llvm path is invalid")
    exit(1);
}

/**
 * Modify the AnalysisConsumer
 * clang/lib/StaticAnalyzer/Frontend/AnalysisConsummer.cpp
*/
console.log('(1/4) Updating AnalysisConsumer.cpp')

const analysisConsumer = fs.readFileSync(join(llvmPath, ANALYSIS_CONSUMER_FILE_PATH), 'utf-8');

const newAnalysisConsumer = analysisConsumer.replace('ento::CreateAnalysisConsumer(CompilerInstance &CI) {', ANALYSIS_CONSUMER_CODE);

fs.writeFileSync(join(llvmPath, ANALYSIS_CONSUMER_FILE_PATH), newAnalysisConsumer);

/**
 * Modify the CMakeLists
 * clang/lib/StaticAnalyzer/Checkers/CMakeLists.txt
 */
console.log('(2/4) Updating CMakeLists.txt')

const cmakelists = fs.readFileSync(join(llvmPath, CMAKE_LISTS_FILE_PATH), 'utf-8');

const newCmakelists = cmakelists.replace('add_clang_library(clangStaticAnalyzerCheckers', CMAKE_LISTS_CODE);
 
fs.writeFileSync(join(llvmPath, CMAKE_LISTS_FILE_PATH), newCmakelists);
 

/**
 * Modify the Checkers
 * clang/include/clang/StaticAnalyzer/Checkers/Checkers.td
 */
 console.log('(3/4) Updating Checkers.td')

 const checkers = fs.readFileSync(join(llvmPath, CHECKERS_FILE_PATH), 'utf-8');

 const newCheckers = checkers.replace('def WebKitAlpha : Package<"webkit">, ParentPackage<Alpha>;', CHECKERS_PACKAGE_CODE).replace('} // end alpha.webkit', CHECKERS_LIST_CODE);
  
 fs.writeFileSync(join(llvmPath, CHECKERS_FILE_PATH), newCheckers);

/**
 * Copy in the checker files
 */
console.log('(4/4) Copying checker files')
const checkerFiles = fs.readdirSync('checkers');

fs.mkdirSync(join(llvmPath, `clang/lib/StaticAnalyzer/Checkers/wasm`), {recursive: true});

for(const c of checkerFiles) {
    // Copy to directory
    fs.copyFileSync(`checkers/${c}`, join(llvmPath, `clang/lib/StaticAnalyzer/Checkers/wasm/${c}`))
}