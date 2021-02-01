describe("Initial Visits", () => {
	it("navigates to the initial screen", () => {
		cy.visit("/");
		cy.contains(/learn react/i).should("exist");
	});
});
