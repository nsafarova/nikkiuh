/*
  Name: Nikki Safarova
  File: script.js
  Date Created: 2026-03-22
  Date Updated: 2026-04-17
  Purpose: MIS 7375 Homework 3 - MediForm JavaScript Validation
*/

/* ─── DATE & SLIDER ──────────────────────────────────────────────────────── */

document.getElementById("today").innerHTML =
  new Date().toLocaleDateString("en-US");

var slider = document.getElementById("health_score");
var output = document.getElementById("scoreValue");

if (slider && output) {
  output.innerHTML = slider.value;
  slider.oninput = function () {
    output.innerHTML = this.value;
  };
}

/* ─── UTILITIES ──────────────────────────────────────────────────────────── */

function showError(id, message) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = message;
}

function clearError(id) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = "";
}

function getCheckedValue(name) {
  var sel = document.querySelector('input[name="' + name + '"]:checked');
  return sel ? sel.value : "";
}

function getCheckedList(name) {
  var checked = document.querySelectorAll('input[name="' + name + '"]:checked');
  var values = [];
  for (var i = 0; i < checked.length; i++) values.push(checked[i].value);
  return values;
}

/* ─── FORMATTING ─────────────────────────────────────────────────────────── */

function formatPhone(input) {
  var v = input.value.replace(/\D/g, "");
  if (v.length > 3 && v.length <= 6) {
    v = v.slice(0, 3) + "-" + v.slice(3);
  } else if (v.length > 6) {
    v = v.slice(0, 3) + "-" + v.slice(3, 6) + "-" + v.slice(6, 10);
  }
  input.value = v;
}

function formatSsn(input) {
  var v = input.value.replace(/\D/g, "");
  if (v.length > 3 && v.length <= 5) {
    v = v.slice(0, 3) + "-" + v.slice(3);
  } else if (v.length > 5) {
    v = v.slice(0, 3) + "-" + v.slice(3, 5) + "-" + v.slice(5, 9);
  }
  input.value = v;
}

/* ─── VALIDATION FUNCTIONS ───────────────────────────────────────────────── */

function validateFirstname() {
  var v = document.getElementById("firstname").value.trim();
  if (!v) { showError("firstnameError", "First name is required."); return false; }
  if (!/^[A-Za-z'-]{1,30}$/.test(v)) {
    showError("firstnameError", "Letters, apostrophes, dashes only (max 30).");
    return false;
  }
  clearError("firstnameError");
  return true;
}

function validateMiddleinit() {
  var v = document.getElementById("middleinit").value.trim();
  if (v === "") { clearError("middleinitError"); return true; }
  if (!/^[A-Za-z]$/.test(v)) {
    showError("middleinitError", "Enter 1 letter only.");
    return false;
  }
  clearError("middleinitError");
  return true;
}

function validateLastname() {
  var v = document.getElementById("lastname").value.trim();
  if (!v) { showError("lastnameError", "Last name is required."); return false; }
  if (!/^[A-Za-z'-]{1,30}$/.test(v)) {
    showError("lastnameError", "Letters, apostrophes, dashes only (max 30).");
    return false;
  }
  clearError("lastnameError");
  return true;
}

function validateDob() {
  var v = document.getElementById("dob").value;
  if (!v) {
    showError("dobError", "Date of birth is required.");
    return false;
  }

  var parts    = v.split("-");
  var year     = parseInt(parts[0], 10);
  var month    = parseInt(parts[1], 10);
  var day      = parseInt(parts[2], 10);
  var selected = new Date(year, month - 1, day);

  var today   = new Date(); today.setHours(0, 0, 0, 0);
  var minDate = new Date(); minDate.setFullYear(today.getFullYear() - 120); minDate.setHours(0, 0, 0, 0);

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
  var v = input.value;
  if (!v) { showError("ssnError", "SSN is required."); return false; }
  if (!/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/.test(v)) {
    showError("ssnError", "Format: ###-##-#### (dashes added automatically).");
    return false;
  }
  clearError("ssnError");
  return true;
}

function validateAddr1() {
  var v = document.getElementById("addr1").value.trim();
  if (!v) { showError("addr1Error", "Address is required."); return false; }
  if (v.length < 2 || v.length > 30) {
    showError("addr1Error", "Address must be 2–30 characters.");
    return false;
  }
  if (!/^[A-Za-z0-9\s,.'#\-]+$/.test(v)) {
    showError("addr1Error", "No special characters allowed.");
    return false;
  }
  clearError("addr1Error");
  return true;
}

function validateAddr2() {
  var v = document.getElementById("addr2").value.trim();
  if (v === "") { clearError("addr2Error"); return true; }
  if (v.length < 2 || v.length > 30) {
    showError("addr2Error", "If entered, must be 2–30 characters.");
    return false;
  }
  if (!/^[A-Za-z0-9\s,.'#\-]+$/.test(v)) {
    showError("addr2Error", "No special characters allowed.");
    return false;
  }
  clearError("addr2Error");
  return true;
}

function validateCity() {
  var v = document.getElementById("city").value.trim();
  if (!v) { showError("cityError", "City is required."); return false; }
  if (v.length < 2 || v.length > 30) {
    showError("cityError", "City must be 2–30 characters.");
    return false;
  }
  if (!/^[A-Za-z\s'-]+$/.test(v)) {
    showError("cityError", "Letters and spaces only.");
    return false;
  }
  clearError("cityError");
  return true;
}

function validateSymptoms() {
  var v = document.getElementById("symptoms").value.trim();
  if (v === "") { return true; }
  if (v.length > 500) {
    showError("historyError", "Description must be 500 characters or less.");
    return false;
  }
  if (/<[^>]+>/.test(v)) {
    showError("historyError", "HTML tags are not allowed.");
    return false;
  }
  return true;
}

function updateCharCount() {
  var v = document.getElementById("symptoms").value;
  var el = document.getElementById("charCount");
  if (el) {
    el.textContent = v.length + " / 500";
    el.style.color = v.length > 450 ? "#b91c1c" : "#555";
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

function validateZip() {
  var v = document.getElementById("zip").value.trim();
  if (!v) { showError("zipError", "Zip code is required."); return false; }
  if (!/^\d{5}$/.test(v)) {
    showError("zipError", "Enter exactly 5 digits (e.g. 77002).");
    return false;
  }
  clearError("zipError");
  return true;
}

function validateEmail() {
  var input = document.getElementById("email");
  input.value = input.value.toLowerCase();
  var v = input.value.trim();
  if (!v) { showError("emailError", "Email address is required."); return false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
    showError("emailError", "Enter a valid email: name@domain.tld.");
    return false;
  }
  clearError("emailError");
  return true;
}

function validatePhone() {
  var input = document.getElementById("phone");
  formatPhone(input);
  var v = input.value;
  if (!v) { showError("phoneError", "Phone number is required."); return false; }
  if (!/^\d{3}-\d{3}-\d{4}$/.test(v)) {
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

function updateStrength() {
  var pw   = document.getElementById("password").value;
  var fill = document.getElementById("strengthFill");
  var lbl  = document.getElementById("strengthLabel");
  if (!fill || !lbl) return;
  var bar = document.getElementById("strengthBar");
  if (pw.length === 0) { if (bar) bar.style.display = "none"; fill.style.width = "0%"; lbl.textContent = ""; return; }
  if (bar) bar.style.display = "block";
  var score = 0;
  if (pw.length >= 8)        score++;
  if (pw.length >= 12)       score++;
  if (/[A-Z]/.test(pw))     score++;
  if (/[a-z]/.test(pw))     score++;
  if (/[0-9]/.test(pw))     score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  var pct, color, text;
  if      (score <= 2) { pct = "33%";  color = "#b91c1c"; text = "Weak"; }
  else if (score <= 4) { pct = "66%";  color = "#b45309"; text = "Medium"; }
  else                 { pct = "100%"; color = "#16a34a"; text = "Strong"; }
  fill.style.width = pct;
  fill.style.background = color;
  lbl.textContent = text;
  lbl.style.color = color;
}

function makeUseridLowercase() {
  var el = document.getElementById("userid");
  el.value = el.value.toLowerCase();
}

function validateUserid() {
  makeUseridLowercase();
  var v = document.getElementById("userid").value.trim();
  if (!v) { showError("useridError", "Username is required."); return false; }
  if (/^[0-9]/.test(v)) {
    showError("useridError", "Username cannot start with a number.");
    return false;
  }
  if (/\s/.test(v)) {
    showError("useridError", "Username cannot contain spaces.");
    return false;
  }
  if (!/^[a-z][a-z0-9_-]{4,29}$/.test(v)) {
    showError("useridError", "5–30 chars: letters, numbers, _ or -. No spaces.");
    return false;
  }
  clearError("useridError");
  return true;
}

function containsPersonalInfo(password, userid, firstname, lastname) {
  var pw    = password.toLowerCase();
  var user  = userid.toLowerCase();
  var first = firstname.toLowerCase();
  var last  = lastname.toLowerCase();
  if (user  !== "" && (pw === user  || pw.includes(user)))  return true;
  if (first.length >= 3 && pw.includes(first)) return true;
  if (last.length  >= 3 && pw.includes(last))  return true;
  return false;
}

function validatePassword() {
  var pw     = document.getElementById("password").value;
  var userid = document.getElementById("userid").value.trim().toLowerCase();

  if (!pw) { showError("passwordError", "Password is required."); return false; }
  if (pw.length < 8) {
    showError("passwordError", "Password must be at least 8 characters.");
    return false;
  }
  if (!/[A-Z]/.test(pw)) {
    showError("passwordError", "Must include at least 1 uppercase letter.");
    return false;
  }
  if (!/[a-z]/.test(pw)) {
    showError("passwordError", "Must include at least 1 lowercase letter.");
    return false;
  }
  if (!/[0-9]/.test(pw)) {
    showError("passwordError", "Password must include at least 1 number.");
    return false;
  }
  var firstname = document.getElementById("firstname").value.trim();
  var lastname  = document.getElementById("lastname").value.trim();
  if (containsPersonalInfo(pw, userid, firstname, lastname)) {
    showError("passwordError", "Password cannot contain your name or username.");
    return false;
  }
  clearError("passwordError");

  /* Re-check confirm field whenever password changes */
  if (document.getElementById("password2").value) validatePassword2();

  return true;
}

function validatePassword2() {
  var pw  = document.getElementById("password").value;
  var pw2 = document.getElementById("password2").value;
  if (!pw2) { showError("password2Error", "Please re-enter your password."); return false; }
  if (pw !== pw2) { showError("password2Error", "Passwords do not match."); return false; }
  clearError("password2Error");
  return true;
}

/* Live password match indicator */
function checkPasswords() {
  var pw1      = document.getElementById("password").value;
  var pw2      = document.getElementById("password2").value;
  var userid   = document.getElementById("userid").value.trim();
  var firstname = document.getElementById("firstname").value.trim();
  var lastname  = document.getElementById("lastname").value.trim();
  var msg      = document.getElementById("passwordMessage");

  if (pw1 === "" && pw2 === "") { msg.innerHTML = ""; return; }
  if (containsPersonalInfo(pw1, userid, firstname, lastname)) {
    msg.innerHTML = "Password cannot match or contain your user ID, first name, or last name.";
    return;
  }
  if (pw2 === "") { msg.innerHTML = ""; return; }
  msg.innerHTML = pw1 === pw2 ? "Passwords match." : "Passwords do not match.";
}

/* ─── VALIDATE ALL ───────────────────────────────────────────────────────── */

function validateForm() {
  /* All functions must run so every error shows at once — no short-circuit */
  var r = [
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
  return r.every(function (x) { return x === true; });
}

/* ─── REVIEW / CLEAR ─────────────────────────────────────────────────────── */

function showReview() {
  var firstname  = document.getElementById("firstname").value.trim();
  var middleinit = document.getElementById("middleinit").value.trim();
  var lastname   = document.getElementById("lastname").value.trim();
  var dob        = document.getElementById("dob").value;
  var addr1      = document.getElementById("addr1").value.trim();
  var addr2      = document.getElementById("addr2").value.trim();
  var city       = document.getElementById("city").value.trim();
  var state      = document.getElementById("state").value;
  var zip        = document.getElementById("zip").value.trim();
  var email      = document.getElementById("email").value.trim();
  var phone      = document.getElementById("phone").value.trim();
  var userid     = document.getElementById("userid").value.trim().toLowerCase();
  var password   = document.getElementById("password").value;
  var password2  = document.getElementById("password2").value;
  var symptoms   = document.getElementById("symptoms").value.trim();
  var healthScore = document.getElementById("health_score").value;

  document.getElementById("userid").value = userid;

  var gender    = getCheckedValue("gender");
  var vaccinated = getCheckedValue("vaccinated");
  var insurance  = getCheckedValue("insurance");
  var history   = getCheckedList("history");

  var fullName = firstname;
  if (middleinit !== "") fullName += " " + middleinit;
  fullName += " " + lastname;

  var fullAddress = addr1;
  if (addr2 !== "") fullAddress += ", " + addr2;
  if (city !== "" || state !== "" || zip !== "") {
    fullAddress += ", " + city;
    if (state !== "") fullAddress += ", " + state;
    if (zip   !== "") fullAddress += " " + zip;
  }

  /* Status checks */
  var nameStatus = "PASS";
  if (!firstname || !lastname) nameStatus = "ERROR: First and last name are required";
  else if (!/^[A-Za-z'-]{1,30}$/.test(firstname)) nameStatus = "ERROR: Invalid first name";
  else if (!/^[A-Za-z'-]{1,30}$/.test(lastname))  nameStatus = "ERROR: Invalid last name";

  var dobStatus = "PASS";
  if (!dob) {
    dobStatus = "ERROR: Missing date of birth";
  } else {
    var dobParts = dob.split("-");
    var sel = new Date(parseInt(dobParts[0], 10), parseInt(dobParts[1], 10) - 1, parseInt(dobParts[2], 10));
    var tod = new Date(); tod.setHours(0, 0, 0, 0);
    var min = new Date(); min.setFullYear(tod.getFullYear() - 120); min.setHours(0, 0, 0, 0);
    if (sel > tod) dobStatus = "ERROR: Cannot be in the future";
    else if (sel < min) dobStatus = "ERROR: More than 120 years ago";
  }

  var emailStatus = "PASS";
  if (!email) emailStatus = "ERROR: Missing email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) emailStatus = "ERROR: Invalid email format";

  var phoneStatus = "PASS";
  if (!phone) phoneStatus = "ERROR: Missing phone number";
  else if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) phoneStatus = "ERROR: Use ###-###-#### format";

  var addressStatus = "PASS";
  if (!addr1 || !city || !state || !zip) addressStatus = "ERROR: Missing required address fields";
  else if (!/^\d{5}$/.test(zip)) addressStatus = "ERROR: Invalid ZIP (5 digits required)";

  var useridStatus = "PASS";
  if (!userid) useridStatus = "ERROR: Missing user ID";
  else if (!/^[a-z][a-z0-9_-]{4,29}$/.test(userid)) useridStatus = "ERROR: Invalid user ID";

  var passwordStatus = "PASS";
  if (!password || !password2) passwordStatus = "ERROR: Missing password";
  else if (password !== password2) passwordStatus = "ERROR: Passwords do not match";
  else if (containsPersonalInfo(password, userid, firstname, lastname))
    passwordStatus = "ERROR: Password contains personal information";

  var historyDisplay  = history.length ? history.join(", ") : "None selected";
  var symptomsDisplay = symptoms ? symptoms : "No details entered";

  var genderStatus     = gender     ? "PASS" : "ERROR: Gender is required";
  var vaccinatedStatus = vaccinated ? "PASS" : "ERROR: Vaccinated is required";
  var insuranceStatus  = insurance  ? "PASS" : "ERROR: Insurance is required";
  var ssnStatus        = document.getElementById("ssn").value ? "PASS" : "ERROR: SSN is required";

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
  if (bar) bar.style.display = "none";
  var lbl = document.getElementById("strengthLabel");
  if (lbl) lbl.textContent = "";
  document.querySelectorAll(".errorMessage").forEach(function (el) {
    el.innerHTML = "";
  });
  var submitBtn = document.querySelector('input[type="submit"]');
  if (submitBtn) submitBtn.style.display = "none";
}

/* ─── PAGE LOAD: BUTTON SETUP + ALL EVENT WIRING ────────────────────────── */

window.addEventListener("load", function () {

  /* Hide Submit; inject Validate button before it */
  var submitBtn = document.querySelector('input[type="submit"]');
  if (submitBtn) {
    submitBtn.style.display = "none";

    var validateBtn = document.createElement("input");
    validateBtn.type  = "button";
    validateBtn.value = "Validate";
    validateBtn.id    = "validateBtn";
    validateBtn.addEventListener("click", function () {
      if (validateForm()) {
        submitBtn.style.display = "";
      } else {
        submitBtn.style.display = "none";
      }
    });

    submitBtn.parentNode.insertBefore(validateBtn, submitBtn);

    /* Hide Submit again whenever user changes any field after passing validation */
    document.getElementById("patientForm").addEventListener("input",  function () { submitBtn.style.display = "none"; });
    document.getElementById("patientForm").addEventListener("change", function () { submitBtn.style.display = "none"; });
  }

  /* Reset slider display when form is cleared */
  document.getElementById("patientForm").addEventListener("reset", function () {
    setTimeout(function () {
      var s = document.getElementById("health_score");
      if (s) document.getElementById("scoreValue").innerHTML = s.value;
    }, 0);
  });

  /* ── oninput: validate as the user types ──────────────────────────────── */
  document.getElementById("firstname").addEventListener("input",  validateFirstname);
  document.getElementById("middleinit").addEventListener("input", validateMiddleinit);
  document.getElementById("lastname").addEventListener("input",   validateLastname);

  document.getElementById("dob").addEventListener("change", validateDob);

  /* SSN: explicit format call ensures dashes appear immediately */
  document.getElementById("ssn").addEventListener("input", function () {
    formatSsn(document.getElementById("ssn"));
    validateSsn();
  });

  document.getElementById("addr1").addEventListener("input",  validateAddr1);
  document.getElementById("addr2").addEventListener("input",  validateAddr2);
  document.getElementById("city").addEventListener("input",   validateCity);
  document.getElementById("zip").addEventListener("input",    validateZip);
  document.getElementById("email").addEventListener("input",  validateEmail);
  document.getElementById("phone").addEventListener("input",  validatePhone);
  document.getElementById("userid").addEventListener("input", validateUserid);
  document.getElementById("password").addEventListener("input",  validatePassword);
  document.getElementById("password2").addEventListener("input", validatePassword2);

  /* ── onblur: re-validate when the user leaves a field ────────────────── */
  document.getElementById("firstname").addEventListener("blur",  validateFirstname);
  document.getElementById("middleinit").addEventListener("blur", validateMiddleinit);
  document.getElementById("lastname").addEventListener("blur",   validateLastname);
  document.getElementById("dob").addEventListener("blur", validateDob);
  document.getElementById("ssn").addEventListener("blur",    validateSsn);
  document.getElementById("addr1").addEventListener("blur",  validateAddr1);
  document.getElementById("addr2").addEventListener("blur",  validateAddr2);
  document.getElementById("city").addEventListener("blur",   validateCity);
  document.getElementById("state").addEventListener("blur",  validateState);
  document.getElementById("zip").addEventListener("blur",    validateZip);
  document.getElementById("email").addEventListener("blur",  validateEmail);
  document.getElementById("phone").addEventListener("blur",  validatePhone);
  document.getElementById("userid").addEventListener("blur",    validateUserid);
  document.getElementById("password").addEventListener("blur",  validatePassword);
  document.getElementById("password2").addEventListener("blur", validatePassword2);

  /* ── onchange: select + radio + checkbox ─────────────────────────────── */
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

});
