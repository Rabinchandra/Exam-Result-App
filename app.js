// SUBJECTS ON MODAL BOX
const subjNum = document.querySelector('.subj-num');
const okBtn = document.querySelector('.subj-num-ok');
// Container of subjects fields
const subjectsContainer = document.querySelector('.subjects-container');
// Alert box
const subjAlertSuc = document.querySelector('.subj-alert-success');
const subjAlertInv = document.querySelector('.subj-alert-invalid');

okBtn.addEventListener('click', addSubj);

// Adding subject fields depeding on the no. of subject nos.
function addSubj() {
    const alertBox = document.querySelector('.create-file-alert');
    subjectsContainer.innerHTML = '';
    if(subjNum.value >= 1) {
        // Adding subj fields
        for(let i = 0; i < subjNum.value; i++) {
            subjectsContainer.innerHTML += `
            <div class="form-group row subj-item">
                <label for="subject-name col-sm-2 col-form-label">Name: </label>
                <div class="col-sm-3">
                <input type="text" class="form-control subject-name" id="subject-name">
                </div>
                <label for="subject-name col-sm-2 col-form-label">FM: </label>
                <div class="col-sm-3">
                <input type="number" class="form-control full-mark" id="full-mark" min="1">
                </div>
                <label for="subject-name col-sm-2 col-form-label">PM: </label>
                <div class="col-sm-3">
                <input type="number" class="form-control pass-mark" id="pass-mark" min="1">
                </div>
            </div>
            `;
        }
        subjectsContainer.innerHTML += `
        <hr>
        <div class="form-group row lead" >
            <div class="col-sm-3 align-middle">
                <label for="file-name">File name: </label>
            </div>
            <div class="col-sm-8 align-middle">
            <input type="text" class="form-control file-name" id="file-name">
            </div>
        </div>
        `;
        console.log('valid');
    } else {
        alertBox.innerHTML = `
            <div class="alert alert-danger text-center">
                Invalid Input!
            </div>
        `;
        setTimeout(() => {
            alertBox.innerHTML = '';
        }, 2000);
    }
}

// Create file btn of modal box
const createFileBtn = document.querySelector('.createFileBtn');
// When a file is created, an object is created and an item 
// is appended to the UI list
createFileBtn.addEventListener('click', FILE.createFile);

// Delete file - deleting the object and item from the list
const delBtn = document.querySelector('.del-btn');
// When delete button is clicked, checkbox are displayed
// Again, when the del btn is clicked, it will delete all
// the checked check box i.e. for deleting a file, it needed to 
// click two times - one to display check box and other to delete
delBtn.addEventListener('click', FILE.deleteFile);

// Adding Student Dialog Box
// - Generating Mark Inputs, name of the student
// 
const addStudentBtn = document.querySelector('.add-student');
let addStudentContainer = document.querySelector('#addStudentModal .modal-body');

addStudentBtn.addEventListener('click', displayMarkInput);
addStudentBtn.addEventListener('click', validateMarkInput);

function displayMarkInput() {
    const subj = currentObj.subjects;
    // Input Name, roll and Section
    addStudentContainer.innerHTML = `
        <div class="add-student-modal-alert"></div>
        <div class="form-group">
            <label for="studentName">Student Name: </label>
            <input type="text" id="studentName" class="form-control">
            <label for="roll">Roll No: </label>
            <input type="number" id="roll" class="form-control">
            <label for="section">Section: </label>
            <input type="text" id="section" class="form-control">
        </div>
    `;
    // Input Marks of each subjects 
    for(let s of subj) {
        addStudentContainer.innerHTML += `
            <div class="form-group row mark-input">
                <label for="${s.subjName}" class="col-form-label col-sm-3">${s.subjName}:</label>
                <div class="col-sm-6">
                    <input type="Number" class="form-control" id="${s.subjName}" max="${s.fm}" title="FM: ${s.fm}" onkeyup="validateMarkInput(this)">
                </div>
            </div>
        `;
    }
}

function validateMarkInput(input) {
    let val = Number(input.value),
        max = Number(input.max);
    
    if(val > max) {
        let s = String(val).split('');
        s.pop();
        input.value = Number(s.join(''));
    }
}


// MODAL BOX ADD STUDENT BTN
const modalAddStudentBtn = document.querySelector('.modal-add-student-btn')

modalAddStudentBtn.addEventListener('click', addStudentObj);

function addStudentObj() {
    const alertBox = document.querySelector('.add-student-modal-alert');
    const markInputs = Array.from(addStudentContainer.querySelectorAll('.mark-input input'));
    // si = student identifier container - name, roll, section container
    const si = addStudentContainer.querySelector('.form-group');

    // Student Object
    const student = {};
    let totalMark = 0, totalFM = 0, status = 'Pass';
    
    // Appending Key and values to student Object
    // Key = SubjName & values = Mark i.e. Input Value
    // Note: Here order is important
    student.roll = si.querySelector('#roll').value;
    student.studentName = si.querySelector('#studentName').value;
    student.section = si.querySelector('#section').value;

    for(let i = 0; i < markInputs.length; i++) {
        // Input marks
        student[markInputs[i].id] = markInputs[i].value;
        totalMark += Number(markInputs[i].value);
        // Total FM - required for PC Calculation
        totalFM += Number(currentObj.subjects[i].fm);
        // Status
        if(Number(markInputs[i].value) < Number(currentObj.subjects[i].pm)) {
            status = 'Fail';
        }
    }

    student.total = totalMark;
    student.pc = ((totalMark*100)/totalFM).toFixed(2);
    student.status = status;
    // curFileObj = obj at index currentIndex of File list Array
    let curFileObj = FILE.getFileList()[currentIndex];
    // arr = file-list array
    let arr = FILE.getFileList();
    curFileObj.values.push(student);
    // replacing the obj at currentIndex with modfied studentObj
    arr[currentIndex] = curFileObj;
    // Saving to localStorage
    localStorage.setItem('fileList', JSON.stringify(arr));
    // Current Obj updated
    currentObj = curFileObj;

    // Display the updated student list to table
    displayStudents();

    // Alert
    alertBox.innerHTML = `
        <div class="alert alert-success text-center">
            Successfuly created the student!
        </div>
    `;
    setTimeout(() => {
        alertBox.innerHTML = '';
    }, 2000);
}

// Sort
// onclicking the notModal sort Btn
document.querySelector('.sort').addEventListener('click', function() {
    document.querySelector('#sortModal .modal-title').innerHTML = `Sort ${currentObj.name}`;
});

// onclicking the modal sort btn
document.querySelector('.modal-sort-btn').addEventListener('click', function() {
    const option = document.querySelector('#sort-select');
    const name = document.querySelector('.sorted-file-name');
    const alertBox = document.querySelector('.sort-alert')
    let sortedObj = Object.assign({}, currentObj);
    sortedObj.name = name.value;

    if(name.value != '') {
        if(option.value === 'roll') {
            sortedObj.values = currentObj.values.sort((a,b) => ~~a.roll - ~~b.roll);
        } else {
            sortedObj.values = currentObj.values.sort((a,b) => b.total - a.total);
        }
        // success alert
        alertBox.className += ' p-2 alert-success text-center mb-2';
        alertBox.innerHTML = 'Succesfully added sorted file!';
        setTimeout(() => {
            alertBox.className = 'sort-alert';
            alertBox.innerHTML = '';
        },2000);
        // GETTING FILE LIST AND PUSHING TO LOCALTSTORAGE
        let fileList = FILE.getFileList();
        fileList.push(sortedObj);
        localStorage.setItem('fileList', JSON.stringify(fileList));
        // Displaying the modified list to ul
        FILE.displayFileList();

    } else {
        // warning alert
        alertBox.className += ' p-2 alert-danger text-center mb-2';
        alertBox.innerHTML = 'Please fill up the file name!';
        setTimeout(() => {
            alertBox.className = 'sort-alert';
            alertBox.innerHTML = '';
        },2000);
    }
});

// Delete
const delStudentBtn = document.querySelector('.modal-delete-student-btn');

delStudentBtn.addEventListener('click', deleteStudent);

function deleteStudent() {
    // newObj is the object obtained after deleting student
    // data from the currentObj
    let delRoll = document.querySelector('#delete-roll');
    let delName = document.querySelector('#delete-name');
    let fileList = FILE.getFileList();
    let oldValLen = currentObj.values.length;
    let alertBox = document.querySelector('.alert-delete-student');
    // if one of the input or both the input is filled
    if(delRoll.value !== '' || delName.value !== '') {
        // When delRoll is filled only
        if(delRoll !== '' && delName === '') {
            currentObj.values = currentObj.values.filter(s => s.roll != delRoll.value);
        } 
        // When delName is filled only
        else if(delName !== '' && delRoll === '') {
            currentObj.values = currentObj.values.filter(s => {
                s.studentName.toLowerCase() != delName.value.toLowerCase();
            });
        }
        // When both are filled
        else {
            currentObj.values = currentObj.values.filter(s => {
                if((s.studentName.toLowerCase() !== delName.value.toLowerCase()) && (~~s.roll !== delRoll.value)) {
                    return true;
                } else {
                    return false;
                }
            });
        }
        // if Student not found
        if(oldValLen == currentObj.values.length) {
            alertBox.innerHTML = `
            <div class="alert alert-warning p-2 text-center">
                Student not found!!
            </div>
            `;
            setTimeout(() => {
                    alertBox.innerHTML = '';
            }, 2000);
        }
        else {
            // Replacing the former currentObj with newly modifed currentObj
            fileList[currentIndex] = currentObj;
            // Saving the modified File List to localStorage
            localStorage.setItem('fileList', JSON.stringify(fileList));
            displayStudents();
            alertBox.innerHTML = `
                <div class="alert alert-success p-2 text-center">
                    Successfully deleted!!
                </div>
            `;
            setTimeout(() => {
                alertBox.innerHTML = '';
            }, 2000);
        }
        } else {
        alertBox.innerHTML = `
            <div class="alert alert-danger p-2 text-center">
                Please filled up one of these form!!
            </div>
        `;
        setTimeout(() => {
                alertBox.innerHTML = '';
        }, 2000);
    }
}