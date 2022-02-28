*** Settings ***
Resource          ../resources/common.resource
Suite Setup       Setup the Suite
Suite Teardown    Teardown the Suite

*** Keywords ***
Setup the Suite
    Backup Database

Teardown the Suite
    Restore Database
