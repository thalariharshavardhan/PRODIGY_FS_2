// app.js

// Load employees from localStorage on page load
document.addEventListener('DOMContentLoaded', loadEmployees);

let editingEmployeeId = null;

// Add new employee function
function addEmployee() {
    const name = document.getElementById('employeeName').value;
    const position = document.getElementById('employeePosition').value;
    const salary = document.getElementById('employeeSalary').value;

    if (name && position && salary) {
        const employee = {
            id: Date.now(),
            name,
            position,
            salary
        };

        // Get existing employees from localStorage or initialize an empty array
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        employees.push(employee);

        // Save employees back to localStorage
        localStorage.setItem('employees', JSON.stringify(employees));

        // Clear form and reload employee list
        clearForm();
        loadEmployees();
    } else {
        alert("Please fill in all fields.");
    }
}

// Load all employees and display in table
function loadEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employeeTableBody = document.querySelector('#employeeTable tbody');
    employeeTableBody.innerHTML = ''; // Clear existing rows

    employees.forEach(employee => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.salary}</td>
            <td>
                <button class="edit" onclick="editEmployee(${employee.id})">Edit</button>
                <button class="delete" onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
        `;

        employeeTableBody.appendChild(row);
    });
}

// Delete employee function
function deleteEmployee(id) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const updatedEmployees = employees.filter(employee => employee.id !== id);

    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    loadEmployees();
}

// Edit employee function
function editEmployee(id) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employee = employees.find(emp => emp.id === id);

    document.getElementById('employeeName').value = employee.name;
    document.getElementById('employeePosition').value = employee.position;
    document.getElementById('employeeSalary').value = employee.salary;

    document.getElementById('updateButton').style.display = 'block';
    document.querySelector('button').style.display = 'none';

    editingEmployeeId = id;
}

// Update employee function
function updateEmployee() {
    const name = document.getElementById('employeeName').value;
    const position = document.getElementById('employeePosition').value;
    const salary = document.getElementById('employeeSalary').value;

    if (name && position && salary) {
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const employeeIndex = employees.findIndex(emp => emp.id === editingEmployeeId);

        if (employeeIndex !== -1) {
            employees[employeeIndex].name = name;
            employees[employeeIndex].position = position;
            employees[employeeIndex].salary = salary;

            localStorage.setItem('employees', JSON.stringify(employees));

            // Clear form and reload employee list
            clearForm();
            loadEmployees();
        }
    } else {
        alert("Please fill in all fields.");
    }
}

// Clear form after submission or update
function clearForm() {
    document.getElementById('employeeName').value = '';
    document.getElementById('employeePosition').value = '';
    document.getElementById('employeeSalary').value = '';
    document.getElementById('updateButton').style.display = 'none';
    document.querySelector('button').style.display = 'block';
    editingEmployeeId = null;
}
