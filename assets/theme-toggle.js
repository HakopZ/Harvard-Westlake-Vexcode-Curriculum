// Theme Toggle JavaScript
(function() {
  'use strict';

  // Theme configuration
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
  };

  const THEME_STORAGE_KEY = 'hw-vexcode-theme';
  const THEME_ATTRIBUTE = 'data-theme';

  // Get current theme from localStorage or system preference
  function getInitialTheme() {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && (stored === THEMES.LIGHT || stored === THEMES.DARK)) {
      return stored;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    
    return THEMES.LIGHT;
  }

  // Apply theme to document
  function applyTheme(theme) {
    const html = document.documentElement;
    html.setAttribute(THEME_ATTRIBUTE, theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    
    // Update theme toggle button
    updateThemeToggleButton(theme);
    
    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: theme } 
    }));
  }

  // Update theme toggle button appearance
  function updateThemeToggleButton(theme) {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    const icon = button.querySelector('.theme-icon');
    const text = button.querySelector('.theme-text');
    
    if (theme === THEMES.DARK) {
      icon.textContent = '☀️';
      text.textContent = 'Light';
    } else {
      icon.textContent = '🌙';
      text.textContent = 'Dark';
    }
  }

  // Toggle between themes
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute(THEME_ATTRIBUTE);
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    applyTheme(newTheme);
  }

  // Create theme toggle button
  function createThemeToggleButton() {
    const button = document.createElement('button');
    button.id = 'theme-toggle';
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Toggle dark mode');
    button.setAttribute('title', 'Toggle dark mode');
    
    // Get current theme to set correct initial button text
    const currentTheme = document.documentElement.getAttribute(THEME_ATTRIBUTE) || getInitialTheme();
    
    if (currentTheme === THEMES.DARK) {
      button.innerHTML = `
        <span class="theme-icon">☀️</span>
        <span class="theme-text">Light</span>
      `;
    } else {
      button.innerHTML = `
        <span class="theme-icon">🌙</span>
        <span class="theme-text">Dark</span>
      `;
    }
    
    button.addEventListener('click', toggleTheme);
    
    // Add to page
    document.body.appendChild(button);
  }

  // Listen for system theme changes
  function setupSystemThemeListener() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (!stored) {
          const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
          applyTheme(newTheme);
        }
      });
    }
  }

  // Initialize theme system
  function init() {
    // Apply initial theme
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    
    // Create toggle button
    createThemeToggleButton();
    
    // Setup system theme listener
    setupSystemThemeListener();
    
    // Add smooth transition class after initial load
    setTimeout(() => {
      document.documentElement.classList.add('theme-transition');
    }, 100);
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose theme functions globally for debugging
  window.ThemeToggle = {
    toggle: toggleTheme,
    setTheme: applyTheme,
    getCurrentTheme: () => document.documentElement.getAttribute(THEME_ATTRIBUTE)
  };

})();

// Example Answer Toggle Functionality
(function() {
  'use strict';

  function initExampleToggles() {
    // Find all example answer sections
    const exampleAnswers = document.querySelectorAll('.example-answer');
    
    exampleAnswers.forEach(example => {
      const toggle = example.querySelector('.example-toggle');
      const content = example.querySelector('.example-content');
      
      if (toggle && content) {
        toggle.addEventListener('click', () => {
          const isExpanded = toggle.classList.contains('expanded');
          
          if (isExpanded) {
            // Collapse
            toggle.classList.remove('expanded');
            content.classList.remove('expanded');
            toggle.setAttribute('aria-expanded', 'false');
          } else {
            // Expand
            toggle.classList.add('expanded');
            content.classList.add('expanded');
            toggle.setAttribute('aria-expanded', 'true');
          }
        });
        
        // Set initial state
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('tabindex', '0');
        
        // Add keyboard support
        toggle.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle.click();
          }
        });
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExampleToggles);
  } else {
    initExampleToggles();
  }

})();

// Sidebar Navigation Enhancement
(function() {
  'use strict';

  function initSidebarNavigation() {
    const sidebar = document.querySelector('.sidebar-nav');
    if (!sidebar) return;

    const links = sidebar.querySelectorAll('a[href^="#"]');
    if (links.length === 0) return;

    // Function to update active link
    function updateActiveLink() {
      const sections = [];
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      // Get all sections that have corresponding links
      links.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          sections.push({
            element: targetElement,
            link: link,
            top: targetElement.offsetTop,
            bottom: targetElement.offsetTop + targetElement.offsetHeight
          });
        }
      });

      // Sort sections by position
      sections.sort((a, b) => a.top - b.top);

      // Remove active class from all links
      links.forEach(link => link.classList.remove('active'));

      // Find the current section
      let activeSection = null;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].top) {
          activeSection = sections[i];
          break;
        }
      }

      // Add active class to current section's link
      if (activeSection) {
        activeSection.link.classList.add('active');
      }
    }

    // Smooth scrolling for sidebar links
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for header
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    // Update active link on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(updateActiveLink, 10);
    });

    // Initial update
    updateActiveLink();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebarNavigation);
  } else {
    initSidebarNavigation();
  }
})();