const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];

function displayCourses(courseList) {
    const courseContainer = document.querySelector("#course-container");
    const creditTotal = document.querySelector("#credit-total");

    courseContainer.innerHTML = "";

    courseList.forEach((course) => {
        const courseElement = document.createElement("div");

        courseElement.classList.add("course");

        if (course.completed) {
            courseElement.classList.add("completed");
        }

        const courseCode = document.createElement("span");
        courseCode.classList.add("course-code");
        courseCode.textContent = `${course.subject} ${course.number}`;

        const courseTitle = document.createElement("span");
        courseTitle.classList.add("course-title");
        courseTitle.textContent = course.title;

        const courseStatus = document.createElement("span");
        courseStatus.classList.add("course-status");
        courseStatus.textContent = course.completed
            ? "Completed"
            : "In Progress";

        courseElement.appendChild(courseCode);
        courseElement.appendChild(courseTitle);
        courseElement.appendChild(courseStatus);

        courseContainer.appendChild(courseElement);
    });

    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotal.textContent = totalCredits;
}

function filterCourses(subject) {
    const buttons = document.querySelectorAll(".course-filters button");

    buttons.forEach((button) => {
        button.classList.remove("active");
    });

    if (subject === "ALL") {
        displayCourses(courses);
        document.querySelector("#all-courses").classList.add("active");
    } else {
        const filteredCourses = courses.filter(
            (course) => course.subject === subject
        );

        displayCourses(filteredCourses);

        document
            .querySelector(`#${subject.toLowerCase()}-courses`)
            .classList.add("active");
    }
}

document.querySelector("#all-courses").addEventListener("click", () => {
    filterCourses("ALL");
});

document.querySelector("#cse-courses").addEventListener("click", () => {
    filterCourses("CSE");
});

document.querySelector("#wdd-courses").addEventListener("click", () => {
    filterCourses("WDD");
});

displayCourses(courses);

document.querySelector("#all-courses").classList.add("active");