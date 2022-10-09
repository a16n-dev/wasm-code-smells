import fs, { mkdirSync } from 'fs';
import path from 'path';
import { OUTPUT_DIR } from '../lib/constants';
import { checkSourceFile, checkBuildScriptFile, checkJsFile } from '../lib/detectWasm/helperFns';

// Detects if a given project will compile to wasm

const sourceFile = ['.c', '.cpp', 'h', '.hpp', '.cc'];

const buildScriptFiles = ['makefile', '.sh', '.yml', '.yaml', '.json', '.ps1', '.bat', '.cmake', '.c', '.cpp', '.py'];

const jsFiles = ['.html', '.js', '.ts', '.jsx', '.tsx', '.jsm']

let heuristics: {
    file: string;
    reason: string;
}[] = []

const getDirectoryContents = (basePath: string) => {
    const files = fs.readdirSync(basePath)

    for(const file of files){
        const filePath = path.join(basePath, file)
        try {
            const fileInfo = fs.lstatSync(filePath);
            if(fileInfo.isDirectory()){
                getDirectoryContents(filePath)
            } else if(fileInfo.isFile()){
                // Test for heuristics here

                // Check contents of source files
                if(sourceFile.some(f => filePath.toLowerCase().endsWith(f))){
                    checkSourceFile(filePath, heuristics)
                }
                // Check contents of build scripts
                if(buildScriptFiles.some(f => filePath.toLowerCase().endsWith(f))) {
                    checkBuildScriptFile(filePath, heuristics)
                }
                if(jsFiles.some(f => filePath.toLowerCase().endsWith(f))) {
                    checkJsFile(filePath, heuristics)
                }

            } 
        } catch (error) {
            console.log(error)
        }
        
    }
} 


const runOnDataset = () => {

    mkdirSync(`${OUTPUT_DIR}/wasm-output`, {recursive: true});

    process.chdir(`${OUTPUT_DIR}/dataset`);

    const files = fs.readdirSync('.')

    for(const file of files){
        const fileInfo = fs.lstatSync(file);
        if(fileInfo.isDirectory()){
            console.log(`Processing ${file}`)
            heuristics = [];
            getDirectoryContents(file);
            // Output Heuristics
            fs.writeFileSync(`../wasm-output/${file}.json`, JSON.stringify({wasm: !!heuristics.length, heuristics: heuristics.map(h => ({...h, file: h.file.replace(file, '')}))},undefined, 2))
        }
    }
    process.chdir("../");
}

runOnDataset()