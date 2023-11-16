class GetFromRecruitmentNavBar {
    getFromPimNavBar(subPageName: any) {
      return cy.get("[data-v-5327b38a]").find("li").contains(subPageName);
    }
  }
  export default GetFromRecruitmentNavBar;