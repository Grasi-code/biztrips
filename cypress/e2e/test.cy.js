describe('Home Page', () => {
  it('should display the correct title', () => {
    cy.visit('https://fluffy-florentine-456b52.netlify.app'); 
    cy.contains('h1', 'Welcome to biztrips Happy new Year-react - 2024'); 
  });
});