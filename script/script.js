let courses = [];
const courseIdField = document.getElementById("course-id");
const courseNameField = document.getElementById("course-name");
const courseFeeField = document.getElementById("course-fee");
const courseDurationField = document.getElementById("course-duration");

const tableBody = document.getElementById("table-body");
const courseModal = document.getElementById("course-modal");

const showCourseModal = () => {
    courseModal.style.display = "none";
    courseModal.style.display = "block";
};

const hideCourseModal = () => {
    courseModal.style.display = "block";
    courseModal.style.display = "none";
}

const flushToFrontEnd = () => {
    const tableBodyContent = "";
    courses.map((course, i) => {
        const actionContent = ``;
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
};

const deleteCourse = (courseIndex) => {
    courses = courses.splice(courseIndex, 1);
    flushToFrontEnd();
};

const editCourse = (courseIndex) => {
    courseIdField.value = courses[courseIndex].id;
    courseNameField.value = courses[courseIndex].name;
    courseFeeField.value = courses[courseIndex].fee;
    courseDurationField.value = courses[courseIndex].duration;
    showCourseModal();
};