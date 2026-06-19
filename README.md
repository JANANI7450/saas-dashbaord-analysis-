# India Clinic OS Strategy & GTM Dashboards

Premium, boardroom-style strategy and go-to-market dashboards designed to present founder-level market opportunity, packaging architecture, competitor positioning, and marketing campaigns.

**Theme & Aesthetics:** McKinsey + Sequoia + YC + Stripe + Linear inspired. Clean white background, minimal layout, high typography readability, and visual-first interactive panels.

---

## 🖥️ Active Dashboard Views

1. **Market Opportunity Assessment (`index.html`)**
   - Sizing TAM / SAM / SOM parameters.
   - 2D Strategic Positioning Graph.
   - Interactive sales funnel conversion calculator.
   - LTV Scenario Waterfall Chart with Conservative, Realistic, and Aggressive scenario attach rates.
   - Focus: *Founder investment thesis & market proof.*

2. **GTM & Packaging Strategy (`packaging.html`)**
   - 4-Tier Pricing architecture card layouts.
   - Functional Feature Differentiation matrix.
   - 25 Marketing Warfare campaign copy cards with categories filter tabs (*Revenue, Time, AI, Ownership, Growth*).
   - Competitor void matrix & positioning map.
   - Focus: *Product release roadmap, packaging, and campaign positioning.*

---

## 🚀 How to Host & Run

Both dashboards are pure HTML, CSS, and Vanilla JS, built with zero external framework dependencies to ensure lightning-fast load times. They can be hosted locally or deployed to cloud platforms in seconds.

### 1. Local Hosting

#### Option A: Python (Built-in)
Run the following command inside the root folder:
```bash
python -m http.server 8005
```
Then visit:
- Market Opportunity: [http://localhost:8005](http://localhost:8005)
- GTM & Packaging: [http://localhost:8005/packaging.html](http://localhost:8005/packaging.html)

#### Option B: Node.js (http-server)
Install and run a static server:
```bash
npx http-server -p 8005
```

---

### 2. Cloud Deployment / Production Hosting

#### Option A: GitHub Pages (Free & Automatic)
Since the project is already pushed to GitHub:
1. Go to your GitHub repository: [saas-dashbaord-analysis-](https://github.com/JANANI7450/saas-dashbaord-analysis-)
2. Click on **Settings** (top bar).
3. Scroll down to the **Pages** section in the left-hand sidebar.
4. Under **Build and deployment**, set the Source to **Deploy from a branch**.
5. Set the Branch to **`main`** and folder to **`/ (root)`**, then click **Save**.
6. GitHub will deploy the site in ~1 minute. Your live link will be:
   - `https://janani7450.github.io/saas-dashbaord-analysis-/` (Market Opportunity)
   - `https://janani7450.github.io/saas-dashbaord-analysis-/packaging.html` (GTM & Packaging)

#### Option B: Vercel (One-Click Deploy)
1. Go to [Vercel](https://vercel.com/) and log in with your GitHub account.
2. Click **Add New** $\rightarrow$ **Project**.
3. Import the repository **`saas-dashbaord-analysis-`**.
4. Keep the default settings (Vercel automatically detects static HTML) and click **Deploy**.
5. Your dashboard will be live with a free custom SSL URL.

#### Option C: Netlify
1. Go to [Netlify](https://www.netlify.com/).
2. Drag and drop the workspace folder containing `index.html` and `packaging.html` directly into the Netlify import box.
3. The site will deploy instantly.

---

## ⚡ Interactive Controls & Presenter Mode

- **Presenter Mode (Slide Projector Theme)**: Click the **Presenter Mode** button on the bottom-left of the sidebar. The dashboard theme shifts to a premium dark boardroom projector aesthetic. Use the **Left / Right / Space** keyboard keys to navigate pages/slides.
- **Funnel Calculation Engine**: Tweak the input box on Page 6 of `index.html`. It dynamically scales target clinic conversions, penetration rates, and ARR milestones.
- **Marketing Filter Tabs**: Select tabs on Page 3 of `packaging.html` to filter through categories instantly with slide animations.
