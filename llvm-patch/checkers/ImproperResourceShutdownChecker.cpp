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

class ImproperResourceShutdownChecker : public Checker<check::PreCall, check::PostCall> {

  mutable std::unique_ptr<BugType> BT;

public:
  void checkPreCall(const CallEvent &Call, CheckerContext &C) const;
  void checkPostCall(const CallEvent &Call, CheckerContext &C) const;
  void checkPostStmt(const CastExpr *CE, CheckerContext &C) const;
};

REGISTER_SET_WITH_PROGRAMSTATE(OpenFileSet, SymbolRef)

void ImproperResourceShutdownChecker::checkPreCall(const CallEvent &Call,
                                                   CheckerContext &C) const {

  if (const auto *II = Call.getCalleeIdentifier()) {
    if (II->isStr("fclose")) {
      auto FileDesc = Call.getArgSVal(0).getAsSymbol();

      auto State = C.getState();
      // // If its stored in the state, emit a bug report

      auto IsInState = State->contains<OpenFileSet>(FileDesc);

      if (IsInState) {
        if (!BT) {
          BT.reset(new BugType(this, "Improper resource shutdown",
                               "Example Checker"));
        }

        State = State->remove<OpenFileSet>(FileDesc);

        // auto *N = C.generateErrorNode();
        auto *N = C.addTransition(State);

        auto Report = std::make_unique<PathSensitiveBugReport>(
            *BT, BT->getDescription(), N);

        C.emitReport(std::move(Report));
      }
    }
  }
}

void ImproperResourceShutdownChecker::checkPostCall(const CallEvent &Call,
                                                    CheckerContext &C) const {
  auto State = C.getState();
  if (const auto *II = Call.getCalleeIdentifier()) {
    if (II->isStr("open")) {
      auto FileDesc = Call.getReturnValue().getAsSymbol();

      State = State->add<OpenFileSet>(FileDesc);
    }
  }
  C.addTransition(State);
}

// void ImproperResourceShutdownChecker::checkPostStmt(const CastExpr *CE, CheckerContext &C) const {
//   const Expr *CastedExpr = CE->getSubExpr();

//   auto State = C.getState();

//   SVal CastedVal = C.getSVal(CastedExpr);
//   State = State->add<OpenFileSet>(CastedVal.getAsSymbol());
//   C.addTransition(State);
// }

void ento::registerImproperResourceShutdownChecker(CheckerManager &mgr) {
  mgr.registerChecker<ImproperResourceShutdownChecker>();
}

bool ento::shouldRegisterImproperResourceShutdownChecker(
    const CheckerManager &mgr) {
  return true;
}