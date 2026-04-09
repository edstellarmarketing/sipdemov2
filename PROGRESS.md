# SIP DemoV3 — Progress Tracker & Session Guide

> **READ THIS FIRST** at the start of every session.
> This file is the single source of truth for what has been built, what to build next, and how to build it.

**Last updated:** 5 April 2026
**Overall progress:** 43 / 43 pages migrated (100%)

---

## Quick Status

| Wave | Scope | Total | Done | Remaining | Status |
|------|-------|-------|------|-----------|--------|
| -- | Infrastructure (CSS + Shell) | 2 | 2 | 0 | DONE |
| 1 | Admin: Setup & Framework | 10 | 10 | 0 | DONE |
| 2 | Admin: Assess & Intelligence | 6 | 6 | 0 | DONE |
| 3 | Manager: Dashboards | 5 | 5 | 0 | DONE |
| 4 | Manager: Analysis & People | 8 | 8 | 0 | DONE |
| 5 | Employee Portal | 9 | 9 | 0 | DONE |
| 6 | Landing & Nav Pages | 5 | 5 | 0 | DONE |
| **TOTAL** | | **43** | **43** | **0** | ALL COMPLETE |

---

## How to Build Each Page

### Step 1: Identify the source
- Source files live in `D:\SIP Demo\` (old design) under `admin/`, `manager/`, `employee/`, or root
- Read the source page fully before starting migration

### Step 2: Create the DemoV3 file
- Target: `D:\SIP Demo\DemoV3\{portal}\{filename}.html`
- Use the page template below
- Link `../styles/design-system.css` — never inline design-system tokens
- Wire `../components/shell.js` — never write inline shell/nav markup

### Step 3: Migrate content
- Copy the page-specific content (charts, tables, forms, cards) into `<main>`
- Strip all old nav/sidebar/topbar HTML — shell.js handles this
- Convert old CSS variables to design-system.css variables
- Convert old fonts (Syne) to new fonts (Fraunces display, DM Sans body)
- Keep page-specific styles in a `<style>` block in `<head>`

### Step 4: Wire the shell
```html
<script src="../components/shell.js"></script>
<script>
  EdstellarShell.init({
    portal: '{admin|manager|employee}',
    activeNav: '{exact nav label from shell.js}',
    breadcrumbs: ['{Group}', '{PageName}'],
    topbarActions: []
  });
</script>
```

### Step 5: Verify
- [ ] Sidebar highlights correct nav item
- [ ] All internal links point to DemoV3 paths
- [ ] Only `<main>` scrolls (sidebar/topbar fixed)
- [ ] Matches Edstellar Admin Portal UI visual style
- [ ] No references to old design system (Syne font, dark theme body, etc.)

### Step 6: Update this file
- Mark the page as DONE in the detailed tracker below
- Update the Quick Status table counts
- Update "Last updated" date and overall progress at the top

---

## Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{PageName} — Edstellar SIP</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles/design-system.css">
<style>
/* Page-specific styles only */
</style>
</head>
<body>
<main class="main" id="page-content">
  <!-- Page content here -->
</main>
<script src="../components/shell.js"></script>
<script>
EdstellarShell.init({
  portal: '{portal}',
  activeNav: '{navLabel}',
  breadcrumbs: ['{Group}', '{PageName}'],
  topbarActions: []
});
</script>
</body>
</html>
```

---

## Design Rules

1. **Light theme:** `#FAFAF8` background, `#ffffff` cards, dark `#0F1117` sidebar
2. **Fonts:** Fraunces (display headings), DM Sans (body), DM Mono (data/codes)
3. **Accent:** Warm amber-gold `#C9A84C` — never generic blue
4. **No inline shell:** `shell.js` handles sidebar, topbar, layout grid
5. **No inline tokens:** All shared CSS vars come from `design-system.css`
6. **Scroll:** Only `<main>` area scrolls — sidebar and topbar are fixed
7. **Links:** All internal hrefs must point to DemoV3 paths (relative `../` structure)
8. **Landing pages** (Wave 6): No shell — custom layout but same design tokens

---

## Detailed Page Tracker

### Wave 1: Admin — Setup & Framework

| # | Page | File | activeNav | Source | Status | Date |
|---|------|------|-----------|--------|--------|------|
| 1 | SkillForge | `admin/skillforge.html` | Generate Framework | `admin/skillforge.html` | DONE | 5 Apr 2026 |
| 2 | Organisation Setup | `admin/org-setup.html` | Organisation Setup | `admin/org-setup.html` | DONE | 5 Apr 2026 |
| 3 | OrgSetup V4 | `admin/org-setup-v4.html` | Organisation Setup | `admin/org-setup-v4.html` | DONE | 5 Apr 2026 |
| 4 | DataPort | `admin/dataport.html` | Data Import | `admin/dataport.html` | DONE | 5 Apr 2026 |
| 5 | Employee Upload | `admin/employee-upload.html` | Employee Upload | `admin/employee-upload.html` | DONE | 5 Apr 2026 |
| 6 | Manual Entry | `admin/manual-entry.html` | Manual Entry | `admin/manual-entry.html` | DONE | 5 Apr 2026 |
| 7 | Role-Competency Setup | `admin/role-competency-setup.html` | Role-Competency Setup | `admin/role-competency-setup.html` | DONE | 5 Apr 2026 |
| 8 | ApprovalHub | `admin/approvalhub.html` | Approval Workflow | `admin/approvalhub.html` | DONE | 5 Apr 2026 |
| 9 | Framework Bible | `admin/framework-bible.html` | Skills & Competency Framework | `admin/framework-bible.html` | DONE | 5 Apr 2026 |
| 10 | Scope Management | `admin/scope-management.html` | Scope Management | `admin/scope-management.html` | DONE | 5 Apr 2026 |

### Wave 2: Admin — Assess & Intelligence

| # | Page | File | activeNav | Source | Status | Date |
|---|------|------|-----------|--------|--------|------|
| 11 | AssessEngine | `admin/assess-engine.html` | Assessment Cycles | `admin/assess-engine.html` | DONE | 5 Apr 2026 |
| 12 | Survey Builder | `admin/survey-builder.html` | Survey Builder | `admin/survey-builder.html` | DONE | 5 Apr 2026 |
| 13 | Knowledge Tests | `admin/knowledge-tests.html` | Knowledge Tests | `admin/knowledge-tests.html` | DONE | 5 Apr 2026 |
| 14 | Discovery Sessions | `admin/discovery-sessions.html` | Discovery Sessions | `admin/discovery-sessions.html` | DONE | 5 Apr 2026 |
| 15 | Workforce Intelligence | `admin/workforce-intelligence.html` | Workforce Intelligence | `admin/workforce-intelligence.html` | DONE | 5 Apr 2026 |
| 16 | Report L1 | `admin/report-l1.html` | Reports | `admin/report-l1.html` | DONE | 5 Apr 2026 |

### Wave 3: Manager — Dashboards

| # | Page | File | activeNav | Source | Status | Date |
|---|------|------|-----------|--------|--------|------|
| 17 | CHRO Dashboard | `manager/chro-dashboard.html` | CHRO Dashboard | `manager/chro-dashboard.html` | DONE | 5 Apr 2026 |
| 18 | CLO Dashboard | `manager/clo-dashboard.html` | CLO Dashboard | `manager/clo-dashboard.html` | DONE | 5 Apr 2026 |
| 19 | HR Dashboard | `manager/hr-dashboard.html` | HR Dashboard | `manager/hr-dashboard.html` | DONE | 5 Apr 2026 |
| 20 | HRBP Dashboard | `manager/hrbp-dashboard.html` | HRBP Dashboard | `manager/hrbp-dashboard.html` | DONE | 5 Apr 2026 |
| 21 | Wellbeing Dashboard | `manager/wellbeing-dashboard.html` | Wellbeing Dashboard | `manager/wellbeing-dashboard.html` | DONE | 5 Apr 2026 |

### Wave 4: Manager — Analysis & People

| # | Page | File | activeNav | Source | Status | Date |
|---|------|------|-----------|--------|--------|------|
| 22 | Skills Matrix | `manager/skills-matrix.html` | Skills Matrix | `manager/skills-matrix.html` | DONE | 5 Apr 2026 |
| 23 | Gap Analysis | `manager/gap-analysis.html` | Gap Analysis | `manager/gap-analysis.html` | DONE | 5 Apr 2026 |
| 24 | LNA/TNA Report | `manager/lna-report.html` | LNA/TNA Report | `manager/lna-report.html` | DONE | 5 Apr 2026 |
| 25 | LNI Brief | `manager/lni-brief.html` | LNI Brief | `manager/lni-brief.html` | DONE | 5 Apr 2026 |
| 26 | Assessment Results | `manager/assessment-results.html` | Assessment Results | `manager/assessment-results.html` | DONE | 5 Apr 2026 |
| 27 | Succession Planning | `manager/succession.html` | Succession Planning | `manager/succession.html` | DONE | 5 Apr 2026 |
| 28 | Task Evaluation | `manager/task-evaluation.html` | Task Evaluation | `manager/task-evaluation.html` | DONE | 5 Apr 2026 |
| 29 | L2 Reports | `manager/reports-l2.html` | L2 Reports | `manager/reports-l2.html` | DONE | 5 Apr 2026 |

### Wave 5: Employee Portal

| # | Page | File | activeNav | Source | Status | Date |
|---|------|------|-----------|--------|--------|------|
| 30 | Skill Passport | `employee/skill-passport.html` | Skill Passport | `employee/skill-passport.html` | DONE | 5 Apr 2026 |
| 31 | Certificates | `employee/certificates.html` | Certificates | `employee/certificates.html` | DONE | 5 Apr 2026 |
| 32 | My Assessments | `employee/my-assessments.html` | My Assessments | `employee/my-assessments.html` | DONE | 5 Apr 2026 |
| 33 | Skill Assessment | `employee/skill-assessment.html` | Skill Assessment | `employee/skill-assessment.html` | DONE | 5 Apr 2026 |
| 34 | Psychometric | `employee/psychometric.html` | Psychometric | `employee/psychometric.html` | DONE | 5 Apr 2026 |
| 35 | 360 Feedback | `employee/360-feedback.html` | 360 Feedback | `employee/360-feedback.html` | DONE | 5 Apr 2026 |
| 36 | My IDP | `employee/my-idp.html` | My IDP | `employee/my-idp.html` | DONE | 5 Apr 2026 |
| 37 | Learning Path | `employee/learning-path.html` | Learning Path | `employee/learning-path.html` | DONE | 5 Apr 2026 |
| 38 | My Training | `employee/my-training.html` | My Training | `employee/my-training.html` | DONE | 5 Apr 2026 |

### Wave 6: Landing & Navigation Pages

| # | Page | File | Shell | Source | Status | Date |
|---|------|------|-------|--------|--------|------|
| 39 | Portal Home | `index.html` | No shell — custom landing | `index.html` | DONE | 5 Apr 2026 |
| 40 | Login | `login.html` | No shell — auth page | `login.html` | DONE | 5 Apr 2026 |
| 41 | Demo Walkthrough | `demo-walkthrough.html` | No shell — guided tour | `demo-walkthrough.html` | DONE | 5 Apr 2026 |
| 42 | Level Journey Map | `level-journey.html` | No shell — visual map | `level-journey.html` | DONE | 5 Apr 2026 |
| 43 | All Screens Nav | `nav-menus.html` | No shell — nav index | `nav-menus.html` | DONE | 5 Apr 2026 |

---

## Shell.js Nav Label Reference

Use these exact strings for `activeNav` — must match exactly for sidebar highlight.

### Admin Portal
| Nav Label | Group |
|-----------|-------|
| Home | — |
| Organisation Setup | Setup |
| Data Import | Setup |
| Employee Upload | Setup |
| Manual Entry | Setup |
| Role-Competency Setup | Setup |
| Generate Framework | Framework |
| Approval Workflow | Framework |
| Skills & Competency Framework | Framework |
| Employee Directory | People |
| Scope Management | People |
| Skill Passports | People |
| Assessment Cycles | Assess |
| Skills Matrix | Assess |
| Survey Builder | Assess |
| Knowledge Tests | Assess |
| Discovery Sessions | Assess |
| InsightBoard | Intelligence |
| Learning Needs (LNA) | Intelligence |
| Individual Briefs (LNI) | Intelligence |
| Workforce Intelligence | Intelligence |
| Wellbeing | Intelligence |
| Learning Paths | Develop (L3) |
| Training | Develop (L3) |

### Manager Portal
| Nav Label | Group |
|-----------|-------|
| Home | — |
| CHRO Dashboard | Dashboards |
| CLO Dashboard | Dashboards |
| HR Dashboard | Dashboards |
| HRBP Dashboard | Dashboards |
| Skills Matrix | Analysis |
| Gap Analysis | Analysis |
| LNA/TNA Report | Analysis |
| LNI Brief | Analysis |
| Assessment Results | Analysis |
| Succession Planning | People |
| Task Evaluation | People |
| Wellbeing Dashboard | People |
| L2 Reports | Reports |

### Employee Portal
| Nav Label | Group |
|-----------|-------|
| Home | — |
| Skill Passport | My Profile |
| Certificates | My Profile |
| My Assessments | Assessments |
| Skill Assessment | Assessments |
| Psychometric | Assessments |
| 360 Feedback | Assessments |
| My IDP | Development |
| Learning Path | Development |
| My Training | Development |

---

## Changelog

| Date | What Changed |
|------|-------------|
| 5 Apr 2026 | Created PROGRESS.md. Infrastructure done. SkillForge migrated (Wave 1, #1). |
| 5 Apr 2026 | Wave 1 COMPLETE: Migrated all 10 admin Setup & Framework pages. |
| 5 Apr 2026 | Wave 2 COMPLETE: Migrated all 6 admin Assess & Intelligence pages. |
| 5 Apr 2026 | Wave 3 COMPLETE: Migrated all 5 manager Dashboard pages. |
| 5 Apr 2026 | Wave 4 COMPLETE: Migrated all 8 manager Analysis & People pages. |
| 5 Apr 2026 | Wave 5 COMPLETE: Migrated all 9 employee portal pages. |
| 5 Apr 2026 | Wave 6 COMPLETE: Migrated all 5 landing & nav pages. ALL 43 PAGES DONE. |
| 5 Apr 2026 | OrgSetup V4 gap fill: Built all 12 blocks (A-L). Added shared dropdown constants (195 countries, 27 industries, HRIS/LMS/seniority/goals/standards/tools). Fixed Block A dropdowns (country, industry, HRIS, LMS). Fixed Block B (search, export, inline edit). File grew from 1,644 to 4,510 lines. |
