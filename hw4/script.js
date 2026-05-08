/*
  Name: Nikki Safarova
  File: script.js
  Date Created: 2026-03-22
  Date Updated: 2026-05-08
  Purpose: MIS 7375 Homework 4 - MediForm JavaScript Validation,
           Fetch API, Cookies, Local Storage, Weather API,
           Review Section, and Time-Based Events
*/

/* DATE, TIME, AND SLIDER */

function updateDateTime() {
  var now = new Date();

  var options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  };

  document.getElementById("today").innerHTML =
    now.toLocaleString("en-US", options);
}

updateDateTime();
setInterval(updateDateTime, 1000);

var slider = document.getElementById("health_score");
var output = document.getElementById("scoreValue");

if (slider && output) {
  output.innerHTML = slider.value;

  slider.oninput = function () {
    output.innerHTML = this.value;
  };
}

/* GENERAL UTILITIES */

function showError(id, message) {
  var el = document.getElementById(id);

  if (el) {
    el.innerHTML = message;
  }
}

function clearError(id) {
  var el = document.getElementById(id);

  if (el) {
    el.innerHTML = "";
  }
}

function getCheckedValue(name) {
  var selected = document.querySelector('input[name="' + name + '"]:checked');
  return selected ? selected.value : "";
}

function getCheckedList(name) {
  var checked = document.querySelectorAll('input[name="' + name + '"]:checked');
  var values = [];

  for (var i = 0; i < checked.length; i++) {
    values.push(checked[i].value);
  }

  return values;
}

/* INPUT FORMATTING */

function formatPhone(input) {
  var value = input.value.replace(/\D/g, "");

  if (value.length > 3 && value.length <= 6) {
    value = value.slice(0, 3) + "-" + value.slice(3);
  } else if (value.length > 6) {
    value =
      value.slice(0, 3) +
      "-" +
      value.slice(3, 6) +
      "-" +
      value.slice(6, 10);
  }

  input.value = value;
}

function formatSsn(input) {
  var value = input.value.replace(/\D/g, "");

  if (value.length > 3 && value.length <= 5) {
    value = value.slice(0, 3) + "-" + value.slice(3);
  } else if (value.length > 5) {
    value =
      value.slice(0, 3) +
      "-" +
      value.slice(3, 5) +
      "-" +
      value.slice(5, 9);
  }

  input.value = value;
}

/* FIELD VALIDATION */

function validateFirstname() {
  var value = document.getElementById("firstname").value.trim();

  if (!value) {
    showError("firstnameError", "First name is required.");
    return false;
  }

  if (!/^[A-Za-z'-]{1,30}$/.test(value)) {
    showError("firstnameError", "Letters, apostrophes, dashes only (max 30).");
    return false;
  }

  clearError("firstnameError");
  return true;
}

function validateMiddleinit() {
  var value = document.getElementById("middleinit").value.trim();

  if (value === "") {
    clearError("middleinitError");
    return true;
  }

  if (!/^[A-Za-z]$/.test(value)) {
    showError("middleinitError", "Enter 1 letter only.");
    return false;
  }

  clearError("middleinitError");
  return true;
}

function validateLastname() {
  var value = document.getElementById("lastname").value.trim();

  if (!value) {
    showError("lastnameError", "Last name is required.");
    return false;
  }

  if (!/^[A-Za-z'-]{1,30}$/.test(value)) {
    showError("lastnameError", "Letters, apostrophes, dashes only (max 30).");
    return false;
  }

  clearError("lastnameError");
  return true;
}

function validateDob() {
  var value = document.getElementById("dob").value;

  if (!value) {
    showError("dobError", "Date of birth is required.");
    return false;
  }

  var parts = value.split("-");
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var day = parseInt(parts[2], 10);
  var selected = new Date(year, month - 1, day);

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 120);
  minDate.setHours(0, 0, 0, 0);

  if (selected > today) {
    showError("dobError", "Date of birth cannot be in the future.");
    return false;
  }

  if (selected < minDate) {
    showError("dobError", "Date of birth cannot be more than 120 years ago.");
    return false;
  }

  clearError("dobError");
  return true;
}

function validateSsn() {
  var input = document.getElementById("ssn");
  formatSsn(input);

  var value = input.value;

  if (!value) {
    showError("ssnError", "SSN is required.");
    return false;
  }

  if (!/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/.test(value)) {
    showError("ssnError", "Format: ###-##-#### (dashes added automatically).");
    return false;
  }

  clearError("ssnError");
  return true;
}

function validateAddr1() {
  var value = document.getElementById("addr1").value.trim();

  if (!value) {
    showError("addr1Error", "Address is required.");
    return false;
  }

  if (value.length < 2 || value.length > 30) {
    showError("addr1Error", "Address must be 2–30 characters.");
    return false;
  }

  if (!/^[A-Za-z0-9\s,.'#\-]+$/.test(value)) {
    showError("addr1Error", "No special characters allowed.");
    return false;
  }

  clearError("addr1Error");
  return true;
}

function validateAddr2() {
  var value = document.getElementById("addr2").value.trim();

  if (value === "") {
    clearError("addr2Error");
    return true;
  }

  if (value.length < 2 || value.length > 30) {
    showError("addr2Error", "If entered, must be 2–30 characters.");
    return false;
  }

  if (!/^[A-Za-z0-9\s,.'#\-]+$/.test(value)) {
    showError("addr2Error", "No special characters allowed.");
    return false;
  }

  clearError("addr2Error");
  return true;
}

function validateCity() {
  var value = document.getElementById("city").value.trim();

  if (!value) {
    showError("cityError", "City is required.");
    return false;
  }

  if (value.length < 2 || value.length > 30) {
    showError("cityError", "City must be 2–30 characters.");
    return false;
  }

  if (!/^[A-Za-z\s'-]+$/.test(value)) {
    showError("cityError", "Letters and spaces only.");
    return false;
  }

  clearError("cityError");
  return true;
}

function validateSymptoms() {
  var value = document.getElementById("symptoms").value.trim();

  if (value === "") {
    return true;
  }

  if (value.length > 500) {
    showError("historyError", "Description must be 500 characters or less.");
    return false;
  }

  if (/<[^>]+>/.test(value)) {
    showError("historyError", "HTML tags are not allowed.");
    return false;
  }

  return true;
}

function updateCharCount() {
  var value = document.getElementById("symptoms").value;
  var el = document.getElementById("charCount");

  if (el) {
    el.textContent = value.length + " / 500";
    el.style.color = value.length > 450 ? "#b91c1c" : "#555";
  }
}

function validateState() {
  if (!document.getElementById("state").value) {
    showError("stateError", "Please select a state.");
    return false;
  }

  clearError("stateError");
  return true;
}

/* FETCH API: STATE DROPDOWN */

async function loadStates() {
  var stateSelect = document.getElementById("state");

  try {
    var response = await fetch("states.json");
    var states = await response.json();

    stateSelect.innerHTML = '<option value="">Select</option>';

    states.forEach(function (state) {
      var option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });
  } catch (error) {
    stateSelect.innerHTML = '<option value="">Error loading states</option>';
  }
}

function validateZip() {
  var value = document.getElementById("zip").value.trim();

  if (!value) {
    showError("zipError", "Zip code is required.");
    return false;
  }

  if (!/^\d{5}$/.test(value)) {
    showError("zipError", "Enter exactly 5 digits (e.g. 77002).");
    return false;
  }

  clearError("zipError");
  return true;
}

function validateEmail() {
  var input = document.getElementById("email");
  input.value = input.value.toLowerCase();

  var value = input.value.trim();

  if (!value) {
    showError("emailError", "Email address is required.");
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showError("emailError", "Enter a valid email: name@domain.tld.");
    return false;
  }

  clearError("emailError");
  return true;
}

function validatePhone() {
  var input = document.getElementById("phone");
  formatPhone(input);

  var value = input.value;

  if (!value) {
    showError("phoneError", "Phone number is required.");
    return false;
  }

  if (!/^\d{3}-\d{3}-\d{4}$/.test(value)) {
    showError("phoneError", "Enter a 10-digit number: ###-###-####.");
    return false;
  }

  clearError("phoneError");
  return true;
}

function validateGender() {
  if (!getCheckedValue("gender")) {
    showError("genderError", "Please select a gender.");
    return false;
  }

  clearError("genderError");
  return true;
}

function validateVaccinated() {
  if (!getCheckedValue("vaccinated")) {
    showError("vaccinatedError", "Please select Yes or No.");
    return false;
  }

  clearError("vaccinatedError");
  return true;
}

function validateInsurance() {
  if (!getCheckedValue("insurance")) {
    showError("insuranceError", "Please select Yes or No.");
    return false;
  }

  clearError("insuranceError");
  return true;
}

function validateHistory() {
  clearError("historyError");
  return validateSymptoms();
}

/* PASSWORD STRENGTH */

function updateStrength() {
  var password = document.getElementById("password").value;
  var fill = document.getElementById("strengthFill");
  var label = document.getElementById("strengthLabel");
  var bar = document.getElementById("strengthBar");

  if (!fill || !label) {
    return;
  }

  if (password.length === 0) {
    if (bar) {
      bar.style.display = "none";
    }

    fill.style.width = "0%";
    label.textContent = "";
    return;
  }

  if (bar) {
    bar.style.display = "block";
  }

  var score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  var percent;
  var color;
  var text;

  if (score <= 2) {
    percent = "33%";
    color = "#b91c1c";
    text = "Weak";
  } else if (score <= 4) {
    percent = "66%";
    color = "#b45309";
    text = "Medium";
  } else {
    percent = "100%";
    color = "#16a34a";
    text = "Strong";
  }

  fill.style.width = percent;
  fill.style.background = color;
  label.textContent = text;
  label.style.color = color;
}

/* USERNAME AND PASSWORD VALIDATION */

function makeUseridLowercase() {
  var userid = document.getElementById("userid");
  userid.value = userid.value.toLowerCase();
}

function validateUserid() {
  makeUseridLowercase();

  var value = document.getElementById("userid").value.trim();

  if (!value) {
    showError("useridError", "Username is required.");
    return false;
  }

  if (/^[0-9]/.test(value)) {
    showError("useridError", "Username cannot start with a number.");
    return false;
  }

  if (/\s/.test(value)) {
    showError("useridError", "Username cannot contain spaces.");
    return false;
  }

  if (!/^[a-z][a-z0-9_-]{4,29}$/.test(value)) {
    showError("useridError", "5–30 chars: letters, numbers, _ or -. No spaces.");
    return false;
  }

  clearError("useridError");
  return true;
}

function containsPersonalInfo(password, userid, firstname, lastname) {
  var pw = password.toLowerCase();
  var user = userid.toLowerCase();
  var first = firstname.toLowerCase();
  var last = lastname.toLowerCase();

  if (user !== "" && (pw === user || pw.includes(user))) {
    return true;
  }

  if (first.length >= 3 && pw.includes(first)) {
    return true;
  }

  if (last.length >= 3 && pw.includes(last)) {
    return true;
  }

  return false;
}

function validatePassword() {
  var password = document.getElementById("password").value;
  var userid = document.getElementById("userid").value.trim().toLowerCase();
  var firstname = document.getElementById("firstname").value.trim();
  var lastname = document.getElementById("lastname").value.trim();

  if (!password) {
    showError("passwordError", "Password is required.");
    return false;
  }

  if (password.length < 8) {
    showError("passwordError", "Password must be at least 8 characters.");
    return false;
  }

  if (!/[A-Z]/.test(password)) {
    showError("passwordError", "Must include at least 1 uppercase letter.");
    return false;
  }

  if (!/[a-z]/.test(password)) {
    showError("passwordError", "Must include at least 1 lowercase letter.");
    return false;
  }

  if (!/[0-9]/.test(password)) {
    showError("passwordError", "Password must include at least 1 number.");
    return false;
  }

  if (containsPersonalInfo(password, userid, firstname, lastname)) {
    showError("passwordError", "Password cannot contain your name or username.");
    return false;
  }

  clearError("passwordError");

  if (document.getElementById("password2").value) {
    validatePassword2();
  }

  return true;
}

function validatePassword2() {
  var password = document.getElementById("password").value;
  var password2 = document.getElementById("password2").value;

  if (!password2) {
    showError("password2Error", "Please re-enter your password.");
    return false;
  }

  if (password !== password2) {
    showError("password2Error", "Passwords do not match.");
    return false;
  }

  clearError("password2Error");
  return true;
}

function checkPasswords() {
  var password1 = document.getElementById("password").value;
  var password2 = document.getElementById("password2").value;
  var userid = document.getElementById("userid").value.trim();
  var firstname = document.getElementById("firstname").value.trim();
  var lastname = document.getElementById("lastname").value.trim();
  var message = document.getElementById("passwordMessage");

  if (password1 === "" && password2 === "") {
    message.innerHTML = "";
    return;
  }

  if (containsPersonalInfo(password1, userid, firstname, lastname)) {
    message.innerHTML =
      "Password cannot match or contain your user ID, first name, or last name.";
    return;
  }

  if (password2 === "") {
    message.innerHTML = "";
    return;
  }

  message.innerHTML =
    password1 === password2 ? "Passwords match." : "Passwords do not match.";
}

/* VALIDATE ALL */

function validateForm() {
  var results = [
    validateFirstname(),
    validateMiddleinit(),
    validateLastname(),
    validateGender(),
    validateDob(),
    validateSsn(),
    validateAddr1(),
    validateAddr2(),
    validateCity(),
    validateState(),
    validateZip(),
    validateEmail(),
    validatePhone(),
    validateHistory(),
    validateVaccinated(),
    validateInsurance(),
    validateUserid(),
    validatePassword(),
    validatePassword2()
  ];

  return results.every(function (result) {
    return result === true;
  });
}

/* REVIEW SECTION */

function showReview() {
  var firstname = document.getElementById("firstname").value.trim();
  var middleinit = document.getElementById("middleinit").value.trim();
  var lastname = document.getElementById("lastname").value.trim();
  var dob = document.getElementById("dob").value;
  var addr1 = document.getElementById("addr1").value.trim();
  var addr2 = document.getElementById("addr2").value.trim();
  var city = document.getElementById("city").value.trim();
  var state = document.getElementById("state").value;
  var zip = document.getElementById("zip").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var userid = document.getElementById("userid").value.trim().toLowerCase();
  var password = document.getElementById("password").value;
  var password2 = document.getElementById("password2").value;
  var symptoms = document.getElementById("symptoms").value.trim();
  var healthScore = document.getElementById("health_score").value;

  document.getElementById("userid").value = userid;

  var gender = getCheckedValue("gender");
  var vaccinated = getCheckedValue("vaccinated");
  var insurance = getCheckedValue("insurance");
  var history = getCheckedList("history");

  var fullName = firstname;

  if (middleinit !== "") {
    fullName += " " + middleinit;
  }

  fullName += " " + lastname;

  var fullAddress = addr1;

  if (addr2 !== "") {
    fullAddress += ", " + addr2;
  }

  if (city !== "" || state !== "" || zip !== "") {
    fullAddress += ", " + city;

    if (state !== "") {
      fullAddress += ", " + state;
    }

    if (zip !== "") {
      fullAddress += " " + zip;
    }
  }

  var nameStatus = "PASS";

  if (!firstname || !lastname) {
    nameStatus = "ERROR: First and last name are required";
  } else if (!/^[A-Za-z'-]{1,30}$/.test(firstname)) {
    nameStatus = "ERROR: Invalid first name";
  } else if (!/^[A-Za-z'-]{1,30}$/.test(lastname)) {
    nameStatus = "ERROR: Invalid last name";
  }

  var dobStatus = "PASS";

  if (!dob) {
    dobStatus = "ERROR: Missing date of birth";
  } else {
    var dobParts = dob.split("-");
    var selected = new Date(
      parseInt(dobParts[0], 10),
      parseInt(dobParts[1], 10) - 1,
      parseInt(dobParts[2], 10)
    );

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    minDate.setHours(0, 0, 0, 0);

    if (selected > today) {
      dobStatus = "ERROR: Cannot be in the future";
    } else if (selected < minDate) {
      dobStatus = "ERROR: More than 120 years ago";
    }
  }

  var emailStatus = "PASS";

  if (!email) {
    emailStatus = "ERROR: Missing email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailStatus = "ERROR: Invalid email format";
  }

  var phoneStatus = "PASS";

  if (!phone) {
    phoneStatus = "ERROR: Missing phone number";
  } else if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
    phoneStatus = "ERROR: Use ###-###-#### format";
  }

  var addressStatus = "PASS";

  if (!addr1 || !city || !state || !zip) {
    addressStatus = "ERROR: Missing required address fields";
  } else if (!/^\d{5}$/.test(zip)) {
    addressStatus = "ERROR: Invalid ZIP (5 digits required)";
  }

  var useridStatus = "PASS";

  if (!userid) {
    useridStatus = "ERROR: Missing user ID";
  } else if (!/^[a-z][a-z0-9_-]{4,29}$/.test(userid)) {
    useridStatus = "ERROR: Invalid user ID";
  }

  var passwordStatus = "PASS";

  if (!password || !password2) {
    passwordStatus = "ERROR: Missing password";
  } else if (password !== password2) {
    passwordStatus = "ERROR: Passwords do not match";
  } else if (containsPersonalInfo(password, userid, firstname, lastname)) {
    passwordStatus = "ERROR: Password contains personal information";
  }

  var historyDisplay = history.length ? history.join(", ") : "None selected";
  var symptomsDisplay = symptoms ? symptoms : "No details entered";

  var genderStatus = gender ? "PASS" : "ERROR: Gender is required";
  var vaccinatedStatus = vaccinated ? "PASS" : "ERROR: Vaccinated is required";
  var insuranceStatus = insurance ? "PASS" : "ERROR: Insurance is required";
  var ssnStatus = document.getElementById("ssn").value
    ? "PASS"
    : "ERROR: SSN is required";

  var reviewHTML = `
    <div class="reviewGrid">

      <div class="reviewLabel">Full Name</div>
      <div class="reviewValue">${fullName}</div>
      <div class="reviewStatus ${nameStatus === "PASS" ? "pass" : "error"}">${nameStatus}</div>

      <div class="reviewLabel">Gender</div>
      <div class="reviewValue">${gender || "Not selected"}</div>
      <div class="reviewStatus ${genderStatus === "PASS" ? "pass" : "error"}">${genderStatus}</div>

      <div class="reviewLabel">Date of Birth</div>
      <div class="reviewValue">${dob || "Not entered"}</div>
      <div class="reviewStatus ${dobStatus === "PASS" ? "pass" : "error"}">${dobStatus}</div>

      <div class="reviewLabel">SSN</div>
      <div class="reviewValue">***-**-****</div>
      <div class="reviewStatus ${ssnStatus === "PASS" ? "pass" : "error"}">${ssnStatus}</div>

      <div class="reviewLabel">Email Address</div>
      <div class="reviewValue">${email || "Not entered"}</div>
      <div class="reviewStatus ${emailStatus === "PASS" ? "pass" : "error"}">${emailStatus}</div>

      <div class="reviewLabel">Phone Number</div>
      <div class="reviewValue">${phone || "Not entered"}</div>
      <div class="reviewStatus ${phoneStatus === "PASS" ? "pass" : "error"}">${phoneStatus}</div>

      <div class="reviewLabel">Address</div>
      <div class="reviewValue">${fullAddress}</div>
      <div class="reviewStatus ${addressStatus === "PASS" ? "pass" : "error"}">${addressStatus}</div>

      <div class="reviewLabel">Vaccinated?</div>
      <div class="reviewValue">${vaccinated || "Not selected"}</div>
      <div class="reviewStatus ${vaccinatedStatus === "PASS" ? "pass" : "error"}">${vaccinatedStatus}</div>

      <div class="reviewLabel">Insurance?</div>
      <div class="reviewValue">${insurance || "Not selected"}</div>
      <div class="reviewStatus ${insuranceStatus === "PASS" ? "pass" : "error"}">${insuranceStatus}</div>

    </div>

    <h4>VISIT INFO</h4>

    <div class="reviewGridSmall">
      <div class="reviewLabel">Urgency Level</div>
      <div class="reviewValue">${healthScore} / 10</div>

      <div class="reviewLabel">Visit Reasons</div>
      <div class="reviewValue">${historyDisplay}</div>

      <div class="reviewLabel">Described Symptoms</div>
      <div class="reviewValue">${symptomsDisplay}</div>
    </div>

    <h4>ACCOUNT INFORMATION</h4>

    <div class="reviewGrid">
      <div class="reviewLabel">User ID</div>
      <div class="reviewValue">${userid}</div>
      <div class="reviewStatus ${useridStatus === "PASS" ? "pass" : "error"}">${useridStatus}</div>

      <div class="reviewLabel">Password</div>
      <div class="reviewValue">********</div>
      <div class="reviewStatus ${passwordStatus === "PASS" ? "pass" : "error"}">${passwordStatus}</div>
    </div>
  `;

  document.getElementById("reviewContent").innerHTML = reviewHTML;
  document.getElementById("reviewSection").style.display = "block";
}

function clearReview() {
  document.getElementById("reviewContent").innerHTML = "";
  document.getElementById("reviewSection").style.display = "none";
  document.getElementById("passwordMessage").innerHTML = "";

  var bar = document.getElementById("strengthBar");

  if (bar) {
    bar.style.display = "none";
  }

  var label = document.getElementById("strengthLabel");

  if (label) {
    label.textContent = "";
  }

  document.querySelectorAll(".errorMessage").forEach(function (el) {
    el.innerHTML = "";
  });

  var submitBtn = document.querySelector('input[type="submit"]');

  if (submitBtn) {
    submitBtn.style.display = "none";
  }
}

/* FETCH API: WEATHER */

async function loadWeather() {
  try {
    var response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Houston&units=imperial&appid=0cdba605d7a4587a3de5fa629792b0a8"
    );

    var data = await response.json();
    var temp = Math.round(data.main.temp);
    var weather = data.weather[0].main;

    document.getElementById("weatherBox").innerHTML =
      "🌤 Houston: " + temp + "°F, " + weather;
  } catch (error) {
    document.getElementById("weatherBox").innerHTML = "Weather unavailable";
  }
}

loadWeather();

/* COOKIE FUNCTIONS */

function setCookie(name, value, hours) {
  var date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);

  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    date.toUTCString() +
    "; path=/";
}

function getCookie(name) {
  var cookieName = name + "=";
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();

    if (cookie.indexOf(cookieName) === 0) {
      return decodeURIComponent(cookie.substring(cookieName.length));
    }
  }

  return "";
}

function deleteCookie(name) {
  document.cookie =
    name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

function loadCookieUser() {
  var savedName = getCookie("mediformFirstName");
  var welcomeMessage = document.getElementById("welcomeMessage");
  var firstname = document.getElementById("firstname");

  if (savedName !== "") {
    welcomeMessage.innerHTML =
      "Welcome back, " +
      savedName +
      "! <button type='button' onclick='startNewUser()'>Not " +
      savedName +
      "? Start as new user</button>";

    firstname.value = savedName;
  } else {
    welcomeMessage.innerHTML = "Welcome new user!";
  }
}

function saveCookieUser() {
  var rememberMe = document.getElementById("rememberMe").checked;
  var firstname = document.getElementById("firstname").value.trim();

  if (rememberMe && firstname !== "") {
    setCookie("mediformFirstName", firstname, 48);
  } else {
    deleteCookie("mediformFirstName");
  }
}

function startNewUser() {
  deleteCookie("mediformFirstName");
  localStorage.clear();

  document.getElementById("patientForm").reset();
  clearReview();

  document.getElementById("welcomeMessage").innerHTML = "Welcome new user";
}

/* LOCAL STORAGE */

function saveFormData() {
  var fields = [
    "firstname",
    "middleinit",
    "lastname",
    "dob",
    "addr1",
    "addr2",
    "city",
    "state",
    "zip",
    "email",
    "phone",
    "userid",
    "symptoms",
    "health_score"
  ];

  for (var i = 0; i < fields.length; i++) {
    var field = document.getElementById(fields[i]);

    if (field) {
      localStorage.setItem(fields[i], field.value);
    }
  }

  localStorage.setItem("gender", getCheckedValue("gender"));
  localStorage.setItem("vaccinated", getCheckedValue("vaccinated"));
  localStorage.setItem("insurance", getCheckedValue("insurance"));
  localStorage.setItem("history", JSON.stringify(getCheckedList("history")));
}

function loadFormData() {
  var fields = [
    "firstname",
    "middleinit",
    "lastname",
    "dob",
    "addr1",
    "addr2",
    "city",
    "state",
    "zip",
    "email",
    "phone",
    "userid",
    "symptoms",
    "health_score"
  ];

  for (var i = 0; i < fields.length; i++) {
    var savedValue = localStorage.getItem(fields[i]);
    var field = document.getElementById(fields[i]);

    if (savedValue !== null && field) {
      field.value = savedValue;
    }
  }

  restoreRadio("gender");
  restoreRadio("vaccinated");
  restoreRadio("insurance");
  restoreCheckboxes("history");

  var slider = document.getElementById("health_score");
  var output = document.getElementById("scoreValue");

  if (slider && output) {
    output.innerHTML = slider.value;
  }

  updateCharCount();
}

function restoreRadio(name) {
  var savedValue = localStorage.getItem(name);

  if (savedValue) {
    var radio = document.querySelector(
      'input[name="' + name + '"][value="' + savedValue + '"]'
    );

    if (radio) {
      radio.checked = true;
    }
  }
}

function restoreCheckboxes(name) {
  var savedValues = localStorage.getItem(name);

  if (savedValues) {
    var values = JSON.parse(savedValues);
    var checkboxes = document.querySelectorAll('input[name="' + name + '"]');

    checkboxes.forEach(function (checkbox) {
      checkbox.checked = values.indexOf(checkbox.value) !== -1;
    });
  }
}

/* SAVE TO LOCAL STORAGE */

document.querySelectorAll("input, select, textarea").forEach(function (element) {
  element.addEventListener("input", saveFormData);
  element.addEventListener("change", saveFormData);
});

/* TIME-BASED EVENT: INACTIVITY TIMEOUT */

var idleTimer;
var warningTimer;
var timeoutSeconds = 30;
var warningCountdown;

function resetIdleTimer() {
  clearTimeout(idleTimer);
  clearInterval(warningTimer);

  document.getElementById("timeoutModal").style.display = "none";

  idleTimer = setTimeout(showTimeoutWarning, 60000);
}

function showTimeoutWarning() {
  warningCountdown = timeoutSeconds;

  document.getElementById("timeoutCount").innerHTML = warningCountdown;
  document.getElementById("timeoutModal").style.display = "block";

  warningTimer = setInterval(function () {
    warningCountdown--;
    document.getElementById("timeoutCount").innerHTML = warningCountdown;

    if (warningCountdown <= 0) {
      clearInterval(warningTimer);

      document.getElementById("patientForm").reset();
      clearReview();
      document.getElementById("timeoutModal").style.display = "none";

      resetIdleTimer();
    }
  }, 1000);
}

function continueSession() {
  resetIdleTimer();
}

/* PAGE LOAD EVENTS */

window.addEventListener("load", function () {
  loadStates();
  loadCookieUser();
  loadFormData();

  var submitBtn = document.querySelector('input[type="submit"]');

  if (submitBtn) {
    submitBtn.style.display = "none";

    var validateBtn = document.createElement("input");
    validateBtn.type = "button";
    validateBtn.value = "Validate";
    validateBtn.id = "validateBtn";

    validateBtn.addEventListener("click", function () {
      if (validateForm()) {
        saveCookieUser();
        submitBtn.style.display = "";
      } else {
        submitBtn.style.display = "none";
      }
    });

    submitBtn.parentNode.insertBefore(validateBtn, submitBtn);

    document.getElementById("patientForm").addEventListener("input", function () {
      submitBtn.style.display = "none";
    });

    document.getElementById("patientForm").addEventListener("change", function () {
      submitBtn.style.display = "none";
    });
  }

  document.getElementById("patientForm").addEventListener("reset", function () {
    setTimeout(function () {
      var slider = document.getElementById("health_score");

      if (slider) {
        document.getElementById("scoreValue").innerHTML = slider.value;
      }
    }, 0);
  });

  document.getElementById("firstname").addEventListener("input", validateFirstname);
  document.getElementById("middleinit").addEventListener("input", validateMiddleinit);
  document.getElementById("lastname").addEventListener("input", validateLastname);
  document.getElementById("dob").addEventListener("change", validateDob);

  document.getElementById("ssn").addEventListener("input", function () {
    formatSsn(document.getElementById("ssn"));
    validateSsn();
  });

  document.getElementById("addr1").addEventListener("input", validateAddr1);
  document.getElementById("addr2").addEventListener("input", validateAddr2);
  document.getElementById("city").addEventListener("input", validateCity);
  document.getElementById("zip").addEventListener("input", validateZip);
  document.getElementById("email").addEventListener("input", validateEmail);
  document.getElementById("phone").addEventListener("input", validatePhone);
  document.getElementById("userid").addEventListener("input", validateUserid);
  document.getElementById("password").addEventListener("input", validatePassword);
  document.getElementById("password2").addEventListener("input", validatePassword2);

  document.getElementById("firstname").addEventListener("blur", validateFirstname);
  document.getElementById("middleinit").addEventListener("blur", validateMiddleinit);
  document.getElementById("lastname").addEventListener("blur", validateLastname);
  document.getElementById("dob").addEventListener("blur", validateDob);
  document.getElementById("ssn").addEventListener("blur", validateSsn);
  document.getElementById("addr1").addEventListener("blur", validateAddr1);
  document.getElementById("addr2").addEventListener("blur", validateAddr2);
  document.getElementById("city").addEventListener("blur", validateCity);
  document.getElementById("state").addEventListener("blur", validateState);
  document.getElementById("zip").addEventListener("blur", validateZip);
  document.getElementById("email").addEventListener("blur", validateEmail);
  document.getElementById("phone").addEventListener("blur", validatePhone);
  document.getElementById("userid").addEventListener("blur", validateUserid);
  document.getElementById("password").addEventListener("blur", validatePassword);
  document.getElementById("password2").addEventListener("blur", validatePassword2);

  document.getElementById("state").addEventListener("change", validateState);

  document.querySelectorAll('input[name="gender"]').forEach(function (el) {
    el.addEventListener("change", validateGender);
  });

  document.querySelectorAll('input[name="vaccinated"]').forEach(function (el) {
    el.addEventListener("change", validateVaccinated);
  });

  document.querySelectorAll('input[name="insurance"]').forEach(function (el) {
    el.addEventListener("change", validateInsurance);
  });

  document.querySelectorAll('input[name="history"]').forEach(function (el) {
    el.addEventListener("change", validateHistory);
  });

  resetIdleTimer();

  document.addEventListener("mousemove", resetIdleTimer);
  document.addEventListener("keydown", resetIdleTimer);
  document.addEventListener("click", resetIdleTimer);
});