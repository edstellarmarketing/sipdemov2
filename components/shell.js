/* ══════════════════════════════════════════════════════════════
   EDSTELLAR SIP — SHELL COMPONENT
   Injects: dark sidebar nav + topbar + layout grid

   Usage in any page:

   <head>
     <link rel="stylesheet" href="../styles/design-system.css">
   </head>
   <body>
     <main class="main" id="page-content">
       <!-- your page content here -->
     </main>
     <script src="../components/shell.js"></script>
     <script>
       EdstellarShell.init({
         portal: 'admin',          // 'admin' | 'manager' | 'employee'
         activeNav: 'SkillForge',  // label text of active nav item
         breadcrumbs: ['Setup', 'SkillForge'],
         topbarActions: [
           { label: 'Export', icon: 'export' },
           { label: 'Add New', icon: 'plus', primary: true }
         ]
       });
     </script>
   </body>
   ══════════════════════════════════════════════════════════════ */

const EdstellarShell = (() => {

  /* ── SVG ICON LIBRARY ─────────────────────────────────────── */
  const icons = {
    home: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 6.5L8 2l6 4.5V14a.5.5 0 01-.5.5h-4V10H6.5v4.5h-4A.5.5 0 012 14V6.5z"/></svg>',
    grid: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>',
    import: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 3H3v10h10V3z"/><path d="M6 7h4M6 10h2M9 1v3M7 1v3"/></svg>',
    clock: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 1.5"/></svg>',
    search: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 4h10M3 8h7M3 12h5"/><circle cx="12" cy="10" r="2.5"/><path d="M14 12.5l1.5 1.5"/></svg>',
    book: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 2h10a1 1 0 011 1v11l-3-1.5L8 14l-3-1.5L2 14V3a1 1 0 011-1z"/></svg>',
    users: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="5" r="3"/><path d="M1 14c0-3 2-5 5-5s5 2 5 5"/><circle cx="12" cy="5" r="2"/><path d="M13 14c0-1.5-.5-3-2-4"/></svg>',
    scope: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M5 7h6M5 10h4"/></svg>',
    passport: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="2" width="10" height="13" rx="1.5"/><path d="M6 6h4M6 9h4M6 12h2"/><circle cx="11" cy="12" r="2.5"/><path d="M12 13l1 1"/></svg>',
    shield: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2L2 5v4c0 3.5 2.5 5.5 6 6.5 3.5-1 6-3 6-6.5V5L8 2z"/></svg>',
    matrix: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M5 5h6M5 8h6M5 11h4"/></svg>',
    chart: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12l3-4 3 2 3-6 3 3"/></svg>',
    tree: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="4" r="2"/><circle cx="3" cy="12" r="2"/><circle cx="13" cy="12" r="2"/><path d="M8 6v2M6 12H5M11 12h-1M7 8l-3 2M9 8l3 2"/></svg>',
    house: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 14V6l6-4 6 4v8"/><path d="M6 14v-4h4v4"/></svg>',
    bulb: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2C5 2 3 4 3 7c0 2 1.5 3.5 3 4l-1 3h6l-1-3c1.5-.5 3-2 3-4 0-3-2-5-5-5z"/></svg>',
    gem: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1L1 5v6l7 4 7-4V5L8 1z"/></svg>',
    briefcase: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4h12v10H2z"/><path d="M5 4V2h6v2"/></svg>',
    upload: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 10V3M5 5.5L8 3l3 2.5"/><path d="M3 10v3h10v-3"/></svg>',
    survey: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="2" width="10" height="12" rx="1.5"/><path d="M6 5h4M6 8h4M6 11h2"/></svg>',
    test: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="2" width="10" height="12" rx="1"/><path d="M6 6l1.5 1.5L10 5M6 10h4"/></svg>',
    brain: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 14V8M5 4c-2 0-3 2-2 4 1 1 3 0 3 0M11 4c2 0 3 2 2 4-1 1-3 0-3 0"/><circle cx="8" cy="3" r="2"/></svg>',
    discovery: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2.5 1.5M4.5 8h-1M12.5 8h-1"/></svg>',
    report: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 2h7l3 3v9H3z"/><path d="M10 2v3h3"/><path d="M6 8h4M6 11h2"/></svg>',
    dash: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="3" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="7" width="5" height="7" rx="1"/></svg>',
    gap: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 14V4h3v10M7 14V7h3v7M12 14V2h3v12"/></svg>',
    succession: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="4" r="2.5"/><path d="M4 14v-2c0-2 2-3 4-3s4 1 4 3v2"/><path d="M12 4l2 2-2 2"/></svg>',
    task: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 8l2 2 4-4"/></svg>',
    wellbeing: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 14s-5-3.5-5-7a3 3 0 016 0 3 3 0 016 0c0 3.5-5 7-5 7z"/></svg>',
    star: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2l1.8 3.7 4 .6-2.9 2.8.7 4L8 11.4 4.4 13.1l.7-4-2.9-2.8 4-.6z"/></svg>',
    path: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="4" cy="4" r="2"/><circle cx="12" cy="12" r="2"/><path d="M6 4h4c2 0 2 2 2 4s0 4-2 4"/></svg>',
    cert: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="6" r="4"/><path d="M5 10v4l3-1.5L11 14v-4"/></svg>',
    training: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4l6-2 6 2-6 2-6-2z"/><path d="M12 6v5c0 1-2 2.5-4 2.5S4 12 4 11V6"/></svg>',
    psychometric: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 4v4l3 2"/></svg>',
    feedback: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3h10v7H7l-3 2v-2H3V3z"/><path d="M6 6h4M6 8h2"/></svg>',
    workforce: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="5" cy="5" r="2"/><circle cx="11" cy="5" r="2"/><path d="M1 12c0-2 1.5-3 4-3s4 1 4 3M9 12c0-2 1.5-3 4-3s3 1 3 3"/></svg>',
    role: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="2" width="10" height="12" rx="1.5"/><circle cx="8" cy="6" r="2"/><path d="M5 12c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5"/></svg>',
    manual: '<svg class="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 3h8v10H4z"/><path d="M7 6h2M7 9h2"/></svg>',
  };

  /* ── NAV STRUCTURE PER PORTAL ─────────────────────────────── */
  const navStructure = {
    admin: [
      { group: null, items: [
        { label: 'Home', icon: 'home', href: '../index.html' }
      ]},
      { group: 'Setup', items: [
        { label: 'Organisation Setup', icon: 'grid', href: 'org-setup-v4.html' },
        { label: 'Data Import', icon: 'import', href: 'dataport.html', badge: '3' },
        { label: 'Employee Assessments', icon: 'scope', href: 'employee-assessments.html' },
      ]},
      { group: 'Talent Projects', items: [] },
      { group: 'Reports', items: [
        { label: 'Organization Setup Report', icon: 'report', href: 'report.html' },
        { label: 'Gap Analysis Reports', icon: 'gap', href: 'gap-analysis-reports.html' },
      ]},
      { group: 'People', items: [
        { label: 'Employee Directory', icon: 'users', href: 'employee-directory.html', badgeMuted: (function(){try{var r=sessionStorage.getItem('sip_dataport_import')||localStorage.getItem('sip_dataport_import');if(r){var d=JSON.parse(r);if(d.employees)return String(d.employees.length)}}catch(e){}return '812'})() },
        { label: 'Scope Management', icon: 'scope', href: 'scope-management.html' },
        { label: 'Skill Passports', icon: 'passport', href: '../employee/skill-passport.html' },
      ]},
      { group: 'Framework', items: [
        { label: 'Generate Framework', icon: 'clock', href: 'skillforge.html' },
        { label: 'Approval Workflow', icon: 'search', href: 'approvalhub.html', badge: '2' },
      ]},
      { group: 'Assess', items: [
        { label: 'Assessment Cycles', icon: 'shield', href: 'assess-engine.html', badge: '1' },
        { label: 'Skills Matrix', icon: 'matrix', href: '../manager/skills-matrix.html' },
        { label: 'Survey Builder', icon: 'survey', href: 'survey-builder.html' },
        { label: 'Knowledge Tests', icon: 'test', href: 'knowledge-tests.html' },
        { label: 'Discovery Sessions', icon: 'discovery', href: 'discovery-sessions.html' },
      ]},
      { group: 'Intelligence', items: [
        { label: 'InsightBoard', icon: 'chart', href: '../manager/chro-dashboard.html' },
        { label: 'Learning Needs (LNA)', icon: 'tree', href: '../manager/lna-report.html' },
        { label: 'Individual Briefs (LNI)', icon: 'house', href: '../manager/lni-brief.html' },
        { label: 'Workforce Intelligence', icon: 'workforce', href: 'workforce-intelligence.html' },
        { label: 'Wellbeing', icon: 'bulb', href: '../manager/wellbeing-dashboard.html' },
      ]},
      { group: 'Develop', levelGate: 'L3', items: [
        { label: 'Learning Paths', icon: 'gem', href: '../employee/learning-path.html', locked: true },
        { label: 'Training', icon: 'briefcase', href: '../employee/my-training.html', locked: true },
      ]},
    ],

    manager: [
      { group: null, items: [
        { label: 'Home', icon: 'home', href: '../index.html' }
      ]},
      { group: 'Dashboards', items: [
        { label: 'CHRO Dashboard', icon: 'dash', href: 'chro-dashboard.html' },
        { label: 'CLO Dashboard', icon: 'dash', href: 'clo-dashboard.html' },
        { label: 'HR Dashboard', icon: 'dash', href: 'hr-dashboard.html' },
        { label: 'HRBP Dashboard', icon: 'dash', href: 'hrbp-dashboard.html' },
      ]},
      { group: 'Analysis', items: [
        { label: 'Skills Matrix', icon: 'matrix', href: 'skills-matrix.html' },
        { label: 'Gap Analysis', icon: 'gap', href: 'gap-analysis.html' },
        { label: 'LNA/TNA Report', icon: 'tree', href: 'lna-report.html' },
        { label: 'LNI Brief', icon: 'house', href: 'lni-brief.html' },
        { label: 'Assessment Results', icon: 'chart', href: 'assessment-results.html' },
      ]},
      { group: 'People', items: [
        { label: 'Succession Planning', icon: 'succession', href: 'succession.html' },
        { label: 'Task Evaluation', icon: 'task', href: 'task-evaluation.html' },
        { label: 'Wellbeing Dashboard', icon: 'wellbeing', href: 'wellbeing-dashboard.html' },
      ]},
      { group: 'Reports', items: [
        { label: 'L2 Reports', icon: 'report', href: 'reports-l2.html' },
      ]},
    ],

    employee: [
      { group: null, items: [
        { label: 'Home', icon: 'home', href: '../index.html' }
      ]},
      { group: 'My Profile', items: [
        { label: 'Skill Passport', icon: 'passport', href: 'skill-passport.html' },
        { label: 'Certificates', icon: 'cert', href: 'certificates.html' },
      ]},
      { group: 'Assessments', items: [
        { label: 'My Assessments', icon: 'shield', href: 'my-assessments.html' },
        { label: 'Skill Assessment', icon: 'star', href: 'skill-assessment.html' },
        { label: 'Psychometric', icon: 'psychometric', href: 'psychometric.html' },
        { label: '360 Feedback', icon: 'feedback', href: '360-feedback.html' },
      ]},
      { group: 'Development', items: [
        { label: 'My IDP', icon: 'chart', href: 'my-idp.html' },
        { label: 'Learning Path', icon: 'path', href: 'learning-path.html' },
        { label: 'My Training', icon: 'training', href: 'my-training.html' },
      ]},
    ],
  };

  /* ── LOGO SVG ─────────────────────────────────────────────── */
  const logoSvg = `<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="5" height="5" rx="1.5" fill="#0F1117"/>
    <rect x="8" y="1" width="5" height="5" rx="1.5" fill="#0F1117" opacity="0.5"/>
    <rect x="1" y="8" width="5" height="5" rx="1.5" fill="#0F1117" opacity="0.5"/>
    <rect x="8" y="8" width="5" height="5" rx="1.5" fill="#0F1117" opacity="0.3"/>
  </svg>`;

  /* ── TOPBAR ACTION ICONS ──────────────────────────────────── */
  const topbarIcons = {
    plus: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 1v10M1 6h10"/></svg>',
    export: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 8l3 3 5-6"/></svg>',
    download: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 1v7M3 6l3 3 3-3"/><path d="M1 10v1h10v-1"/></svg>',
    filter: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 2h10L7 6.5V10l-2 1V6.5L1 2z"/></svg>',
    settings: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="6" r="2"/><path d="M6 1v1.5M6 9.5V11M1 6h1.5M9.5 6H11M2.5 2.5l1 1M8.5 8.5l1 1M9.5 2.5l-1 1M3.5 8.5l-1 1"/></svg>',
    table: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="1" width="10" height="10" rx="1.5"/><path d="M4 4h4M4 7h2"/></svg>',
  };

  /* ── BUILD NAV ITEM HTML ──────────────────────────────────── */
  function buildNavItem(item, activeLabel, portalPrefix) {
    const isActive = item.label === activeLabel;
    const lockedAttr = item.locked ? ' style="opacity:0.4;pointer-events:none;"' : '';

    let href = item.href || '#';
    // Don't prefix if href already starts with '../' or is absolute
    if (portalPrefix && !href.startsWith('../') && !href.startsWith('http') && !href.startsWith('#')) {
      // href is relative to current folder, keep as-is
    }

    let inner = '';
    if (item.icon && icons[item.icon]) {
      inner += icons[item.icon];
    }
    inner += `<span class="nav-label">${item.label}</span>`;

    if (item.badge) {
      inner += `<span class="nav-badge">${item.badge}</span>`;
    }
    if (item.badgeMuted) {
      inner += `<span class="nav-badge muted">${item.badgeMuted}</span>`;
    }
    if (item.locked) {
      inner += '<span class="nav-lock">\u{1F512}</span>';
    }

    let html = `<div class="nav-item${isActive ? ' active' : ''}"${lockedAttr}>`;
    html += `<a href="${href}" style="text-decoration:none;color:inherit;display:flex;align-items:center;width:100%;height:100%;"><div class="nav-item-inner">${inner}</div></a>`;
    html += '</div>';

    // Sub-items
    if (item.sub && item.sub.length) {
      html += '<div class="nav-sub" style="display:block;">';
      item.sub.forEach(sub => {
        const subActive = sub.label === activeLabel;
        let subInner = `<span class="nav-label">${sub.label}</span>`;
        if (sub.badgeMuted) subInner += `<span class="nav-badge muted">${sub.badgeMuted}</span>`;

        let subHref = sub.href || '#';
        html += `<div class="nav-item${subActive ? ' active' : ''}">`;
        html += `<a href="${subHref}" style="text-decoration:none;color:inherit;display:flex;align-items:center;width:100%;height:100%;"><div class="nav-item-inner">${subInner}</div></a>`;
        html += '</div>';
      });
      html += '</div>';
    }

    return html;
  }

  /* ── BUILD FULL NAV HTML ──────────────────────────────────── */
  function buildNav(portal, activeLabel) {
    const structure = navStructure[portal] || navStructure.admin;
    let html = '';

    structure.forEach(group => {
      html += '<div class="nav-group">';
      if (group.group) {
        let groupLabel = group.group;
        if (group.levelGate) {
          groupLabel += ` <span style="opacity:0.4;font-size:8px;">${group.levelGate}</span>`;
        }
        html += `<div class="nav-group-label">${groupLabel}</div>`;
      }
      group.items.forEach(item => {
        html += buildNavItem(item, activeLabel, portal);
      });
      html += '</div>';
    });

    return html;
  }

  /* ── BUILD TOPBAR HTML ────────────────────────────────────── */
  function buildBreadcrumbs(parts) {
    if (!parts || !parts.length) return '';
    return parts.map((part, i) => {
      if (i === parts.length - 1) {
        return `<span class="bc-current">${part}</span>`;
      }
      return `<span class="bc-part">${part}</span><span class="bc-sep">\u203A</span>`;
    }).join('');
  }

  function buildTopbarActions(actions) {
    if (!actions || !actions.length) return '';
    let html = '';
    actions.forEach(a => {
      const cls = a.primary ? ' primary' : '';
      const icon = a.icon && topbarIcons[a.icon] ? topbarIcons[a.icon] : '';
      html += `<button class="topbar-btn${cls}">${icon} ${a.label}</button>`;
    });
    return html;
  }

  /* ── INIT ─────────────────────────────────────────────────── */
  function init(config) {
    const {
      portal = 'admin',
      activeNav = '',
      breadcrumbs = [],
      topbarActions = [],
      user = { initials: 'PR', name: 'Priya Rajesh', role: 'CHRO \u00B7 NovaTech' },
      org = { initials: 'NT', name: 'NovaTech Solutions', level: 'Level 2 \u00B7 Growth' },
      levelProgress = { current: 2, total: 5 }
    } = config;

    // Build level dots
    let levelDots = '';
    for (let i = 1; i <= levelProgress.total; i++) {
      if (i <= levelProgress.current) {
        levelDots += '<div class="nlp-dot done"></div>';
      } else if (i === levelProgress.current + 1) {
        levelDots += '<div class="nlp-dot current"></div>';
      } else {
        levelDots += '<div class="nlp-dot locked"></div>';
      }
    }

    // ── Build sidebar ──
    const navHTML = `
    <nav class="nav">
      <div class="nav-logo">
        <div class="nav-logo-mark">${logoSvg}</div>
        <div>
          <div class="nav-logo-text">Edstellar</div>
          <div class="nav-logo-sub">Skills Intelligence</div>
        </div>
      </div>

      <div class="org-chip">
        <div class="org-avatar">${org.initials}</div>
        <div class="org-info">
          <div class="org-name">${org.name}</div>
          <div class="org-level">${org.level}</div>
        </div>
        <div class="org-chevron">\u2304</div>
      </div>

      <div class="nav-scroll">
        ${buildNav(portal, activeNav)}
      </div>

      <div class="nav-level-progress">
        <div class="nlp-header">
          <span class="nlp-label">Platform Level</span>
          <span class="nlp-value">L${levelProgress.current} Active</span>
        </div>
        <div class="nlp-track">${levelDots}</div>
      </div>

      <div class="nav-user">
        <div class="user-avatar">${user.initials}</div>
        <div>
          <div class="user-name">${user.name}</div>
          <div class="user-role">${user.role}</div>
        </div>
        <div class="user-more">\u22EF</div>
      </div>
    </nav>`;

    // ── Build topbar ──
    const topbarHTML = `
    <header class="topbar">
      <div class="topbar-breadcrumb">
        ${buildBreadcrumbs(breadcrumbs)}
      </div>
      <div class="topbar-actions">
        ${buildTopbarActions(topbarActions)}
        <div class="notif-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M7 1.5A4 4 0 003 5.5v3L2 10h10l-1-1.5v-3A4 4 0 007 1.5z"/>
            <path d="M5.5 10.5a1.5 1.5 0 003 0"/>
          </svg>
          <div class="notif-dot"></div>
        </div>
      </div>
    </header>`;

    // ── Inject into DOM ──
    // Grab existing main content
    const mainEl = document.querySelector('.main') || document.querySelector('#page-content') || document.querySelector('main');

    if (mainEl) {
      // Ensure main has the right class
      mainEl.classList.add('main');
      mainEl.style.gridArea = 'main';

      // Insert nav and topbar before main
      mainEl.insertAdjacentHTML('beforebegin', navHTML + topbarHTML);
    }
  }

  return { init, navStructure, icons };
})();
