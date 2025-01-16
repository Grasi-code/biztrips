/// <reference types="cypress" />

import React from 'react';
import { mount } from '@cypress/react';
import { testTrips } from "../../src/components/api";
import TripList from "../../src/components/TripList";

describe("TripList Tests", () => {
  // Common E2E tests that visit the actual page
  describe("E2E Tests", () => {
    beforeEach(() => {
      cy.visit("https://fluffy-florentine-456b52.netlify.app");
    });

    it("displays all business trips", () => {
      cy.get(".card-product").should("have.length.gt", 0);
    });

    it("filters trips by month", () => {
      cy.get("#month").select("February");
      cy.get("h2").should("include.text", "Feb");
    });

    it("shows empty state when no trips match filter", () => {
      cy.get("#month").select("June");
      cy.get(".alert-info").should("contain", "Productlist is empty");
    });

    it("can add trips to wishlist", () => {
      cy.get("button").contains("Add to Wishlist").first().click();
    });
  });

  // Component tests using mount()
  describe("Component Tests", () => {
    beforeEach(() => {
      // Create a spy for the addToWishlist function
      const addToWishlistSpy = cy.spy().as('addToWishlist');
      mount(<TripList addToWishlist={addToWishlistSpy} />);
    });

    it("renders trip list with correct structure", () => {
      cy.get(".container").should("exist");
      cy.get("h2").should("contain", "Triplist-Catalog");
      cy.get("#filters").should("exist");
      cy.get("#month").should("exist");
    });

    it("renders individual trip cards correctly", () => {
      cy.get(".card-product").each(($card, index) => {
        const trip = testTrips[index];
        cy.wrap($card).within(() => {
          cy.get(".img-wrap img").should("have.attr", "src", `images/items/${trip.id}.jpg`);
          cy.get(".title").should("contain", trip.id);
          cy.get(".card-text").should("contain", trip.description);
        });
      });
    });

    it("handles month filter selection", () => {
      cy.get("#month").select("February");
      cy.get("h2").should("include.text", "Feb");
    });

    it("calls addToWishlist when Add to Wishlist is clicked", () => {
      cy.contains("Add to Wishlist").first().click();
      cy.get('@addToWishlist').should('have.been.calledOnce');
    });
  });
});