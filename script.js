const nameText = document.getElementById("name");
const emailText = document.getElementById("email");
const studentList = document.getElementById("studentList");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const genders = document.getElementsByName("gender");
const hobbies = document.getElementsByName("hobby")
const studentForm = document.getElementById("studentForm");
const country = document.getElementById("country");
const state = document.getElementById("state");
const city = document.getElementById("city");
const searchInput = document.getElementById("searchInput");

let editrow = null;

studentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (nameText.value.trim() === "") {
        alert("Name is required");

        return;
    };

    if (emailText.value.trim() === "") {
        alert("email is required");

        return;
    };

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

    let selectedHobbies = [];

    hobbies.forEach(function (item) {

        if (item.checked) {

            selectedHobbies.push(item.value)

            return;
        }
    });

    if (selectedHobbies.length === 0) {

        alert("Please select hobby");

        return;

    };

    if (country.value === "") {

        alert("please select country");

        return;
    }

    if (state.value === "") {

        alert("Please select state");

        return;
    }

    if (city.value === "") {

        alert("please select city");

        return;
    }

    // CREATE STUDENT OBJECT
    const student = {

        name: nameText.value,

        email: emailText.value,

        gender: selectedGender,

        hobbies: selectedHobbies.join(","),

        country: country.value,

        state: state.value,

        city: city.value

    };

    if (editrow === null) {

        students.push(student);

    } else {

        students[editrow] = student;

        editrow = null;

        let students = []

        saveBtn.innerText = "Save";

    }

    displaystudents();
    resetAll();

});

//Display Students

function displaystudents(studentData = students) {

    let tabledata = "";

    studentData.forEach(function (student, index) {

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
                <button id = "deleteBtn" onclick="deleteStudents(${index})">
                    Delete
                </button>
            </td>

            <td>
                <button id = "editBtn" onClick ="editStudent(${index})">
                    Edit
                </button>
            </td>
        </tr>
        `;
    });

    studentList.innerHTML = tabledata;
}

///  LOAD COUNTRIES 

for (let countryName in countries) {

    country.innerHTML += `

        <option value="${countryName}">
            ${countryName}
        </option>
        
    `;
}

//  COUNTRY CHANGE 

country.addEventListener("change", function () {

    // RESET STATE
    state.innerHTML =
        `<option value="">Select State</option>`;

    // RESET CITY
    city.innerHTML =
        `<option value="">Select City</option>`;

    const selectedCountry = this.value;

    //LOAD STATES
    for (let stateName in countries[selectedCountry]) {

        state.innerHTML += `
            <option value="${stateName}">
                ${stateName}
            </option>
        `;
    }
});

//STATE CHANGE

state.addEventListener("change", function () {

    // RESET CITY DROPDOWN

    city.innerHTML =
        `<option value="">Select City</option>`;

    const selectedCountry = country.value;

    const selectedState = this.value;

    const cities =
        countries[selectedCountry][selectedState];

    // LOAD CITIES

    cities.forEach(function (cityName) {

        city.innerHTML += `
            <option value="${cityName}">
                ${cityName}
            </option>
        `;
    });
});


//DISPLAY STUDENT

displaystudents();

cancelBtn.addEventListener("click", function () {

    resetAll();

})

//RESET ALL FIELDS

function resetAll() {

    studentForm.reset();

    state.innerHTML = `<option value ="">Select State</option>`;

    city.innerHTML = `<option value = "">Select City</option>`;

}

function editStudent(index) {



    const student = students[index];


    // FILL INPUTS 

    nameText.value = student.name;

    emailText.value = student.email;


    // GENDER 

    genders.forEach(function (item) {

        if (item.value === student.gender) {

            item.checked = true;
        }
    });


    // HOBBIES

    hobbies.forEach(function (item) {

        item.checked = false;

        let hobbyArray =
            student.hobbies.split(",");

        if (hobbyArray.includes(item.value)) {

            item.checked = true;
        }
    });


    //  COUNTRY 

    country.value = student.country;


    //  LOAD STATES 

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


    // STORE EDIT INDEX 

    editrow = index;

    // CHANGE SAVE BUTTON TEXT TO UPDATE 

    saveBtn.innerText = "Update";
}

//DELETE RECORD

function deleteStudents(index) {

    students.splice(index, 1);

    displaystudents();
}


//SEARCH BY NAME
searchInput.addEventListener("input", function () {

    const searchValue =
        this.value.toLowerCase();

    if (searchValue === "") {

        displaystudents();

        return;
    }

//FILTER BY NAME
    const filteredStudents =
    
        students.filter(function (student) {

            return student.name
                .toLowerCase()
                .includes(searchValue);

        });

    displaystudents(filteredStudents);

});

const sortSelect =
    document.getElementById("sortSelect");

sortSelect.addEventListener("change", function () {

    const sortValue = this.value;

    let sortedStudents =
        [...students];

    if (sortValue === "asc") {

        sortedStudents.sort(function (a, b) {

            return a.name.localeCompare(b.name);

        });

    }

    else if (sortValue === "desc") {

        sortedStudents.sort(function (a, b) {

            return b.name.localeCompare(a.name);

        });

    }

    displaystudents(sortedStudents);

});