# OrgSetup V4 — Implementation Status
**Date:** April 2, 2026
**File:** `admin/org-setup-v4.html`
**Current size:** ~1,650 lines

---

## COMPLETED

### Foundation (Step 1)
- [x] Light theme CSS design system (Inter font, indigo/purple palette, white surfaces)
- [x] Top navigation bar with module tabs (Company Setup, Employees, Roles, Intel)
- [x] Dashboard layout with 12 block cards in 3 phases
- [x] Phase section headers (Phase 1: Who You Are, Phase 2: What You Do, Phase 3: Capability)
- [x] Overall progress bar with per-phase counters (Phase 1: 0/2, Phase 2: 0/5, Phase 3: 0/5)
- [x] Block card states: not_started (gray), in_progress (indigo), complete (green), locked
- [x] Block card summaries (item counts, timestamps, "Last saved X ago")
- [x] Click block → full-panel overlay with header, body, sticky footer
- [x] Global document upload zone ("Upload any company document — AI fills all blocks")
- [x] Lock Level 1 button (enabled only when all 12 blocks complete)
- [x] Reset button (clears all data)
- [x] localStorage persistence (`sip_orgsetup_v4` key)
- [x] Toast notification system

### AI Assistant Panel (Step 2)
- [x] 380px slide-over from right edge
- [x] Purple gradient avatar with online indicator
- [x] Chat-bubble message UI (AI messages + user messages)
- [x] Context-aware messages per block (12 block-specific welcome messages)
- [x] Chat input with send button
- [x] Stub response handler for user messages
- [x] Toggle from top nav button or from within any block
- [x] Panel shifts block overlay when open

### Block A: Organisation Identity (Step 3)
- [x] **Edit mode:** 17 form fields across categories
  - Legal name, trading name, parent company (text)
  - Primary industry, operating model, maturity stage (selects)
  - Current headcount, projected 12m, projected 24m (numbers)
  - HQ country, HQ city, registered office, operational HQ (location fields)
  - Secondary industry exposure, fiscal year start
  - Core values (tag-style input)
  - Culture definition (textarea)
- [x] **AI extraction zone:** paste company description → "Extract with AI" → fills all 15 fields
- [x] **Auto-save on field blur** with per-field checkmark animation ("Saved")
- [x] **Read-only view:** formatted summary card with field labels/values
  - Core values rendered as colored tags
  - Culture definition as formatted paragraph
  - Empty optional fields hidden
  - Incomplete required fields shown with amber warning + "Continue Setup" button
- [x] **Section edit buttons** (pencil icon per section)
- [x] **"Edit All" button** in panel header
- [x] **Completion check:** auto-marks complete when all required fields filled
- [x] **Block card summary:** "Arcova Infrastructure · Infrastructure & Construction · 812 employees"

### Block B: Hierarchy Architecture (Step 4)
- [x] **3-tab interface:** Define Structure | Build Nodes | Secondary Hierarchies

#### Tab 1: Define Structure
- [x] 9 pattern cards with descriptions and example hierarchies:
  - Traditional Corporate, Agile/Spotify, Consulting/Services, Manufacturing
  - Holding/Multi-Entity, Government/Public, Flat/Startup, Matrix, Geographic
- [x] AI-recommended pattern badge (based on Block A industry + size + operating model)
- [x] Click pattern → pre-populates levels with correct names, codes, and types
- [x] Level definition list: name, short code, type badge (Grouping/Assignment/Both)
- [x] Add level form: name, code, type select
- [x] Edit level (prompt-based for now)
- [x] Remove level (cascades to remove nodes at that level)

#### Tab 2: Build Nodes
- [x] Split view: left = visual tree, right = node detail/add form
- [x] **Visual tree** with indented node cards, color-coded dots by level depth
- [x] Tree renders recursively (parent → children → grandchildren)
- [x] **Add node form:** name, code, level select, parent select, head/leader, locations, cost centre, primary function
- [x] **Click node** → right panel shows read-only details
- [x] **Clone node** (copy as starting point for similar units)
- [x] **Remove node** (cascades removal to all child nodes)
- [x] **"AI Generate Nodes" button** — creates full org structure from industry context:
  - Infrastructure → Engineering, Digital Delivery, Project Delivery, Corporate, EHS divisions + sub-departments
  - Technology → Engineering, Product, Sales, Ops, People divisions + sub-teams
  - Generic fallback for other industries

#### Tab 3: Secondary Hierarchies
- [x] List of configured secondary hierarchies (name, type, level count)
- [x] Remove secondary hierarchy
- [x] **Quick-add presets** (4 buttons):
  - Project / Programme (Programme → Project → Workstream)
  - Client Account (Client Portfolio → Account → Engagement)
  - Geographic (Region → Country → Office)
  - Community of Practice (Community → Special Interest Group)
- [x] Max 4 secondary hierarchies enforced
- [x] **Platform behavior table** (shown when secondary hierarchies exist):
  - How multi-dimensional hierarchy affects: Dashboards, Assessment Scoping, TNA/TNI, Approval Workflow, L&D Projects, Notifications

#### Block B Save/Resume
- [x] **Read-only view:** pattern name, level flow (Org → Division → Dept → Team), node tree, secondary hierarchy summary
- [x] "Edit Structure" button to re-enter builder
- [x] Completion check: auto-marks complete when >= 2 levels AND >= 1 node
- [x] Block card summary: "4 levels · 18 nodes · 1 secondary"

### Save & Resume System
- [x] Auto-save on every field blur / list change
- [x] Explicit "Save" button → stays on block, switches to read-only view with filled data
- [x] "Save & Continue" button → saves and opens next incomplete block
- [x] Back arrow (←) → auto-saves and returns to dashboard
- [x] Per-block state: status, lastSaved timestamp, completedAt timestamp, savedBy
- [x] Block cards show saved state on dashboard with timestamps
- [x] Page reload restores all state from localStorage
- [x] "Last activity" shown on dashboard

---

## PENDING

### Phase 2 Blocks (Context)

#### Block C: Strategy & Goals (3.0.2)
- [ ] Mission, vision, strategy document upload
- [ ] Strategic priorities (up to 10) with time horizon + sponsoring BU
- [ ] Strategic risks as first-class entities
- [ ] Cascaded business goals by hierarchy node
- [ ] Goal types (7 types: Revenue, Efficiency, Quality, People, Innovation, Compliance, Customer)
- [ ] OKR format toggle (Objectives + Key Results)
- [ ] Goal-skill linkage (AI infers skills needed per goal)
- [ ] Goal review cadence (quarterly/semi-annual/annual)
- [ ] AI extraction from uploaded strategy documents

#### Block D: Products & Services (3.0.3)
- [ ] Product catalogue: name, description, tech stack, lifecycle, owning BU
- [ ] Product complexity rating (Simple/Moderate/Complex/Highly Complex)
- [ ] Product regulatory classification (auto-populates compliance skills)
- [ ] Product roadmap upload (AI extracts future skill demands)
- [ ] Service catalogue: name, delivery model, engagement size, client industry
- [ ] Service required skills/certifications (linked to Skills Dictionary)
- [ ] Service performance data (satisfaction, on-time %, escalation rate)

#### Block E: Client & Market Context (3.0.4)
- [ ] Client registry: name, industry, size, geography, contract type
- [ ] Strategic account flag, relationship owner (employee link)
- [ ] Client skill demands (from SOW/contracts)
- [ ] Client satisfaction signals (NPS) → signal intelligence
- [ ] Geographic presence: locations with compliance requirements
- [ ] Client delivery locations (language/cultural/timezone implications)

#### Block F: Standards & Compliance (3.0.5)
- [ ] Standards registry: name, category (7 types), issuing body
- [ ] Certification status (3 states: Certified/Pursuing/Aspirational)
- [ ] Dates: certification date, next audit/renewal
- [ ] Applicable scope (depts, roles, employee levels)
- [ ] Required skills/certifications (auto-linked to dictionary)
- [ ] Training requirements (auto-assigned)
- [ ] Auto-behaviors per category (Quality/InfoSec/DataProtection/Industry/Project/Safety/Custom)
- [ ] Compliance dashboard preview

#### Block G: Tools & Technologies (3.0.6)
- [ ] 7 categories with category-specific context fields
- [ ] Per-category depth: user roles, version, analyst vs engineer, client-mandated
- [ ] Lifecycle flags: Active / Sunsetting / Planned adoption
- [ ] Sunsetting → auto-generates migration skill requirement
- [ ] Planned adoption → AI generates future skill requirement

### Phase 3 Blocks (Capability Framework)

#### Block H: Skill Criticality Scale (3.0.7a)
- [ ] C1-C4 scale with editable definitions and platform behaviors
- [ ] Per-skill-per-role criticality (same skill different criticality per role)
- [ ] Auto-propagation on criticality change
- [ ] AI pre-fill with industry-specific language

#### Block I: Proficiency Level Definitions (3.0.7b)
- [ ] L1-L4 default definitions (Awareness/Working/Practitioner/Expert)
- [ ] 4 construction methods (AI-assisted/Template library/SME workshop/Custom)
- [ ] Cross-role calibration flagging
- [ ] Per-skill behavioral indicators generated by AI

#### Block J: Skills Dictionary (3.0.7c)
- [ ] Full skill entry: name, code, type, definition, taxonomy position
- [ ] 4-level taxonomy: Domain → Knowledge Area → Category → Skill
- [ ] L1-L4 proficiency definitions with behavioral indicators per skill
- [ ] Default criticality (C1-C4) with role-specific overrides
- [ ] Related skills (prerequisites, co-developed)
- [ ] Assessment methods per skill
- [ ] Learning pathways per skill per level
- [ ] Industry benchmarks per skill
- [ ] "AI Generate from Context" — full dictionary from Blocks A-G
- [ ] CSV upload for bulk import
- [ ] Edstellar template library

#### Block K: Competency Framework (3.0.7d)
- [ ] 4 types: Core / Behavioural / Leadership / Technical
- [ ] Linked to org values (from Block A)
- [ ] L1-L4 behavioral indicators (observable, specific behaviors)
- [ ] Role & level applicability
- [ ] Assessment methods per competency
- [ ] AI generation from values + strategy + culture

#### Block L: Job Role Definitions (3.0.7e)
- [ ] Role identity: title, family, level range L1-L15, seniority, scope
- [ ] Title scope model: Node-specific / Level-wide / Org-wide / Cross-hierarchy
- [ ] Key Result Areas (4-6 per role, linked to dept goals)
- [ ] Required skills: mandatory vs developmental, with proficiency + criticality
- [ ] Required competencies: core (auto) + role-specific
- [ ] Tasks: linked to skills/competencies, frequency, criticality per task
- [ ] Min qualifications: required at hire vs required within timeframe
- [ ] Career pathway: upward/lateral/entry with skills delta per step
- [ ] Succession criticality: bench strength target, readiness trigger
- [ ] Role-Skill Matrix Inheritance (cascade from parent, override model)
- [ ] Role versioning (historical assessments linked to active version)
- [ ] Collaborative building workflow (HR → dept head → SME → HR Head)
- [ ] AI role profile generation from brief

### AI Pipeline Block

#### Block M: AI Pipeline Context (3.0.8)
- [ ] 7-prompt pipeline visualization table
- [ ] Context readiness indicator per block
- [ ] Context refresh trigger (re-runs Prompts 2 and 3 only)
- [ ] Changes flagged for Tier 1 review

### Cross-cutting features still pending
- [ ] Hierarchy visualization: dual-pane navigation (left=tree, right=analytics)
- [ ] Hierarchy search: find nodes by name, code, head, location
- [ ] Hierarchy comparison: select 2 nodes → side-by-side skill profiles
- [ ] Hierarchy export: JSON, CSV, PDF org chart
- [ ] Node custom attributes schema (JSONB per level)
- [ ] Job title scope model integration with hierarchy
- [ ] Role-Skill inheritance from hierarchy nodes (cascade + override)
- [ ] Section-level edit (currently falls back to full edit mode)
- [ ] Single-field inline edit (click value text → inline input)
- [ ] Multi-stakeholder savedBy tracking
- [ ] Dashboard activity log ("Kavitha saved Block A · Rajesh updated Block G")

---

## FILE INVENTORY

| File | Status | Lines |
|------|--------|-------|
| `admin/org-setup-v4.html` | Active — Steps 1-4 complete | ~1,650 |
| `Project Documents/implementationplanofOrgSetupBlockV3.docx` | Complete | 20 sections |
| `Project Documents/OrgSetupBlockV3.docx` | Source spec (read-only) | — |

## GIT HISTORY (V4-related)

| Commit | Description |
|--------|-------------|
| `44e70b8` | Add OrgSetup V4 foundation — light theme, dashboard, AI panel, Block A |
| `f7bd789` | Add Block B: Hierarchy Architecture with visual tree builder |
| `18a0578` | Fix Save button to stay on block and show read-only view |
