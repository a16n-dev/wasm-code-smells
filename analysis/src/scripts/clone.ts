import { execSync } from "child_process";
import fs, { existsSync, writeFileSync } from "fs";
import { OUTPUT_DIR } from "../lib/constants";
import {DatasetEntry} from '../types';

if (!existsSync(`${OUTPUT_DIR}/dataset.json`)) {
	const mainRepos: DatasetEntry[] = JSON.parse(fs.readFileSync("dataset.json", 'utf-8'));
	writeFileSync(`${OUTPUT_DIR}/dataset.json`, JSON.stringify(mainRepos.map(({ _id, user, url, name }) => ({
		_id, url,name, user: {
			name: user.name
		}, 
	})), undefined, 2))
};

const repos: DatasetEntry[] = JSON.parse(fs.readFileSync(`${OUTPUT_DIR}/dataset.json`, 'utf-8'));

const cloneRepo = (url: string, name: string) => new Promise<void>((res, rej) => {
	try {
		if (fs.existsSync(`${OUTPUT_DIR}/dataset/${name}`)) {
			console.log('skipping...')
		} else {
			execSync(`git clone --depth=1 ${url} ${OUTPUT_DIR}/dataset/${name}`);
		}
		res();
	} catch (error) {
		rej(error)
	}
})

const main = async () => {
	await Promise.all(repos.map(async (value: any, index: number) => {
		// // Shallow clone Git repository
		try {
			console.log(`Cloning ${value._id} (${index + 1}/${repos.length})`);

			await cloneRepo(value.url, `${value.user.name}-${value.name}`)
		} catch (error) {
			console.log(error)
		}
	}));

}

main();
