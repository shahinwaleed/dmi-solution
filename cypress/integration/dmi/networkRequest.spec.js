/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe(`Network Request`, () => {
  before(() => {
    cy.visit("https://www.todobackend.com/");
  });

  it(`Verify Api request`, () => {
    cy.request("https://todo-backend-sanic.herokuapp.com/todo/12").as("todo12");
    cy.get("@todo12").should((response) => {
      console.log(response.body);
    });
  });
});
