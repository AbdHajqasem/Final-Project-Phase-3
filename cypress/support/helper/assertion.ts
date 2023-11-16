class Assertion {
  assertionForPassed() {
    cy.get(".orangehrm-recruitment-status").should(
      "contain",
      "Interview Passed"
    );
    cy.get(".oxd-button--success")
      .eq(0)
      .should("contain", "Schedule Interview");
    cy.get(".oxd-button--success").eq(1).should("contain", "Offer Job");
    cy.get(".oxd-button--danger").should("contain", "Reject");
  }
  assertionForFailed() {
    cy.get(".orangehrm-recruitment-status").should(
      "contain",
      "Interview Failed"
    );
    cy.get(".oxd-button--danger").should("contain", "Reject");
  }
}
export default Assertion;
