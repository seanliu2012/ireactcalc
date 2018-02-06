import delay from './delay';
import shortid from 'shortid';

const employees = [
  {
    Id: shortid.generate(),
    FirstName: "Foo",
    LastName: "Barr",
    Salary: 120000,
    SuperRate: "10%",
    PeriodStart: "01 Mar 2017",
    PeriodEnd: "31 Mar 2017"
  }
];

class employeeApi {

  static getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], employees));
      }, delay);
    });
  }

  static add(employee) {
    // clone it first to avoid changing the object passed in
    employee = Object.assign({}, employee);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        if (employee.FirstName.length < 2) {
          reject(`First name must be at least 2 characters.`);
        }
        if (employee.LastName.length < 3) {
          reject(`Last name must be at least 3 characters.`);
        }
        //TODO: validate all properties

        if (employee.Id) {
          const index = employees.findIndex(e => e.Id === employee.Id);
          employees.splice(index, 1, employee);
        } else {
          //Just simulating creation here.
          employee.Id = shortid.generate();
          employees.push(employee);
        }

        resolve(employee);
      }, delay);
    });
  }

  static delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = employees.findIndex(e => e.Id === id);
        employees.splice(index, 1);
        resolve();
      }, delay);
    });
  }

}
