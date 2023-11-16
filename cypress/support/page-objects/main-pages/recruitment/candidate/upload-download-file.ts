import SideBar from "../../../sub-pages/side-bar";
import GetFromRecruitmentNavBar from "./recruitment-nav-bar";
const SIDE_BAR: SideBar = new SideBar();
const GET: GetFromRecruitmentNavBar = new GetFromRecruitmentNavBar();
class UploadAndDownloadAFile {
  uploadFile(vacancyName: any) {
    let uploadedFileContent: any;
    cy.fixture("myName.txt").then((fileContent) => {
      uploadedFileContent = fileContent;
    });
    SIDE_BAR.getPageFromSidebar("Recruitment").click({ force: true });
    cy.get(`.oxd-table-cell:contains(${vacancyName})`)
      .closest(".oxd-table-row")
      .within(() => {
        cy.get(".bi-eye-fill").click({ force: true });
      });
    cy.get(".oxd-switch-input").click({ force: true });
    cy.get("button").contains("Save").click({ force: true });
    cy.get("input[type=file]").selectFile("cypress/fixtures/myName.txt", {
      force: true,
    });
    cy.get(".oxd-file-div").should("contain", "myName.txt");
  }

  downloadFile(id: any) {
    cy.downloadFile(
      `https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidateAttachment/candidateId/${id}`,
      "cypress/downloads",
      "myName.txt"
    );
  }
  downloadFileHired(id: any) {
    cy.downloadFile(
      `https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidateAttachment/candidateId/${id}`,
      "cypress/downloads/hired-file",
      "myName.txt"
    );
  }
  readFile() {
    const downloadPath = "cypress/downloads";
    const fileName = "myName.txt";
    cy.readFile("cypress/downloads/myName.txt", "utf-8")
      .should("include", "AbdulkareemHajqasem")
  }
}
export default UploadAndDownloadAFile;
