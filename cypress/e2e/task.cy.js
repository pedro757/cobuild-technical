describe("Create and Delete Task", () => {
  before(() => {
    cy.login();
    cy.visit("/");
    cy.wait("@session");
  });
  it("should provide a valid session", () => {
    cy.get(".create").should("exist");
  });

  it("Create task", () => {
    cy.get(".create").click();
    let name = "name example";
    cy.get("#nameInput").type(name);
    let content = "content example";
    cy.get("#contentInput").type(content);
    cy.get("button").contains("Submit").click();
    cy.get("div").contains(name).should("exist");
    cy.get("div").contains(content).should("exist");
  });

  it("Delete task", () => {
    cy.get("div")
      .contains("name example")
      .parent()
      .parent()
      .within(() => {
        cy.get("button").contains("Delete Task").click();
      });
    cy.get("div").contains("name example").should("not.exist");
  });
});
