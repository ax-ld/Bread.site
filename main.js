// List of available text files (simulate this manually or with an external build step)
const availablePages = [
    'home',
    'dogmas',
    'saints',
    'holy-days'
];

// Function to create navigation links dynamically
function generateNavigation() {
    const navLinks = document.getElementById('nav-links');
    
    availablePages.forEach(page => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = 'javascript:void(0);';
        a.textContent = formatTitle(page);
        a.onclick = () => loadPage(page);
        
        li.appendChild(a);
        navLinks.appendChild(li);
    });
}

// Function to load the content dynamically
function loadPage(page) {
    fetch(`text/${page}.txt`)
        .then(response => response.text())
        .then(data => {
            // Get the page title based on the filename
            const title = formatTitle(page);

            // Set the title in the page dynamically
            document.title = `${title} - Church of Bread`;
            const pageContent = document.getElementById("page-content");

            // Insert the content into the page
            pageContent.innerHTML = `<h2>${title}</h2><p>${data}</p>`;
        })
        .catch(error => {
            console.error('Error loading page:', error);
            document.getElementById("page-content").innerHTML = `<h2>Error loading page</h2><p>Sorry, something went wrong. Please try again later.</p>`;
        });
}

// Function to format the title based on the filename (page)
function formatTitle(page) {
    // Convert the page name to a human-readable title
    return page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' ');
}

// Load a default page when the site first loads
window.onload = function() {
    generateNavigation();  // Generate navigation links dynamically
    loadPage('home');      // Load default page (home)
}