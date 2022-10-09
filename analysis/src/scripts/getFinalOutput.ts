import fs from 'fs';
import process from "process";

interface Output {
    id: string;
    name: string;
    url: string;
    hasWasmFiles: boolean;
    wasmFiles: string[];
    codeSmells: any[]
}

const final: Output[] = []

const originalData = JSON.parse(fs.readFileSync('dataset.json','utf-8'))

process.chdir('000-output');

const repos = fs.readdirSync('.');


repos.forEach((repo) => {

    process.chdir(repo);

    const repoInfo: any = originalData.find((d: any) => `${d.user.name}-${d.name}` === repo);

    const fileMap: {[key: string]: string} = JSON.parse(fs.readFileSync('out.json', 'utf-8'))

    const wasmFiles: string[] = JSON.parse(fs.readFileSync('wasm-files.json', 'utf-8'));

    console.log(repo)
    const codeSmells: any[] = JSON.parse(fs.readFileSync('results.json', 'utf-8'));

    final.push({
        id: repo,
        name: repoInfo.name,
        url: repoInfo.url,
        hasWasmFiles: !!wasmFiles.length,
        wasmFiles: wasmFiles.map(f => fileMap[f].replace(`${repo}/`, '')),
        codeSmells: codeSmells.filter(f => f.check.startsWith('wasm')||f.check.startsWith('unix.malloc')).map(s => ({
            ...s,
            category: undefined,
            file: fileMap[s.file.replace(/\.\//, '')]?.replace(`${repo}/`, '') || s.file
        }))
    })

    process.chdir('../')

})

process.chdir('../')

fs.writeFileSync('final.json', JSON.stringify(final, undefined, 2));