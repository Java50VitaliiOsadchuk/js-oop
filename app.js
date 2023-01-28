/* HW #21 */
// Employe structure and function createEmployee() taken from previous HW
function createEmployee(id, name, birthYear, salary, city, country) {
    return {id, name, birthYear, salary, address: {city, country}}
}

class Company {
    #employees //object key: <id value>, value: reference to Employee object
    constructor() {
        this.#employees = {};
    }
    addEmployee(empl) {
        //TODO
        //adds empl into #employees object
        //returns true if added new employee object
        //returns false if employee with a given id value already exists
        if (this.#employees[empl.id] != undefined)
            return false; // already exists

        this.#employees[empl.id] = empl;
        return true;
    }
    removeEmployee(id) {
        //TODO
        //removes employee with a given id from #employees object
        //returns true if removed
        //returns false if employee with the id doesn't exist
        if (this.#employees[id] == undefined)
            return false; // doesn't exists

        delete this.#employees[id];
        return true;
    }
    getEmployeesCountry(country) {
        //TODO
        //returns array of employee objects having field "country" equal to a given country
        return Object.values(this.#employees).filter(empl => { 
            return (empl.address.country == country); 
        })
    }
    getEmployeesByAge(age) {
        //TODO
        //returns array of employee objects with a given age
        const date = new Date();
        let y = date.getFullYear();
        return Object.values(this.#employees).filter(empl => { 
            return ((y-empl.birthYear) == age); 
        })
    }
    getEmployeesBySalaries(salryFrom, salryTo){ 
        //TODO
        //returns array of employee objects with salary in a given closed range [salaryFrom, salaryTo]
        //if salaryFrom < 0, then get employees with salary less or equal salaryTo
        //if salaryTo , 0, then get employees with salary greater or equal salaryFrom
        //if salaryFrom < 0 && salaryTo < 0, then get all employees
    
    
        return Object.values(this.#employees).filter(empl=>{
            if (salryFrom<0 && salryTo>=0) { 
                    return empl.salary<=salryTo;
                    } 
            if (salryTo<salryFrom ) { 
                    return empl.salary>=salryFrom;
                    } 
                if (salryFrom<0 && salryTo<0){
                    return true;
                    }
                return (empl.salary>=salryFrom && empl.salary<=salryTo);
            });
    }
}

// Create Company instance
let company = new Company();

// Add employees
company.addEmployee(createEmployee(123, "Vasya", 2000, 15000, "Lod", "Israel"));
company.addEmployee(createEmployee(124, "David", 1975, 15500, "Tel Aviv", "Israel"));
company.addEmployee(createEmployee(125, "Sara", 1985, 20000, "New York", "USA"));
company.addEmployee(createEmployee(126, "Abraham", 1990, 13000, "London", "UK"));
company.addEmployee(createEmployee(127, "Moshe", 2000, 15000, "Rehovot", "Israel"));
company.addEmployee(createEmployee(128, "Goga", 1993, 10000, "Tbilisi", "Gorgia"));
company.addEmployee(createEmployee(129, "Sasha", 2000, 25000, "Ramat Gan", "Israel"));
company.addEmployee(createEmployee(130, "Victor", 2003, 10000, "Arad", "Israel"));

// Try to add an employee with the same id
// Must return false
console.log(company.addEmployee(createEmployee(124, "John", 1977, 15700, "Tel Mond", "France")));

console.log(company.getEmployeesCountry("Israel").length);
company.removeEmployee(127);
console.log(company.getEmployeesCountry("Israel").length);

console.log(company.getEmployeesByAge(23).length);
console.log(company.getEmployeesBySalaries(5000, 20000).length);
console.log(company.getEmployeesBySalaries(-7, 15000).length);
console.log(company.getEmployeesBySalaries(15000, -3).length);
console.log(company.getEmployeesBySalaries(-5000, -20000).length);