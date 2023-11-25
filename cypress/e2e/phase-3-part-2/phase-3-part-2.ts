/// <reference types="cypress-downloadfile"/>
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import LoginPage from "../../support/page-objects/main-pages/login-page";

import Employee from "../../support/page-objects/main-pages/pim-page/add-employee/add-employee";

import JobTitles from "../../support/page-objects/main-pages/admin-page/job/job-titles";

import Vacancy from "../../support/page-objects/main-pages/recruitment/vacancy";

import Candidate from "../../support/page-objects/main-pages/recruitment/candidate/candidate";

import Delete from "../../support/helper/delete-records";

import UploadAndDownloadAFile from "../../support/page-objects/main-pages/recruitment/candidate/upload-download-file";

const EMPLOYEE: Employee = new Employee();

const LOGIN_PAGE: LoginPage = new LoginPage();

const JOB_TITLES: JobTitles = new JobTitles();

const VACANCY: Vacancy = new Vacancy();

const DELETE: Delete = new Delete();

const CANDIDATE: Candidate = new Candidate();

const UPLOAD_DOWNLOAD_FILE: UploadAndDownloadAFile =
  new UploadAndDownloadAFile();

let newEmployees: any = [];
let newJobTitleId = 0;
let newVacancyId = 0;
let newCandidateId = 0;
Given(
  "I create an employee, job title, vacancy, and candidate with Application Initiated state",
  () => {
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
      CANDIDATE.createCandidate(candidateData, newVacancyId).then(
        (candidateId) => {
          newCandidateId = candidateId;
        }
      );
    });
    LOGIN_PAGE.logout();
  }
);
When(
  "I log in as an Admin, access the candidate form, enable the Edit candidate switch, upload a txt file to the Resume section, and save the form. Then download the uploaded file1.",
  () => {
    LOGIN_PAGE.login("Admin", "admin123");
    cy.fixture("vacancy").as("vacancyData");
    cy.get("@vacancyData").then((vacancyData: any) => {
      UPLOAD_DOWNLOAD_FILE.uploadFile(vacancyData.name);
    });
    UPLOAD_DOWNLOAD_FILE.downloadFile(newCandidateId);
  }
);
Then("The uploaded file should contain the same data as was uploaded1.", () => {
  UPLOAD_DOWNLOAD_FILE.readFile();
});

Given(
  "I create an employee, job title, vacancy, and candidate with Hired state",
  () => {
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
      CANDIDATE.createCandidate(candidateData, newVacancyId).then(
        (candidateId) => {
          newCandidateId = candidateId;
        }
      );
    });
    cy.get("@candidateData").then((candidateData: any) => {
      CANDIDATE.hiredCandidate(newCandidateId, newEmployees[0], candidateData);
      LOGIN_PAGE.logout();
    });
  }
);

When(
  "I log in as an Admin, access the candidate form, enable the Edit candidate switch, upload a txt file to the Resume section, and save the form. Then download the uploaded file2.",
  () => {
    LOGIN_PAGE.login("Admin", "admin123");
    cy.fixture("vacancy").as("vacancyData");
    cy.get("@vacancyData").then((vacancyData: any) => {
      UPLOAD_DOWNLOAD_FILE.uploadFile(vacancyData.name);
    });
    UPLOAD_DOWNLOAD_FILE.downloadFileHired(newCandidateId);
  }
);
Then("The uploaded file should contain the same data as was uploaded2.", () => {
  UPLOAD_DOWNLOAD_FILE.readFile();
});
afterEach("Delete all records", () => {
  DELETE.deleteEmployees(newEmployees);
  DELETE.deleteJobTitle(newJobTitleId);
  DELETE.deleteVacancy(newVacancyId);
  DELETE.deleteCandidate(newCandidateId);
});
