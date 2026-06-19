/* ==========================================================================
   India Clinic OS GTM & Packaging Strategy Dashboard - Application Scripts
   Controls navigation, presentation mode, campaign filtering, and matrices
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. Navigation & Page Management
    // ---------------------------------------------------------
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.dashboard-page');
    let currentPageIndex = 0;
    const pageIds = Array.from(pages).map(p => p.id);

    function showPage(pageId) {
        // Hide all pages, remove active classes
        pages.forEach(page => page.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));

        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Set active nav button
        const targetNav = document.querySelector(`.nav-item[data-page="${pageId}"]`);
        if (targetNav) {
            targetNav.classList.add('active');
        }

        // Update index tracking
        currentPageIndex = pageIds.indexOf(pageId);
        updateSlideControls();

        // Scroll to top of dashboard content area
        document.querySelector('.main-content').scrollTop = 0;
    }

    // Nav click handlers
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // ---------------------------------------------------------
    // 2. Presentation (Slide Show) Mode
    // ---------------------------------------------------------
    const togglePresentationBtn = document.getElementById('toggle-presentation');
    const presentationControls = document.querySelector('.presentation-controls');
    const prevSlideBtn = document.getElementById('prev-slide');
    const nextSlideBtn = document.getElementById('next-slide');
    const slideIndicator = document.querySelector('.slide-indicator');

    function togglePresentationMode() {
        document.body.classList.toggle('presentation-mode');
        const isPresMode = document.body.classList.contains('presentation-mode');
        
        // Show/hide slide transition buttons
        presentationControls.style.display = isPresMode ? 'flex' : 'none';
        
        // Update presentation button label
        const btnText = togglePresentationBtn.querySelector('span');
        btnText.textContent = isPresMode ? 'Exit Presenter' : 'Presenter Mode';

        // Trigger resize event to re-align layouts if needed
        window.dispatchEvent(new Event('resize'));
    }

    function updateSlideControls() {
        slideIndicator.textContent = `${currentPageIndex + 1} / ${pages.length}`;
    }

    function nextSlide() {
        if (currentPageIndex < pages.length - 1) {
            showPage(pageIds[currentPageIndex + 1]);
        }
    }

    function prevSlide() {
        if (currentPageIndex > 0) {
            showPage(pageIds[currentPageIndex - 1]);
        }
    }

    togglePresentationBtn.addEventListener('click', togglePresentationMode);
    nextSlideBtn.addEventListener('click', nextSlide);
    prevSlideBtn.addEventListener('click', prevSlide);

    // Keyboard controls for slides
    document.addEventListener('keydown', (e) => {
        if (document.body.classList.contains('presentation-mode')) {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'Escape') {
                togglePresentationMode();
            }
        }
    });

    // ---------------------------------------------------------
    // 3. Campaign Card Filtering (Page 3)
    // ---------------------------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const campaignCards = document.querySelectorAll('.campaign-card');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active status
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            campaignCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    // Trigger tiny delay for animation feel
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(4px)';
                    // Hide after animation finishes
                    card.style.display = 'none';
                }
            });
        });
    });

    // ---------------------------------------------------------
    // 4. Matrix Row Highlight Interactions (Page 2)
    // ---------------------------------------------------------
    const progRows = document.querySelectorAll('.prog-row');
    progRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.borderLeft = '3px solid var(--accent-indigo)';
        });
        row.addEventListener('mouseleave', () => {
            row.style.borderLeft = 'none';
        });
    });
});
