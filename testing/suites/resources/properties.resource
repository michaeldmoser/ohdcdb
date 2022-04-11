
*** Keywords ***
Should see the details screen
    [Arguments]    ${address1}    ${address2}    ${acres}    ${postalcode}
    Wait Until Element Contains    ${DETAIL_ARTICLE}    ${address1}
    Wait Until Element Contains    ${DETAIL_ARTICLE}    ${address2}
    Page Should Contain Element    ${DETAIL_ARTICLE}//dl/dt[contains(., 'Acres')]
    Page Should Contain Element    ${DETAIL_ARTICLE}//dl/dd[contains(., '${acres}')]
    Page Should Contain Element    ${DETAIL_ARTICLE}//dl/dt[contains(., 'Zipcode')]
    Page Should Contain Element    ${DETAIL_ARTICLE}//dl/dd[contains(., '${postalcode}')]
