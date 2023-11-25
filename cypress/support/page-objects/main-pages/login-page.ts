class LoginPage {
  elements = {
    userName: () => cy.get('[name="username"]'),
    password: () => cy.get('[name="password"]'),
    loginBtn: () => cy.get("button"),
  };

  login(userName: string, password: string) {
    cy.visit("/auth/login");
    this.elements.userName().clear().type(userName).should("have.value", userName);
    this.elements.password().clear().type(password).should("have.value", password);
    this.elements.loginBtn().click();
  }

  logout() {
    cy.clearCookies();
    cy.visit(
      "/auth/login"
    );
  }
}

export default LoginPage;
