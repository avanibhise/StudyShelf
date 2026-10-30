
// 1. Sample resources stored in an array
let resources = [
  {
    title: "Limits and Continuity Notes",
    subject: "Engineering Maths",
    year: 1,
    type: "Notes",
    by: "Aarav",
    fileName: "",
    fileUrl: ""
  },
  {
    title: "Mid-sem Paper 2024",
    subject: "Engineering Maths",
    year: 1,
    type: "Question Paper",
    by: "Riya",
    fileName: "",
    fileUrl: ""
  },
  {
    title: "Pointers in C",
    subject: "Programming Fundamentals",
    year: 1,
    type: "Notes",
    by: "Kabir",
    fileName: "",
    fileUrl: ""
  },
  {
    title: "End-sem Paper 2023",
    subject: "Data Structures",
    year: 2,
    type: "Question Paper",
    by: "Anaya",
    fileName: "",
    fileUrl: ""
  },
  {
    title: "Linked List Notes",
    subject: "Data Structures",
    year: 2,
    type: "Notes",
    by: "Ishaan",
    fileName: "",
    fileUrl: ""
  },
  {
    title: "Process Scheduling Notes",
    subject: "Operating Systems",
    year: 3,
    type: "Notes",
    by: "Meera",
    fileName: "",
    fileUrl: ""
  },
  {
    title: "Project Report Template",
    subject: "Final Year Project",
    year: 4,
    type: "Notes",
    by: "Dev",
    fileName: "",
    fileUrl: ""
  }
];

// 2. Select HTML elements
const cardsBox = document.getElementById("cards");
const searchInput = document.getElementById("search");
const yearFilter = document.getElementById("yearFilter");
const typeFilter = document.getElementById("typeFilter");

const formBox = document.getElementById("formBox");
const uploadForm = document.getElementById("uploadForm");
const resultCount = document.getElementById("resultCount");


// 3. Display resources and apply search and filters
function showCards() {

  const searchText = searchInput.value.toLowerCase();
  const selectedYear = yearFilter.value;
  const selectedType = typeFilter.value;

  // Filter resources based on user selection
  const filtered = resources.filter(function(item) {

    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.subject.toLowerCase().includes(searchText);

    const matchesYear =
      selectedYear === "all" || item.year == selectedYear;

    const matchesType =
      selectedType === "all" || item.type === selectedType;

    return matchesSearch && matchesYear && matchesType;
  });

  // Clear previous cards
  cardsBox.innerHTML = "";

  resultCount.textContent =
    filtered.length + " resource(s) found";

  // If no resources match
  if (filtered.length === 0) {

    cardsBox.innerHTML = `
      <div class="col-12">
        <div class="empty-state">
          <h5>No resources found</h5>
          <p>Try another keyword or change the filters.</p>
        </div>
      </div>
    `;

    return;
  }

  // Display each filtered resource
  filtered.forEach(function(item) {

    const column = document.createElement("div");
    column.className = "col-md-6 col-lg-4";

    const card = document.createElement("div");

    card.className =
      item.type === "Question Paper"
        ? "resource-card paper"
        : "resource-card notes";

    let fileHtml =
      "<p class='small text-muted mb-0'>Sample resource – no file attached.</p>";

    if (item.fileUrl) {
      fileHtml =
        '<a href="' + item.fileUrl +
        '" target="_blank">Open ' + item.fileName + '</a>';
    }

    card.innerHTML = `
      <span class="resource-type">${item.type}</span>

      <h4>${item.title}</h4>

      <p class="card-meta mb-0">
        ${item.subject} · Year ${item.year}
      </p>

      <div class="card-details">

        <button class="btn btn-sm btn-danger delete-btn mt-2">
            Delete Resource
        </button>

        <p class="small text-muted mb-2">
          Shared by ${item.by}
        </p>

        ${fileHtml}

        <p class="small text-muted mt-2 mb-0">
          Click the card again to close details.
        </p>

      </div>
    `;

    // Interactive feature: Expand and collapse card
    card.addEventListener("click", function(event) {

      if (event.target.tagName !== "A") {
        card.classList.toggle("open");
      }

    });

    // Delete resource
const deleteBtn = card.querySelector(".delete-btn");

deleteBtn.addEventListener("click", function(event) {

  event.stopPropagation();

  if (confirm("Are you sure you want to delete this resource?")) {

    const index = resources.indexOf(item);

    resources.splice(index, 1);

    showCards();

  }

});

    column.appendChild(card);
    cardsBox.appendChild(column);

  });

}


// 4. Search and filter event listeners
searchInput.addEventListener("input", showCards);

yearFilter.addEventListener("change", showCards);

typeFilter.addEventListener("change", showCards);


// 5. Open and close upload form

function closeUploadForm() {
  formBox.classList.add("hidden");
}

document.getElementById("openForm").addEventListener("click", function() {

  formBox.classList.remove("hidden");

});

document.getElementById("closeForm").addEventListener("click", closeUploadForm);

document.getElementById("cancelForm").addEventListener("click", closeUploadForm);


// Close form when clicking outside it
formBox.addEventListener("click", function(event) {

  if (event.target === formBox) {
    closeUploadForm();
  }

});


// 6. Form validation and resource submission

uploadForm.addEventListener("submit", function(event) {

  // Prevent page from refreshing
  event.preventDefault();

  // Get form values
  const title = document.getElementById("title").value.trim();

  const subject = document.getElementById("subject").value.trim();

  const year = document.getElementById("year").value;

  const type = document.getElementById("type").value;

  const file = document.getElementById("file").files[0];


  // Clear previous error messages
  document.querySelectorAll(".error").forEach(function(span) {

    span.textContent = "";

  });


  let valid = true;


  // Validate title
  if (title.length < 3) {

    document.getElementById("titleError").textContent =
      "Enter at least 3 characters.";

    valid = false;

  }


  // Validate subject
  if (subject.length < 2) {

    document.getElementById("subjectError").textContent =
      "Enter a subject.";

    valid = false;

  }


  // Validate academic year
  if (year === "") {

    document.getElementById("yearError").textContent =
      "Select a year.";

    valid = false;

  }


  // Validate resource type
  if (type === "") {

    document.getElementById("typeError").textContent =
      "Select a resource type.";

    valid = false;

  }


  // Validate file
  if (!file) {

    document.getElementById("fileError").textContent =
      "Choose a file.";

    valid = false;

  } else if (file.size > 5 * 1024 * 1024) {

    document.getElementById("fileError").textContent =
      "File must be smaller than 5 MB.";

    valid = false;

  }


  // Stop if validation fails
  if (!valid) {
    return;
  }


  // Add new resource to the array
  resources.unshift({

    title: title,

    subject: subject,

    year: Number(year),

    type: type,

    by: "You",

    fileName: file.name,

    fileUrl: URL.createObjectURL(file)

  });


  // Reset form
  uploadForm.reset();

  // Close popup
  closeUploadForm();

  // Refresh displayed resources
  showCards();

});


// 7. Display resources when website loads
showCards();
