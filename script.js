// Students array - saved in localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];
let isEditing = false;

// ── Navigation ──────────────────────────────────────────────────────
function showSection(name) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));

  document.getElementById("section-" + name).classList.add("active");

  const titles = { dashboard: "Dashboard", students: "All Students", add: "Add Student" };
  document.getElementById("pageTitle").textContent = titles[name];

  const navMap = { dashboard: 0, students: 1, add: 2 };
  document.querySelectorAll(".nav-item")[navMap[name]].classList.add("active");

  if (name === "dashboard") renderDashboard();
  if (name === "students")  renderTable(students);
}

// ── Save / Update Student ────────────────────────────────────────────
function saveStudent() {
  const id     = parseInt(document.getElementById("sId").value);
  const name   = document.getElementById("sName").value.trim();
  const branch = document.getElementById("sBranch").value;
  const year   = parseInt(document.getElementById("sYear").value);
  const cgpa   = parseFloat(document.getElementById("sCgpa").value);
  const email  = document.getElementById("sEmail").value.trim();
  const editId = document.getElementById("editId").value;

  if (!id || !name || !branch || !year || isNaN(cgpa)) {
    showToast("Please fill in all required fields.", "error");
    return;
  }
  if (cgpa < 0 || cgpa > 10) {
    showToast("CGPA must be between 0 and 10.", "error");
    return;
  }

  if (isEditing) {
    const index = students.findIndex(s => s.id == editId);
    students[index] = { id, name, branch, year, cgpa, email };
    showToast("Student updated successfully!", "success");
    isEditing = false;
  } else {
    if (students.find(s => s.id === id)) {
      showToast("Student ID already exists!", "error");
      return;
    }
    students.push({ id, name, branch, year, cgpa, email });
    showToast("Student added successfully!", "success");
  }

  localStorage.setItem("students", JSON.stringify(students));
  clearForm();
  showSection("students");
}

// ── Edit Student ─────────────────────────────────────────────────────
function editStudent(id) {
  const s = students.find(s => s.id === id);
  if (!s) return;

  document.getElementById("sId").value    = s.id;
  document.getElementById("sName").value  = s.name;
  document.getElementById("sBranch").value= s.branch;
  document.getElementById("sYear").value  = s.year;
  document.getElementById("sCgpa").value  = s.cgpa;
  document.getElementById("sEmail").value = s.email || "";
  document.getElementById("editId").value = s.id;
  document.getElementById("sId").disabled = true;

  document.getElementById("formHeading").innerHTML = '<i class="fas fa-user-edit"></i> Edit Student';
  document.getElementById("saveBtnText").textContent = "Update Student";

  isEditing = true;
  showSection("add");
}

// ── Delete Student ────────────────────────────────────────────────────
function deleteStudent(id) {
  if (!confirm("Delete this student? This cannot be undone.")) return;
  students = students.filter(s => s.id !== id);
  localStorage.setItem("students", JSON.stringify(students));
  renderTable(students);
  renderDashboard();
  showToast("Student deleted.", "success");
}

// ── Render Table ──────────────────────────────────────────────────────
function renderTable(list) {
  const tbody = document.getElementById("studentTable");
  const empty = document.getElementById("tableEmpty");

  tbody.innerHTML = "";

  if (list.length === 0) {
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  list.forEach(s => {
    const initials = s.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const cgpaClass = s.cgpa >= 8 ? "cgpa-high" : s.cgpa >= 6 ? "cgpa-mid" : "cgpa-low";
    const statusClass = s.cgpa >= 8 ? "status-good" : s.cgpa >= 6 ? "status-avg" : "status-at-risk";
    const statusText  = s.cgpa >= 8 ? "Good Standing" : s.cgpa >= 6 ? "Average" : "At Risk";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><span style="color:#64748b;font-size:0.8rem">#${s.id}</span></td>
      <td>
        <div class="td-student">
          <div class="td-avatar">${initials}</div>
          <div>
            <div style="font-weight:500">${s.name}</div>
            <div style="font-size:0.75rem;color:#64748b">${s.email || "—"}</div>
          </div>
        </div>
      </td>
      <td>${s.branch}</td>
      <td>Year ${s.year}</td>
      <td><span class="cgpa-badge ${cgpaClass}">${s.cgpa.toFixed(2)}</span></td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
      <td>
        <div class="action-btns">
          <button class="btn-icon" onclick="editStudent(${s.id})" title="Edit">
            <i class="fas fa-pen"></i>
          </button>
          <button class="btn-icon del" onclick="deleteStudent(${s.id})" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// ── Render Dashboard ──────────────────────────────────────────────────
function renderDashboard() {
  const total = students.length;
  const avg   = total ? (students.reduce((s, st) => s + st.cgpa, 0) / total) : 0;
  const top   = total ? Math.max(...students.map(s => s.cgpa)) : 0;
  const low   = students.filter(s => s.cgpa < 6).length;

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-avg").textContent   = avg.toFixed(2);
  document.getElementById("stat-top").textContent   = top.toFixed(2);
  document.getElementById("stat-low").textContent   = low;

  // Recent 6 students
  const recentList = document.getElementById("recentList");
  const dashEmpty  = document.getElementById("dashEmpty");
  recentList.innerHTML = "";

  if (students.length === 0) {
    dashEmpty.style.display = "block";
    return;
  }
  dashEmpty.style.display = "none";

  const recent = [...students].slice(-6).reverse();
  recent.forEach(s => {
    const initials = s.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const cgpaClass = s.cgpa >= 8 ? "cgpa-high" : s.cgpa >= 6 ? "cgpa-mid" : "cgpa-low";

    const card = document.createElement("div");
    card.className = "s-card";
    card.innerHTML = `
      <div class="s-card-top">
        <div class="s-avatar">${initials}</div>
        <div>
          <div class="s-name">${s.name}</div>
          <div class="s-branch">${s.branch}</div>
        </div>
      </div>
      <div class="s-card-bottom">
        <span class="s-year">Year ${s.year}</span>
        <span class="cgpa-badge ${cgpaClass}">${s.cgpa.toFixed(2)}</span>
      </div>
    `;
    recentList.appendChild(card);
  });
}

// ── Live Search ───────────────────────────────────────────────────────
function liveSearch() {
  const q = document.getElementById("globalSearch").value.toLowerCase();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(q) || String(s.id).includes(q) || s.branch.toLowerCase().includes(q)
  );
  showSection("students");
  renderTable(filtered);
}

// ── Clear Form ────────────────────────────────────────────────────────
function clearForm() {
  ["sId","sName","sEmail","sCgpa"].forEach(id => document.getElementById(id).value = "");
  document.getElementById("sBranch").value = "";
  document.getElementById("sYear").value   = "";
  document.getElementById("editId").value  = "";
  document.getElementById("sId").disabled  = false;
  document.getElementById("formHeading").innerHTML = '<i class="fas fa-user-plus"></i> Add New Student';
  document.getElementById("saveBtnText").textContent = "Save Student";
  isEditing = false;
}

// ── Toast ─────────────────────────────────────────────────────────────
function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = "toast " + type + " show";
  setTimeout(() => { toast.classList.remove("show"); }, 3000);
}

// ── Init ──────────────────────────────────────────────────────────────
renderDashboard();
