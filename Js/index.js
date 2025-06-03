var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteURL");

var sitesList = [];

if (JSON.parse(localStorage.getItem("allSites"))) {
  sitesList = JSON.parse(localStorage.getItem("allSites"));
  displaySites(sitesList);
}

function addSite() {
  var site = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };
  if (validateInputs(siteNameInput) && validateInputs(siteUrlInput)) {
    sitesList.push(site);
    clearForm();
    localStorage.setItem("allSites", JSON.stringify(sitesList));
    displaySites(sitesList);
    removeValidMarkAfterAdd();
  }
  console.log(sitesList);
}

function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

function displaySites(list) {
  var blackBox = "";
  for (var i = 0; i < list.length; i++) {
    blackBox += `<tr>
                     <th scope="row">${i + 1}</th>
                    <td>${list[i].name}</td>
                    <td><button class="btn btn-success" onclick="visitSite(${i})"><i class="fa-solid fa-eye me-1"></i>Visit</button></td>
                    <td><button class="btn btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash me-1"></i>Delete</button></td>
                    </tr>`;
  }
  document.getElementById("allSites").innerHTML = blackBox;
}

function visitSite(visitedIdx) {
  var url = sitesList[visitedIdx].url;
  window.open(url, "_blank");
}

function deleteSite(deletedIdx) {
  console.log(deletedIdx);
  sitesList.splice(deletedIdx, 1);
  localStorage.setItem("allSites", JSON.stringify(sitesList));
  displaySites(sitesList);
}

function validateInputs(element) {
  var regex = {
    siteName: /^\w{3,}(\s+\w+)*$/,
    siteURL:
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/,
  };
  var isValid = regex[element.id].test(element.value);
  console.log(isValid);
  if (isValid) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
  }
  return isValid;
}
function removeValidMarkAfterAdd() {
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}
  