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

class ErrorWithoutActionChecker : public Checker<check::PreCall> {

  mutable std::unique_ptr<BugType> BT;

public:
  void checkPreCall(const CallEvent &Call, CheckerContext &C) const;
};

void ErrorWithoutActionChecker::checkPreCall(const CallEvent &Call,
                                             CheckerContext &C) const {
  if (Call.isGlobalCFunction("fclose")) {
    // get 1st argument
    auto FileDesc = Call.getArgSVal(0);

    auto State = C.getState();

    ConstraintManager &CMgr = State->getConstraintManager();

    auto CanBeNull = CMgr.isNull(State, FileDesc.getAsSymbol());

    if (CanBeNull.isUnderconstrained()) {

      if (!BT) {
        BT.reset(new BugType(this, "Error without action", "Example Checker"));
      }

      // auto *N = C.generateErrorNode();
      auto *N = C.addTransition();

      auto Report = std::make_unique<PathSensitiveBugReport>(
          *BT, BT->getDescription(), N);

      C.emitReport(std::move(Report));
    }
  }
}

void ento::registerErrorWithoutActionChecker(CheckerManager &mgr) {
  mgr.registerChecker<ErrorWithoutActionChecker>();
}

bool ento::shouldRegisterErrorWithoutActionChecker(const CheckerManager &mgr) {
  return true;
}