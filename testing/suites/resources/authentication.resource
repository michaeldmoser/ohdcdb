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
    ${TOKENS}    Get token for user    ${user}
    Execute Javascript    ARGUMENTS    ${TOKENS['access_token']}    JAVASCRIPT    sessionStorage.setItem('access', arguments[0])
    Execute Javascript    ARGUMENTS    ${TOKENS['refresh_token']}    JAVASCRIPT    sessionStorage.setItem('refresh', arguments[0])
    Reload Page
    Wait Until Page Contains    Dashboard

Expire ${user}'s token
    Execute Javascript    localStorage.setItem('access', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ3MzYzOTQ2LCJpYXQiOjE2NDczNjM2NDYsImp0aSI6IjZmZTg3MWY4OTc0YjQ0NWU4ZTE0Y2FkN2M2NGEyYzk1IiwidXNlcl9pZCI6MX0.UIGTprFiAo1L4Oz3ddheaiWV2kUEzzWgKCs4mRR0_zY') || sessionStorage.setItem('access', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ3MzYzOTQ2LCJpYXQiOjE2NDczNjM2NDYsImp0aSI6IjZmZTg3MWY4OTc0YjQ0NWU4ZTE0Y2FkN2M2NGEyYzk1IiwidXNlcl9pZCI6MX0.UIGTprFiAo1L4Oz3ddheaiWV2kUEzzWgKCs4mRR0_zY')
