Feature: AB Testing

  Scenario: Verify AB Testing Page Loads
    Given I navigate to the homepage
    When I click on "A/B Testing"
    Then the AB Testing page should display correct content
