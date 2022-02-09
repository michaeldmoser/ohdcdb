*** Settings ***
Resource          ../resources/common.resource
Suite Setup       Backup Database
Suite Teardown    Restore Database
