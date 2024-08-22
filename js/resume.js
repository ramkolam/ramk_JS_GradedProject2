let resumes = []
let currentIndex = 0;

function logout() {
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
}

window.onpopstate = function (event) {
    history.go(1);
};

window.onload = function (e) {
    sessionStorage.setItem('loggedIn', 'true');
    resumes = [...data.resume]
    document.getElementById('resume-error').classList.add('hideResumeError');
    displayResume();
}

function createUList(items) {

    var listView = document.createElement('ul');

    for (var i = 0; i < items.length; i++) {
        var listViewItem = document.createElement('li');
        listViewItem.appendChild(document.createTextNode(items[i]));
        listView.appendChild(listViewItem);
    }

    return listView;
}

function displayResume() {

    const resume = resumes[currentIndex];

    document.getElementById('applicant-name').textContent = resume.basics.name;
    document.getElementById('applied-for').textContent = `Applied For: ${resume.basics.AppliedFor}`;

    document.getElementById('phone').textContent = resume.basics.phone;
    document.getElementById('email').textContent = resume.basics.email;

    document.getElementById('linkedin-url').textContent = resume.basics.profiles.network;
    document.getElementById('linkedin-url').href = resume.basics.profiles.url;

    document.getElementById('technicalSkills').textContent = "";
    document.getElementById('technicalSkills').appendChild(createUList(resume.skills.keywords));
    document.getElementById('hobbies').textContent = "";
    document.getElementById('hobbies').appendChild(createUList(resume.interests.hobbies));

    document.getElementById('work-company-name').innerHTML = `<b>Company Name:</b> ${resume.work["Company Name"]}`;
    document.getElementById('work-company-position').innerHTML = `<b>Position:</b> ${resume.work.Position}`;
    document.getElementById('work-company-start').innerHTML = `<b>Start Date:</b> ${resume.work["Start Date"]}`;
    document.getElementById('work-company-end').innerHTML = `<b>End Date:</b> ${resume.work["End Date"]}`;
    document.getElementById('work-company-summary').innerHTML = `<b>Summary:</b> ${resume.work.Summary}`;


    document.getElementById('projects').innerHTML = `<b>${resume.projects.name} :</b> ${resume.projects.description}`;

    //add education details
    var educationDetails = document.createElement('ul');
    var ug = document.createElement('li');
    ug.innerHTML = `<b>UG:</b> ${resume.education.UG.institute}, ${resume.education.UG.course}, ${resume.education.UG["Start Date"]}, ${resume.education.UG["End Date"]}, ${resume.education.UG.cgpa}`;
    var pu = document.createElement('li');
    pu.innerHTML = `<b>PU:</b> ${resume.education["Senior Secondary"].institute}, ${resume.education["Senior Secondary"].cgpa}`;
    var highSchool = document.createElement('li');
    highSchool.innerHTML = `<b>High School:</b> ${resume.education["High School"].institute}, ${resume.education["High School"].cgpa}`;
    educationDetails.appendChild(ug);
    educationDetails.appendChild(pu);
    educationDetails.appendChild(highSchool);
    document.getElementById('education').textContent = "";
    document.getElementById('education').appendChild(educationDetails);


    //add internship details
    var internshipDetails = document.createElement('ul');
    var internshipCompanyName = document.createElement('li');
    var internshipCompanyPosition = document.createElement('li');
    var internshipCompanyStart = document.createElement('li');
    var internshipCompanyEnd = document.createElement('li');
    var internshipCompanySummary = document.createElement('li');

    internshipCompanyName.innerHTML = `<b>Company Name:</b> ${resume.Internship["Company Name"]}`;
    internshipCompanyPosition.innerHTML = `<b>Position:</b> ${resume.Internship.Position}`;
    internshipCompanyStart.innerHTML = `<b>Start Date:</b> ${resume.Internship["Start Date"]}`;
    internshipCompanyEnd.innerHTML = `<b>End Date:</b> ${resume.Internship["End Date"]}`;
    internshipCompanySummary.innerHTML = `<b>Summary:</b> ${resume.Internship.Summary}`;


    internshipDetails.appendChild(internshipCompanyName);
    internshipDetails.appendChild(internshipCompanyPosition);
    internshipDetails.appendChild(internshipCompanyStart);
    internshipDetails.appendChild(internshipCompanyEnd);
    internshipDetails.appendChild(internshipCompanySummary);

    document.getElementById('internship').textContent = "";
    document.getElementById('internship').appendChild(internshipDetails);



    document.getElementById('achievements').textContent = "";
    document.getElementById('achievements').appendChild(createUList(resume.achievements.Summary));

}

function showNext() {

    if (currentIndex < resumes.length - 1) {
        currentIndex++;
        displayResume();
    }
}

function showPrevious() {
    if (currentIndex > 0) {
        currentIndex--;
        displayResume();
    }
}

document.getElementById('job-filter').addEventListener('keyup', function () {
    var searchValue = this.value.toLowerCase();
    const filteredResumes = data.resume.filter(r => r.work.Position.toLowerCase().includes(searchValue));

    if (filteredResumes.length === 0) {
        document.getElementById('resume-error').className = "";
        document.getElementById('resume-error').classList.add('showResumeError');
        document.getElementById('resume-error-msg').innerText = "No resumes found for this job title.";
        document.getElementById('resume-content').style.display = "none";

    } else {
        document.getElementById('resume-content').style.display = "";
        document.getElementById('resume-error').className = "";
        document.getElementById('resume-error').classList.add('hideResumeError');
        document.getElementById('resume-error-msg').innerText = "";

        resumes = filteredResumes;
        currentIndex = 0;
        displayResume();
    }
});