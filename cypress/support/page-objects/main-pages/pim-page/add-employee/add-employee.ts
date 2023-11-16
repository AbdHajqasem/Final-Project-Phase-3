import GenerateRandomNumber from "../../../../generate-random-number";
class Employee {
  urls = {
    employees:
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees",
    users:
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users",
  };
  addEmployee(employeeData: any) {
    const employeePayload = {
      firstName: employeeData.firstName,
      middleName: employeeData.middleName,
      lastName: employeeData.lastName,
      empPicture: employeeData.empPicture,
      employeeId: `${GenerateRandomNumber.generateRandomNumber()}`,
    };

    return cy
      .api({
        method: "POST",
        url: this.urls.employees,
        body: employeePayload,
      })
      .then((response) => {
        //console.log(response.body.data.empNumber);
        return response.body.data.empNumber;
      });
  }

  addUser(employeeData: any) {
    return this.addEmployee(employeeData).then((employeeResponse) => {
      const empNo = employeeResponse;
      const userPayload = {
        empNumber: empNo,
        password: employeeData.password,
        status: true,
        userRoleId: 2,
        username: employeeData.username,
      };

      return cy
        .api({
          method: "POST",
          url: this.urls.users,
          body: userPayload,
        })
        .then((userResponse) => {
          console.log(userResponse);
          return userResponse.body.data.employee.empNumber;
        }); 
    });
  }
}
export default Employee;
