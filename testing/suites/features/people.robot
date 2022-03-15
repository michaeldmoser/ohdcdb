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
    When she clicks the view button for a person
    Then she sees the details screen for that person

Can add a new person to the database
    Given Rachel is viewing the list of people
    When she adds a new person to the database
    Then she sees the details screen for that person
    And she sees the person in the list view

Can edit a person in the database
    Given Rachel is viewing a person
    When she changes somes details for that person
    Then she sees the details screen for that person

Can search for people
# Should be more specific about the search, ie: search by first name, search by last name, email, etc... What criteria do we want?
    Given Rachel is viewing the list of people
    When she enters a search
    Then she should see a list of people matching the search

*** Keywords ***
there are people in the database
    @{PEOPLE_IN_DATABASE}    Add people to database    10
    Set Test Variable    \@{PEOPLE_IN_DATABASE}

${user} has the app open
    Open the app for    ${user}

Rachel navigates to the people screen
    Click Link    People
    Wait Until Location Is    ${LOGIN_URL}/people

${pronoun:(s?h|x)e} sees a list of people
    FOR    ${PERSON}    IN    @{PEOPLE_IN_DATABASE}
        Wait Until Page Contains    ${PERSON.first_name}
        Wait Until Page Contains    ${PERSON.last_name}
        Wait Until Page Contains    ${PERSON.email}
    END

Rachel is viewing the list of people
    There are people in the database
    Rachel has the app open
    Rachel navigates to the people screen

${pronoun:(s?h|x)e} clicks the view button for a person
    Click Button    //*[contains(text(), "${PEOPLE_IN_DATABASE[0].email}")]/ancestor::tr//button[contains(text(), "View")]

${pronoun:(s?h|x)e} sees the details screen for that person
    Wait Until Element Contains    //article/header/h4    ${PEOPLE_IN_DATABASE[0].first_name}${SPACE}${PEOPLE_IN_DATABASE[0].last_name}
    Page Should Contain Element    //article//dl/dt[contains(text(), 'Email')]
    Page Should Contain Element    //article//dl/dd[contains(text(), '${PEOPLE_IN_DATABASE[0].email}')]
    Page Should Contain Element    //article//dl/dt[contains(text(), 'Home Phone')]
    Page Should Contain Element    //article//dl/dd[contains(text(), '${PEOPLE_IN_DATABASE[0].home}')]
    Page Should Contain Element    //article//dl/dt[contains(text(), 'Mobile Phone')]
    Page Should Contain Element    //article//dl/dd[contains(text(), '${PEOPLE_IN_DATABASE[0].mobile}')]
