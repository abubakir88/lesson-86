var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var City = ["Bukhara", "Samarqand", "Toshkent", "Farg'ona"];
var Position = ["React", "Nodejs", "Go", "Python"];
var TypePosition = ["junior", "middle", "senior"];
var pupilsJson = localStorage.getItem("pupils");
var pupils = JSON.parse(pupilsJson !== null && pupilsJson !== void 0 ? pupilsJson : "[]");
var pupilTable = document.getElementById("pupilTable");
var pupilForm = document.getElementById("pupilForm");
var sendBtn = document.getElementById("sendBtn");
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var pupilCity = document.getElementById("pupilCity");
var datePupil = document.getElementById("datePupil");
var isMarried = document.getElementById("isMarried");
var positionPupil = document.getElementById("positionPupil");
var typePosition = document.getElementById("typePosition");
var salaryPupil = document.getElementById("salaryPupil");
var formModal = document.querySelector(".modal");
var searchInput = document.getElementById("search");
var filterPosition = document.getElementById("filterPosition");
var filterCity = document.getElementById("filterCity");
var selected = null;
var getRow = function (_a) {
    var id = _a.id, firstName = _a.firstName, lastName = _a.lastName, city = _a.city, date = _a.date, position = _a.position, typeposition = _a.typeposition, salary = _a.salary, isMarried = _a.isMarried;
    return "\n    <tr>\n      <th scope=\"row\">".concat(id, "</th>\n      <td>").concat(firstName, "</td>\n      <td>").concat(lastName, "</td>\n      <td>").concat(city, "</td>  \n      <td>").concat(date, "</td>\n      <td>").concat(position, "</td>\n      <td>").concat(typeposition, "</td>\n      <td>").concat(salary, "</td>\n      <td>").concat(isMarried ? "Ha" : "Yo'q", "</td>\n      <td class = \"text-end\">\n        <button class=\"btn btn-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#pupilModal\" onclick=\"editPupil(").concat(id, ")\">Edit</button>\n        <button class=\"btn btn-danger\" onclick=\"deletePupil(").concat(id, ")\">Delete</button>\n      </td>\n      </tr>\n      ");
};
if (pupilCity) {
    City.forEach(function (city) {
        pupilCity.innerHTML += "<option value=\"".concat(city, "\">").concat(city, "</option>");
    });
}
if (positionPupil) {
    Position.forEach(function (position) {
        positionPupil.innerHTML += "<option value=\"".concat(position, "\">").concat(position, "</option>");
    });
}
if (typePosition) {
    TypePosition.forEach(function (typeposition) {
        typePosition.innerHTML += "<option value=\"".concat(typeposition, "\">").concat(typeposition, "</option>");
    });
    __spreadArray(["Lavozim turini tanlang"], TypePosition, true).forEach(function (typeposition) {
        filterPosition.innerHTML += "<option value=\"".concat(typeposition, "\">").concat(typeposition, "</option>");
    });
}
if (filterCity) {
    __spreadArray(["Manzilni tanlang"], City, true).forEach(function (city) {
        filterCity.innerHTML += "<option value=\"".concat(city, "\">").concat(city, "</option>");
    });
}
var getPupils = function (newPupils) {
    if (pupilTable) {
        pupilTable.innerHTML = "";
        var count_1 = 0;
        (newPupils || pupils).forEach(function (pupil) {
            count_1++;
            pupil.id = count_1;
            if (pupilTable)
                pupilTable.innerHTML += getRow(pupil);
        });
    }
};
getPupils();
if (pupilForm) {
    pupilForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var check = this.checkValidity();
        this.classList.add("was-validated");
        if (check) {
            if (formModal)
                bootstrap.Modal.getInstance(formModal).hide();
            var newPupil_1 = {
                firstName: (firstName === null || firstName === void 0 ? void 0 : firstName.value) || "",
                lastName: (lastName === null || lastName === void 0 ? void 0 : lastName.value) || "",
                city: (pupilCity === null || pupilCity === void 0 ? void 0 : pupilCity.value) || "",
                date: (datePupil === null || datePupil === void 0 ? void 0 : datePupil.value) || "",
                position: (positionPupil === null || positionPupil === void 0 ? void 0 : positionPupil.value) || "",
                typeposition: (typePosition === null || typePosition === void 0 ? void 0 : typePosition.value) || "",
                salary: (salaryPupil === null || salaryPupil === void 0 ? void 0 : salaryPupil.value) || "",
                isMarried: (isMarried === null || isMarried === void 0 ? void 0 : isMarried.checked) || false,
            };
            if (selected) {
                pupils = pupils.map(function (pupil) {
                    if (pupil.id == selected.id) {
                        return __assign({ id: selected.id }, newPupil_1);
                    }
                    else {
                        return pupil;
                    }
                });
            }
            else {
                newPupil_1.id = pupils.length;
                pupils.push(newPupil_1);
            }
            localStorage.setItem("pupils", JSON.stringify(pupils));
            window.location.reload(); // qayta yuklash
        }
        getPupils();
    });
}
function editPupil(id) {
    var pupil = pupils.find(function (pupil) { return pupil.id == id; });
    selected = pupil;
    if (firstName)
        firstName.value = (pupil === null || pupil === void 0 ? void 0 : pupil.firstName) || "";
    if (lastName)
        lastName.value = (pupil === null || pupil === void 0 ? void 0 : pupil.lastName) || "";
    if (pupilCity)
        pupilCity.value = (pupil === null || pupil === void 0 ? void 0 : pupil.city) || "";
    if (datePupil)
        datePupil.value = (pupil === null || pupil === void 0 ? void 0 : pupil.date) || "";
    if (positionPupil)
        positionPupil.value = (pupil === null || pupil === void 0 ? void 0 : pupil.position) || "";
    if (typePosition)
        typePosition.value = (pupil === null || pupil === void 0 ? void 0 : pupil.typeposition) || "";
    if (salaryPupil)
        salaryPupil.value = (pupil === null || pupil === void 0 ? void 0 : pupil.salary) || "";
    if (isMarried)
        isMarried.checked = (pupil === null || pupil === void 0 ? void 0 : pupil.isMarried) || false;
}
function deletePupil(id) {
    var isConfirm = confirm("O'chirishni xohlaysizmi ?");
    if (isConfirm) {
        pupils = pupils.filter(function (pupil) { return pupil.id != id; });
        localStorage.setItem("pupils", JSON.stringify(pupils));
        getPupils();
    }
}
if (searchInput) {
    searchInput.addEventListener("input", function () {
        var search = this.value.toLowerCase();
        var searchPupils = pupils.filter(function (pupil) {
            return pupil.firstName.toLowerCase().includes(search) ||
                pupil.lastName.toLowerCase().includes(search);
        });
        getPupils(searchPupils);
    });
}
if (filterPosition) {
    filterPosition.addEventListener("change", function () {
        var _this = this;
        if (this.value == "Lavozim turini tanlang") {
            getPupils();
        }
        else {
            var filterPupils = pupils.filter(function (pupil) { return pupil.typeposition == _this.value; });
            getPupils(filterPupils);
        }
    });
}
if (filterCity) {
    filterCity.addEventListener("change", function () {
        var _this = this;
        if (this.value == "Manzilni tanlang") {
            getPupils();
        }
        else {
            var filterPupils = pupils.filter(function (pupil) { return pupil.city == _this.value; });
            getPupils(filterPupils);
        }
    });
}
