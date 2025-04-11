Cypress.Commands.add('visitGoogle', () => {
    cy.visit('https://www.google.com');
    cy.title().should('include', 'Google');
  });