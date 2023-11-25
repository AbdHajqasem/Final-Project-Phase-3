class Delete {
    urls = {
      deleteEmployees:
        "/api/v2/pim/employees",
      deleteJobTitle:
        "/api/v2/admin/job-titles",
      deleteLocation:
        "/api/v2/admin/locations",
        deleteEvent:
        "/api/v2/claim/events",
        deleteExpense:
        "/api/v2/claim/expenses/types",
        deleteVacancy:
        "/api/v2/recruitment/vacancies",
        deletecandidate:
        "/api/v2/recruitment/candidates"
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
  