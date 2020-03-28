class FILE {
    static createFile() {
        const alertBox = document.querySelector('.create-file-alert');
        const name = document.querySelector('.file-name').value;
        const subjNum = document.querySelector('.subj-num').value;
        // SubjectItems = each subjectItem in the subjectContainer
        const subjectItems = Array.from(document.querySelectorAll('.subj-item'));
        let file = {name: name, subjects: [], values: []};
        
        subjectItems.forEach(subjectItem => {
            // input = details of each subject
            const input = subjectItem.querySelectorAll('input');
            const [subjName, fm, pm] = [input[0].value, input[1].value, input[2].value];
            // Appending each subjectItem to subjects (array) of file object as an object
            file.subjects.push({subjName: subjName, fm: fm, pm: pm});
        });

        // Pushing to localStorage
        const fileList = FILE.getFileList();
        fileList.push(file);
        localStorage.setItem('fileList', JSON.stringify(fileList));

        // pushing ul - file name list container
        FILE.displayFileList();
        // Alert box
        alertBox.innerHTML = `
            <div class="alert alert-success text-center">
                Successfully created a new file!
            </div>
        `;
        setTimeout(() => {
            alertBox.innerHTML = '';
        }, 2000);
    }

    static getFileList() {
        let fileList = JSON.parse(localStorage.getItem('fileList'));
        // If no fileList is found
        if(fileList == null) {
            fileList = [];
        }
        return fileList;
    }

    // display inside ul element of navbar 
    static displayFileList() {
        const ul = document.querySelector('.file-list-container');
        ul.innerHTML = '';
        const fileList = FILE.getFileList();
        for(let i = 0; i < fileList.length; i++) {
            ul.innerHTML += `
                <li onclick="displayTable(this)">
                    <input type="checkbox" class="checkbox d-none" >
                    ${fileList[i].name}
                </li>
            `;
        }
    }

    static deleteFile() {
        const ul = document.querySelector('.file-list-container');
        const li = Array.from(ul.querySelectorAll('li'));
        // confirmOn makes sure that a delete confirm alert is displayed if any check box is checked
        let confirmOn = true;

        for(let item of li) {
            const checkBox = item.querySelector('.checkbox');
            // if display none, then display inline
            if(checkBox.classList.contains('d-none')) {
                checkBox.className = checkBox.className.replace('d-none', 'd-inline');
            } else {
                checkBox.className = checkBox.className.replace('d-inline', 'd-none');
                // Removing from UI if checked
                if(checkBox.checked) {
                    if(confirmOn) {
                        if(!confirm('Are you sure want to delete?')) {
                            return false;
                        };
                        confirmOn = false;
                    }
                    let fileList = FILE.getFileList();
                    ul.removeChild(item);
                    // Removing from localStorage
                    fileList.splice(li.indexOf(item), 1);
                    localStorage.setItem('fileList', JSON.stringify(fileList));
                }
            }
                
        }
    }
}
