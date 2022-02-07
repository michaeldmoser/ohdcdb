*** Settings ***
Documentation     Collection of resources used through nearly all tests
Library           SeleniumLibrary
Library           ohddb.robot.Django    settings=backend.settings    path=backend

*** Variables ***
${LOGIN URL}      http://localhost:3000
${BROWSER}        Headless Chrome
${CHROME_OPTIONS}    add_argument("--no-sandbox"); add_argument("--disable-dev-shm-usage"); add_argument('--disable-gpu'); add_argument("--window-size=1920,1080"); add_argument('--ignore-certificate-errors')

*** Keywords ***
Open the app
    Open Browser    ${LOGIN URL}    ${BROWSER}    options=${CHROME_OPTIONS}
    Wait Until Page Contains    Orchard Homes Ditch
