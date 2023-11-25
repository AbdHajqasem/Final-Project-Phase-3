class Candidate {
  createInterviewScheduledCandidate(
    candidateData: any,
    vacancyId: number,
    EmpNumber: number
  ) {
    const CANDIDATE_PAYLOAD = {
      firstName: candidateData.firstName,
      middleName: candidateData.middleName,
      lastName: candidateData.lastName,
      email: candidateData.email,
      contactNumber: null,
      keywords: null,
      comment: null,
      dateOfApplication: candidateData.dateOfApplication,
      consentToKeepData: false,
      vacancyId: vacancyId,
    };

    return cy
      .api({
        method: "POST",
        url: "/api/v2/recruitment/candidates",
        body: CANDIDATE_PAYLOAD,
      })
      .then((response) => {
        const CANDIDATE_ID = response.body.data.id;
        return cy
          .api({
            method: "PUT",
            url: `/api/v2/recruitment/candidates/${CANDIDATE_ID}/shortlist`,
            body: {
              note: null,
            },
          })
          .then(() => {
            return cy.api({
              method: "POST",
              url: `/api/v2/recruitment/candidates/${CANDIDATE_ID}/shedule-interview`,
              body: {
                interviewName: candidateData.interviewName,
                interviewDate: candidateData.interviewDate,
                interviewTime: candidateData.interviewTime,
                note: candidateData.note,
                interviewerEmpNumbers: [EmpNumber],
              },
            }).then(() => {
              return CANDIDATE_ID;
            });
          });
      });
  }
}

export default Candidate;
