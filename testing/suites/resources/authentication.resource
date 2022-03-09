*** Settings ***
Resource          ../resources/common.resource

*** Keywords ***
Open the login page
    Open the app
    Wait Until Page Contains    Username
    Wait Until Page Contains    Password
    Wait Until Page Contains    Login

Login To App
    [Arguments]    ${username}    ${password}    ${rememberme}=False
    Wait Until Page Contains    Login
    Input Text    username    ${username}
    Input Text    current-password    ${password}
    Run Keyword If    ${rememberme}    Select Checkbox    remember-me
    Click Button    Login

Open the app for
    [Arguments]    ${username}
    Open the app
    ${user}    Create User    ${username}
    ${ACCESS_TOKEN}    Get token for user    ${user}
    Execute Javascript    ARGUMENTS    ${ACCESS_TOKEN}    JAVASCRIPT    localStorage.setItem('access', arguments[0])
    Reload Page
    Wait Until Page Contains    Dashboard
