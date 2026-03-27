/*
  Name: Nikki Safarova
  File: script.js
  Date Created: 2026-03-22
  Date Updated: 2026-03-27
  Purpose: MIS 7375 Homework 2 - MediForm JavaScript
*/

/* Display today's date */
document.getElementById("today").innerHTML =
  new Date().toLocaleDateString("en-US");

/* Slider value display */
var slider = document.getElementById("health_score");
var output = document.getElementById("scoreValue");

/* Show and update slider value */
if (slider && output) {
  output.innerHTML = slider.value;

  slider.oninput = function () {
    output.innerHTML = this.value;
  };
}

/* Get selected radio button value */
function getCheckedValue(name) {
  var selected = document.querySelector('input[name="' + name + '"]:checked');
  return selected ? selected.value : "";
}

/* Get selected checkbox values */
function getCheckedList(name) {
  var checked = document.querySelectorAll('input[name="' + name + '"]:checked');
  var values = [];

  for (var i = 0; i < checked.length; i++) {
    values.push(checked[i].value);
  }

  return values;
}

/* Convert user ID to lowercase */
function makeUseridLowercase() {
  var userid = document.getElementById("userid");
  userid.value = userid.value.toLowerCase();
}

/* Check if password contains personal information */
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

/* Validate passwords and show message */
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
    message.innerHTML = "Please re-enter your password.";
    return;
  }

  if (password1 === password2) {
    message.innerHTML = "Passwords match.";
  } else {
    message.innerHTML = "Passwords do not match.";
  }
}

/* Build and display review summary */
function showReview() {

  /* Get values from all input fields */
  var firstname = document.getElementById("firstname").value.trim();
  var middleinit = document.getElementById("middleinit").value.trim();
  var lastname = document.getElementById("lastname").value.trim();
  var dob = document.getElementById("dob").value;
  var ssn = document.getElementById("ssn").value.trim();
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

  /* Ensure user ID stays lowercase in input field */
  document.getElementById("userid").value = userid;

  /* Get selected values from radio buttons */
  var gender = getCheckedValue("gender");
  var vaccinated = getCheckedValue("vaccinated");
  var insurance = getCheckedValue("insurance");

  /* Get selected checkbox values */
  var history = getCheckedList("history");

  /* Build full name including middle initial if present */
  var fullName = firstname;
  if (middleinit !== "") {
    fullName += " " + middleinit;
  }
  fullName += " " + lastname;

  /* Build full address step by step */
  var fullAddress = addr1;

  /* Add address line 2 if provided */
  if (addr2 !== "") {
    fullAddress += ", " + addr2;
  }

  /* Add city, state, and zip if available */
  if (city !== "" || state !== "" || zip !== "") {
    fullAddress += ", " + city;

    if (state !== "") {
      fullAddress += ", " + state;
    }

    if (zip !== "") {
      fullAddress += " " + zip;
    }
  }

  /* Validate name fields */
  var nameStatus = "PASS";
  if (!firstname || !lastname) {
    nameStatus = "ERROR: First and last name are required";
  } else if (!/^[A-Za-z'-]{1,30}$/.test(firstname)) {
    nameStatus = "ERROR: Invalid first name";
  } else if (!/^[A-Za-z0-9'-]{1,30}$/.test(lastname)) {
    nameStatus = "ERROR: Invalid last name";
  }

  /* Validate date of birth */
  var dobStatus = "PASS";
  if (!dob) {
    dobStatus = "ERROR: Missing date of birth";
  } else {
    var selectedDate = new Date(dob);
    var today = new Date();
    var minDate = new Date();

    /* Calculate minimum allowed date (120 years ago) */
    minDate.setFullYear(today.getFullYear() - 120);

    if (selectedDate > today) {
      dobStatus = "ERROR: Cannot be in the future";
    } else if (selectedDate < minDate) {
      dobStatus = "ERROR: More than 120 years ago";
    }
  }

  /* Validate email format */
  var emailStatus = "PASS";
  if (!email) {
    emailStatus = "ERROR: Missing email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailStatus = "ERROR: Invalid email format";
  }

  /* Validate phone number format */
  var phoneStatus = "PASS";
  if (!phone) {
    phoneStatus = "ERROR: Missing phone number";
  } else if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
    phoneStatus = "ERROR: Use 123-456-7890 format";
  }

  /* Validate address fields */
  var addressStatus = "PASS";
  if (!addr1 || !city || !state || !zip) {
    addressStatus = "ERROR: Missing required address fields";
  } else if (!/^\d{5}(-\d{4})?$/.test(zip)) {
    addressStatus = "ERROR: Invalid ZIP code";
  }

  /* Validate user ID */
  var useridStatus = "PASS";
  if (!userid) {
    useridStatus = "ERROR: Missing user ID";
  } else if (!/^[a-z][a-z0-9_-]{4,29}$/.test(userid)) {
    useridStatus = "ERROR: Invalid user ID";
  }

  /* Validate password */
  var passwordStatus = "PASS";
  if (!password || !password2) {
    passwordStatus = "ERROR: Missing password";
  } else if (password !== password2) {
    passwordStatus = "ERROR: Passwords do not match";
  } else if (containsPersonalInfo(password, userid, firstname, lastname)) {
    passwordStatus = "ERROR: Password contains personal information";
  }

  /* Prepare display text for checkboxes and textarea */
  var historyDisplay = history.length ? history.join(", ") : "None selected";
  var symptomsDisplay = symptoms ? symptoms : "No details entered";

  /* Build HTML content for review section */
  var reviewHTML = `
    <div class="reviewGrid">

      <div class="reviewLabel">First, MI, Last Name</div>
      <div class="reviewValue">${fullName}</div>
      <div class="reviewStatus ${nameStatus === "PASS" ? "pass" : "error"}">${nameStatus}</div>

      <div class="reviewLabel">Date of Birth</div>
      <div class="reviewValue">${dob || "Not entered"}</div>
      <div class="reviewStatus ${dobStatus === "PASS" ? "pass" : "error"}">${dobStatus}</div>

      <div class="reviewLabel">Email Address</div>
      <div class="reviewValue">${email || "Not entered"}</div>
      <div class="reviewStatus ${emailStatus === "PASS" ? "pass" : "error"}">${emailStatus}</div>

      <div class="reviewLabel">Phone Number</div>
      <div class="reviewValue">${phone || "Not entered"}</div>
      <div class="reviewStatus ${phoneStatus === "PASS" ? "pass" : "error"}">${phoneStatus}</div>

      <div class="reviewLabel">Address</div>
      <div class="reviewValue">${fullAddress}</div>
      <div class="reviewStatus ${addressStatus === "PASS" ? "pass" : "error"}">${addressStatus}</div>

    </div>

    <h4>REQUESTED INFO</h4>

    <div class="reviewGridSmall">
      <div class="reviewLabel">Vaccinated?</div>
      <div class="reviewValue">${vaccinated || "Not selected"}</div>

      <div class="reviewLabel">Insurance?</div>
      <div class="reviewValue">${insurance || "Not selected"}</div>

      <div class="reviewLabel">Gender</div>
      <div class="reviewValue">${gender || "Not selected"}</div>

      <div class="reviewLabel">Urgency Level</div>
      <div class="reviewValue">${healthScore}</div>

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

  /* Insert review HTML into page */
  document.getElementById("reviewContent").innerHTML = reviewHTML;

  /* Make review section visible */
  document.getElementById("reviewSection").style.display = "block";
}

/* Format phone number automatically */
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

/* Clear review section and messages */
function clearReview() {
  document.getElementById("reviewContent").innerHTML = "";
  document.getElementById("reviewSection").style.display = "none";
  document.getElementById("passwordMessage").innerHTML = "";
}