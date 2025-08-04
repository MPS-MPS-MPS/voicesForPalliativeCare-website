// header nav
class HeaderNavigation {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.navData = {
            logo: {
                src: '../assets/logos/voices_logo.jpg',
                alt: 'Voices for Palliative Care Logo',
            },
            menuItems: [
                {
                    text: 'Home',
                    href: '/',
                    isDropdown: false
                },
                {
                    text: 'About Us',
                    href: '#about',
                    isDropdown: true,
                    dropdownItems: [
                        { text: 'Who we are', href: '/who-we-are' },
                        { text: 'What we do', href: '/what-we-do' },
                        { text: 'Our impact', href: '/our-impact' }
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
                        { text: 'Consumer and community members', href: '/consumers' },
                        { text: 'Researcher, clinicians and policymakers', href: '/researchers' }
                    ]
                }
            ]
        };
    }

    // Get page 
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        return filename || 'index.html';
    }

    // Get the correct href 
    getNavigationHref(href) {
        if (this.currentPage === 'index.html' || this.currentPage === '') {
            return href;
        }
        
        if (href.startsWith('#')) {
            return `/${href}`;
        }
        
        return href;
    }

    // Create header el
    createHeader() {
        const header = document.createElement('header');
        header.className = 'header';
        
        const container = document.createElement('div');
        container.className = 'container';
        
        const headerContent = document.createElement('div');
        headerContent.className = 'header-content';
        
    
        const logoLeft = document.createElement('div');
        logoLeft.className = 'logo-left';
        
        const logoLink = document.createElement('a');
        logoLink.href = '/';
        logoLink.className = 'logo-link';
        
        const logo = document.createElement('img');
        logo.src = this.navData.logo.src;
        logo.alt = this.navData.logo.alt;
        logo.className = 'logo';
        
        logoLink.appendChild(logo);
        logoLeft.appendChild(logoLink);
      
        const nav = document.createElement('nav');
        nav.className = 'nav';
        
        const navList = document.createElement('ul');
        navList.className = 'nav-list';
     
        this.navData.menuItems.forEach(item => {
            const li = this.createMenuItem(item);
            navList.appendChild(li);
        });
        
        nav.appendChild(navList);
        
        const mobileToggle = this.createMobileToggle();
        
        headerContent.appendChild(logoLeft);
        headerContent.appendChild(nav);
        headerContent.appendChild(mobileToggle);
        
        container.appendChild(headerContent);
        header.appendChild(container);
        
        return header;
    }

    //  menu item
    createMenuItem(item) {
        const li = document.createElement('li');
        
        if (item.isDropdown) {
            li.className = 'nav-item dropdown';
            
            const link = document.createElement('a');
            link.href = '#';
            link.className = item.isSpecial ? 'nav-link get-involved' : 'nav-link';
            link.textContent = item.text;
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
            
            const arrow = document.createElement('span');
            arrow.className = 'dropdown-arrow';
            arrow.innerHTML = '&#9662;';
            
            link.appendChild(arrow);
            li.appendChild(link);
            
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

    createMobileToggle() {
        const toggle = document.createElement('div');
        toggle.className = 'mobile-menu-toggle';
        
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            toggle.appendChild(span);
        }
        
        toggle.addEventListener('click', () => {
            const nav = document.querySelector('.nav');
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        });
        
        return toggle;
    }

    init() {
        const body = document.body;
        const header = this.createHeader();
        
        body.insertBefore(header, body.firstChild);
        
        this.addSmoothScrolling();
    }

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

        const indexLinks = document.querySelectorAll('a[href^="index.html#"]');
        
        indexLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const href = link.getAttribute('href');
                const targetId = href.split('#')[1];
                
                window.location.href = href;
            });
        });
    }
}

// initialize header 
document.addEventListener('DOMContentLoaded', () => {
    const headerNav = new HeaderNavigation();
    headerNav.init();
}); 