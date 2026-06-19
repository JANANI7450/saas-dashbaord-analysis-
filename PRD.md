# Product Requirement Document (PRD)
## Project: India Clinic Operating System (Clinic OS)
**Document Version:** 1.0.0  
**Date:** June 19, 2026  
**Status:** Approved  
**Target Audience:** Engineering, Product, Design, and Executive stakeholders

---

## 1. Executive Summary & Vision

### 1.1 Product Vision
Legacy clinic software platforms (EMRs/Practice Management Systems) function as passive databases. They burden doctors with administrative data entry, add front-desk friction, and yield low ROI. 

**Clinic OS** is an AI-native, mobile-first operating system designed to run the clinic autonomously. It acts as an active business partner that:
- Automates patient intake and scheduling via WhatsApp.
- Eliminates manual documentation through an AI Voice Scribe.
- Prevents revenue leaks and maximizes patient retention via autonomous recall agents.

### 1.2 Strategic Theme
- **Aesthetic:** Minimalist, high contrast, clean white backgrounds, typography-focused (Inter + monospace numbers). Inspired by Stripe, Linear, and Notion.
- **Design Philosophy:** Visual storytelling, zero-clutter, rapid keyboard shortcuts, and responsiveness.
- **Business Model:** Multi-tiered annual subscription models focused on outcome delivery (revenue expansion) rather than passive database hosting.

---

## 2. Target Persona & Core Outcomes

### 2.1 Target Personas
1. **The Solo Doctor / GP:** Operates a single consult room. Wants to digitize patient history without spending extra hours typing or hiring a transcriptionist.
2. **Specialist Clinic (Dental, Physio, Skin):** Requires specialized tracking (visual timelines, chronic history mapping) and highly active patient recall schedules.
3. **The Clinic Receptionist:** Overburdened with incoming calls, scheduling confirmations, and billing audits. Needs a simplified interface to coordinate billing.

### 2.2 Core Product Outcomes
We do not sell software features; we sell operational business outcomes:
- **More Revenue:** Recapturing missed appointments and forgotten follow-ups.
- **More Time:** Reducing doctor documentation time by 75% (saving 2+ hours daily).
- **Less Staff Dependency:** Automating scheduling and FAQs using autonomous 24/7 AI bots.
- **Better Patient Retention:** Leveraging native WhatsApp threads to loop patients back to the clinic.

---

## 3. Product Architecture & Packaging Tiers

Clinic OS is packaged into 4 progressive tiers. Features must follow a strict modular boundary to incentivize upgrades.

```
+------------------------------------------------------------+
|                       AI CLINIC OS                         |
|   (AI Receptionist, AI Billing Audit, Custom Domains)       |
+------------------------------------------------------------+
                             ▲
+------------------------------------------------------------+
|                     AUTOMATION CLINIC                      |
|      (AI Voice Scribe, Google Reviews, AI Summaries)       |
+------------------------------------------------------------+
                             ▲
+------------------------------------------------------------+
|                       GROWTH CLINIC                        |
|       (WhatsApp Reminders, Follow-Up Engine, CRM)          |
+------------------------------------------------------------+
                             ▲
+------------------------------------------------------------+
|                      ESSENTIAL CLINIC                      |
|       (Registration, Basic Rx, Calendar, Billing)          |
+------------------------------------------------------------+
```

### 3.1 Tier 1: Essential Clinic (₹4,999 / year)
*Objective: Establish a baseline digital clinic foundation in under 24 hours.*
- **Registration:** Patient record creation (name, age, gender, phone).
- **History:** Searchable longitudinal list of patient visits.
- **Calendar Scheduler:** Basic drag-and-drop calendar for booking patient slots.
- **Basic Rx:** Simple text-based prescription drafting.
- **Billing:** Invoicing, basic procedure selection, and printing receipts.
- **Doctor Mobile Access:** Secure mobile-responsive dashboard.
- **Daily Reports:** End-of-day summary of appointments, walk-ins, and cash flows.

### 3.2 Tier 2: Growth Clinic (₹9,999 / year)
*Objective: Build an active patient retention loop.*
- **WhatsApp Reminders:** Trigger automated appointment confirmations and schedules.
- **Follow-up Tracking:** Unified console highlighting patients who are due for review.
- **Longitudinal Patient Timeline:** Visual timeline of symptoms, drug history, and test reports.
- **Revenue Dashboard:** Advanced visual graphs showing collection trends.
- **Reception Login:** Multi-role access allowing receptionists to view bookings and billing without accessing clinical records.
- **Patient Analytics:** Basic cohort grouping (e.g., chronic patients, age groups).
- **Migration Engine:** Automated spreadsheet importer to upload lists from old software.

### 3.3 Tier 3: Automation Clinic (₹14,999 / year)
*Objective: Deploy AI productivity agents to eliminate consult room friction.*
- **AI Consultation Notes:** Ambient voice scribe that listens to consult conversations and drafts clinical notes.
- **AI Prescription Smart Drafting:** Automatically drafts prescriptions based on notes.
- **AI Patient Intake Summary:** Generates a 3-sentence summary of patient history from PDF uploads.
- **Voice Notes to Records:** Tap-to-record voice memo feature for doctors to add observations.
- **WhatsApp Campaigns:** Broadcaster to send health check-ins or announcements.
- **Google Review Automation:** Triggers review requests to happy patients post-consult.
- **Patient Reactivation Engine:** Identifies inactive patients and suggests outreach campaigns.

### 3.4 Tier 4: AI Clinic OS (₹24,999 / year)
*Objective: Drive autonomous clinic operations with full white-label capabilities.*
- **AI WhatsApp Receptionist:** 24/7 autonomous WhatsApp agent that responds to queries and books appointments.
- **AI Appointment Scheduler:** AI calendars that optimize doctor slot density.
- **AI Follow-up Bot:** Proactively follows up with patients on recovery milestones.
- **AI Chronic Recall Agent:** Coordinates regular check-ups for diabetic or hypertensive patients.
- **AI Revenue Recovery:** Audits billing files against EMR notes to flag uncharged procedures.
- **AI Staff Onboarding Trainer:** Interactive training playground for receptionists.
- **Custom Domains:** Custom white-label portals.
- **Priority Support:** 24/7 support SLA.

---

## 4. Functional Specifications & Deep Dives

### 4.1 AI Voice Scribe (Tier 3+)
- **System Behavior:**
  1. The doctor taps "Record Scribe" on the mobile/desktop app.
  2. The system captures ambient room audio (doctor-patient consult).
  3. On tapping "Stop", audio is processed via a pipeline optimized for Indian clinical terms.
  4. The system outputs structured clinical notes: *Chief Complaints, History, Examination, Diagnosis, and Rx (Medications, Dosage, Frequency, Duration).*
- **Edge Cases:** 
  - Mixed languages (e.g., Hinglish, Tamil-English). The transcription model must parse regional expressions into English clinical terminology.
  - Background noise. Apply noise suppression filters prior to transcription.

### 4.2 WhatsApp Recalls Engine (Tier 2 & 4)
- **System Behavior:**
  - **Tier 2 (Rules-Based):** Scheduled automated reminders sent $N$ days post-visit based on manually input follow-up dates.
  - **Tier 4 (AI-Agent):** The AI recall agent parses the patient's EMR record, identifies missing follow-up dates (e.g., a diabetic who hasn't visited in 90 days), crafts a personalized message, and manages the scheduling conversation directly in WhatsApp.
- **Compliance Rule:** Must contain a clear opt-out command (e.g., "Reply STOP to opt out").

### 4.3 AI Revenue Recovery (Tier 4)
- **System Behavior:**
  1. A patient checkout trigger is executed.
  2. The billing auditor AI reviews the unstructured consult notes from the consult room.
  3. The AI cross-checks notes for documented clinical procedures (e.g., "removed suture", "applied dressing", "performed scale cleaning") against the invoice draft.
  4. If a discrepancy is found, it raises a warning banner: *"Warning: 'Suture Removal' was mentioned in consultation notes but is missing from billing. Click here to add (₹500)."*
- **Verification Rule:** Discrepancy reviews must complete in <500ms to prevent checkout delays.

---

## 5. Technical & Non-Functional Requirements

### 5.1 Performance & Latency Targets
- **Page Load Speed:** Root application bundle size must be under 300KB to ensure page loads in under 100ms.
- **Audio Processing Latency:** Transcription to structured clinical notes must complete in under 3.5 seconds for a 3-minute audio consult.
- **Database Query Latency:** Patient search and record retrieval must compile in under 50ms (indexing on phone numbers and names is mandatory).

### 5.2 Scalability
- The architecture must handle a peak load of 5,000 concurrent database writes/reads per second.
- Support up to 10,000 active automated WhatsApp outgoing interactions per hour.

### 5.3 Indian Regulatory Compliance
- **DISHA (Digital Information Security in Healthcare Act):** All patient health data must be encrypted at rest (AES-256) and in transit (TLS 1.3). No clinical records may be shared with third parties without explicit OTP-based consent.
- **ABDM (Ayushman Bharat Digital Mission):** Integration-ready hooks for Ayushman Bharat Health Account (ABHA) registration and clinical record links.
- **Data Sovereignty:** All clinical database instances must reside physically within Indian geographic borders.

---

## 6. UX/UI & Design System Specifications

### 6.1 Layout Paradigms
- **Mobile-First Consoles:** The consultation view and billing screens must adjust cleanly to single-column phone screens (specifically 360px width viewports).
- **Unified Navigation:** Consistent sidebar navigation with numbered shortcuts.
- **Projector Theme (Presentation Mode):** High-contrast color overrides for projector/boardroom presentation.

### 6.2 Visual Indicators
- **Matrix Lists:** Upgrade paths must show checked states clearly.
- **Friction Heatmaps:** Color gradients scaling from soft emerald (low opportunity/fricton) to deep coral (critical priority).

---

## 7. Metrics & KPIs

To measure the product's success and GTM efficiency, the platform will track:
1. **LTV Attach Rate:** Percentage of base subscription customers upgrading to add-on AI features (target: >45%).
2. **Time Saved (Daily):** Logged duration of active consulting sessions vs. EMR entry times (target: average of 2 hours saved daily).
3. **Recall Conversion Rate:** Percentage of automated WhatsApp recall prompts resulting in a booked appointment (target: >22%).
4. **Leakage Capture Rate:** Total billing discrepancies captured and recovered by the AI Revenue Auditor (target: average of ₹12,000 recovered per clinic per month).
