function signup(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('EmailId').value;
    const password = document.getElementById('password').value;
    const url = 'http://139.59.37.38/medicine_inspector/signup.php';

    console.log('Email:', email);
    console.log('Password:', password);

    // Use fetch API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Signup failed: ${response.statusText}`);
            }
        })
        .then(result => {
            console.log('Signup successful:', result);
            alert('Signup successful!');
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Error during signup:', error);
            alert('Signup failed. Please try again.');
        });
}

// Attach the function to the form's submit event
document.getElementById('myForm').addEventListener('submit', signup);




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






// Call the getUsers function to load data when the page is ready
document.addEventListener('DOMContentLoaded', getUsers);

 // Add an event listener to the health_condition dropdown
//  document.getElementById('health_condition').addEventListener('change', function() {
//     submitForm();
// });

// function submitForm() {
//     // Get the selected health condition
//     const healthCondition = document.getElementById('health_condition').value;

//     // Create form data
//     const formData = new FormData();
//     formData.append('health_condition', healthCondition);

//     // Perform POST request using Fetch API
//     fetch('http://139.59.37.38/medicine_inspector/price.php', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.json()) // Parse JSON response
//     .then(data => {
//         if (data.status === "true") {
//             // Call function to display table
//             displayTable(data.Data);
//         } else {
//             alert('Error: ' + data.message);
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

// function displayTable(medicines) {
//     // Create the table structure
//     let tableHTML = `<table>
//                         <thead>
//                             <tr>
//                                 <th>Medicine Name</th>
//                                 <th>Retail Price</th>
//                                 <th>Our Price</th>
//                             </tr>
//                         </thead>
//                         <tbody>`;

//     // Loop through the medicines data to generate rows
//     medicines.forEach(medicine => {
//         tableHTML += `<tr>
//                         <td>${medicine.medicine_name}</td>
//                         <td>${medicine.retail_price}</td>
//                         <td>${medicine.our_price}</td>
//                       </tr>`;
//     });

//     tableHTML += `</tbody></table>`;

//     // Insert table into the div
//     document.getElementById('medicineTable').innerHTML = tableHTML;
// }




 // Add event listeners to each list item for selecting a health condition
 const listItems = document.querySelectorAll('#health_condition_list li');
 listItems.forEach(item => {
     item.addEventListener('click', function() {
         // Get the selected health condition from the clicked item
         const healthCondition = item.getAttribute('data-condition');
         submitForm(healthCondition);
     });
 });

 // Filter function for search
 document.getElementById('search').addEventListener('input', function() {
     const searchValue = this.value.toLowerCase();
     const listItems = document.querySelectorAll('#health_condition_list li');

     listItems.forEach(item => {
         const itemText = item.textContent.toLowerCase();
         if (itemText.includes(searchValue)) {
             item.style.display = ''; // Show item if it matches
         } else {
             item.style.display = 'none'; // Hide item if it doesn't match
         }
     });
 });

 function submitForm(healthCondition) {
     // Create form data
     const formData = new FormData();
     formData.append('health_condition', healthCondition);

     // Perform POST request using Fetch API
     fetch('http://139.59.37.38/medicine_inspector/price.php', {
         method: 'POST',
         body: formData
     })
     .then(response => response.json()) // Parse JSON response
     .then(data => {
         if (data.status === "true") {
             // Call function to display table
             displayTable(data.Data);
         } else {
             alert('Error: ' + data.message);
         }
     })
     .catch(error => {
         console.error('Error:', error);
     });
 }

 function displayTable(medicines) {
     // Create the table structure
     let tableHTML = `<table>
                         <thead>
                             <tr>
                                 <th>Generic Name</th>
                                 <th>Medicine Name</th>
                                 <th>Type</th>
                                 <th>Retail Price</th>
                                 <th>Our Price</th>
                             </tr>
                         </thead>
                         <tbody>`;

     // Loop through the medicines data to generate rows
     medicines.forEach(medicine => {
         tableHTML += `<tr>
                         <td>${medicine.generic_name}</td>
                         <td>${medicine.medicine_name}</td>
                         <td>${medicine.type}</td>
                         <td>${medicine.retail_price}</td>
                         <td>${medicine.our_price}</td>
                       </tr>`;
     });

     tableHTML += `</tbody></table>`;

     // Insert table into the div
     document.getElementById('medicineTable').innerHTML = tableHTML;
 }




// Function to handle signup
function signup(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('EmailId').value;
    const password = document.getElementById('password').value;
    const url = 'http://139.59.37.38/medicine_inspector/signup.php';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Signup failed');
            }
        })
        .then(result => {
            console.log('Signup successful:', result);
            alert('Signup successful!');
            window.location.href = 'Medicine Inspector.html';
        })
        .catch(error => {
            console.error('Error during signup:', error);
            alert('Signup failed. Please try again.');
        });
}



