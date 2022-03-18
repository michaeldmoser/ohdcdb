*** Settings ***
Documentation     Collection of resources used through nearly all tests
Library           SeleniumLibrary
Library           ohdcdb.robot.django.Django    settings=backend.settings    path=backend

*** Variables ***
${APP_URL}        http://localhost:3000
${BROWSER}        Headless Chrome
${CHROME_OPTIONS}    add_argument("--no-sandbox"); add_argument("--disable-dev-shm-usage"); add_argument('--disable-gpu'); add_argument("--window-size=1920,1080"); add_argument('--ignore-certificate-errors')

*** Keywords ***
Open the app
    Open Browser    ${APP_URL}    ${BROWSER}    options=${CHROME_OPTIONS}
    Wait Until Page Contains    Orchard Homes Ditch
