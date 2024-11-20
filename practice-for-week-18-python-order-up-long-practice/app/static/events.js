document.addEventListener('DOMContentLoaded', () => {
    const tableAssignForm = document.getElementById("table-assign-form");

    tableAssignForm.addEventListener("submit", (event) => {
        event.preventDefault();


        const tableSelect = document.getElementById("open-tables");
        const employeeSelect = document.getElementById("servers");

        tableId = tableSelect.value;
        employeeId = employeeSelect.value;

        if (parseInt(tableId) > 0 && parseInt(employeeId) > 0) {
            tableAssignForm.action = `/assign_table/${tableId}/${employeeId}`;
            tableAssignForm.submit();
        }
        else {
            alert("Please select a table and a server")
        }
    });
})
