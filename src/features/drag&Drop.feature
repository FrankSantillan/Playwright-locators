Feature: Drag and Drop functionality

  Scenario: Verify columns can be swapped
    Given I navigate to the homepage
    When I click on "Drag and Drop"
    And the columns are displayed
    When I drag column A to column B
    Then the first column should display "B"
    And the second column should display "A"
