const nameText =
    document.getElementById("name");

const emailText =
    document.getElementById("email");

const studentList =
    document.getElementById("studentList");

const saveBtn =
    document.getElementById("saveBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const genders =
    document.getElementsByName("gender");

const hobbies =
    document.getElementsByName("hobby");

const studentForm =
    document.getElementById("studentForm");

const country =
    document.getElementById("country");

const state =
    document.getElementById("state");

const city =
    document.getElementById("city");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const pageNumber =
    document.getElementById("pageNumber");

let editrow = null;

// PAGINATION
let currentPage = 1;

const rowsPerPage = 10;

// FILTERED DATA
let filteredStudents = [...students];


// DISPLAY STUDENTS

function displaystudents() {

    let tabledata = "";

    // START INDEX
    const startIndex =
        (currentPage - 1) * rowsPerPage;

    // END INDEX
    const endIndex =
        startIndex + rowsPerPage;

    // PAGINATED DATA
    const paginatedStudents =
        filteredStudents.slice(startIndex, endIndex);

    paginatedStudents.forEach(function (student) {

        const originalIndex =
            students.indexOf(student);

        tabledata += `
        <tr>

            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.gender}</td>
            <td>${student.hobbies}</td>
            <td>${student.country}</td>
            <td>${student.state}</td>
            <td>${student.city}</td>

            <td>

                <button
                    id="deleteBtn"
                    onclick="deleteStudents(${originalIndex})">

                    Delete

                </button>

            </td>

            <td>

                <button
                    id="editBtn"
                    onclick="editStudent(${originalIndex})">

                    Edit

                </button>

            </td>

        </tr>
        `;
    });

    studentList.innerHTML = tabledata;

    // TOTAL PAGES
    const totalPages =
        Math.ceil(filteredStudents.length / rowsPerPage);

    pageNumber.innerText =
        `Page ${currentPage} of ${totalPages}`;
}


// FORM SUBMIT

studentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (nameText.value.trim() === "") {

        alert("Name is required");

        return;
    }

    if (emailText.value.trim() === "") {

        alert("Email is required");

        return;
    }

    // GENDER
    let selectedGender = "";

    genders.forEach(function (item) {

        if (item.checked) {

            selectedGender = item.value;
        }
    });

    if (selectedGender === "") {

        alert("Please select gender");

        return;
    }

    // HOBBIES
    let selectedHobbies = [];

    hobbies.forEach(function (item) {

        if (item.checked) {

            selectedHobbies.push(item.value);
        }
    });

    if (selectedHobbies.length === 0) {

        alert("Please select hobby");

        return;
    }

    // COUNTRY
    if (country.value === "") {

        alert("Please select country");

        return;
    }

    // STATE
    if (state.value === "") {

        alert("Please select state");

        return;
    }

    // CITY
    if (city.value === "") {

        alert("Please select city");

        return;
    }

    // CREATE OBJECT
    const student = {

        name: nameText.value,

        email: emailText.value,

        gender: selectedGender,

        hobbies: selectedHobbies.join(", "),

        country: country.value,

        state: state.value,

        city: city.value
    };

    // ADD
    if (editrow === null) {

        students.push(student);
    }

    // UPDATE
    else {

        students[editrow] = student;

        editrow = null;

        saveBtn.innerText = "Save";

         setTimeout(function () {

    alertStatus("Record Updated Successfully!")

    }, 300);
    }

    filteredStudents = [...students];

    displaystudents();

    resetAll();
    alertStatus("Record Saved Successfully!")
    
});

// ALERT POP-UP
function alertStatus(alertString) {
    setTimeout(function () {

        alert(alertString);

    }, 300);
}

// RESET FORM

function resetAll() {

    studentForm.reset();

    state.innerHTML =
        `<option value="">Select State</option>`;

    city.innerHTML =
        `<option value="">Select City</option>`;
}


// CANCEL BUTTON

cancelBtn.addEventListener("click", function () {

    resetAll();
});


// EDIT STUDENT

function editStudent(index) {

    const student = students[index];

    // NAME
    nameText.value = student.name;

    // EMAIL
    emailText.value = student.email;

    // GENDER
    genders.forEach(function (item) {

        item.checked =
            item.value === student.gender;
    });

    // HOBBIES
    hobbies.forEach(function (item) {

        item.checked = false;

        const hobbyArray =
            student.hobbies.split(", ");

        if (hobbyArray.includes(item.value)) {

            item.checked = true;
        }
    });

    // COUNTRY
    country.value = student.country;

    // LOAD STATES
    state.innerHTML =
        `<option value="">Select State</option>`;

    for (let stateName in countries[student.country]) {

        state.innerHTML += `
            <option value="${stateName}">
                ${stateName}
            </option>
        `;
    }

    state.value = student.state;

    // LOAD CITIES
    city.innerHTML =
        `<option value="">Select City</option>`;

    countries[student.country][student.state]
        .forEach(function (cityName) {

            city.innerHTML += `
                <option value="${cityName}">
                    ${cityName}
                </option>
            `;
        });

    city.value = student.city;

    editrow = index;

    saveBtn.innerText = "Update";
}


// DELETE STUDENT

function deleteStudents(index) {

    students.splice(index, 1);

    filteredStudents = [...students];

    displaystudents();

    alertStatus("Record Deleted Successfully!")

}


// SEARCH

searchInput.addEventListener("input", function () {

    const searchValue =
        this.value.toLowerCase();

    filteredStudents =
        students.filter(function (student) {

            return student.name
                .toLowerCase()
                .includes(searchValue);
        });

    currentPage = 1;

    displaystudents();
});


// SORTING

sortSelect.addEventListener("change", function () {

    const sortValue = this.value;

    filteredStudents = [...filteredStudents];

    if (sortValue === "asc") {

        filteredStudents.sort(function (a, b) {

            return a.name.localeCompare(b.name);
        });
    }

    else if (sortValue === "desc") {

        filteredStudents.sort(function (a, b) {

            return b.name.localeCompare(a.name);
        });
    }

    currentPage = 1;

    displaystudents();
});


// PAGINATION

prevBtn.addEventListener("click", function () {

    if (currentPage > 1) {

        currentPage--;

        displaystudents();
    }
});

nextBtn.addEventListener("click", function () {

    const totalPages =
        Math.ceil(filteredStudents.length / rowsPerPage);

    if (currentPage < totalPages) {

        currentPage++;

        displaystudents();
    }
});


// LOAD COUNTRIES

for (let countryName in countries) {

    country.innerHTML += `
        <option value="${countryName}">
            ${countryName}
        </option>
    `;
}

// COUNTRY CHANGE

country.addEventListener("change", function () {

    state.innerHTML =
        `<option value="">Select State</option>`;

    city.innerHTML =
        `<option value="">Select City</option>`;

    const selectedCountry =
        this.value;

    for (let stateName in countries[selectedCountry]) {

        state.innerHTML += `
            <option value="${stateName}">
                ${stateName}
            </option>
        `;
    }
});


// STATE CHANGE

state.addEventListener("change", function () {

    city.innerHTML =
        `<option value="">Select City</option>`;

    const selectedCountry =
        country.value;

    const selectedState =
        this.value;

    const cities =
        countries[selectedCountry][selectedState];

    cities.forEach(function (cityName) {

        city.innerHTML += `
            <option value="${cityName}">
                ${cityName}
            </option>
        `;
    });
});


// INITIAL DISPLAY
displaystudents();