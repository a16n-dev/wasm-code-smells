export const emscriptenHeaderRegex = /<(emscripten|html5)(\/.*)?\.h>/g

export const buildScriptCommandRegex = /emcc|emsdk|--target=wasm32|-target\scheerp-wasm/g

export const jsWasmModuleRegex = /new\s*WebAssembly\(/g
