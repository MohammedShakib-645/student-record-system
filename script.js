// All students stored in localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];
let isEditing = false;

// Save to localStorage
function saveToStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Add or Update student
function saveStudent() {
  const id     = parseInt(document.getElementById("studentId").value);
  const name   = document.getElementById("studentName").value.trim();
  const branch = document.getElementById("studentBranch").value.trim();
  const year   = parseInt(document.getElementById("studentYear").value);
  const cgpa   = parseFloat(document.getElementById("studentCgpa").value);
  const editId = document.getElementById("editId").value;

  // Basic validation
  if (!id || !name || !branch || !year || isNaN(cgpa)) {
    alert("Please fill in all fields correctly.");
    return;
  }
  if (cgpa < 0 || cgpa > 10) {
    alert("CGPA must be between 0 and 10.");
    return;
  }
  if (year < 1 || year > 4) {
    alert("Year must be between 1 and 4.");
    return;
  }

  if (isEditing) {
    // Update existing
    const index = students.findIndex(s => s.id == editId);
    students[index] = { id, name, branch, year, cgpa };
    isEditing = false;
    document.getElementById("formTitle").textContent = "Add Student";
    document.getElementById("studentId").disabled = false;
  } else {
    // Check if ID already exists
    if (students.find(s => s.id === id)) {
      alert("Student with this ID already exists!");
      return;
    }
    students.push({ id, name, branch, year, cgpa });
  }

  saveToStorage();
  renderTable(students);
  clearForm();
}

// Render the table
function renderTable(list) {
  const tbody = document.getElementById("studentTable");
  const noRecords = document.getElementById("noRecords");

  tbody.innerHTML = "";

  if (list.length === 0) {
    noRecords.style.display = "block";
  } else {
    noRecords.style.display = "none";
  }

  list.forEach(s => {
    // Color code the CGPA
    let cgpaClass = "cgpa-low";
    if (s.cgpa >= 8) cgpaClass = "cgpa-high";
    else if (s.cgpa >= 6) cgpaClass = "cgpa-mid";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.branch}</td>
      <td>Year ${s.year}</td>
      <td class="${cgpaClass}">${s.cgpa.toFixed(2)}</td>
      <td>
        <button class="btn-edit" onclick="editStudent(${s.id})">Edit</button>
        <button class="btn-delete" onclick="deleteStudent(${s.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  updateStats();
}

// Edit a student
function editStudent(id) {
  const s = students.find(s => s.id === id);
  if (!s) return;

  document.getElementById("studentId").value = s.id;
  document.getElementById("studentName").value = s.name;
  document.getElementById("studentBranch").value = s.branch;
  document.getElementById("studentYear").value = s.year;
  document.getElementById("studentCgpa").value = s.cgpa;
  document.getElementById("editId").value = s.id;
  document.getElementById("studentId").disabled = true;
  document.getElementById("formTitle").textContent = "Edit Student";
  document.querySelector(".btn-add").textContent = "Update Student";

  isEditing = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Delete a student
function deleteStudent(id) {
  if (!confirm("Are you sure you want to delete this student?")) return;
  students = students.filter(s => s.id !== id);
  saveToStorage();
  renderTable(students);
}

// Search by name or ID
function searchStudents() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(query) ||
    String(s.id).includes(query)
  );
  renderTable(filtered);
}

// Clear the form
function clearForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("studentName").value = "";
  document.getElementById("studentBranch").value = "";
  document.getElementById("studentYear").value = "";
  document.getElementById("studentCgpa").value = "";
  document.getElementById("editId").value = "";
  document.getElementById("studentId").disabled = false;
  document.getElementById("formTitle").textContent = "Add Student";
  document.querySelector(".btn-add").textContent = "Add Student";
  isEditing = false;
}

// Update stats cards
function updateStats() {
  document.getElementById("totalCount").textContent = students.length;

  if (students.length === 0) {
    document.getElementById("avgCgpa").textContent = "0.00";
    document.getElementById("topCgpa").textContent = "0.00";
    return;
  }

  const avg = students.reduce((sum, s) => sum + s.cgpa, 0) / students.length;
  const top = Math.max(...students.map(s => s.cgpa));

  document.getElementById("avgCgpa").textContent = avg.toFixed(2);
  document.getElementById("topCgpa").textContent = top.toFixed(2);
}

// Load on page start
renderTable(students);
