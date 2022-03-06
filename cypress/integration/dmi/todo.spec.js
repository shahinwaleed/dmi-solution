/// <reference types="cypress-xpath" />
import * as itemSelector from "../../../helper/randomSelector";
const data = require("../../../data/taskList");

describe(`Verify the correct functionality for adding, removing, and editing items to the list`, function () {
  before(function () {
    cy.visit(
      `/client/index.html?https://mysterious-thicket-31854.herokuapp.com/`
    );
  });

  // single test
  it(`Should navigate to TODO list, crate, edit then delete task`, () => {
    // selects a random data based on the function from '/helper/randomSelector.js'
    var selectSingleTask = itemSelector.getRandomItem(data.taskData.taskList);

    // enters that value in the new todo field
    cy.get("#new-todo", { timeout: 5000 }).type(`${selectSingleTask}{enter}`);

    // after creating selects all the text value from the list
    cy.get("#todo-list > li > div >label", { timeout: 10000 }).should(
      "contain.text",
      selectSingleTask
    );

    // edits the random selected task
    var editTask = `not ${selectSingleTask}`;

    // xpath to look up the task in the list and double click to activate the edit
    cy.xpath(
      `//ul[@id='todo-list']/li/div/label[contains(.,'${selectSingleTask}')]`,
      { timeout: 10000 }
    ).as("taskLabel");
    cy.get("@taskLabel", { timeout: 10000 }).dblclick();

    // clears the input field and then enters new value for {editTask}
    cy.xpath(
      `//ul[@id='todo-list']/li/div/label[contains(.,'${selectSingleTask}')]//parent::div/following-sibling::input`,
      { timeout: 10000 }
    )
      .clear()
      .type(`${editTask}{enter}`);
    cy.get(`@taskLabel`, { timeout: 10000 }).should("contain.text", editTask);

    // finds the delete button for the edited task and delets from the the list
    cy.xpath(
      `//ul[@id='todo-list']/li/div/label[contains(.,'${editTask}')]/following-sibling::button`,
      { timeout: 10000 }
    )
      .invoke("show")
      .trigger("mouseover")
      .click({ force: true });
  });
});
