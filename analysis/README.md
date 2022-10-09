# Inputs
The scripts look for a `dataset.json` file in the root of the project. This file should have the following format:
```json
[
    {
        "_id": "vvanders/wasm_lua",
        "url": "https://github.com/vvanders/wasm_lua",
        "name": "wasm_lua",
        "user": {
            "name": "vvanders",
        },
    },
    ...
]
```

# Scripts

_In a rough order of how they should be run_ 

## Main Scripts

These scripts do the main work of processing and analysing each repository

### `npm run clone`
Clones the repos as defined in the `dataset.json` file into a `dataset` folder

### `npm run detect-wasm`
Analyses each cloned repository for heuristics that indicate the project will be compiled to WebAssmebly

### `npm run extract`
Extracts the C and C++ source files from each cloned repository into a single level directory. Each source file is mapped to a unique id which is stored to a corresponding `out.json` file. It also outputs a `dependencyTree.json` file that details the relative dependencies in the project.

### `npm run analyse`
Runs the Clang Static Analyzer (CSA) on C and C++ source files for a project. Requires extract to have been run first. Outputs a `results.json` file for each project that contains a summary of all warnings output by the CSA

## Utility Scripts
These scripts help with managing the dataset

### `npm run reset`
Marks all repos as not analysed, so that they can be analysed again.

### `npm run cleanup-repos`
Deletes the original source files for the repositories and also removes them from the dataset so they don't get cloned again