class Delete {
    urls = {
      deleteEmployees:
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees",
      deleteJobTitle:
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/job-titles",
      deleteLocation:
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/locations",
        deleteEvent:
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/claim/events",
        deleteExpense:
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/claim/expenses/types",
        deleteVacancy:
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies",
        deletecandidate:
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates"
    };
    deleteEmployees(employeeData: any) {
      const deleteEmployeePayload = {
        ids: employeeData,
      };
  
      return cy
        .api({
          method: "DELETE",
          url: this.urls.deleteEmployees,
          body: deleteEmployeePayload,
        })
        .then((response) => {
          //console.log(response.body.data.empNumber);
          return response.body.data.empNumber;
        });
    }
    deleteJobTitle(jobTilteId: any) {
      const deletePayload = {
        ids: [jobTilteId],
      };
      return cy.api({
        method: "DELETE",
        url: this.urls.deleteJobTitle,
        body: deletePayload,
      });
    }
    deleteLocation(locationId: any) {
      const deletePayload = {
        ids: [locationId],
      };
      return cy.api({
        method: "DELETE",
        url: this.urls.deleteLocation,
        body: deletePayload,
      });
    }
    deleteReport(reportName: any) {
      cy.get(`.oxd-table-cell:contains(${reportName})`)
        .closest(".oxd-table-row")
        .within(() => {
          cy.get(".oxd-icon.bi-trash").click();
        }); 
        cy.get('button').contains('Yes, Delete').click()
    }
    deleteEvent(eventId:any){
      const deletePayload = {
        ids: [eventId],
      };
      return cy.api({
        method: "DELETE",
        url: this.urls.deleteEvent,
        body: deletePayload,
      });
    }
    deleteExpense(expenseId:any){
      const deletePayload = {
        ids: [expenseId],
      };
      return cy.api({
        method: "DELETE",
        url: this.urls.deleteExpense,
        body: deletePayload,
      });
    }
    deleteVacancy(vacancyId:any){
      const deletePayload = {
        ids: [vacancyId],
      };
      return cy.api({
        method: "DELETE",
        url: this.urls.deleteVacancy,
        body: deletePayload,
      });
    }
    deleteCandidate(candidateId:any){
      const deletePayload = {
        ids: [candidateId],
      };
      return cy.api({
        method: "DELETE",
        url: this.urls.deletecandidate,
        body: deletePayload,
      });
    }
  }
  export default Delete;
  