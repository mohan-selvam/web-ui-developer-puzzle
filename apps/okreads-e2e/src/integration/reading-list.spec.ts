describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should able to undo my reading list', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('.book ').should('have.length.greaterThan', 1);
    cy.get('[data-testing="book-item-0"]')
      .find('[data-cy-add-book="add-book-0"]')
      .click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
    cy.get('[data-cy-reading-list="reading-list-0"]')
    .find('[data-cy-remove="remove-0"]')
    .wait(6000)
    .click();
    cy.get('.mat-simple-snackbar-action')
      .find('.mat-button-wrapper')
      .contains('Undo')
      .click();
      cy.get('[data-cy-reading-list="reading-list-0"]')
      .find('[data-cy-remove="remove-0"]')
      .should('not.be.empty');
  });

});
