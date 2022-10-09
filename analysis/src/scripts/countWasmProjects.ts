import fs from 'fs';
import { OUTPUT_DIR } from '../lib/constants';

const combined = []

const files = fs.readdirSync(`${OUTPUT_DIR}/wasm-output`)

const fileData = files.map(f => ({id: f.replace(/\.json$/, ''), ...JSON.parse(fs.readFileSync(`${OUTPUT_DIR}/wasm-output/${f}`, 'utf-8'))}))

fs.writeFileSync(`${OUTPUT_DIR}/wasm-analysis.json`, JSON.stringify(fileData, undefined, 2))

console.log(`Found wasm in ${fileData.filter(f => f.wasm).length} out of ${fileData.length} projects`)