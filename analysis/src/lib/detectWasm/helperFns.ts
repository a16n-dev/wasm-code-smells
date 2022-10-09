import { readFileSync } from "fs";
import { WasmHeuristic } from "../../types";
import { buildScriptCommandRegex, emscriptenHeaderRegex, jsWasmModuleRegex } from "./regex";

export const checkSourceFile = (filePath: string, heuristics: WasmHeuristic[]) => {
    const contents = readFileSync(filePath, 'utf-8');

    // Look for emscripten headers
    const containsEmscriptenHeaders = emscriptenHeaderRegex.test(contents);

    if(containsEmscriptenHeaders){
        heuristics.push({file: filePath, reason: 'Emscripten Header'})
    }
}



export const checkBuildScriptFile = (filePath: string, heuristics: WasmHeuristic[]) => {
    const contents = readFileSync(filePath, 'utf-8');

    // Look for emscripten headers
    const containsBuildCommand = buildScriptCommandRegex.test(contents);

    if(containsBuildCommand){
        heuristics.push({file: filePath, reason: 'Wasm Compiler Call'})
    }
}



export const checkJsFile = (filePath: string, heuristics: WasmHeuristic[]) => {
    const contents = readFileSync(filePath, 'utf-8');

 // Look for emscripten headers
 const containsWasmInJs = jsWasmModuleRegex.test(contents);

 if(containsWasmInJs){
     heuristics.push({file: filePath, reason: 'WebAssembly Module in JS'})
 }
}