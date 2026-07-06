const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 3, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 3, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 3, completed: false }
];

function displayCourses(filterType) {
    const container = document.getElementById('course-list');
    container.innerHTML = ''; 

    const filteredCourses = courses.filter(course => {
        if (filterType === 'All') return true;
        return course.subject === filterType;
    });

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
        
        // Dynamic JavaScript injection handling checkmarks prevents standard CSS parsing exceptions
        card.innerHTML = `${course.completed ? '&#10003; ' : ''}${course.subject} ${course.number}`;
        
        container.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((accumulator, currentCourse) => {
        return accumulator + currentCourse.credits;
    }, 0);

    document.getElementById('credit-count').textContent = totalCredits;
}

document.getElementById('btn-all').addEventListener('click', (e) => {
    toggleActiveButtonState(e.target);
    displayCourses('All');
});

document.getElementById('btn-cse').addEventListener('click', (e) => {
    toggleActiveButtonState(e.target);
    displayCourses('CSE');
});

document.getElementById('btn-wdd').addEventListener('click', (e) => {
    toggleActiveButtonState(e.target);
    displayCourses('WDD');
});

function toggleActiveButtonState(targetBtn) {
    document.querySelectorAll('.filter-buttons button').forEach(btn => btn.classList.remove('active'));
    targetBtn.classList.add('active');
}

displayCourses('All');