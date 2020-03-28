// SIDEBAR
// Sidebar variables
const sidebar = document.querySelector('.sidebar');
const tribar = document.querySelector('.tribar');
const overlay = document.querySelector('.overlay');

// Sidebar on & off event Handlers
tribar.addEventListener('click', sidebarOn);
overlay.addEventListener('click', sidebarClose);


// Sidebar on & off functions
function sidebarOn() {
    sidebar.className = sidebar.className.replace('sidebar-off', 'sidebar-on')
    // Overlay style
    overlay.style.display = "block";
    setTimeout(()=> {
        overlay.style.opacity = "1";
    });
}

function sidebarClose() {
    sidebar.className = sidebar.className.replace('sidebar-on', 'sidebar-off');
    // overlay style
    overlay.style.opacity = "0";
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);
    
}