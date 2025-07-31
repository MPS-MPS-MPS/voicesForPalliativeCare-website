// Header Navigation Component
class HeaderNavigation {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.navData = {
            logo: {
                src: '../assets/logos/Voices_logo.jpg',
                alt: 'Voices for Palliative Care Logo',
            },
            menuItems: [
                {
                    text: 'Home',
                    href: 'index.html',
                    isDropdown: false
                },
                {
                    text: 'About Us',
                    href: '#about',
                    isDropdown: true,
                    dropdownItems: [
                        { text: 'Who we are', href: 'meet-the-team.html' },
                        { text: 'What we do', href: 'who-we-are.html' },
                        { text: 'Our impact', href: 'our-goals.html' }
                    ]
                },
                {
                    text: 'Media',
                    href: '#media',
                    isDropdown: false
                },
                {
                    text: 'Events',
                    href: '#events',
                    isDropdown: false
                },
              
                {
                    text: 'Contact',
                    href: '#contact',
                    isDropdown: false
                },
                {
                    text: 'Get Involved',
                    href: '#collaborate',
                    isDropdown: true,
                    isSpecial: true,
                    dropdownItems: [
                        { text: 'Consumer and community members', href: 'member.html' },
                        { text: 'Researcher, clinicians and policymakers', href: 'engage.html' }
                    ]
                }
            ]
        };
    }

    // Get current page name
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        return filename || 'index.html';
    }

    // Get the correct href for navigation items
    getNavigationHref(href) {
        // If we're on the index page, use the href as is
        if (this.currentPage === 'index.html' || this.currentPage === '') {
            return href;
        }
        
        // If it's an anchor link (starts with #), redirect to index.html with the anchor
        if (href.startsWith('#')) {
            return `index.html${href}`;
        }
        
        // For other pages, use the href as is
        return href;
    }

    // Create header element
    createHeader() {
        const header = document.createElement('header');
        header.className = 'header';
        
        const container = document.createElement('div');
        container.className = 'container';
        
        const headerContent = document.createElement('div');
        headerContent.className = 'header-content';
        
        // Add logo
        const logoLeft = document.createElement('div');
        logoLeft.className = 'logo-left';
        
        const logoLink = document.createElement('a');
        logoLink.href = 'index.html';
        logoLink.className = 'logo-link';
        
        const logo = document.createElement('img');
        logo.src = this.navData.logo.src;
        logo.alt = this.navData.logo.alt;
        logo.className = 'logo';
        
        logoLink.appendChild(logo);
        logoLeft.appendChild(logoLink);
        
        // Add navigation
        const nav = document.createElement('nav');
        nav.className = 'nav';
        
        const navList = document.createElement('ul');
        navList.className = 'nav-list';
        
        // Create menu items
        this.navData.menuItems.forEach(item => {
            const li = this.createMenuItem(item);
            navList.appendChild(li);
        });
        
        nav.appendChild(navList);
        
        // Add mobile menu toggle
        const mobileToggle = this.createMobileToggle();
        
        // Assemble header
        headerContent.appendChild(logoLeft);
        headerContent.appendChild(nav);
        headerContent.appendChild(mobileToggle);
        
        container.appendChild(headerContent);
        header.appendChild(container);
        
        return header;
    }

    // Create individual menu item
    createMenuItem(item) {
        const li = document.createElement('li');
        
        if (item.isDropdown) {
            li.className = 'nav-item dropdown';
            
            const link = document.createElement('a');
            link.href = '#';
            link.className = item.isSpecial ? 'nav-link get-involved' : 'nav-link';
            link.textContent = item.text;
            
            // Prevent navigation for dropdown parent links
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
            
            const arrow = document.createElement('span');
            arrow.className = 'dropdown-arrow';
            arrow.innerHTML = '&#9662;';
            
            link.appendChild(arrow);
            li.appendChild(link);
            
            // Create dropdown menu
            const dropdownMenu = document.createElement('ul');
            dropdownMenu.className = 'dropdown-menu';
            
            item.dropdownItems.forEach(dropdownItem => {
                const dropdownLi = document.createElement('li');
                const dropdownLink = document.createElement('a');
                dropdownLink.href = this.getNavigationHref(dropdownItem.href);
                dropdownLink.className = 'dropdown-link';
                dropdownLink.textContent = dropdownItem.text;
                dropdownLi.appendChild(dropdownLink);
                dropdownMenu.appendChild(dropdownLi);
            });
            
            li.appendChild(dropdownMenu);
        } else {
            const link = document.createElement('a');
            link.href = this.getNavigationHref(item.href);
            link.className = 'nav-link';
            link.textContent = item.text;
            li.appendChild(link);
        }
        
        return li;
    }

    // Create mobile menu toggle
    createMobileToggle() {
        const toggle = document.createElement('div');
        toggle.className = 'mobile-menu-toggle';
        
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            toggle.appendChild(span);
        }
        
        // Add mobile menu functionality
        toggle.addEventListener('click', () => {
            const nav = document.querySelector('.nav');
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        });
        
        return toggle;
    }

    // Initialize header
    init() {
        const body = document.body;
        const header = this.createHeader();
        
        // Insert header at the beginning of body
        body.insertBefore(header, body.firstChild);
        
        // Add smooth scrolling for anchor links
        this.addSmoothScrolling();
    }

    // Add smooth scrolling functionality
    addSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Handle links that redirect to index.html with anchors
        const indexLinks = document.querySelectorAll('a[href^="index.html#"]');
        
        indexLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const href = link.getAttribute('href');
                const targetId = href.split('#')[1];
                
                // Navigate to index.html
                window.location.href = href;
            });
        });
    }
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const headerNav = new HeaderNavigation();
    headerNav.init();
}); 