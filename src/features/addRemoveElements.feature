Feature: Validate Add/Remove Elements link section on the https://the-internet.hackerearth.com/

  Scenario: Add and remove elements from the page
    Given I navigate to the homepage
    When I click on "Add/Remove Elements"
    And I add 3 elements
    Then 3 elements should be displayed
    When I remove 2 elements
    Then 1 element should remain
