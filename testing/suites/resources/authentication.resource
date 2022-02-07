*** Settings ***
Resource          ../resources/common.resource

*** Keywords ***
Open the login page
    Open the app
    Wait Until Page Contains    Email address
    Wait Until Page Contains    Password
    Wait Until Page Contains    Login
