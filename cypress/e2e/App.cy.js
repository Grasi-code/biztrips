/// <reference types="cypress" />

import { testTrips } from "../../src/components/api";
import React from "react";
import { mount } from "cypress/react";
import WishlistItem from "../../../src/components/WishlistItem";

describe("Cypress Tests: Integration, Component, and E2E", () => {
  //
  // Integration Tests
  //
  describe("Integration Tests", () => {
    beforeEach(() => {
      cy.visit("https://fluffy-florentine-456b52.netlify.app");
      cy.intercept("GET", "https://fluffy-florentine-456b52.netlify.app/api/trips", {
        body: testTrips,
      }).as("getTrips");
    });

    it("displays all business trips", () => {
      cy.wait("@getTrips");
      cy.get("[data-testid='trip-card']").should("have.length", 3);
    });

    it("filters trips by month", () => {
      cy.wait("@getTrips");
      cy.get("[data-testid='filter-month']").select("February");
      cy.get("[data-testid='trip-card']").should("have.length", 2);
    });

    it("adds a trip to the wishlist", () => {
      cy.wait("@getTrips");
      cy.contains("Add to Wishlist").click();
      cy.get("[data-testid='wishlist-item-1']").should("exist");
    });

    it("prevents duplicate additions to wishlist", () => {
      cy.wait("@getTrips");
      cy.contains("Add to Wishlist").click();
      cy.contains("Add to Wishlist").click(); // Attempt to add again
      cy.get("[data-testid='error-message']")
        .should("exist")
        .and("contain.text", "Trip already in wishlist");
    });

    it("removes a trip from the wishlist", () => {
      cy.wait("@getTrips");
      cy.contains("Add to Wishlist").click();
      cy.get("[data-testid='wishlist-item-1']")
        .find("button")
        .contains("delete Item")
        .click();
      cy.get("[data-testid='wishlist-item-1']").should("not.exist");
    });

    it("empties the wishlist", () => {
      cy.wait("@getTrips");
      cy.contains("Add to Wishlist").click();
      cy.contains("Add to Wishlist").click();
      cy.contains("empty wishlist").click();
      cy.get("[data-testid='wishlist-item']").should("not.exist");
    });
  });

  //
  // Component Tests
  //
  describe("Component Tests", () => {
    it("renders WishlistItem with correct details", () => {
      const trip = {
        id: 1,
        title: "BT01",
        description: "San Francisco World Trade Center on new Server/IOT/Client002",
      };

      mount(<WishlistItem trip={trip} />);
      cy.contains("BT01").should("exist");
      cy.contains("San Francisco World Trade Center on new Server/IOT/Client002").should("exist");
    });

    it("calls delete function on button click", () => {
      const trip = {
        id: 1,
        title: "BT01",
        description: "San Francisco World Trade Center on new Server/IOT/Client002",
      };
      const onDelete = cy.stub();

      mount(<WishlistItem trip={trip} onDelete={onDelete} />);
      cy.contains("delete Item").click();
      expect(onDelete).to.have.been.calledOnce;
    });
  });

  //
  // End-to-End (E2E) Tests
  //
  describe("End-to-End (E2E) Tests", () => {
    beforeEach(() => {
      cy.visit("https://fluffy-florentine-456b52.netlify.app");
      cy.intercept("GET", "https://fluffy-florentine-456b52.netlify.app/api/trips", {
        body: testTrips,
      }).as("getTrips");
    });

    it("adds, favorites, and removes an item in the wishlist", () => {
      cy.wait("@getTrips");
      cy.contains("Add to Wishlist").click();
      cy.get("[data-testid='wishlist-item-1']").should("exist");

      cy.get("[data-testid='wishlist-item-1']")
        .find("button")
        .contains("heart Item")
        .click();
      cy.get("[data-testid='wishlist-item-1']")
        .find("svg")
        .should("have.attr", "fill", "#FF0000");

      cy.get("[data-testid='wishlist-item-1']")
        .find("button")
        .contains("delete Item")
        .click();
      cy.get("[data-testid='wishlist-item-1']").should("not.exist");
    });
  });
});
