const City: string[] = ["Bukhara", "Samarqand", "Toshkent", "Farg'ona"];
const Position: string[] = ["React", "Nodejs", "Go", "Python"];
const TypePosition: string[] = ["junior", "middle", "senior"];

let pupilsJson: string | null = localStorage.getItem("pupils");
let pupils: any[] = JSON.parse(pupilsJson ?? "[]");

const pupilTable: HTMLElement | null = document.getElementById("pupilTable");
const pupilForm: HTMLFormElement | null = document.getElementById(
  "pupilForm"
) as HTMLFormElement;
const sendBtn: HTMLButtonElement | null = document.getElementById(
  "sendBtn"
) as HTMLButtonElement;
const firstName: HTMLInputElement | null = document.getElementById(
  "firstName"
) as HTMLInputElement;
const lastName: HTMLInputElement | null = document.getElementById(
  "lastName"
) as HTMLInputElement;
const pupilCity: HTMLSelectElement | null = document.getElementById(
  "pupilCity"
) as HTMLSelectElement;
const datePupil: HTMLInputElement | null = document.getElementById(
  "datePupil"
) as HTMLInputElement;
const isMarried: HTMLInputElement | null = document.getElementById(
  "isMarried"
) as HTMLInputElement;
const positionPupil: HTMLSelectElement | null = document.getElementById(
  "positionPupil"
) as HTMLSelectElement;
const typePosition: HTMLSelectElement | null = document.getElementById(
  "typePosition"
) as HTMLSelectElement;
const salaryPupil: HTMLInputElement | null = document.getElementById(
  "salaryPupil"
) as HTMLInputElement;
const formModal: HTMLElement | null = document.querySelector(".modal");
const searchInput: HTMLInputElement | null = document.getElementById(
  "search"
) as HTMLInputElement;
const filterPosition: HTMLSelectElement | null = document.getElementById(
  "filterPosition"
) as HTMLSelectElement;
const filterCity: HTMLSelectElement | null = document.getElementById(
  "filterCity"
) as HTMLSelectElement;

let selected: any = null;

interface Pupil {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  date: string;
  position: string;
  typeposition: string;
  salary: string;
  isMarried: boolean;
}

const getRow = ({
  id,
  firstName,
  lastName,
  city,
  date,
  position,
  typeposition,
  salary,
  isMarried,
}: Pupil): string => {
  return `
    <tr>
      <th scope="row">${id}</th>
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${city}</td>  
      <td>${date}</td>
      <td>${position}</td>
      <td>${typeposition}</td>
      <td>${salary}</td>
      <td>${isMarried ? "Ha" : "Yo'q"}</td>
      <td class = "text-end">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pupilModal" onclick="editPupil(${id})">Edit</button>
        <button class="btn btn-danger" onclick="deletePupil(${id})">Delete</button>
      </td>
      </tr>
      `;
};

if (pupilCity) {
  City.forEach((city) => {
    pupilCity.innerHTML += `<option value="${city}">${city}</option>`;
  });
}

if (positionPupil) {
  Position.forEach((position) => {
    positionPupil.innerHTML += `<option value="${position}">${position}</option>`;
  });
}

if (typePosition) {
  TypePosition.forEach((typeposition) => {
    typePosition.innerHTML += `<option value="${typeposition}">${typeposition}</option>`;
  });

  ["Lavozim turini tanlang", ...TypePosition].forEach((typeposition) => {
    filterPosition.innerHTML += `<option value="${typeposition}">${typeposition}</option>`;
  });
}

if (filterCity) {
  ["Manzilni tanlang", ...City].forEach((city) => {
    filterCity.innerHTML += `<option value="${city}">${city}</option>`;
  });
}

const getPupils = (newPupils?: Pupil[]): void => {
  if (pupilTable) {
    pupilTable.innerHTML = "";
    let count = 0;
    (newPupils || pupils).forEach((pupil: Pupil) => {
      count++;
      pupil.id = count;
      if (pupilTable) pupilTable.innerHTML += getRow(pupil);
    });
  }
};

getPupils();

if (pupilForm) {
  pupilForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let check = this.checkValidity();
    this.classList.add("was-validated");
    if (check) {
      if (formModal) bootstrap.Modal.getInstance(formModal).hide();
      let newPupil: Pupil = {
        firstName: firstName?.value || "",
        lastName: lastName?.value || "",
        city: pupilCity?.value || "",
        date: datePupil?.value || "",
        position: positionPupil?.value || "",
        typeposition: typePosition?.value || "",
        salary: salaryPupil?.value || "",
        isMarried: isMarried?.checked || false,
      };
      if (selected) {
        pupils = pupils.map((pupil) => {
          if (pupil.id == selected.id) {
            return {
              id: selected.id,
              ...newPupil,
            };
          } else {
            return pupil;
          }
        });
      } else {
        newPupil.id = pupils.length;
        pupils.push(newPupil);
      }
      localStorage.setItem("pupils", JSON.stringify(pupils));
      window.location.reload(); // qayta yuklash
    }
    getPupils();
  });
}

function editPupil(id: number) {
  let pupil = pupils.find((pupil) => pupil.id == id);
  selected = pupil;
  if (firstName) firstName.value = pupil?.firstName || "";
  if (lastName) lastName.value = pupil?.lastName || "";
  if (pupilCity) pupilCity.value = pupil?.city || "";
  if (datePupil) datePupil.value = pupil?.date || "";
  if (positionPupil) positionPupil.value = pupil?.position || "";
  if (typePosition) typePosition.value = pupil?.typeposition || "";
  if (salaryPupil) salaryPupil.value = pupil?.salary || "";
  if (isMarried) isMarried.checked = pupil?.isMarried || false;
}

function deletePupil(id: number) {
  let isConfirm = confirm("O'chirishni xohlaysizmi ?");
  if (isConfirm) {
    pupils = pupils.filter((pupil) => pupil.id != id);
    localStorage.setItem("pupils", JSON.stringify(pupils));
    getPupils();
  }
}

if (searchInput) {
  searchInput.addEventListener("input", function () {
    let search = this.value.toLowerCase();
    let searchPupils = pupils.filter(
      (pupil) =>
        pupil.firstName.toLowerCase().includes(search) ||
        pupil.lastName.toLowerCase().includes(search)
    );
    getPupils(searchPupils);
  });
}

if (filterPosition) {
  filterPosition.addEventListener("change", function () {
    if (this.value == "Lavozim turini tanlang") {
      getPupils();
    } else {
      let filterPupils = pupils.filter(
        (pupil) => pupil.typeposition == this.value
      );
      getPupils(filterPupils);
    }
  });
}

if (filterCity) {
  filterCity.addEventListener("change", function () {
    if (this.value == "Manzilni tanlang") {
      getPupils();
    } else {
      let filterPupils = pupils.filter((pupil) => pupil.city == this.value);
      getPupils(filterPupils);
    }
  });
}
