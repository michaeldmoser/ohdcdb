*** Settings ***
Resource          ../resources/authentication.resource
Test Setup        Flush Database
Test Teardown     Flush Database

*** Test Cases ***
User with a valid account can login
    Given Michael has an account
    When Michael logs in with valid credentials
    Then xe sees the home screen

User with no account cannot login
    Given John does not have an account
    When xe tries to login
    Then xe sees a no valid login message

*** Keywords ***
${user} has an account
    &{newUser}=    Create User    ${user}    michael@example.com    Test1234!
    Set Test Variable    \&{newUser}

${user} does not have an account
    Open the login page

${pronoun:(s?h|x)e} tries to login
    Input Text    email    nopassword@example.com
    Input Text    current-password    Test1234!
    Click Button    Login

${pronoun:(s?h|x)e} sees a no valid login message
    Wait Until Page Contains    We're sorry but that is not a valid login!

${user} logs in with valid credentials
    Open the login page
    Input Text    email    ${newUser}[email]
    Input Text    current-password    Test1234!
    Capture Page Screenshot
    Click Button    Login

${pronoun:(s?h|x)e} sees the home screen
    Wait Until Page Contains    Orchard Homes Ditch Database - Dashboard
