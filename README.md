# Edstellar SIP — Skills Intelligence Platform

Demo prototype built in the Edstellar Admin Portal UI design system.

## Tech Stack

- Pure HTML/CSS/JS — no build tools, no frameworks
- Shared design system: `styles/design-system.css`
- Shared shell component: `components/shell.js` (sidebar, topbar, layout)
- Fonts: Fraunces (display), DM Sans (body), DM Mono (code/data)
- Theme: Light surfaces, dark sidebar, warm amber-gold accent

## Folder Structure

```
DemoV3/
├── styles/
│   └── design-system.css       # Shared design tokens & layout
├── components/
│   └── shell.js                # Reusable nav shell (3 portals)
├── admin/                      # Admin portal pages
├── manager/                    # Manager portal pages
├── employee/                   # Employee portal pages
├── index.html                  # Portal home / landing
├── login.html                  # Login page
├── demo-walkthrough.html       # Guided demo tour
├── level-journey.html          # L1-L5 visual map
├── nav-menus.html              # All-screens navigation index
├── PROGRESS.md                 # Build progress tracker
└── README.md
```

## Running Locally

Open any `.html` file in a browser. No server required.

## Portals

| Portal | Audience | Folder |
|--------|----------|--------|
| Admin | HR Admins, L&D Managers | `admin/` |
| Manager | CHRO, CLO, HR, HRBP | `manager/` |
| Employee | All employees | `employee/` |
