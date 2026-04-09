# org-setup-v4.html — Phase-by-Phase Update Plan

**Source file:** `admin/org-setup-v4.html` (5,069 lines)  
**Field reference:** `admin/fields.html` · `sip_field_registry_complete.html` (1,404 fields)  
**Design system:** `styles/design-system.css`

---

## Architecture Primer

Before modifying anything, understand the file's three-layer pattern — every change follows it:

```
BLOCKS array          → dashboard card metadata (id, title, icon, phase, desc)
BLOCK_RENDERERS[id]   → { edit: fn(), ro: fn() }  registered at line ~2083
renderBlockContent(id)→ calls edit() or ro() based on editMode flag (line 1035)
getBlockState(id).data→ persisted via sessionStorage key 'sip_orgsetup_v4'
setBlockData(id, data) → writes data + sets status, triggers saveState()
```

**Tab system** (used by Block A and Block B):
```js
var blockXActiveTab = 'tabName';           // module-level variable
function switchBlockXTab(tab){ blockXActiveTab=tab; renderBlockContent('X'); }
// In renderBlockX_Edit():
h += '<div class="hier-tabs">...</div>';
h += '<div class="hier-tab-content'+(blockXActiveTab==='tab1'?' active':'')+'">';
```

**Data shape** stored per block:
```js
// Each block owns its own data object — no shared namespace
getBlockState('A').data  // { legalName, primaryIndustry, coreValues, definitions:[], ... }
getBlockState('B').data  // { levels:[], nodes:[], hierarchyName, ... }
```

---

## Phase 1 — Foundation (Blocks A, B, F)

> Augments the 3 blocks that form the organisation's identity, location structure, and compliance baseline.  
> These must be completed before any downstream screens can derive data from them.

---

### 1.1 Block A — Organisation Identity

**Current state (line 1042–1287):**
- Single-tab edit form with `BLOCK_A_FIELDS` array (19 fields)
- `blockAActiveTab` has 2 tabs: `profile` and `definitions`
- Definitions tab already implemented (from prior work)
- `renderBlockA_Edit()` at line 1139
- `renderBlockA_ReadOnly()` at line 1210
- `BLOCK_RENDERERS['A']` registered at line 2083

**What to add:** 13 missing profile fields + 2 new yearly-data tabs

#### Step 1 — Extend existing `BLOCK_A_FIELDS` array (line 1045)

Add these fields into the array after `cultureDefinition`. Use `half:true` for single-row width:

| Field ID | Label | Type | Required | Options / Placeholder |
|---|---|---|---|---|
| `legalEntityType` | Legal Entity Type | `select` | no | `Legal_Entity_Type` dropdown |
| `cinOrRegNo` | CIN / Registration No. | `text` | yes | `e.g. U15209KA2008PTC045678` |
| `primaryBusiness` | Primary Business | `text` | no | `Main business activity in one line` |
| `website` | Website | `text` | no | `https://` |
| `vision` | Vision | `text` | no | `Long-term aspirational future state` |
| `businessObjectives` | Business Objectives | `text` | no | `Key outcomes for current planning period` |
| `headquartersAddress` | Headquarters Address | `text` | no | `Full postal address` |
| `otherBUsAndLocations` | Other BUs & Locations | `text` | no | `Comma-separated` |
| `revenueBand` | Revenue Band (USD) | `select` | no | `Revenue_Band` dropdown |
| `employeeBand` | Employee Band | `select` | no | `Employee_Band` dropdown |
| `listedStatus` | Listed Status | `select` | no | `Listed_Status` dropdown |
| `countriesOfOperation` | Countries of Operation | `number` | no | `e.g. 12` |
| `lastUpdated` | Last Updated | `date` | no | — |

**Code pattern to follow** (existing field at line 1046):
```js
{id:'legalEntityType', label:'Legal Entity Type', type:'select', half:true,
  options:['','Private Limited Company','Public Limited Company','LLP','Partnership Firm',
    'Sole Proprietorship','Government / Public Sector','NGO / Trust / Foundation',
    'Joint Venture','Cooperative','Branch of Foreign Company']},
```

#### Step 2 — Add 2 new tab state variables (after line 1067)

```js
// Block A has 4 tabs after this change
// 'profile' | 'definitions' | 'context' | 'performance'
// blockAActiveTab already declared — just document the new valid values
```

#### Step 3 — Update `renderBlockA_Edit()` (line 1139)

Add two new tab buttons and two new tab-content divs. Follow exact same `.hier-tabs` / `.hier-tab` / `.hier-tab-content` pattern used by Block B:

```js
// Add to hier-tabs div (after existing 'Definations' tab button):
h += '<div class="hier-tab'+(blockAActiveTab==='context'?' active':'')+'" onclick="switchBlockATab(\'context\')">Context Yearly</div>';
h += '<div class="hier-tab'+(blockAActiveTab==='performance'?' active':'')+'" onclick="switchBlockATab(\'performance\')">Performance Yearly</div>';

// Add two new tab-content divs:
h += '<div class="hier-tab-content'+(blockAActiveTab==='context'?' active':'')+'" id="tabAContext">';
h += renderBlockA_ContextTab();
h += '</div>';
h += '<div class="hier-tab-content'+(blockAActiveTab==='performance'?' active':'')+'" id="tabAPerformance">';
h += renderBlockA_PerformanceTab();
h += '</div>';
```

#### Step 4 — Implement `renderBlockA_ContextTab()` (new function)

Data stored as `d.contextYearly = []` — array of year-row objects.

Each row: `{ year, market_conditions, macro_economic_conditions, geopolitical_events, technology_changes, government_policy_changes, industry_disruptions, talent_market_conditions, regulatory_environment, sustainability_pressure, digital_transformation_stage, key_strategic_priorities, workforce_challenges, supply_chain_environment, carbon_emissions_tonnes }`

**UI pattern:** "Add Year" button that appends a row; each row shows a year badge + expand/collapse; follows the same pattern as Block C's risk-year rows.

**Dropdown for `digital_transformation_stage`:** `['Exploring','Piloting','Implementing','Scaling','Optimizing','AI-Native']`

#### Step 5 — Implement `renderBlockA_PerformanceTab()` (new function)

Data stored as `d.performanceYearly = []` — array of year-row objects.

Each row: `{ year, total_sales_USD_million, location_count, employee_count, same_location_sales_growth_pct, ecommerce_sales_share_pct, gross_margin_pct, operating_margin_pct, capex_USD_million, training_investment_USD, product_SKU_count, retail_accounts_served, total_milk_volume_processed }`

**Note:** `total_milk_volume_processed` is org-specific — rename to `primary_output_metric` for generic use.

#### Step 6 — Update `renderBlockA_ReadOnly()` (line 1210)

Add two read-only summary cards:
- **Context Yearly** — year list with `digital_transformation_stage` badge, `market_conditions` preview
- **Performance Yearly** — table of year | revenue | headcount | gross margin

#### Step 7 — Update `editSection('A', section)` (line 1287)

Add two new section cases:
```js
if(blockId==='A' && section==='context') blockAActiveTab = 'context';
else if(blockId==='A' && section==='performance') blockAActiveTab = 'performance';
```

---

### 1.2 Block B — Hierarchy Architecture

**Current state (line 1469–2084):**
- `hierActiveTab` with 3 tabs: `definition`, `nodes`, `secondary`
- `renderBlockB_Edit()` at line 1509
- `renderBlockB_ReadOnly()` at line 2015
- `BLOCK_RENDERERS['B']` registered at line 2084

**What to add:** 2 new tabs — Location Hierarchy + Location Master

#### Step 1 — Add new tab variable

```js
// After line 1469, hierActiveTab already covers 'definition'|'nodes'|'secondary'
// New valid values: 'locationHierarchy' | 'locationMaster'
// No new variable needed — extend the existing hierActiveTab string values
```

#### Step 2 — Update `renderBlockB_Edit()` (line 1509)

Add two tab buttons in the `.hier-tabs` div:
```js
h += '<div class="hier-tab'+(hierActiveTab==='locationHierarchy'?' active':'')+'" onclick="switchHierTab(\'locationHierarchy\')">4. Location Hierarchy</div>';
h += '<div class="hier-tab'+(hierActiveTab==='locationMaster'?' active':'')+'" onclick="switchHierTab(\'locationMaster\')">5. Location Master</div>';
```

Add two new tab-content divs calling new render functions.

#### Step 3 — Implement `renderHierTab_LocationHierarchy()` (new function)

Data stored as `d.locationHierarchy = []` — array of hierarchy nodes.

Each node: `{ Hierarchy_ID (auto), Zone, Region, Cluster, Location_ID (auto), Location_Name, Location_Type, Tier, Parent_Location_ID (auto), Hierarchy_Level_Notes }`

**Zone dropdown:** `['North','South','East','West','Central','International']`  
**Location_Type dropdown:** `['Headquarters','Regional Office','Branch Office','Manufacturing Plant','Warehouse / DC','R&D Centre','Retail Outlet','Training Centre','Co-working Space']`  
**Tier dropdown:** `['Tier 1 — Metro / Global Hub','Tier 2 — Regional Hub','Tier 3 — District Centre','Tier 4 — Local / Remote']`

**UI pattern:** Table-row form with "Add Node" button; `Hierarchy_ID` auto-generated as `HRC-0001`, etc.

#### Step 4 — Implement `renderHierTab_LocationMaster()` (new function)

Data stored as `d.locationMaster = []` — array of location records.

Each record: `{ location_id (auto: LOC-0001), location_name, city, state, region, zone, location_type, location_size_sqft, opening_year, status, manager_or_owner }`

**State dropdown:** cascade from `hqCountry` — for India use states; for generic use `Text Input`.  
**Status dropdown:** `['Active','Planned / Under Construction','Temporarily Closed','Permanently Closed','Acquired / Under Integration']`

#### Step 5 — Update `renderBlockB_ReadOnly()` (line 2015)

Add two summary sections:
- **Location Hierarchy** — tree/list view with Zone > Region > Cluster > Location
- **Location Master** — compact table: location name | city | type | status

---

### 1.3 Block F — Standards & Compliance

**Current state (line 3127–3266):**
- Simple edit form — `renderBlockF_Edit()` at line 3127
- No tab system yet
- `BLOCK_RENDERERS['F']` registered at line 3266

**What to add:** Expand existing certifications section into a full structured tab with 15 detail fields

#### Step 1 — Convert Block F to tabbed layout

Add `var blockFActiveTab = 'compliance';` module-level variable.

Add `function switchBlockFTab(tab){ blockFActiveTab=tab; renderBlockContent('F'); }`

**Tab 1 — Compliance Setup** (existing content, no change)  
**Tab 2 — Organisation Certifications** (new, 15 fields)

#### Step 2 — Implement `renderBlockF_CertificationsTab()` (new function)

Data stored as `d.certifications = []` — array of certification records.

Each record: `{ Org_Cert_ID (auto: CERT-0001), Organization_ID (auto, links to Block A Org_ID), Certification_Name, Certification_Category, Issuing_Body, Certification_Scope, Applicable_Legal_Entity, Applicable_Business_Unit, Applicable_Location_ID, Issue_Date, Expiry_Date, Renewal_Cycle, Surveillance_Audit_Frequency, Certification_Status, Compliance_Relevance, Strategic_Importance, Linked_Compliance_ID (auto), Audit_Owner, Last_Audit_Date, Next_Audit_Due_Date, Certification_Benefit_Area, Remarks }`

**Key dropdowns:**
- `Certification_Category`: `['Quality Management (ISO 9001)','Information Security (ISO 27001)','Environmental Management (ISO 14001)','Food Safety (ISO 22000/FSSC)','Health & Safety (ISO 45001)','Energy Management (ISO 50001)','Business Continuity (ISO 22301)','Data Privacy (ISO 27701/GDPR)','ESG / Sustainability Reporting','Industry-Specific','National Regulatory','Customer-Mandated']`
- `Renewal_Cycle`: `['Annual','Every 2 Years','Every 3 Years','Every 5 Years','One-Time','Continuous Monitoring']`
- `Certification_Status`: `['Active — Valid','Expiring Soon (< 90 days)','Expired','In Renewal Process','Suspended','Withdrawn / Lapsed','Applied For — Pending']`
- `Strategic_Importance`: `['Strategic — Competitive differentiator','Compliance-driven — Regulatory mandate','Customer-required — Client contract','Market access — Required for entry','Operational — Process improvement']`

**UI pattern:** Card-list with "Add Certification" button; each card shows cert name + category badge + status badge + expiry date + edit/delete.

#### Step 3 — Update `renderBlockF_ReadOnly()` (line 3194)

Add certifications summary: count by status, upcoming renewals (< 90 days), list with badge per certification.

---

## Phase 2 — Context & Risk (Blocks C, D, E, G)

> Adds risk registers, skill-to-product/service maps, market intelligence, and technology history. Depends on Phase 1 (Block A for org context, Block B for Location_IDs).

---

### 2.1 Block C — Strategy & Goals

**Current state (line 2351–2647):**
- `renderBlockC_Edit()` at line 2351  
- `renderBlockC_ReadOnly()` at line 2509
- No tab system
- `BLOCK_RENDERERS['C']` at line 2647

**What to add:** 2 new tabs — Supply Chain Risk Yearly + Crisis & Disaster Register

#### Step 1 — Add tab variable and switch function

```js
var blockCActiveTab = 'strategy';
function switchBlockCTab(tab){ blockCActiveTab=tab; renderBlockContent('C'); }
```

#### Step 2 — Wrap existing content in Tab 1 "Strategy & Goals"

Wrap current `renderBlockC_Edit()` output in a tab-content div. Tab label: **1. Strategy & Goals**.

#### Step 3 — Implement `renderBlockC_SupplyChainTab()` (new function)

Data stored as `d.supplyChainRisk = []` — year-row array.

Each row: `{ year, supply_chain_risk_level, logistics_disruption_events, vendor_regulation_compliance_pct (required), critical_input_supply_risk, key_material_risk, dual_source_coverage_pct, on_time_delivery_pct, critical_supplier_count, fuel_cost_index, avg_critical_procurement_cost, field_staff_shortage_severity, critical_storage_failure_events, key_risk_narrative }`

**Risk level dropdown:** `['Low','Medium','High','Critical']`  
**UI:** Collapsible year-rows, with risk level badge (colour-coded: green/amber/orange/red).

#### Step 4 — Implement `renderBlockC_CrisisTab()` (new function)

Data stored as `d.crisisRegister = []` — array of crisis records.

Each record: `{ Crisis_Record_ID (auto: CRISIS-0001), Year, Crisis_or_Disaster_Name, Crisis_Category, Crisis_Subcategory, Geographic_Area_Affected, Location_ID, Severity_Level, Start_Date, End_Date, Duration_Days (calculated), Operational_Impact, Workforce_Impact, Financial_Impact_Estimate, Recovery_Status, Lessons_Learned, Future_Preparedness_Action }`

**Crisis_Category dropdown:** `['Natural Disaster','Industrial Accident','Cyber / Data Breach','Pandemic / Health Emergency','Supply Chain Disruption','Regulatory / Legal Action','Financial Crisis','Labour Dispute / Strike','Product Recall','Reputational Crisis','Leadership Crisis','Geopolitical Disruption']`  
**Severity dropdown:** `['Critical — Business halted','High — Major disruption','Medium — Moderate disruption','Low — Minimal impact']`  
**Recovery_Status dropdown:** `['Fully Recovered','Substantially Recovered','Partial Recovery','Recovery in Progress','Not Yet Started']`

`Duration_Days` = calculated from `Start_Date` and `End_Date` — render as read-only.

---

### 2.2 Block D — Products & Services

**Current state (line 2666–2885):**
- `renderBlockD_Edit()` at line 2666
- `renderBlockD_ReadOnly()` at line 2782
- `BLOCK_RENDERERS['D']` at line 2885

**What to add:** 3 new tabs — Product Skill Map + Service Skill Map + Projects

#### Step 1 — Add tab variable

```js
var blockDActiveTab = 'products';
function switchBlockDTab(tab){ blockDActiveTab=tab; renderBlockContent('D'); }
```

Wrap existing edit content in **Tab 1 "Products & Services"**.

#### Step 2 — Implement `renderBlockD_ProductSkillMapTab()` (new function)

Data stored as `d.productSkillMap = []`.

Each record: `{ Product_ID (auto, populated from d.products), Product_Name (read-only, from Product_Portfolio), Required_Skill, Skill_Level (required), Criticality, Skill_Category (required), Notes }`

**Product_ID**: auto-linked to Block D's existing product list — show a dropdown of existing products.  
**Skill_Level dropdown:** `['Foundational (L1)','Developing (L2)','Proficient (L3)','Expert / Master (L4)']`  
**Criticality dropdown:** `['Low','Medium','High','Critical']`

#### Step 3 — Implement `renderBlockD_ServiceSkillMapTab()` (new function)

Same pattern as Product Skill Map but linked to service records: `{ Service_ID (auto), Service_Name, Required_Skill, Skill_Level (required), Criticality, Notes }`

#### Step 4 — Implement `renderBlockD_ProjectsTab()` (new function)

Data stored as `d.projects = []`.

Each record: `{ Project_ID (auto: PROJ-0001), Project_Name, Project_Type, Location_or_Unit (from Block B), Start_Year, End_Year, Budget_USD, Primary_Skill, Project_Status, Business_Outcome, Lead_Employee_ID }`

**Project_Type dropdown:** `['Technology Implementation','Infrastructure / Capex','Capacity Expansion','R&D / Innovation','Process Improvement','Compliance / Regulatory','Business Transformation','M&A Integration']`  
**Project_Status dropdown:** `['Not Started','In Planning','In Progress','On Hold','Completed','Cancelled']`

---

### 2.3 Block E — Client & Market

**Current state (line 2903–3114):**
- `renderBlockE_Edit()` at line 2903
- `renderBlockE_ReadOnly()` at line 3009
- `BLOCK_RENDERERS['E']` at line 3114

**What to add:** 2 new tabs — Regulatory Skill Demand + Market Skill Demand

#### Step 1 — Add tab variable

```js
var blockEActiveTab = 'clients';
function switchBlockETab(tab){ blockEActiveTab=tab; renderBlockContent('E'); }
```

#### Step 2 — Implement `renderBlockE_RegulatoryTab()` (new function)

Data stored as `d.regulatorySkillDemand = []` — year-row array.

Each row: `{ year, regulatory_skill_demand, compliance_training_hours (required), top_compliance_skills, environmental_skill_gap (auto-derived), technology_compliance_requirements (auto-derived) }`

`environmental_skill_gap` and `technology_compliance_requirements` are **Dependent** fields — render as read-only text derived from Block C data.

#### Step 3 — Implement `renderBlockE_MarketDemandTab()` (new function)

Data stored as `d.marketSkillDemand = []`.

Each record: `{ Signal_ID (auto: MSD-0001), Year, Quarter, Skill_Name (from Block J skill list), Skill_Domain_ID (auto, from Skill), Signal_Source (calculated — admin-set), Demand_Level, Demand_Growth_YoY_PCT, Industry_Prevalence, Salary_Premium_PCT, Geographic_Demand, Emerging_Technology_Driver, Regulation_Driver, Automation_Risk_Score, Availability_in_Market, Notes }`

**Quarter dropdown:** `['Q1','Q2','Q3','Q4']`  
**Demand_Level dropdown:** `['Low','Medium','High','Critical']`  
**Availability dropdown:** `['Widely Available','Available','Scarce','Very Scarce','Not Yet Commercially Available']`

---

### 2.4 Block G — Tools & Technologies

**Current state (line 3280–3425):**
- `renderBlockG_Edit()` at line 3280
- `renderBlockG_ReadOnly()` at line 3343
- `BLOCK_RENDERERS['G']` at line 3425

**What to add:** 1 new tab — Technology Stack History (33 fields, year-by-year)

#### Step 1 — Add tab variable

```js
var blockGActiveTab = 'current';
function switchBlockGTab(tab){ blockGActiveTab=tab; renderBlockContent('G'); }
```

#### Step 2 — Implement `renderBlockG_StackHistoryTab()` (new function)

Data stored as `d.techStackHistory = []` — one record per tool per year.

Each record: `{ Tech_Record_ID (auto: TECH-0001), Year, Business_Unit, Department_or_Function, Technology_Category, Technology_Subcategory, Technology_or_Tool_Name, Vendor_or_Provider, Tool_Type, Deployment_Model, Usage_Status, Adoption_Level, Introduced_Year, Retired_Year, Primary_Use_Case, Business_Process_Supported, User_Base_Type, Estimated_User_Count, Locations_Using_Tool, Criticality_Level, Roles_Impacted, Skills_Impacted (required), Training_Required_Flag (toggle, required), Training_Program_Linked (auto), Automation_Impact }`

**Key dropdowns:**
- `Technology_Category`: `['ERP','CRM','HRMS / HRIS','LMS','Analytics & BI','Collaboration & Communication','Cloud Platform','Cybersecurity & Access','IoT / Industrial Automation','AI / ML Platform','RPA / Automation','Finance & Accounting','SCM','Quality Management','Project Management','Payroll','Recruitment / ATS']`
- `Usage_Status`: `['Active — Full Use','Active — Partial Use','Piloting / POC','Being Phased Out','Retired / Decommissioned','On Hold']`
- `Adoption_Level`: `['Full Adoption (>80%)','High Adoption (60–80%)','Moderate Adoption (40–60%)','Low Adoption (<40%)','Exploration Only']`
- `Criticality_Level`: `['Mission Critical','Business Critical','Operational','Supporting','Exploratory']`
- `Deployment_Model`: `['SaaS / Cloud','On-Premise','Hybrid','PaaS','IaaS','Custom-Built']`

**UI:** Year-grouped view with collapsible rows per tool. `Training_Required_Flag` renders as a toggle switch.

---

## Phase 3 — Taxonomy (Blocks J, K, L)

> Expands the three knowledge-structure blocks. These are the richest in complexity — Block J alone gains 4 tabs totalling 47 fields. Phase 3 depends on Block A (org identity) and Block B (location) being populated.

---

### 3.1 Block J — Skills Dictionary

**Current state (line 3493–3825):**
- `renderBlockJ_Edit()` at line 3493
- `renderBlockJ_ReadOnly()` at line 3695
- `BLOCK_RENDERERS['J']` at line 3825

**What to add:** 4 new tabs — Skill Ontology (11) + Skills (12) + Skill Categories (6) + Skill Graph (18)

#### Step 1 — Add tab variable

```js
var blockJActiveTab = 'dictionary';
function switchBlockJTab(tab){ blockJActiveTab=tab; renderBlockContent('J'); }
```

Wrap existing content in **Tab 1 "Skills Dictionary"** (existing tab).

#### Step 2 — Implement `renderBlockJ_OntologyTab()` (new function)

Data stored as `d.skillOntology = []`.

Each record: `{ Skill_Domain, Knowledge_Area, Skill_Category, Skill_Name, Skill_Description (textarea), Proficiency_Level (dropdown, 1–5), Skill_Proficiency_Description (textarea), Assessment_Method (text), Review_Frequency (text), Emerging_Flag (toggle), Regulatory_Flag (toggle, required) }`

**Proficiency_Level dropdown:** `['Level 1 — Awareness','Level 2 — Working Knowledge','Level 3 — Practitioner','Level 4 — Expert','Level 5 — Master']`

#### Step 3 — Implement `renderBlockJ_SkillsTab()` (new function)

Data stored as `d.skillsMaster = []`.

Each record: `{ Skill_ID (auto: SKILL-0001), Skill_Name, Skill_Domain_ID (auto, linked to ontology), Skill_Domain (read-only, from ontology), Skill_Type, Description (textarea), Proficiency_Scale_Max (numeric), Emerging_Skill_Flag (dependent toggle — auto from ontology), Regulatory_Skill_Flag (toggle), Assessment_Method, Review_Frequency, Active_Flag (toggle) }`

**Skill_Type dropdown:** `['Technical / Hard Skill','Behavioural / Soft Skill','Digital / Technology Skill','Leadership Skill','Domain Knowledge','Certification-backed','Future / Emerging Skill','Safety / Compliance Skill']`

#### Step 4 — Implement `renderBlockJ_CategoriesTab()` (new function)

Data stored as `d.skillCategories = []`.

Each record: `{ Category_ID (auto: SCAT-0001), Category_Name, Category_Type (dropdown), Parent_Category (text), Description (textarea), Skill_Count (calculated — count of skills with matching category) }`

**Category_Type dropdown:** `['Technical Domain','Behavioural Domain','Digital Domain','Leadership Domain','Safety Domain','Cross-Functional']`

#### Step 5 — Implement `renderBlockJ_SkillGraphTab()` (new function)

Data stored as `d.skillGraph = []`.

Each record: `{ Skill_Graph_ID (auto: SGR-0001), Source_Skill_ID (auto, from Skills), Source_Skill_Name (dependent, read-only), Target_Skill_ID (auto), Target_Skill_Name (dependent, read-only), Relationship_Type, Relationship_Strength, Direction, Validated_Flag (toggle), Source_of_Evidence, Notes }`

**Relationship_Type dropdown:** `['Prerequisite (must have before)','Complementary (enhances each other)','Progression (leads to next level)','Substitutable (can replace)','Cluster (part of same domain)','Inverse (conflict / trade-off)']`  
**Relationship_Strength dropdown:** `['Strong','Moderate','Weak']`  
**Direction dropdown:** `['One-Way (Source → Target)','Bidirectional']`

**UI note:** Consider a visual "from → to" display showing skill name pair + relationship badge.

---

### 3.2 Block K — Competency Framework

**Current state (line 3844–4055):**
- `renderBlockK_Edit()` at line 3844
- `renderBlockK_ReadOnly()` at line 3951
- `BLOCK_RENDERERS['K']` at line 4055

**What to add:** 3 new tabs — Competency Framework + Competencies + Proficiency Levels

#### Step 1 — Add tab variable

```js
var blockKActiveTab = 'framework';
function switchBlockKTab(tab){ blockKActiveTab=tab; renderBlockContent('K'); }
```

Wrap existing content in **Tab 1 "Framework Setup"** (existing content).

#### Step 2 — Implement `renderBlockK_FrameworkTab()` (new function)

Data stored as `d.competencyFrameworks = []`.

Each record: `{ Competency_Framework_ID (auto: CFW-0001), Framework_Name (dropdown — from existing framework names), Competency_Name, Competency_Type, Category, Description (textarea) }`

**Framework_Name dropdown:** `['Core Competency Framework','Leadership Framework','Technical Framework','Behavioural Framework','Safety Framework']` — or user-defined.

#### Step 3 — Implement `renderBlockK_CompetenciesTab()` (new function)

Data stored as `d.competencies = []`.

Each record: `{ Competency_ID (auto: COMP-0001), Competency_Name, Type (dropdown), Category, Description (textarea), Active_Flag (toggle) }`

**Type dropdown:** `['Core / Organisational','Behavioural / Soft Skill','Leadership & Management','Technical / Functional','Digital / Technology','Safety & Compliance']`

#### Step 4 — Implement `renderBlockK_ProficiencyLevelsTab()` (new function)

Data stored as `d.competencyProficiencyLevels = []`.

Each record: `{ Level_ID (auto: CPL-0001), Competency_ID (linked from Competencies), Competency_Name (dependent, read-only), Proficiency_Level (dropdown), Competency_Proficiency_Label, Competency_Proficiency_Description (textarea), Observable_Behaviours }`

**Proficiency_Level dropdown:** `['Awareness (L1)','Working Knowledge (L2)','Practitioner (L3)','Expert / Master (L4)']`

**Note on renamed fields:** The complete registry renames `Level_Label` → `Competency_Proficiency_Label` and `Level_Description` → `Competency_Proficiency_Description`. Use the new names.

---

### 3.3 Block L — Job Role Definitions

**Current state (line 4094–4543):**
- `renderBlockL_Edit()` at line 4094
- `renderBlockL_ReadOnly()` at line 4327
- `BLOCK_RENDERERS['L']` at line 4543

**What to add:** 3 new tabs — Role Hierarchy Levels + Role Skill Requirements + Role Competency Requirements

#### Step 1 — Add tab variable

```js
var blockLActiveTab = 'roles';
function switchBlockLTab(tab){ blockLActiveTab=tab; renderBlockContent('L'); }
```

Wrap existing content in **Tab 1 "Job Role Definitions"** (existing content).

#### Step 2 — Implement `renderBlockL_RoleLevelsTab()` (new function)

Data stored as `d.roleHierarchyLevels = []`.

Each record: `{ Role_Level_ID (auto: RLV-0001), Level_Name, Grade_Band (dropdown), Role_Category (dropdown), Typical_Span_of_Control (numeric), Career_Progression_Path }`

**Grade_Band dropdown:** `['Grade 1 — Trainee','Grade 2 — Junior','Grade 3 — Mid-Level','Grade 4 — Senior','Grade 5 — Lead / Principal','Grade 6 — Manager','Grade 7 — Senior Manager','Grade 8 — Director / VP','Grade 9 — C-Suite']`

**Role_Category dropdown:** `['C-Suite / Executive','Senior Management (VP / Director)','Middle Management (Manager / Head)','Team Lead / Supervisor','Senior Individual Contributor','Individual Contributor','Operations / Frontline','Support / Administrative','Trainee / Intern']`

#### Step 3 — Implement `renderBlockL_RoleSkillReqTab()` (new function)

Data stored as `d.roleSkillRequirements = []`.

Each record: `{ Role_ID (auto, from existing role list in Block L), Required_Skill (from Block J skill list), Min_Proficiency_Level (dropdown), Skill_Weight_Pct (numeric) }`

**Min_Proficiency_Level dropdown:** `['Foundational (L1)','Developing (L2)','Proficient (L3)','Expert / Master (L4)']`

**Cross-link:** `Required_Skill` should use a typeahead/dropdown populated from `getBlockState('J').data.skillsMaster`.

#### Step 4 — Implement `renderBlockL_RoleCompReqTab()` (new function)

Data stored as `d.roleCompetencyRequirements = []`.

Each record: `{ Role_ID (auto), Competency_ID (auto, from Block K), Min_Proficiency (dropdown), Assessment_Method (dropdown), Weight_Pct (numeric) }`

**Assessment_Method dropdown:** `['Online MCQ Test','Practical Simulation','Structured Interview','360 Degree Feedback','Portfolio Review','Observation / Demonstration','Written Assignment','Certification Exam']`

**Cross-link:** `Competency_ID` dropdown from `getBlockState('K').data.competencies`.

---

## Global Changes Required Across All Phases

These changes must be made **once** and apply to all phases:

### G.1 — State schema versioning

When adding new fields to existing blocks, the state schema changes. Update `defaultState()` at line 687 to initialise new data arrays:

```js
// In defaultState(), under each block's data:
// Block A:
data: { ..., contextYearly: [], performanceYearly: [] }
// Block B:
data: { ..., locationHierarchy: [], locationMaster: [] }
// Block C:
data: { ..., supplyChainRisk: [], crisisRegister: [] }
// Block D:
data: { ..., productSkillMap: [], serviceSkillMap: [], projects: [] }
// Block E:
data: { ..., regulatorySkillDemand: [], marketSkillDemand: [] }
// Block F:
data: { ..., certifications: [] }
// Block G:
data: { ..., techStackHistory: [] }
// Block J:
data: { ..., skillOntology: [], skillsMaster: [], skillCategories: [], skillGraph: [] }
// Block K:
data: { ..., competencyFrameworks: [], competencies: [], competencyProficiencyLevels: [] }
// Block L:
data: { ..., roleHierarchyLevels: [], roleSkillRequirements: [], roleCompetencyRequirements: [] }
```

Also bump the storage version: `version: '5.0'` and add a migration check in `loadState()`:

```js
function loadState(){
  try{
    var raw=sessionStorage.getItem(STORAGE_KEY);
    if(raw){
      var parsed=JSON.parse(raw);
      if(parsed.version !== '5.0') return defaultState(); // force reset on version mismatch
      return parsed;
    }
  }catch(e){}
  return defaultState();
}
```

### G.2 — Auto-ID generator utility

Many new fields use auto-generated IDs (e.g. `CERT-0001`, `LOC-0001`). Add a utility function once, reuse everywhere:

```js
function genID(prefix, existingList){
  var n = (existingList.length + 1).toString().padStart(4, '0');
  return prefix + '-' + n;
}
// Usage: genID('CERT', d.certifications)  → 'CERT-0001'
```

### G.3 — Helper: render year-row table (reusable pattern)

Yearly-data tabs (Block A, Block C) all follow the same "add year row" UX. Extract a reusable renderer:

```js
function renderYearTable(rows, colDefs, addFn, removeFn){
  // colDefs: [{id, label, type, options}]
  // Returns HTML string for the table + "Add Year" button
}
```

### G.4 — Cross-block dependency helpers

Phase 3 tabs (Block J, K, L) need data from other blocks. Add read-only helpers:

```js
function getSkillsList(){ return (getBlockState('J').data.skillsMaster||[]).map(function(s){return s.Skill_Name}).filter(Boolean); }
function getCompetenciesList(){ return (getBlockState('K').data.competencies||[]).map(function(c){return {id:c.Competency_ID, name:c.Competency_Name}}); }
function getRolesList(){ return (getBlockState('L').data||{}).roles||[]; }
function getLocationsList(){ return (getBlockState('B').data.locationMaster||[]).map(function(l){return l.location_id}); }
```

### G.5 — Progress bar recalculation

The progress bar at the top counts complete blocks. After adding tabs, a block should only be "complete" if all its tabs have at least some data. Update `checkBlockCompletion()` logic per block — use a simple heuristic: `complete` if the block's primary data array has ≥ 1 entry AND the original required fields are filled.

### G.6 — Navigation — `editSection()` extension

The `editSection(blockId, section)` function at line 1287 currently only handles Block A. Extend it for all newly tabbed blocks:

```js
function editSection(blockId, section){
  if(blockId==='A'){
    if(section==='context') blockAActiveTab='context';
    else if(section==='performance') blockAActiveTab='performance';
    else if(section==='definitions') blockAActiveTab='definitions';
    else blockAActiveTab='profile';
  } else if(blockId==='B'){
    if(section==='locationHierarchy') hierActiveTab='locationHierarchy';
    else if(section==='locationMaster') hierActiveTab='locationMaster';
  } else if(blockId==='C'){
    if(section==='supplyChain') blockCActiveTab='supplyChain';
    else if(section==='crisis') blockCActiveTab='crisis';
  } else if(blockId==='D'){
    if(section==='productSkillMap') blockDActiveTab='productSkillMap';
    else if(section==='serviceSkillMap') blockDActiveTab='serviceSkillMap';
    else if(section==='projects') blockDActiveTab='projects';
  } else if(blockId==='E'){
    if(section==='regulatory') blockEActiveTab='regulatory';
    else if(section==='marketDemand') blockEActiveTab='marketDemand';
  } else if(blockId==='F'){
    if(section==='certifications') blockFActiveTab='certifications';
  } else if(blockId==='G'){
    if(section==='stackHistory') blockGActiveTab='stackHistory';
  } else if(blockId==='J'){
    if(section==='ontology') blockJActiveTab='ontology';
    else if(section==='skills') blockJActiveTab='skills';
    else if(section==='categories') blockJActiveTab='categories';
    else if(section==='graph') blockJActiveTab='graph';
  } else if(blockId==='K'){
    if(section==='frameworks') blockKActiveTab='frameworks';
    else if(section==='competencies') blockKActiveTab='competencies';
    else if(section==='proficiency') blockKActiveTab='proficiency';
  } else if(blockId==='L'){
    if(section==='levels') blockLActiveTab='levels';
    else if(section==='skillReq') blockLActiveTab='skillReq';
    else if(section==='compReq') blockLActiveTab='compReq';
  }
  enterEditMode();
}
```

---

## Implementation Order & File Locations

| # | Block | Phase | Function(s) to Add | Approx. Insert After Line | New JS lines est. |
|---|---|---|---|---|---|
| 1 | A — Context & Performance tabs | 1 | `renderBlockA_ContextTab()`, `renderBlockA_PerformanceTab()` | 1136 | ~150 |
| 2 | A — BLOCK_A_FIELDS extension | 1 | extend array at line 1045 | 1065 | ~30 |
| 3 | B — Location Hierarchy & Master tabs | 1 | `renderHierTab_LocationHierarchy()`, `renderHierTab_LocationMaster()` | 2011 | ~180 |
| 4 | F — Certifications tab | 1 | `renderBlockF_CertificationsTab()` | 3192 | ~200 |
| 5 | C — Supply Chain & Crisis tabs | 2 | `renderBlockC_SupplyChainTab()`, `renderBlockC_CrisisTab()` | 2507 | ~220 |
| 6 | D — Skill Maps & Projects tabs | 2 | `renderBlockD_ProductSkillMapTab()`, `renderBlockD_ServiceSkillMapTab()`, `renderBlockD_ProjectsTab()` | 2780 | ~180 |
| 7 | E — Regulatory & Market Demand tabs | 2 | `renderBlockE_RegulatoryTab()`, `renderBlockE_MarketDemandTab()` | 3007 | ~200 |
| 8 | G — Tech Stack History tab | 2 | `renderBlockG_StackHistoryTab()` | 3341 | ~220 |
| 9 | J — 4 taxonomy tabs | 3 | `renderBlockJ_OntologyTab()`, `renderBlockJ_SkillsTab()`, `renderBlockJ_CategoriesTab()`, `renderBlockJ_SkillGraphTab()` | 3693 | ~350 |
| 10 | K — 3 competency tabs | 3 | `renderBlockK_FrameworkTab()`, `renderBlockK_CompetenciesTab()`, `renderBlockK_ProficiencyLevelsTab()` | 3949 | ~280 |
| 11 | L — 3 role tabs | 3 | `renderBlockL_RoleLevelsTab()`, `renderBlockL_RoleSkillReqTab()`, `renderBlockL_RoleCompReqTab()` | 4325 | ~250 |
| 12 | Global — state, utilities, editSection | all | `genID()`, `getSkillsList()` etc, `editSection()` update | 1285 | ~60 |

**Estimated total new JS:** ~2,300 lines  
**Projected final file size:** ~7,400 lines

---

## Conventions to Follow (Non-Negotiable)

- All field IDs use **camelCase** in JS data objects; display labels use **Title Case with spaces**
- All dropdowns use the exact values defined in `admin/fields.html` → Dropdown Library section
- Auto-generated IDs use the prefix-padded format: `genID('CERT', d.certifications)`
- Dependent (read-only) fields render as `<span class="ro-value">` — never as `<input>`
- Required fields are marked with `<span class="req">*</span>` in the label
- Every new tab must add an `ro` (read-only) card to the block's `renderBlockX_ReadOnly()` function
- Data is always saved via `setBlockData(id, d)` — never write to `state` directly
- `renderBlockContent(id)` must be called after every save, add, or remove action to re-render
- CSS classes: `form-group`, `form-label`, `form-input`, `form-select`, `form-textarea`, `form-grid` — do not create new form CSS, reuse what exists
- Toggle inputs use the existing `.toggle-switch` / `.toggle-track` pattern used in Block H
