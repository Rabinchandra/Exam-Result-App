// Displaying the file list to UL when the page loads
document.addEventListener('DOMContentLoaded', addFileList);

function addFileList() {
    FILE.displayFileList();
}

// Loading files or displaying table to Table container
function displayTable(item) {
    const tableContainer = document.querySelector('.table-container');
    const ul = document.querySelector('.file-list-container');
    const li = Array.from(ul.querySelectorAll('li'));
    const index = li.indexOf(item);
    const obj = FILE.getFileList()[index];
    // global variable
    // Current obj = current file obj
    currentObj = obj;
    // current Index = current file obj index
    currentIndex = index;

    tableContainer.innerHTML = `
    <h3 class="text-center mb-3 mt-4">${obj.name}</h3>
    <table class="table table-striped table text-center mt-3">
        
    </table>
    `;

    const table = tableContainer.querySelector('table');
    // First row of the table
    let content = `
    <thead class="thead-dark">
        <tr>
        <th>Roll</th>
        <th>Name</th>
        <th>Sec</th>`;
    // Subject name pushing to first tr
    for(let subject of obj.subjects) {
        content += `
            <th class="sub-col">${subject.subjName}</th>
        `;
    }
    // Adding total, pc and status col
    content += `
        <th>Total</th>
        <th>PC</th>
        <th>Status</th>
        </tr></thead>
        <tbody></tbody>
    `;

    table.innerHTML += content;

    // Appending values to the table

    // Add student and sort bar display
    const fixedBar = document.querySelector('.fixed-bottom');
    fixedBar.className = fixedBar.className.replace('d-none', 'd-block');

    displayStudents();
}

function displayStudents() {
    let tbody = document.querySelector('.table tbody');
    // Clearing up the tbody content
    tbody.innerHTML = '';
    // Adding datas to the table
    currentObj.values.forEach(val => {
        let content = '<tr>';
        for(let i in val) {
            if(i == 'pc') {
                content += `<td>${val[i]}%</td>`;
            } else if("roll studentName section total status".indexOf(i) !== -1) {
                content += `<td>${val[i]}</td>`;
            } else {
                content += `<td class="sub-col">${val[i]}</td>`;
            }
        }
        content += '</tr>';
        tbody.innerHTML += content;
    });
}