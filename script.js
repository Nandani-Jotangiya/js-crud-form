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

let editrow = null;
let studentLists = [];

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


    const student = {

        name: nameText.value,

        email: emailText.value,

        gender: selectedGender,

        hobbies: selectedHobbies.join(","),

        country: country.value,

        state: state.value,

        city: city.value

    };

    students.push(student);

    displaystudents();
    resetAll();

});

//Display Students

function displaystudents() {

    let tabledata = "";

    students.forEach(function (student, index) {

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
                <button onclick="deleteStudents(${index})">
                    Delete
                </button>
            </td>

            <td>
                <button onClick ="editStudents(${index})">
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




