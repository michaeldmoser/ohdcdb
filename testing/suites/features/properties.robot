*** Settings ***
Resource          ../resources/common.resource
Resource          ../resources/authentication.resource
Resource          ../resources/locators.resource
Resource          ../resources/properties.resource
Library           ohdcdb.robot.django.Django
Suite Setup       Flush Database
Test Teardown     Flush Database

*** Test Cases ***
Can view a list of properties
    Given there are properties in the database
    And Dominick has the app open
    When Dominick navigates to the properties screen
    Then he sees a list of properties

Can view the details of a property
    Given Dominick is viewing the list of properties
    When he clicks to view the details of a property
    Then he sees the details screen for that property

Can add a new property to the database
    Given Dominick is viewing the list of properties
    When he adds a new property to the database
    Then he sees the details screen for the new property
    And he sees the property in the list view

Can edit a property in the database
    Given Dominick is viewing a property
    When he changes some details for the property
    Then he sees the updated details screen for that property

Can search for properties
# Should be more specific about the search, ie: search by first name, search by last name, email, etc... What criteria do we want?
    Given Dominick is viewing the list of properties
    When he enters a search
    Then he should see a list of properties matching the search

*** Keywords ***
There are properties in the database
    @{PROPERTIES}    Add properties to database    10
    Set Test Variable    \@{PROPERTIES}

${user} has the app open
    Open the app for    ${user}

Dominick navigates to the properties screen
    Click Link    Properties
    Wait Until Location Is    ${APP_URL}/properties

${pronoun:(s?h|x)e} sees a list of properties
    FOR    ${property}    IN    @{PROPERTIES}
        Wait Until Page Contains    ${property.address1}
        Wait Until Page Contains    ${property.address2}
    END

Dominick is viewing the list of properties
    There are properties in the database
    Dominick has the app open
    Dominick navigates to the properties screen

${pronoun:(s?h|x)e} clicks to view the details of a property
    Wait Until Page Contains Element    //*[contains(text(), '${PROPERTIES[0].address1}')]
    Click Element    //*[contains(text(), '${PROPERTIES[0].address1}')]

${pronoun:(s?h|x)e} sees the details screen for that property
    Should see the details screen    ${PROPERTIES[0].address1}    ${PROPERTIES[0].address2}    ${PROPERTIES[0].acres}    ${PROPERTIES[0].postalcode}

${pronoun:(s?h|x)e} adds a new property to the database
    Click Button    Add Property
    Wait Until Location Is    ${APP_URL}/properties/create
    ${property}    Generate new property
    Set Test Variable    $property
    Input Text    address1    ${property.address1}
    Input Text    address2    ${property.address2}
    Input Text    acres    ${property.acres}
    Input Text    postalcode    ${property.postalcode}
    Click Button    Save

${pronoun:(s?h|x)e} sees the details screen for the new property
    Should see the details screen    ${property.address1}    ${property.address2}    ${property.acres}    ${property.postalcode}

${pronoun:(s?h|x)e} sees the property in the list view
    Wait Until Element Contains    ${LIST_ARTICLE}    ${property.address1}

Dominick is viewing a property
    there are properties in the database
    Open the app for    Dominick
    Set Test Variable    $property    ${PROPERTIES[0]}
    Go To    ${APP_URL}/properties/${property.id}
    Wait Until Element Contains    ${DETAIL_ARTICLE}    ${property.first_name}

${pronoun:(s?h|x)e} changes some details for the property
    Click Link    ${DETAIL_ARTICLE}//a[contains(., 'Edit')]
    Wait Until Page Contains    Update ${property.address1}
    Textfield Should Contain    address1    ${property.address1}
    Textfield Should Contain    address2    ${property.address2}
    Textfield Should Contain    acres    ${property.acres}
    Textfield Should Contain    postalcode    ${property.postalcode}
    Input Text    address2    Suite 1
    Click Button    Save

${pronoun:(s?h|x)e} sees the updated details screen for that property
    Wait Until Element Contains    ${DETAIL_ARTICLE}    ${property.address1}
    Page Should Contain Element    ${DETAIL_ARTICLE}//dl/dd[contains(., 'Suite 1')]

${pronoun:(s?h|x)e} enters a search
    Set Test Variable    ${property}    ${PROPERTIES[1]}
    Input Text    search    ${property.address1}

${pronoun:(s?h|x)e} should see a list of properties matching the search
    Wait Until Page Does Not Contain    ${PROPERTIES[0].address1}
    Wait Until Page Contains    ${property.address1}
