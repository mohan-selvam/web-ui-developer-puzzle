describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('.book ').should('have.length.greaterThan', 1);
  });

  it('Then: I should able to undo my reading list', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('.book ').should('have.length.greaterThan', 1);
    cy.get('[data-testing="book-item-0"]')
      .find('[data-cy-add-book="add-book-0"]')
      .click();
    cy.get('.mat-simple-snackbar-action')
      .find('.mat-button-wrapper')
      .contains('Undo')
      .click();
    cy.get('[data-testing="book-item-0"]')
      .find('[data-cy-add-book="add-book-0"]')
      .should('be.enabled');
  });

  xit('Then: I should see search results as I am typing', () => {
    // TODO: Implement this test!
  });
});
