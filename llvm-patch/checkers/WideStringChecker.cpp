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

class WideStringChecker : public Checker<check::PreCall> {

  mutable std::unique_ptr<BugType> BT;

public:
  void checkPreCall(const CallEvent &Call, CheckerContext &C) const;
};

REGISTER_TRAIT_WITH_PROGRAMSTATE(HasCalledWideF, bool)

void WideStringChecker::checkPreCall(const CallEvent &Call,
                                     CheckerContext &C) const {

  auto State = C.getState();

  if (Call.isGlobalCFunction("fwide")) {
    State = State->set<HasCalledWideF>(true);
    C.addTransition(State);
  }
  
  if (Call.isGlobalCFunction("wprintf")) {
    bool isSet = State->get<HasCalledWideF>();

    if (isSet != true) {
      if (!BT) {
        BT.reset(new BugType(
            this, "Call to wprintf may not be preceeded by a call to fwide",
            "Example Checker"));
      }

      auto *N = C.addTransition();

      auto Report = std::make_unique<PathSensitiveBugReport>(
          *BT, BT->getDescription(), N);

      C.emitReport(std::move(Report));
    }
  }
}

void ento::registerWideStringChecker(CheckerManager &mgr) {
  mgr.registerChecker<WideStringChecker>();
}

bool ento::shouldRegisterWideStringChecker(const CheckerManager &mgr) {
  return true;
}