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

class AccessEnvChecker : public Checker<check::PreCall> {

  mutable std::unique_ptr<BugType> BT;

public:
  void checkPreCall(const CallEvent &Call, CheckerContext &C) const;
};

void AccessEnvChecker::checkPreCall(const CallEvent &Call,
                                    CheckerContext &C) const {

  if (Call.isGlobalCFunction("getenv")) {
    if (!BT)
      BT.reset(new BugType(this, "Call to getenv", "Example Checker"));

    // Generate a bug report
    ExplodedNode *N = C.generateErrorNode();
    auto Report =
        std::make_unique<PathSensitiveBugReport>(*BT, BT->getDescription(), N);
    C.emitReport(std::move(Report));
  }
}

void ento::registerAccessEnvChecker(CheckerManager &mgr) {
  mgr.registerChecker<AccessEnvChecker>();
}

bool ento::shouldRegisterAccessEnvChecker(const CheckerManager &mgr) {
  return true;
}
