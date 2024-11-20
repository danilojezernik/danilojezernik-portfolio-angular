describe('Sidebar Links', () => {

  beforeEach(() => {
    // Visit the homepage
    cy.visit('http://localhost:3030/')
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
