*** Settings ***
Resource          ../resources/common.resource
Resource          ../resources/authentication.resource
Library           ohdcdb.robot.django.Django

*** Test Cases ***
Can view a list of people
    Given there are people in the database
    And Rachel has the app open
    When Rachel navigates to the people screen
    Then she sees a list of people

Can view the details of a person
    Given Rachel is viewing the list of people
    When she clicks on a person
    Then she sees the details screen for that person

Can add a new person to the database
    Given Rachel is viewing the list of people
    When she adds a new person to the database
    Then she sees the details screen for that person

Can edit a person in the database
    Given Rachel is viewing a person
    When she changes somes details for that person
    Then she sees the details screen for that person

*** Keywords ***
there are people in the database
    @{PEOPLE_IN_DATABASE}    Add people to database    10
    Set Test Variable    \@{PEOPLE_IN_DATABASE}

${user} has the app open
    Open the app for    ${user}

When Rachel navigates to the people screen
    Click Link    People
    Wait Until Location Is    ${LOGIN_URL}/people

${pronoun:(s?h|x)e} sees a list of people
    FOR    ${PERSON}    IN    @{PEOPLE_IN_DATABASE}
        Wait Until Page Contains    ${PERSON.first_name}
        Wait Until Page Contains    ${PERSON.last_name}
        Wait Until Page Contains    ${PERSON.email}
    END
