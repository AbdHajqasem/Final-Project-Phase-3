import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../support/page-objects/main-pages/login-page";
import Employee from "../../support/page-objects/main-pages/pim-page/add-employee/add-employee";
import JobTitles from "../../support/page-objects/main-pages/admin-page/job/job-titles";
import Vacancy from "../../support/page-objects/main-pages/recruitment/vacancy";
import Candidate from "../../support/page-objects/main-pages/recruitment/candidate/candidate";
import Delete from "../../support/helper/delete-records";
import ChangeCandidateStatus from "../../support/page-objects/main-pages/recruitment/candidate/change-candidate-status";
import Assertion from "../../support/helper/assertion";
const EMPLOYEE: Employee = new Employee();
const LOGIN_PAGE: LoginPage = new LoginPage();
const JOB_TITLES: JobTitles = new JobTitles();
const VACANCY: Vacancy = new Vacancy();
const DELETE: Delete = new Delete();
const CANDIDATE: Candidate = new Candidate();
const CHANGE_CANDIDATE_STATUS: ChangeCandidateStatus =
  new ChangeCandidateStatus();
const ASSERTION: Assertion = new Assertion();
let newEmployees: any = [];
let newJobTitleId = 0;
let newVacancyId = 0;
let newCandidateId = 0;
Given(
  "a created Employee, Job Title, Vacancy, and Candidate with an Interview scheduled state",
  () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    LOGIN_PAGE.login("Admin", "admin123");
    cy.fixture("employee-info").as("employeeData");
    cy.get("@employeeData").then((employeeData: any) => {
      const ids: any = [];
      EMPLOYEE.addEmployee(employeeData.employeeInfo[0]).then(
        (employeeId: any) => {
          newEmployees[0] = employeeId;
          ids.push(employeeId);
        }
      );
      employeeData.ids = ids;
      cy.writeFile("cypress/fixtures/employee-info.json", employeeData);
    });

    cy.fixture("job-titles").as("jobTitlesData");
    cy.get("@jobTitlesData").then((jobTitlesData: any) => {
      JOB_TITLES.addJobTitleUsingAPI(jobTitlesData).then((jobTitleId: any) => {
        newJobTitleId = jobTitleId;
      });
    });

    cy.fixture("vacancy").as("vacancyData");
    cy.get("@vacancyData").then((vacancyData: any) => {
      VACANCY.createVacancy(vacancyData, newJobTitleId, newEmployees[0]).then(
        (vacancyId: any) => {
          newVacancyId = vacancyId;
        }
      );
    });
    cy.fixture("candidate").as("candidateData");
    cy.get("@candidateData").then((candidateData: any) => {
      CANDIDATE.createInterviewScheduledCandidate(
        candidateData,
        newVacancyId,
        newEmployees[0]
      ).then((candidateId) => {
        newCandidateId = candidateId;
      });
    });
    LOGIN_PAGE.logout();
  }
);
When(
  "I, as an admin, log in, navigate to the candidate form, and update the candidate's status to Interview Passed",
  () => {
    LOGIN_PAGE.login("Admin", "admin123");
    cy.fixture("vacancy").as("vacancyData");
    cy.get("@vacancyData").then((vacancyData: any) => {
      CHANGE_CANDIDATE_STATUS.changeStatusToPassed(vacancyData.name);
    });
  }
);

Then("the candidate's status should be Interview Passed", () => {
  ASSERTION.assertionForPassed();
});

When(
  "I, as an admin, log in, navigate to the candidate form, and update the candidate's status to Interview Failed",
  () => {
    LOGIN_PAGE.login("Admin", "admin123");
    cy.fixture("vacancy").as("vacancyData");
    cy.get("@vacancyData").then((vacancyData: any) => {
      CHANGE_CANDIDATE_STATUS.changeStatusToFailed(vacancyData.name);
    });
  }
);

Then("the candidate's status should be Interview Failed", () => {
  ASSERTION.assertionForFailed();
});
afterEach("Delete all records", () => {
  DELETE.deleteEmployees(newEmployees);
  DELETE.deleteJobTitle(newJobTitleId);
  DELETE.deleteVacancy(newVacancyId);
  DELETE.deleteCandidate(newCandidateId);
});
