import { QueryDefinition } from './createQueries';
import { buildScriptKeywords, buildScriptLanguages } from './constants';

export const datasetQueries: QueryDefinition[] = [
  // Keyword queries
  {
    key: 'wasm-in-readme-c',
    name: 'C Projects that mention WASM in readme',
    query: 'wasm in:readme language:c',
    type: 'repository',
  },
  {
    key: 'wasm-in-description-c',
    name: 'C Projects that mention WASM in description',
    query: 'wasm in:description language:c',
    type: 'repository',
  },
  {
    key: 'wasm-in-topics-c',
    name: 'C Projects that mention WASM in topics',
    query: 'wasm in:topics language:c',
    type: 'repository',
  },
  {
    key: 'webassembly-in-readme-c',
    name: 'C Projects that mention webassembly in readme',
    query: 'webassembly in:readme language:c',
    type: 'repository',
  },
  {
    key: 'webassembly-in-description-c',
    name: 'C Projects that mention webassembly in description',
    query: 'webassembly in:description language:c',
    type: 'repository',
  },
  {
    key: 'webassembly-in-topics-c',
    name: 'C Projects that mention webassembly in topics',
    query: 'webassembly in:topics language:c',
    type: 'repository',
  },
  {
    key: 'web-assembly-in-readme-c',
    name: 'C Projects that mention webassembly in readme',
    query: '"web assembly" in:readme language:c',
    type: 'repository',
  },
  // C++ queries
  {
    key: 'wasm-in-readme-cpp',
    name: 'C++ Projects that mention WASM in readme',
    query: 'wasm in:readme language:cpp',
    type: 'repository',
  },
  {
    key: 'wasm-in-description-cpp',
    name: 'C++ Projects that mention WASM in description',
    query: 'wasm in:description language:cpp',
    type: 'repository',
  },
  {
    key: 'wasm-in-topics-cpp',
    name: 'C++ Projects that mention WASM in topics',
    query: 'wasm in:topics language:cpp',
    type: 'repository',
  },
  {
    key: 'webassembly-in-readme-cpp',
    name: 'C++ Projects that mention webassembly in readme',
    query: 'webassembly in:readme language:cpp',
    type: 'repository',
  },
  {
    key: 'webassembly-in-description-cpp',
    name: 'C++ Projects that mention webassembly in description',
    query: 'webassembly in:description language:cpp',
    type: 'repository',
  },
  {
    key: 'webassembly-in-topics-cpp',
    name: 'C++ Projects that mention webassembly in topics',
    query: 'webassembly in:topics language:cpp',
    type: 'repository',
  },
  {
    key: 'web-assembly-in-readme-cpp',
    name: 'C++ Projects that mention webassembly in readme',
    query: '"web assembly" in:readme language:cpp',
    type: 'repository',
  },

  {
    key: 'emscripten-header-c',
    name: 'C file that contains emscripten include header',
    query: `"#include <emscripten.h>" language:c`,
    type: 'code',
  },
  {
    key: 'emscripten-header-cpp',
    name: 'C++ file that contains emscripten include header',
    query: `"#include <emscripten.h>" language:cpp`,
    type: 'code',
  },
  {
    key: 'emscripten-js-lib-c',
    name: 'C file that includes inline js',
    query: `"EM_ASM(" language:c`,
    type: 'code',
  },
  {
    key: 'emscripten-js-lib-cpp',
    name: 'C++ file that includes inline js',
    query: `"EM_ASM(" language:cpp`,
    type: 'code',
  },
  {
    key: 'emscripten-js-source-lib-c',
    name: 'C file that includes inline js source code',
    query: `"EM_JS(" language:c`,
    type: 'code',
  },
  {
    key: 'emscripten-js-source-lib-cpp',
    name: 'C++ file that includes inline js source code',
    query: `"EM_JS(" language:cpp`,
    type: 'code',
  },
];

for (const lang of buildScriptLanguages) {
  for (const keyword of buildScriptKeywords) {
    datasetQueries.push({
      key: `${keyword}-in-${lang}-build-script`,
      name: `${lang} build script that contains "${keyword}"`,
      query: `"${keyword}" in:file language:${lang}`,
      type: 'code',
    });
  }
}
