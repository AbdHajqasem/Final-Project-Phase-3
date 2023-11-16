import SideBar from "../../../sub-pages/side-bar";
const SIDE_BAR: SideBar = new SideBar();
class ChangeCandidateStatus {
  changeStatusToPassed(vacancyName: any) {
    SIDE_BAR.getPageFromSidebar("Recruitment").click();
    cy.get(`.oxd-table-cell:contains(${vacancyName})`)
      .closest(".oxd-table-row")
      .within(() => {
        cy.get(".bi-eye-fill").click({ force: true });
      });
    cy.get("button").contains("Mark Interview Passed").click({ force: true });
    cy.get("button").contains("Save").click();
  }
  changeStatusToFailed(vacancyName: any) {
    SIDE_BAR.getPageFromSidebar("Recruitment").click();
    cy.get(`.oxd-table-cell:contains(${vacancyName})`)
      .closest(".oxd-table-row")
      .within(() => {
        cy.get(".bi-eye-fill").click({ force: true });
      });
    cy.get("button").contains("Mark Interview Failed").click({ force: true });
    cy.get("button").contains("Save").click();
  }
}
export default ChangeCandidateStatus;
