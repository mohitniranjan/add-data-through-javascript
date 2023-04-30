let courses = [];

let courseIdField = null;
let courseNameField = null;
let courseFeeField = null;
let courseDurationField = null;
let courseModalContent = ``;

const courseTableBody = document.getElementById("course-table-body");
const courseModal = document.getElementById("course-modal");
const courseModalContainer = document.getElementById("course-modal-container");
const courseTable = document.getElementById("course-table");

const studentModal = document.getElementById("student-modal");
const studentCourseNameField = document.getElementById("student-course-name");
const studentCourseFeeField = document.getElementById("student-course-fee");
const studentTable = document.getElementById("student-table");

const showCourseTable = () => {
    studentTable.style.display = "none";
    courseTable.style.display = "block";
};

const showStudentTable = () => {
    courseTable.style.display = "none";
    studentTable.style.display = "block";
};

const setCourseModalContentAsSave = () => {
    courseModalContent = `<form>
        <div class="form-group">
            <label for="course-id">Course ID:</label>
            <input type="text" class="form-control" id="course-id">
        </div>
        <div class="form-group">
            <label for="course-name">Course Name:</label>
            <input type="text" class="form-control" id="course-name">
        </div>
        <div class="form-group">
            <label for="course-fee">Course Fee:</label>
            <input type="text" class="form-control" id="course-fee">
        </div>
        <div class="form-group">
            <label for="course-description">Course Duration:</label>
            <input type="text" class="form-control" id="course-duration">
        </div>
        <button type="button" onclick="addCourse()">Add</button>
        <button type="button" onclick="hideCourseModal()">Cancel</button>
    </form>`
    courseModalContainer.innerHTML = courseModalContent;
    refreshFields();
};

const setCourseModalContentAsEdit = (courseIndex) => {
    courseModalContent = `<form>
        <div class="form-group">
            <label for="course-id">Course ID:</label>
            <input type="text" class="form-control" id="course-id">
        </div>
        <div class="form-group">
            <label for="course-name">Course Name:</label>
            <input type="text" class="form-control" id="course-name">
        </div>
        <div class="form-group">
            <label for="course-fee">Course Fee:</label>
            <input type="text" class="form-control" id="course-fee">
        </div>
        <div class="form-group">
            <label for="course-description">Course Duration:</label>
            <input type="text" class="form-control" id="course-duration">
        </div>
        <button type="button" onclick="editCourseContent(${courseIndex})">Save</button>
        <button type="button" onclick="hideCourseModal()">Cancel</button>
    </form>`
    courseModalContainer.innerHTML = courseModalContent;
    refreshFields();
};

const showStudentModal = () => {
    studentModal.style.display = "block";
};

const hideStudentModal = () => {
    studentModal.style.display = "none";
};

const populateCourseFee = (courseIndex) => {
    if (courseIndex !== null) {
        studentCourseFeeField.value = courses[courseIndex].fee;
    } else {
        studentCourseFeeField.value = "";
    }
};

const populateStudentForm = () => {
    let options = `<option id="default-option">Please select a course from here</option>
    `;
    courses.map((course, i) => {
       let option = `<option id="option-${i}" value="${i}">${course.name}</option>
       `; 
       options = options.concat(option);
    });
    studentCourseNameField.innerHTML = options;
};

const commitCourseChanges = () => {
    flushToFrontEnd();
    populateStudentForm();
};

const refreshFields = () => {
    courseIdField = document.getElementById("course-id"); 
    courseNameField = document.getElementById("course-name");
    courseFeeField = document.getElementById("course-fee");
    courseDurationField = document.getElementById("course-duration");
}

const showCourseModal = (courseIndex) => {
    if (courseIndex !== null) {
        setCourseModalContentAsEdit(courseIndex);
    } else {
        setCourseModalContentAsSave();
    }
    courseModal.style.display = "block";
};

const hideCourseModal = () => {
    courseModal.style.display = "none";
}

const flushToFrontEnd = () => {
    let tableBodyContent = "";
    courses.map((course, i) => {
        const actionContent = `<button onClick="editCourse(${i})"><i class="fa fa-pencil-square-o" style="font-size:30px"></i></button>
        <button onClick="deleteCourse(${i})"><i class="fa fa-trash" style="font-size:30px"></i></button>`;
        const tr = `<tr id="row-${i}">
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>${course.fee}</td>
            <td>${course.duration}</td>
            <td>${actionContent}</td>
        </tr>
        `;
        tableBodyContent = tableBodyContent.concat(tr);
    });
    courseTableBody.innerHTML = tableBodyContent;
};

const addCourse = () => {
    let courseData = {
        id: courseIdField.value,
        name: courseNameField.value,
        fee: courseFeeField.value,
        duration: courseDurationField.value,
    };
    courses.push(courseData);
    commitCourseChanges();
    hideCourseModal();
};

const deleteCourse = (courseIndex) => {
    courses.splice(courseIndex, 1);
    commitCourseChanges();
};

const editCourse = (courseIndex) => {
    showCourseModal(courseIndex);
    courseIdField.value = courses[courseIndex].id;
    courseNameField.value = courses[courseIndex].name;
    courseFeeField.value = courses[courseIndex].fee;
    courseDurationField.value = courses[courseIndex].duration;
};

const editCourseContent = (courseIndex) => {
    let courseData = {
        id: courseIdField.value,
        name: courseNameField.value,
        fee: courseFeeField.value,
        duration: courseDurationField.value,
    };
    courses[courseIndex] = courseData;
    commitCourseChanges();
    hideCourseModal();
}
