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
