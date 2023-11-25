class Vacancy {
  createVacancy(vacancyData: any, jobTitleId: any, employeeId: any) {
    const VACANCY_PAYLOAD = {
      name: vacancyData.name,
      jobTitleId: jobTitleId,
      employeeId: employeeId,
      numOfPositions: vacancyData.numOfPositions,
      description: vacancyData.description,
      status: vacancyData.status,
      isPublished: vacancyData.isPublished,
    };
    console.log(vacancyData);
    
    return cy.api({
      method: "POST",
      url: "/api/v2/recruitment/vacancies",
      body: VACANCY_PAYLOAD,
    }).then((response) => {
      return response.body.data.id;
    });
  }
}
export default Vacancy;
