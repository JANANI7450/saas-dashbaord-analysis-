/* ==========================================================================
   India Clinic OS Strategy Dashboard - Application Scripts
   Controls navigation, presentation mode, calculators, and interactive charts
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
    // 3. Dynamic Funnel & Penetration Calculator (Page 6)
    // ---------------------------------------------------------
    const funnelBaseInput = document.getElementById('funnel-base');
    const funnelStages = document.querySelectorAll('.funnel-stage');
    const funnelPcts = document.querySelectorAll('.gap-pct');
    const funnelConvPctLabel = document.getElementById('funnel-conv-pct');

    // Penetration table DOM
    const pCust1 = document.getElementById('p-cust-1');
    const pCust2 = document.getElementById('p-cust-2');
    const pCust3 = document.getElementById('p-cust-3');
    const pRev1 = document.getElementById('p-rev-1');
    const pRev2 = document.getElementById('p-rev-2');
    const pRev3 = document.getElementById('p-rev-3');

    // Milestone progress DOM
    const msVal1 = document.getElementById('ms-val-1');
    const msVal2 = document.getElementById('ms-val-2');
    const msVal3 = document.getElementById('ms-val-3');
    const msFill1 = document.getElementById('ms-fill-1');
    const msFill2 = document.getElementById('ms-fill-2');
    const msFill3 = document.getElementById('ms-fill-3');

    // Format Currency Helper
    function formatIndianCurrency(value) {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(2)} Crore`;
        } else if (value >= 100000) {
            return `₹${(value / 100000).toFixed(2)} Lakhs`;
        }
        return `₹${value.toLocaleString('en-IN')}`;
    }

    function calculateFunnel() {
        const baseTAM = parseInt(funnelBaseInput.value) || 1200000;
        
        // Hard-coded conversion rates (McKinsey funnel standards)
        const tamToSamRate = 0.25; // 25% reachable
        const samToLeadsRate = 0.10; // 10% interested
        const leadsToDemosRate = 0.10; // 10% demos
        const demosToCustomersRate = 0.10; // 10% paying

        // Calculate stage values
        const samVal = Math.round(baseTAM * tamToSamRate);
        const leadsVal = Math.round(samVal * samToLeadsRate);
        const demosVal = Math.round(leadsVal * leadsToDemosRate);
        const customersVal = Math.round(demosVal * demosToCustomersRate);

        // Update Funnel graphic text
        document.querySelector('.stage-1 .funnel-bar-text').textContent = baseTAM.toLocaleString('en-IN');
        document.querySelector('.stage-2 .funnel-bar-text').textContent = samVal.toLocaleString('en-IN');
        document.querySelector('.stage-3 .funnel-bar-text').textContent = leadsVal.toLocaleString('en-IN');
        document.querySelector('.stage-4 .funnel-bar-text').textContent = demosVal.toLocaleString('en-IN');
        document.querySelector('.stage-5 .funnel-bar-text').textContent = customersVal.toLocaleString('en-IN');

        // Update Overall conversion
        const overallConv = ((customersVal / baseTAM) * 100).toFixed(3);
        funnelConvPctLabel.textContent = `${overallConv}%`;

        // Update Penetration Scenarios based on new SAM (300K default)
        const growSKU = 24999;
        
        const cust01 = Math.round(samVal * 0.001);
        const cust05 = Math.round(samVal * 0.005);
        const cust10 = Math.round(samVal * 0.010);

        pCust1.textContent = cust01.toLocaleString('en-IN');
        pCust2.textContent = cust05.toLocaleString('en-IN');
        pCust3.textContent = cust10.toLocaleString('en-IN');

        pRev1.textContent = formatIndianCurrency(cust01 * growSKU);
        pRev2.textContent = formatIndianCurrency(cust05 * growSKU);
        pRev3.textContent = formatIndianCurrency(cust10 * growSKU);

        // Update path to scale milestones progress based on active SOM customers (paying customers)
        // Milestones Targets: 40, 400, 4000
        const progress1 = Math.min(100, (customersVal / 40) * 100);
        const progress2 = Math.min(100, (customersVal / 400) * 100);
        const progress3 = Math.min(100, (customersVal / 4000) * 100);

        msVal1.textContent = `${customersVal} / 40 Clinics`;
        msVal2.textContent = `${customersVal} / 400 Clinics`;
        msVal3.textContent = `${customersVal} / 4,000 Clinics`;

        msFill1.style.width = `${progress1}%`;
        msFill2.style.width = `${progress2}%`;
        msFill3.style.width = `${progress3}%`;
    }

    funnelBaseInput.addEventListener('input', calculateFunnel);
    calculateFunnel(); // Run initial calc

    // ---------------------------------------------------------
    // 4. LTV Scenario Selector & Waterfall (Page 7)
    // ---------------------------------------------------------
    const scenarioButtons = document.querySelectorAll('.btn-toggle');
    const ltvSub = document.getElementById('ltv-sub');
    const ltvAttach = document.getElementById('ltv-attach');
    const ltvTotal = document.getElementById('ltv-total');

    // Waterfall bar elements
    const wfBase = document.getElementById('wf-base');
    const wfAmc = document.getElementById('wf-amc');
    const wfWhatsapp = document.getElementById('wf-whatsapp');
    const wfWeb = document.getElementById('wf-web');
    const wfMarketing = document.getElementById('wf-marketing');
    const wfAi = document.getElementById('wf-ai');
    const wfTotal = document.getElementById('wf-total');

    // LTV Scenarios Data Configuration
    // Total scale height mapped to ₹150,000 (100% height)
    const ltvData = {
        conservative: {
            sub: '₹25,000',
            attach: '20%',
            total: '₹40,000',
            bars: {
                base: { val: '₹25K', pct: 16.6, bOffset: 0 },
                amc: { val: '+₹5K', pct: 3.3, bOffset: 16.6 },
                whatsapp: { val: '+₹10K', pct: 6.6, bOffset: 20 },
                web: { val: '₹0', pct: 0, bOffset: 26.6 },
                marketing: { val: '₹0', pct: 0, bOffset: 26.6 },
                ai: { val: '₹0', pct: 0, bOffset: 26.6 },
                total: { val: '₹40K', pct: 26.6, bOffset: 0 }
            }
        },
        realistic: {
            sub: '₹25,000',
            attach: '55%',
            total: '₹80,000',
            bars: {
                base: { val: '₹25K', pct: 16.6, bOffset: 0 },
                amc: { val: '+₹5K', pct: 3.3, bOffset: 16.6 },
                whatsapp: { val: '+₹10K', pct: 6.6, bOffset: 20 },
                web: { val: '+₹10K', pct: 6.6, bOffset: 26.6 },
                marketing: { val: '+₹20K', pct: 13.3, bOffset: 33.3 },
                ai: { val: '+₹10K', pct: 6.6, bOffset: 46.6 },
                total: { val: '₹80K', pct: 53.3, bOffset: 0 }
            }
        },
        aggressive: {
            sub: '₹25,000',
            attach: '90%',
            total: '₹150,000+',
            bars: {
                base: { val: '₹25K', pct: 16.6, bOffset: 0 },
                amc: { val: '+₹5K', pct: 3.3, bOffset: 16.6 },
                whatsapp: { val: '+₹10K', pct: 6.6, bOffset: 20 },
                web: { val: '+₹20K', pct: 13.3, bOffset: 26.6 },
                marketing: { val: '+₹40K', pct: 26.6, bOffset: 40 },
                ai: { val: '+₹50K', pct: 33.3, bOffset: 66.6 },
                total: { val: '₹150K', pct: 100, bOffset: 0 }
            }
        }
    };

    function updateLtvWaterfall(scenarioKey) {
        const data = ltvData[scenarioKey];
        if (!data) return;

        // Update text indicators
        ltvSub.textContent = data.sub;
        ltvAttach.textContent = data.attach;
        ltvTotal.textContent = data.total;

        // Function to update single bar details
        function updateBar(barElement, barData) {
            const fill = barElement.querySelector('.wf-bar-fill');
            const valLabel = barElement.querySelector('.wf-val-lbl');

            // Apply transition heights
            fill.style.height = `${barData.pct}%`;
            if (barData.bOffset !== undefined) {
                fill.style.bottom = `${barData.bOffset}%`;
            }
            
            // Set value text
            valLabel.textContent = barData.val;

            // Hide element if 0 height to avoid visual artifacts
            if (barData.pct === 0) {
                barElement.style.opacity = '0';
                barElement.style.pointerEvents = 'none';
            } else {
                barElement.style.opacity = '1';
                barElement.style.pointerEvents = 'all';
            }
        }

        updateBar(wfBase, data.bars.base);
        updateBar(wfAmc, data.bars.amc);
        updateBar(wfWhatsapp, data.bars.whatsapp);
        updateBar(wfWeb, data.bars.web);
        updateBar(wfMarketing, data.bars.marketing);
        updateBar(wfAi, data.bars.ai);
        updateBar(wfTotal, data.bars.total);
    }

    scenarioButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active states
            scenarioButtons.forEach(b => b.classList.remove('active'));
            // Set current active
            btn.classList.add('active');

            const scenario = btn.getAttribute('data-scenario');
            updateLtvWaterfall(scenario);
        });
    });

    // Run initial waterfall rendering
    updateLtvWaterfall('realistic');

    // ---------------------------------------------------------
    // 5. Whitespace Opportunity Detail Modal / Box (Page 4)
    // ---------------------------------------------------------
    const oppCards = document.querySelectorAll('.opportunity-card');

    oppCards.forEach(card => {
        card.addEventListener('click', () => {
            // Check if there is already an active detail panel
            let activeDetail = card.querySelector('.opp-detail-panel');
            if (activeDetail) {
                activeDetail.remove();
                return;
            }

            // Remove any other expanded details
            document.querySelectorAll('.opp-detail-panel').forEach(el => el.remove());

            // Details context map
            const detailsMap = {
                reception: 'Triggers instantaneous automated intake sheets when patients message, reducing front desk call inquiries by 60% and enabling bookings outside of shift timings.',
                followup: 'Leverages doctor prescription data to calculate chronic return dates, pushing follow-up prompts automatically and maintaining clinic occupancy levels.',
                prescription: 'Built-in clinical dictionary that transcribes medical voice dictations to a standard, structured Rx layout, printing instructions in seconds.',
                summary: 'Synthesizes past diagnosis and intake reports into key highlights to save clinician review time between patient consultation slots.',
                revenue: 'Cross-checks recorded diagnosis codes with billing claims data to highlight missed billing line-items and streamline insurance cycles.'
            };

            const type = card.getAttribute('data-details');
            const explanationText = detailsMap[type] || 'Integrates seamlessly with existing EMR interfaces.';

            // Create panel
            const panel = document.createElement('div');
            panel.className = 'opp-detail-panel';
            panel.style.cssText = `
                margin-top: 10px;
                padding: 10px;
                border-radius: 4px;
                background-color: var(--bg-tertiary);
                border-left: 3px solid var(--accent-indigo);
                font-size: 11.5px;
                color: var(--text-secondary);
                animation: fadeIn 0.2s ease-out;
            `;
            panel.textContent = explanationText;
            card.appendChild(panel);
        });
    });
});
