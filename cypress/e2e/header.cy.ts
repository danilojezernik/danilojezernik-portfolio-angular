describe('Sidebar Links', () => {

  beforeEach(() => {

    // Intercept the API request and prevent it from being made
    cy.intercept('GET', '**/blog/limited/', { statusCode: 200, body: [] }).as('getBlogLimited');

    // Visit the homepage
    cy.visit('http://localhost:3000/')
  });

  it('should open main page and close it', () => {
    cy.get('[data-cy="main-header"]')
      .click()
      .should('be.visible')

    cy.get('[data-cy="close-menu"]')
      .click()
  });

  it('should open main page and go to about me page', () => {
    cy.get('[data-cy="main-header"]')
      .click()
      .should('be.visible')

    cy.get('[data-cy="open-route"]')
    cy.get('a')
  });



});
