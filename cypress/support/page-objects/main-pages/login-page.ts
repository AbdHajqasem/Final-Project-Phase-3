class LoginPage {
    elements = {
      userName: () => cy.get('[name="username"]'),
      password: () => cy.get('[name="password"]'),
      loginBtn: () => cy.get("button"),
      forgetPasswordLink: () => cy.get(".orangehrm-login-forgot-header"),
      usernameErrorText: () =>
        cy.get(":nth-child(2) > .oxd-input-group > .oxd-text"),
      passwordErrorText: () =>
        cy.get(":nth-child(3) > .oxd-input-group > .oxd-text"),
      message: () => cy.get(".oxd-alert-content > .oxd-text"),
    };
  
    login(userName: string, password: string) {
      if (userName != "") {
        this.elements.userName().type(userName).should("have.value", userName);
      }
      if (password != "") {
        this.elements.password().type(password).should("have.value", password);
      }
      this.elements.loginBtn().click();
    }
  
    logout() {
      cy.clearCookies();
      cy.visit(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      );
    }
  }
  
  export default LoginPage;
  