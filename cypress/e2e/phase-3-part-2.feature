Feature: Validate the ability of users to upload a txt file for Application Initiated and Hired statuses

    Scenario: Confirming the user's capability to upload a txt file for Application Initiated
        Given I create an employee, job title, vacancy, and candidate with Application Initiated state

        When I log in as an Admin, access the candidate form, enable the Edit candidate switch, upload a txt file to the Resume section, and save the form. Then download the uploaded file1.

        Then The uploaded file should contain the same data as was uploaded1.

    Scenario: Confirming the user's capability to upload a txt file for Application Initiated
        Given I create an employee, job title, vacancy, and candidate with Hired state

        When I log in as an Admin, access the candidate form, enable the Edit candidate switch, upload a txt file to the Resume section, and save the form. Then download the uploaded file2.

        Then The uploaded file should contain the same data as was uploaded2.