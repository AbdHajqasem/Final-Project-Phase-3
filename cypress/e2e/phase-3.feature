Feature: Candidate Interview Result Verification

   Scenario: Verify Candidate Interview Result Pass State

      Given a created Employee, Job Title, Vacancy, and Candidate with an Interview scheduled state

      When I, as an admin, log in, navigate to the candidate form, and update the candidate's status to Interview Passed

      Then the candidate's status should be Interview Passed

  Scenario: Verify Candidate Interview Result Failed State

      Given a created Employee, Job Title, Vacancy, and Candidate with an Interview scheduled state

      When I, as an admin, log in, navigate to the candidate form, and update the candidate's status to Interview Failed

      Then the candidate's status should be Interview Failed
      



