//===----------------------------------------------------------------------===//
//
// TODO: Write documentation
//
//===----------------------------------------------------------------------===//

#include "clang/StaticAnalyzer/Checkers/BuiltinCheckerRegistration.h"
#include "clang/StaticAnalyzer/Core/BugReporter/BugType.h"
#include "clang/StaticAnalyzer/Core/Checker.h"
#include "clang/StaticAnalyzer/Core/PathSensitive/CallEvent.h"
#include "clang/StaticAnalyzer/Core/PathSensitive/CheckerContext.h"

using namespace clang;
using namespace ento;

class DoubleFreeChecker : public Checker<check::PreCall> {

  std::unique_ptr<BugType> ExampleBugType;

public:
  void checkPreCall(const CallEvent &Call, CheckerContext &C) const;
};

void DoubleFreeChecker::checkPreCall(const CallEvent &Call,
                                     CheckerContext &C) const {}

void ento::registerDoubleFreeChecker(CheckerManager &mgr) {
  mgr.registerChecker<DoubleFreeChecker>();
}

bool ento::shouldRegisterDoubleFreeChecker(const CheckerManager &mgr) {
  return true;
}