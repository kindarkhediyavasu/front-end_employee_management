const operationButtons = document.querySelectorAll(".operation-section__button");
const addEmployeeForm = document.querySelector(".display-section__add-employee_form");
const employeeListTable = document.querySelector(".display-section__employee-table");
const tableBody = document.querySelector(".display-section__employee-table tbody");
const searchEmployeeUI = document.querySelector(".display-section__search-employee");
const searchEmployeeButton = document.querySelector(".display-section__search-employee button");

let employeeArray = [];

operationButtons.forEach((button) => {
    button.addEventListener("click",(e) => {
        if(e.target.innerText === "View"){
            viewEmployeeList();
        }else if(e.target.innerText === "Add"){
            addEmployee();
        }else if(e.target.innerText === "Search"){
            searchEmployee();
        }
    })
});

function viewEmployeeList(){
    addEmployeeForm.style.display = "none";
    employeeListTable.style.display = "table";
    searchEmployeeUI.style.display = "none";
    displayEmployee();
};
function addEmployee(){
    addEmployeeForm.style.display = "flex";
    employeeListTable.style.display = "none";
    searchEmployeeUI.style.display = "none";
};
function searchEmployee(){
    addEmployeeForm.style.display = "none";
    employeeListTable.style.display = "none";
     searchEmployeeUI.style.display = "block";
};


addEmployeeForm.addEventListener("submit",(e) => {
    e.preventDefault();
    readEmployeesList();
    let formData = new FormData(addEmployeeForm);
    let object = Object.fromEntries(formData.entries());
    employeeArray.push(object);
    localStorage.setItem("employees",JSON.stringify(employeeArray));
    addEmployeeForm.reset();
    displayEmployee();
});

//read data;
function readEmployeesList(){
    employeeArray = [];
    const employeesString = localStorage.getItem("employees");
    const employees = JSON.parse(employeesString);
    if(employees !== null){
        for(let emp of employees){
            employeeArray.push(emp);
        }
    }
    
}

function displayEmployee(){
    tableBody.innerHTML = "";
    readEmployeesList();
    employeeArray.forEach((e) => {
        tableBody.innerHTML += `
                <tr>
                    <td>${e.emp_id}</td>
                    <td>${e.emp_name}</td>
                    <td>${e.emp_department}</td>
                    <td>${e.emp_salary}</td>
                    <td>${e.emp_joining_date}</td>
                    <td><button id="display-section__delete-button" onClick="deleteEmployee(${e.emp_id})">delete</button></td>
                </tr>`
    })
}
displayEmployee();


function deleteEmployee(empId){
   readEmployeesList();
   const newEmployeeList = employeeArray.filter((emp) => {
        return  emp.emp_id != empId;
   });
   localStorage.setItem("employees",JSON.stringify(newEmployeeList));
   displayEmployee();
}

searchEmployeeButton.addEventListener("click",(e) => {
    const searchInput = searchEmployeeButton.previousElementSibling;
    const value = searchInput.value;
    if(value === ""){
        alert("please, Enter The Employee Name");
    }else{
        readEmployeesList();
        const searchEmployee = employeeArray.filter((e) => {
            return e.emp_name == value;
        });
        if(searchEmployee.length != 0){
            tableBody.innerHTML = "";
           searchEmployee.forEach((e) => {
                tableBody.innerHTML += `
                <tr>
                    <td>${e.emp_id}</td>
                    <td>${e.emp_name}</td>
                    <td>${e.emp_department}</td>
                    <td>${e.emp_salary}</td>
                    <td>${e.emp_joining_date}</td>
                    <td><button id="display-section__delete-button" onClick="deleteEmployee(${e.emp_id})">delete</button></td>
                </tr>`
           });
            employeeListTable.style.display = "table";
            searchEmployeeUI.style.display = "none";
        }else{
            alert("Employee Not Found!");
        }  
    }
    searchInput.value = "";
})