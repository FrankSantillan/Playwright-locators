Feature: Validate Basic Authorization link section on the https://the-internet.hackerearth.com/

  Scenario: Basic Authorization
    Given I navigate to the homepage
    When I click on "Basic Auth"
    Then I handle the basic auth dialog with username "admin"
    And the page shows "Basic Auth"
