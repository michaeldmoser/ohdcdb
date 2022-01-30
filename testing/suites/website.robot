*** Settings ***
Library           Collections
Library           RequestsLibrary
Library           SeleniumLibrary
Suite Teardown    Delete All Sessions

*** Variables ***
${LOGIN URL}      http://app:8000
${BROWSER}        Headless Chrome
${CHROME_OPTIONS}    add_argument("--no-sandbox"); add_argument("--disable-dev-shm-usage"); add_argument('--disable-gpu'); add_argument("--window-size=1920,1080"); add_argument('--ignore-certificate-errors')

*** Test Cases ***
Open the app
    Open Browser    ${LOGIN URL}    ${BROWSER}    options=${CHROME_OPTIONS}
    Title Should Be    Orchard Homes Ditch Company CRM
    Capture Page Screenshot    custom_page.png
