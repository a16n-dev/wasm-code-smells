export const repositoryQueries = [
  {
    key: 'wasm-in-readme-c',
    name: 'C Projects that mention WASM in readme',
    query: 'wasm in:readme language:c',
  },
  {
    key: 'wasm-in-description-c',
    name: 'C Projects that mention WASM in description',
    query: 'wasm in:description language:c',
  },
  {
    key: 'wasm-in-topics-c',
    name: 'C Projects that mention WASM in topics',
    query: 'wasm in:topics language:c',
  },
  {
    key: 'webassembly-in-readme-c',
    name: 'C Projects that mention webassembly in readme',
    query: 'webassembly in:readme language:c',
  },
  {
    key: 'webassembly-in-description-c',
    name: 'C Projects that mention webassembly in description',
    query: 'webassembly in:description language:c',
  },
  {
    key: 'webassembly-in-topics-c',
    name: 'C Projects that mention webassembly in topics',
    query: 'webassembly in:topics language:c',
  },
  {
    key: 'web-assembly-in-readme-c',
    name: 'C Projects that mention webassembly in readme',
    query: '"web assembly" in:readme language:c',
  },
  // C++ queries
  {
    key: 'wasm-in-readme-cpp',
    name: 'C++ Projects that mention WASM in readme',
    query: 'wasm in:readme language:cpp',
  },
  {
    key: 'wasm-in-description-cpp',
    name: 'C++ Projects that mention WASM in description',
    query: 'wasm in:description language:cpp',
  },
  {
    key: 'wasm-in-topics-cpp',
    name: 'C++ Projects that mention WASM in topics',
    query: 'wasm in:topics language:cpp',
  },
  {
    key: 'webassembly-in-readme-cpp',
    name: 'C++ Projects that mention webassembly in readme',
    query: 'webassembly in:readme language:cpp',
  },
  {
    key: 'webassembly-in-description-cpp',
    name: 'C++ Projects that mention webassembly in description',
    query: 'webassembly in:description language:cpp',
  },
  {
    key: 'webassembly-in-topics-cpp',
    name: 'C++ Projects that mention webassembly in topics',
    query: 'webassembly in:topics language:cpp',
  },
  {
    key: 'web-assembly-in-readme-cpp',
    name: 'C++ Projects that mention webassembly in readme',
    query: '"web assembly" in:readme language:cpp',
  },
];

const buildScriptLanguages = [
  'cmake',
  'yaml',
  'json',
  'makefile',
  'shell',
  'powerShell',
];

const buildScriptKeywords = [
  // emscripten
  'emcc',
  'emsdk',
  // cheep
  '-target cheerp-wasm',
  // clang
  '--target=wasm32',
];

export const codeQueries: { key: string; name: string; query: string }[] = [
  {
    key: 'emscripten-header-c',
    name: 'C file that contains emscripten include header',
    query: `"#include <emscripten.h>" language:c`,
  },
  {
    key: 'emscripten-header-cpp',
    name: 'C++ file that contains emscripten include header',
    query: `"#include <emscripten.h>" language:cpp`,
  },
  {
    key: 'emscripten-js-lib-c',
    name: 'C file that includes inline js',
    query: `"EM_ASM(" language:c`,
  },
  {
    key: 'emscripten-js-lib-cpp',
    name: 'C++ file that includes inline js',
    query: `"EM_ASM(" language:cpp`,
  },
  {
    key: 'emscripten-js-source-lib-c',
    name: 'C file that includes inline js source code',
    query: `"EM_JS(" language:c`,
  },
  {
    key: 'emscripten-js-source-lib-cpp',
    name: 'C++ file that includes inline js source code',
    query: `"EM_JS(" language:cpp`,
  },
];

for (const lang of buildScriptLanguages) {
  for (const keyword of buildScriptKeywords) {
    codeQueries.push({
      key: `${keyword}-in-${lang}-build-script`,
      name: `${lang} build script that contains "${keyword}"`,
      query: `"${keyword}" in:file language:${lang}`,
    });
  }
}
