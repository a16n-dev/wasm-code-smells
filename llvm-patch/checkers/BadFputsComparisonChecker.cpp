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
#include "llvm/Support/raw_ostream.h"

using namespace clang;
using namespace ento;

class BadFputsComparisonChecker
    : public Checker<check::PostCall, check::BranchCondition> {

  mutable std::unique_ptr<BugType> BT;
  void reportBug(CheckerContext &C) const;

public:
  void checkBranchCondition(const Stmt *Condition, CheckerContext &C) const;
  void checkPostCall(const CallEvent &Call, CheckerContext &C) const;
  // Helper fns
  bool hasValueOfZero(Expr *E, const CheckerContext &C) const;
};

// Set that tracks symbols for all values returned by calls to fputs()
REGISTER_SET_WITH_PROGRAMSTATE(FputsResult, SymbolRef)

void BadFputsComparisonChecker::checkPostCall(const CallEvent &Call,
                                              CheckerContext &C) const {

  if (Call.isGlobalCFunction("fputs")) {

    auto ReturnValue = Call.getReturnValue().getAsSymbol();

    auto State = C.getState();

    State = State->add<FputsResult>(ReturnValue);
    C.addTransition(State);
  }
}

void BadFputsComparisonChecker::reportBug(CheckerContext &C) const {
  if (!BT)
    BT.reset(new BugType(this, "Return value of fputs() is compared to 0", "Wasm"));

  // Generate a bug report
  ExplodedNode *N = C.generateErrorNode();
  auto Report =
      std::make_unique<PathSensitiveBugReport>(*BT, BT->getDescription(), N);
  C.emitReport(std::move(Report));
}

bool BadFputsComparisonChecker::hasValueOfZero(Expr *E,
                                               const CheckerContext &C) const {

  auto State = C.getState();

  ConstraintManager &CM = State->getConstraintManager();

  auto S = C.getSVal(E);
  Optional<DefinedSVal> DSV = S.getAs<DefinedSVal>();

  if (!DSV)
    return false;

  return !CM.assume(C.getState(), *DSV, true);
}

void BadFputsComparisonChecker::checkBranchCondition(const Stmt *Condition,
                                                     CheckerContext &C) const {

  // Check the branch condition & see if it is a comparison operation
  if (const BinaryOperator *B = dyn_cast<BinaryOperator>(Condition)) {
    if (B->isComparisonOp()) {

      auto State = C.getState();

      if (hasValueOfZero(B->getRHS(), C)) {
        auto val = C.getSVal(B->getLHS()).getAsSymbol();

        if (State->contains<FputsResult>(val)) {
          reportBug(C);
        }
      }

      if (hasValueOfZero(B->getLHS(), C)) {
        auto val = C.getSVal(B->getRHS()).getAsSymbol();

        if (State->contains<FputsResult>(val)) {
          reportBug(C);
        }
      }
    }
  }
}

void ento::registerBadFputsComparisonChecker(CheckerManager &mgr) {
  mgr.registerChecker<BadFputsComparisonChecker>();
}

bool ento::shouldRegisterBadFputsComparisonChecker(const CheckerManager &mgr) {
  return true;
}