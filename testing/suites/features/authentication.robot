*** Settings ***
Resource          ../resources/authentication.resource
Test Setup        Setup the test
Test Teardown     Teardown the test

*** Test Cases ***
User with a valid account can login
    Given Michael has an account
    When Michael logs in with valid credentials
    Then he sees the home screen

User with no account cannot login
    Given John does not have an account
    When xe tries to login
    Then xe sees a no valid login message

User fills out form incorrectly
    Given Michael is on the login screen
    When xe tries to login without filling in the form
    Then xe sees a message saying to fill out the form

User can logout
    Given Michael is on the home screen
    When he logouts
    Then he should see the login screen
# User logs in with the remember me
#    Given Michael logged in with the remember me box checked
#    When he closes the browser
#    and returns to the app
#    Then he sees the home screen

*** Keywords ***
Given ${user} has an account
    ${newUser}=    Create User    ${user}    email=michael@example.com
    Set Test Variable    \${newUser}

${user} does not have an account
    Open the login page

${pronoun:(s?h|x)e} tries to login
    Login To App    nopassword    Test1234!

${pronoun:(s?h|x)e} sees a no valid login message
    Wait Until Page Contains    No active account found with the given credentials

${user} logs in with valid credentials
    Open the login page
    Input Text    username    ${newUser.username}
    Input Text    current-password    Test1234!
    Capture Page Screenshot
    Click Button    Login

${pronoun:(s?h|x)e} sees the home screen
    Wait Until Page Contains    Dashboard

${user} is on the login screen
    Open the login page

${pronoun:(s?h|x)e} tries to login without filling in the form
    Input Text    username    ${EMPTY}
    Input Text    current-password    ${EMPTY}
    Click Button    Login

${pronoun:(s?h|x)e} sees a message saying to fill out the form
    Wait Until Page Contains    Please provide a username
    Wait Until Page Contains    Please provide a password

${user} logged in with the remember me box checked
    ${newUser}=    Create User    ${user}    michael@example.com    Test1234!
    Set Test Variable    \${newUser}
    Open the app
    Login To App    ${newUser.username}    Test1234!    True

${pronoun:(s?h|x)e} closes the browser
    Close Browser

returns to the app
    Open the app

${user} is on the home screen
    Run Keyword    ${user} has an account
    Run Keyword    ${user} logs in with valid credentials

${pronoun:(s?h|x)e} logouts
    Capture Page Screenshot
    Click Button    id:logout

${pronoun:(s?h|x)e} should see the login screen
    Wait Until Page Contains    Username
    Wait Until Page Contains    Password
    Wait Until Page Contains    Login

Setup the test
    Flush database

Teardown the test
    Flush Database
