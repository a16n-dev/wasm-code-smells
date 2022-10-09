export const ANALYSIS_CONSUMER_FILE_PATH = 'clang/lib/StaticAnalyzer/Frontend/AnalysisConsumer.cpp';

export const ANALYSIS_CONSUMER_CODE = `ento::CreateAnalysisConsumer(CompilerInstance &CI) {

    // ===== AUTO-GENERATED CODE BLOCK ========================================
    CI.getPreprocessor().getDiagnostics().setSuppressAllDiagnostics(true);

    CI.getPreprocessor().SetSuppressIncludeNotFoundError(true);
    // ========================================================================
    `
export const CMAKE_LISTS_FILE_PATH = `clang/lib/StaticAnalyzer/Checkers/CMakeLists.txt`

export const CMAKE_LISTS_CODE = `add_clang_library(clangStaticAnalyzerCheckers
  Wasm/AccessEnvChecker.cpp
  Wasm/BadFputsComparisonChecker.cpp
  Wasm/DoubleFcloseChecker.cpp
  Wasm/DoubleFreeChecker.cpp
  Wasm/ErrorWithoutActionChecker.cpp
  Wasm/ImproperResourceShutdownChecker.cpp
  Wasm/InvalidFreeChecker.cpp
  Wasm/PrintFormatChecker.cpp
  Wasm/UninitializedVariableChecker.cpp
  Wasm/WideStringChecker.cpp`

export const CHECKERS_FILE_PATH = `clang/include/clang/StaticAnalyzer/Checkers/Checkers.td`

export const CHECKERS_PACKAGE_CODE = `def WebKitAlpha : Package<"webkit">, ParentPackage<Alpha>;

def Wasm : Package<"wasm">;
def WasmAlpha : Package<"wasm">, ParentPackage<Wasm>;`

export const CHECKERS_LIST_CODE = `} // end alpha.webkit

//===----------------------------------------------------------------------===//
// WebAssembly checkers.
//===----------------------------------------------------------------------===//

let ParentPackage = Wasm in {

def AccessEnvChecker : Checker<"AccessEnvChecker">,
  HelpText<"Access environment variables">,
  Documentation<HasDocumentation>;

def ImproperResourceShutdownChecker : Checker<"ImproperResourceShutdownChecker">,
  HelpText<"Lorem Ipsum">,
  Documentation<HasDocumentation>;

def ErrorWithoutActionChecker : Checker<"ErrorWithoutActionChecker">,
  HelpText<"Lorem Ipsum">,
  Documentation<HasDocumentation>;

def BadFputsComparisonChecker : Checker<"BadFputsComparisonChecker">,
  HelpText<"Lorem Ipsum">,
  Documentation<HasDocumentation>;

def DoubleFreeChecker : Checker<"DoubleFreeChecker">,
  HelpText<"Lorem Ipsum">,
  Documentation<HasDocumentation>;

def DoubleFcloseChecker : Checker<"DoubleFcloseChecker">,
  HelpText<"Lorem Ipsum">,
  Documentation<HasDocumentation>;

def PrintFormatChecker : Checker<"PrintFormatChecker">,
  HelpText<"Lorem Ipsum">,
  Documentation<HasDocumentation>;

def InvalidFreeChecker : Checker<"InvalidFreeChecker">,
  HelpText<"Lorem Ipsum">,
  Documentation<HasDocumentation>;

def UninitializedVariableChecker : Checker<"UninitializedVariableChecker">,
  HelpText<"Lorem Ipsum">,
  Documentation<HasDocumentation>;

def WideStringChecker : Checker<"WideStringChecker">,
  HelpText<"Lorem Ipsum">,
  Documentation<HasDocumentation>;

}`