*** Settings ***
Resource          ../resources/common.resource
Resource          ../resources/authentication.resource

*** Test Cases ***
User with a valid account can login
    Given Michael has an account
    When Michael logs in with valid credentials
    Then he sees the home screen

*** Keywords ***
${user} has an account
    Create User    ${user}    michael@example.com    Test1234!

${user} logs in with valid credentials
    Open the app
    Wait Until Page Contains    Email address
    Wait Until Page Contains    Password
    Wait Until Page Contains    Login
    Input Text    email    ${user}
    Input Text    current-password    Test1234!
    Click Link    Login

${pronoun:s?he} sees the home screen

