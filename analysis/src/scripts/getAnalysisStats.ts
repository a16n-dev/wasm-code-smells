import * as fs from "fs";
import { BugReport } from '../types';

// Get a list of repos
process.chdir('000-output')

const repos = fs.readdirSync('.');

const summary: {[k: string]: number} = {}

// For each repo
repos.forEach((value) => {

    process.chdir(value);

    // if it has been analysed
    if (fs.existsSync('results.json')) {
        const bugs: BugReport[] = JSON.parse(fs.readFileSync('results.json', 'utf-8'));

        bugs.forEach(b => {
            if(summary[b.check] === undefined){
                summary[b.check] = 1;
            } else {
                summary[b.check]++;
            }
        })
    }
    // else do nothing

    process.chdir("../");
})

process.chdir("../");

fs.writeFileSync('outcome.json', JSON.stringify(summary))
console.log(summary)
// Types



