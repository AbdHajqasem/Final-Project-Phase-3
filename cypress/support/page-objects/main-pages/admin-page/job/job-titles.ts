class JobTitles {
    url = {
      jobTitle:
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/job-titles",
    };
    addJobTitleUsingAPI(jobTitlesData: any) {
      const jobTitlePayload = {
        description: jobTitlesData.description,
        note: jobTitlesData.note,
        specification: jobTitlesData.specification,
        title: jobTitlesData.title,
      };
  
      return cy
        .api({
          method: "POST",
          url: this.url.jobTitle,
          body: jobTitlePayload,
        })
        .then((jobTitleResponse) => {
         // console.log(jobTitleResponse.body.data.id);
          return jobTitleResponse.body.data.id;
        });
    }
  }
  export default JobTitles;
  
  