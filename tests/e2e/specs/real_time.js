describe("/real_time", () => {
  it("Redirect to /real_time from /", () => {
    cy.visit("/");
    cy.url().should("include", "/real_time");

    cy.get("h2").should($el => expect($el).to.contain("Endpoints"));
  });
});
