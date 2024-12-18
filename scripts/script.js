function fetchMedication() {
    const condition = document.getElementById('healthConditionDropdown').value;  // Corrected ID
    console.log('Selected health condition:', condition);

    fetch('http://192.168.2.188/medicine_inspector_apis/getdetail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ health_condition: condition })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        let output = "";  // Declare output once here

        if (Array.isArray(data)) {  // Ensure data is an array
            data.forEach(medicine => {
                output += `<p>${medicine.medicine_name}, ${medicine.retail_price}, ${medicine.our_price}</p>`;
            });
        } else {
            console.error('Expected an array but got:', data);
        }

        document.getElementById('MedicationData').innerHTML = output;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}




function getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')  // API URL for users
        .then(response => response.json())  // Convert response to JSON
        .then(users => {
            const tableBody = document.querySelector('#usersTable tbody');
            tableBody.innerHTML = '';  // Clear any existing rows

            // Loop through the users array and populate the table
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                `;
                tableBody.appendChild(row);  // Add the new row to the table
            });
        })
        .catch(error => console.error('Error fetching users:', error));  // Handle any errors
}

// Call the getUsers function to load data when the page is ready
document.addEventListener('DOMContentLoaded', getUsers);