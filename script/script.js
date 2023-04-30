let courses = [];

let courseIdField = null;
let courseNameField = null;
let courseFeeField = null;
let courseDurationField = null;

const tableBody = document.getElementById("table-body");
const courseModal = document.getElementById("course-modal");
const courseModalContainer = document.getElementById("course-modal-container");
const courseTable = document.getElementById("course-table");
const studentTable = document.getElementById("student-table");

let modalContent = ``;

const showCourseTable = () => {
    studentTable.style.display = "none";
    courseTable.style.display = "block";
};

const showStudentTable = () => {
    courseTable.style.display = "none";
    studentTable.style.display = "block";
};

const setCourseModalContentAsSave = () => {
    modalContent = `<form>
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
    courseModalContainer.innerHTML = modalContent;
    refreshFields();
};

const setCourseModalContentAsEdit = (courseIndex) => {
    modalContent = `<form>
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
    courseModalContainer.innerHTML = modalContent;
    refreshFields();
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
    tableBody.innerHTML = tableBodyContent;
};

const addCourse = () => {
    let courseData = {
        id: courseIdField.value,
        name: courseNameField.value,
        fee: courseFeeField.value,
        duration: courseDurationField.value,
    };
    courses.push(courseData);
    flushToFrontEnd();
    hideCourseModal();
};

const deleteCourse = (courseIndex) => {
    courses.splice(courseIndex, 1);
    console.log(courses);
    flushToFrontEnd();
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
    flushToFrontEnd();
    hideCourseModal();
}
