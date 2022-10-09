# Modifying Clang
First clone the LLVM repository and follow the build instructions here: https://clang.llvm.org/get_started.html

## Option 1 - Use the patch script
2. In a terminal in this folder, run `yarn patch /path/to/llvm-project`
3. Rebuild clang

## Option 2 - Manual
1. Navigate to `clang/lib/StaticAnalyzer/Frontend/AnalysisConsummer.cpp` and add the following code inside of `ento::CreateAnalysisConsumer()`
```
CI.getPreprocessor().getDiagnostics().setSuppressAllDiagnostics(true);
CI.getPreprocessor().SetSuppressIncludeNotFoundError(true);
```
2. Navigate to `clang/lib/StaticAnalyzer/Checkers/CMakeLists.txt` and add the following entries:
```
Wasm/AccessEnvChecker.cpp
Wasm/BadFputsComparisonChecker.cpp
Wasm/DoubleFcloseChecker.cpp
Wasm/DoubleFreeChecker.cpp
Wasm/ErrorWithoutActionChecker.cpp
Wasm/ImproperResourceShutdownChecker.cpp
Wasm/InvalidFreeChecker.cpp
Wasm/PrintFormatChecker.cpp
Wasm/UninitializedVariableChecker.cpp
Wasm/WideStringChecker.cpp
```
3. Navigate to `clang/include/clang/StaticAnalyzer/Checkers/Checkers.td` and add the following to the lister of checkers
```
def Wasm : Package<"wasm">;
def WasmAlpha : Package<"wasm">, ParentPackage<Wasm>;
```
Then at the bottom of the file add the following
```
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

}
```