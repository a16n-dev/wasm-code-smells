// Initial keyword set for repositories (case-insensitive):
export const repoKeywords = [
  'wasm',
  'webassembly',
  'web assembly',
  'emscripten',
];

// ====== LANGUAGES ======
// All languages definined here should be valid for use in the github api:
// https://github.com/github/linguist/blob/master/lib/linguist/languages.yml

// Source language targets
export const sourceCodeLanguages = ['c', 'cpp'];

export const glueCodeLanguages = ['js', 'ts', 'html'];

// file types that should be considered as build scripts
export const buildScriptLanguages = [
  'cmake',
  'yaml',
  'makefile',
  'shell',
  'powerShell',
];

// ====== KEYWORDS ======
// keywords that indicate a build script is building a wasm project
export const buildScriptKeywords = [
  // emscripten
  'emcc', // https://emscripten.org/docs/tools_reference/emcc.html#emccdoc
  'emsdk', // https://emscripten.org/docs/tools_reference/emsdk.html
  // cheep
  '-target cheerp-wasm', // https://docs.leaningtech.com/cheerp/Tutorial-Hello-Wasm
  // clang
  '--target=wasm32', // https://depth-first.com/articles/2019/10/16/compiling-c-to-webassembly-and-running-it-without-emscripten/
];

export const sourceCodeSnippets = [
  '#include <emscripten.h>',
  '#include <html5.h>',
  'EM_ASM(',
  'EM_JS(',
];

// Javascript code that interacts with or executes WASM code
// https://developer.mozilla.org/en-US/docs/WebAssembly/Using_the_JavaScript_API
export const glueCodeSnippets = [
  'WebAssembly.instantiate',
  'WebAssembly.instantiateStreaming',
  'WebAssembly.Memory',
  'WebAssembly.Global',
];
