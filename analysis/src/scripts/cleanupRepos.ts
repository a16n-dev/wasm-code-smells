// Removes all repos that have been cloned from the dataset.json, then deletes the from the disk

import { readdirSync, readFileSync, rmSync, writeFileSync } from "fs"
import { OUTPUT_DIR } from "../lib/constants"
import { DatasetEntry } from "../types"

const repos: DatasetEntry[] = JSON.parse(readFileSync(`${OUTPUT_DIR}/dataset.json`, 'utf-8'))

const files = readdirSync(`${OUTPUT_DIR}/dataset`)

const newRepos = repos.filter(r => !files.includes(`${r.user.name}-${r.name}`));

// Delete the contents of the dataset directory
rmSync(`${OUTPUT_DIR}/dataset`, {recursive: true, force: true})

console.log(`Removed ${repos.length - newRepos.length} repos from disk`);

writeFileSync(`${OUTPUT_DIR}/dataset.json`, JSON.stringify(newRepos, undefined, 2))