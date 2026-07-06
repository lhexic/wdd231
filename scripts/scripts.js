// 6. Complete Data Array of Required Web & Computer Programming Course Objects
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
    container.innerHTML = ''; // Fast reset element loop mapping target tree DOM interface references

    // 9. Filter out matches conditionally matching user input data
    const filteredCourses = courses.filter(course => {
        if (filterType === 'All') return true;
        return course.subject === filterType;
    });

    // 8 & 10. Generate elements markup on demand targeting context blocks loop elements layout
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        
        // Dynamic assignment selectors setup tracking loops configurations
        card.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
        
        // Prepend checkmark visually if item tracking is marked true matching wireframe interface logic loop
        card.innerHTML = `${course.completed ? '&#10003; ' : ''}${course.subject} ${course.number}`;
        
        container.appendChild(card);
    });

    // 11. Array Reduce computation functionality module logic component structure mapping execution pipeline
    const totalCredits = filteredCourses.reduce((accumulator, currentCourse) => {
        return accumulator + currentCourse.credits;
    }, 0);

    // Dynamic inner data print out updating context
    document.getElementById('credit-count').textContent = totalCredits;
}

// Click event routing setup tracking definitions interface nodes
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

// Boot/Initialize sequence on script call loop execution engine pipeline tracking interface setups
displayCourses('All');