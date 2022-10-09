import fs from "fs";

interface Output {
    id: string;
    name: string;
    url: string;
    hasWasmFiles: boolean;
    wasmFiles: string[];
    codeSmells: any[]
}

type Result = { total: number, wasm: number, nonWasm: number }

const data: Output[] = JSON.parse(fs.readFileSync('final.json', 'utf-8'));

const codeSmellsFiles = data.reduce((prev, curr) => {
    curr.codeSmells.forEach(s => {
        const msg: string = s.type;

        if (prev[msg]) {
            prev[msg].total++;
        } else {
            prev[msg] = { total: 1, wasm: 0, nonWasm: 0 };
        }
        if (curr.hasWasmFiles) {
            prev[msg].wasm++;
        } else {
            prev[msg].nonWasm++;
        }
    })
    return prev;
}, {} as { [key: string]: Result })

const codeSmellsRepos = data.reduce((prev, curr) => {
    const smells: string[] = []
    curr.codeSmells.forEach(s => {
        const msg: string = s.type;

        if (!smells.includes(msg)) {
            smells.push(msg)
        } 
    })

    smells.forEach(msg => {
        if (prev[msg]) {
            prev[msg].total++;
        } else {
            prev[msg] = { total: 1, wasm: 0, nonWasm: 0 };
        }
        if (curr.hasWasmFiles) {
            prev[msg].wasm++;
        } else {
            prev[msg].nonWasm++;
        }
    })
    return prev;
}, {} as { [key: string]: Result })


console.log({
    repos: { 
        total: data.length,
         wasm: data.filter(d => d.hasWasmFiles).length, 
         nonWasm: data.filter(d => !d.hasWasmFiles).length 
        },
    reposWithCodeSmells: { 
        total: data.filter(d => d.codeSmells.length).length, 
        wasm: data.filter(d => d.codeSmells.length && d.hasWasmFiles).length, 
        nonWasm: data.filter(d => d.codeSmells.length && !d.hasWasmFiles).length, 
    },
    codeSmellsFiles,
    codeSmellsRepos
})

