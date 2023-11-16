class Candidate {
  createCandidate(candidateData: any, vacancyId: any) {
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
        url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates",
        body: CANDIDATE_PAYLOAD,
      })
      .then((response) => {
        return response.body.data.id;
      });
  }
  hiredCandidate(candidateId: any, empNumber: any, candidateData: any) {
    return cy
      .api({
        method: "PUT",
        url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${candidateId}/shortlist`,
        body: {
          note: null,
        },
      })
      .then(() => {
        const PAY_LOAD = {
          interviewName: candidateData.interviewName,
          interviewDate: candidateData.interviewDate,
          interviewTime: candidateData.interviewTime,
          note: candidateData.note,
          interviewerEmpNumbers: [empNumber],
        };
        return cy
          .api({
            method: "POST",
            url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${candidateId}/shedule-interview`,
            body: PAY_LOAD,
          })
          .then((res) => {
            return cy
              .api({
                method: "PUT",
                url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${candidateId}/interviews/${res.body.data.id}/pass`,
                body: {
                  note: null,
                },
              })
              .then(() => {
                return cy
                  .api({
                    method: "PUT",
                    url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${candidateId}/job/offer`,
                    body: {
                      note: null,
                    },
                  })
                  .then(() => {
                    return cy.api({
                      method: "PUT",
                      url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${candidateId}/hire`,
                      body: {
                        note: null,
                      },
                    });
                  });
              });
          });
      });
  }
}
export default Candidate;
