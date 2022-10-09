import fs from 'fs';
import path from 'path';
import { OUTPUT_DIR } from '../lib/constants';
// Get all files with a .c or .cpp, or .h extension in all subfolders recursively

let map: { [key: string]: string } = {};

let id = 0;

// Stores a list of lookups
let includes: { source: string, requires: string }[] = []

const getDirectoryContents = (basePath: string, output: string) => {
    const files = fs.readdirSync(basePath)

    for (const file of files) {
        const filePath = path.join(basePath, file)
        try {
            const fileInfo = fs.lstatSync(filePath);
            if (fileInfo.isDirectory()) {
                getDirectoryContents(filePath, output)
            } else if (fileInfo.isFile()) {
                const fileExt = file.split('.')[file.split('.').length - 1];
                if (['c', 'cpp', 'h', 'hpp'].includes(fileExt)) {
                    map[`${id}.${fileExt}`] = filePath;

                    fs.copyFileSync(filePath, `${output}/${id}.${fileExt}`,)
                    id++;
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
}

const regex = /#include "(.*)"/g

const fixRelativeIncludes = (output: string) => {
    const json = JSON.parse(fs.readFileSync(`${output}/out.json`, 'utf-8'));

    const reverseFileLookup = Object.entries<string>(json).reduce((acc, [key, value]) => {
        acc[value] = key
        return acc;
    }, {} as { [key: string]: string })

    // Fixes includes headers to point to new relative files
    for (const [file, originalPath] of Object.entries<string>(json)) {
        const contents = fs.readFileSync(`${output}/${file}`, 'utf-8');

        let finalContents = contents
        let includeStatements: RegExpExecArray | null;

        while ((includeStatements = regex.exec(contents)) !== null) {
            const includePath = includeStatements[1];

            // resolve actual path
            const actualPath = path.join(originalPath.replace(/\/[^\/]+$/, ''), includePath)

            // get new name of actual file
            const newPath = reverseFileLookup[actualPath];

            if (newPath) {
                includes.push({ source: file, requires: newPath })
                finalContents = finalContents.replace(`#include "${includePath}"`, `#include "${newPath}" // #include "${includePath}"`)
            } else {
                finalContents = finalContents.replace(`#include "${includePath}"`, `// #include "${includePath}" COULD NOT RESOLVE`)
            }

        }

        fs.writeFileSync(`${output}/${file}`, `// ${originalPath}\n${finalContents}`);
    }

}

const flattenRepo = (name: string) => {
    const output = `../${OUTPUT_DIR}/processed/${name}`;
    fs.mkdirSync(output, { recursive: true });
    getDirectoryContents(name, output)


    fs.writeFileSync(`${output}/out.json`, JSON.stringify(map, null, 2))
    fixRelativeIncludes(output)
    fs.writeFileSync(`${output}/dependencyTree.json`, JSON.stringify(includes, null, 2))
    map = {}
    id = 0;
}


const runOnFolders = () => {

    fs.mkdirSync(`${OUTPUT_DIR}/processed`, { recursive: true });
    const completed = fs.readdirSync(`${OUTPUT_DIR}/processed`)

    process.chdir('dataset')


    const files = fs.readdirSync('.')

    for (const file of files) {
        const fileInfo = fs.lstatSync(file);
        if (fileInfo.isDirectory()) {
            if (completed.includes(file)) {
                console.log('Skipping as completed');
                continue;
            }
            console.log(`Processing ${file}`)
            flattenRepo(file)
        }
    }
    process.chdir("../");
}

runOnFolders()