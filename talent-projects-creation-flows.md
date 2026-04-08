# Talent Projects Creation Flows

## Overview

This document outlines the step-by-step creation flows for all 9 talent project types in the SIP (Skills Intelligence Platform). Each flow follows a consistent pattern while customizing fields and configuration options specific to the project type.

---

## Common Flow Pattern

All project types follow this general structure:

1. **Project Type Selection** - Dropdown to select project category
2. **Basic Information** - Name, description, and category fields
3. **Configuration** - Type-specific settings and options
4. **Target Assignment/Audience** - Who participates or receives the project
5. **Schedule/Timeline** - Dates, deadlines, and frequency
6. **Action Buttons** - Primary CTA to create the project

---

## 1. Assessments

### Flow Steps

#### Step 1: Project Type Selection
- **Field**: Dropdown
- **Label**: "Select Project Type"
- **Value**: "Assessments"

#### Step 2: Basic Information
- **Title**: "Basic Information"
- **Fields**:
  - Assessment Name (Text, required)
  - Description (Textarea, optional)
  - Assessment Type (Dropdown)

#### Step 3: Assessment Configuration
- **Title**: "Assessment Configuration"
- **Fields**:
  - Assessment Type (Dropdown)
    - Options: Psychometric, Technical, Leadership, 360-degree, Custom
  - Total Questions (Number, conditional - shown if Custom)
  - Include Qualitative Section (Toggle)
  - Time Limit (Number, minutes, optional)

#### Step 4: Target Assignment
- **Title**: "Target Assignment"
- **Fields**:
  - Departments (Multi-select)
  - Job Roles (Multi-select)
  - Individuals (Multi-select, optional)

#### Step 5: Schedule
- **Title**: "Schedule"
- **Fields**:
  - Launch Date (Date picker)
  - Completion Deadline (Date picker)

#### Step 6: Action Buttons
- **Primary Button**: "Create Assessment"
- **Secondary Button**: "Save as Draft" (optional)
- **Tertiary Button**: "Cancel"

---

## 2. Skills Matrix

### Flow Steps

#### Step 1: Project Type Selection
- **Field**: Dropdown
- **Label**: "Select Project Type"
- **Value**: "Skills Matrix"

#### Step 2: Basic Information
- **Title**: "Basic Information"
- **Fields**:
  - Matrix Name (Text, required)
  - Purpose (Textarea, optional)

#### Step 3: Skill Selection & Levels
- **Title**: "Skill Selection & Levels"
- **Fields**:
  - Skills (Multi-select from taxonomy)
  - Import Skills from Role (Button - opens role selector modal)
  - Proficiency Scale (Dropdown)
    - Options: 1-5 Likert Scale, Novice to Expert, Aware-Working-Proficient-Expert, Custom
  - Allow Self-Assessment (Toggle)

#### Step 4: Target Scope
- **Title**: "Target Scope"
- **Fields**:
  - Departments (Multi-select)
  - Teams (Multi-select)
  - Individuals (Multi-select)

#### Step 5: Review Cycle
- **Title**: "Review Cycle"
- **Fields**:
  - Initial Assessment Date (Date picker)
  - Update Frequency (Dropdown)
    - Options: Quarterly, Bi-annual, Annual, Custom

#### Step 6: Action Buttons
- **Primary Button**: "Create Skills Matrix"
- **Secondary Button**: "Save as Draft" (optional)
- **Tertiary Button**: "Cancel"

---

## 3. Surveys

### Flow Steps

#### Step 1: Project Type Selection
- **Field**: Dropdown
- **Label**: "Select Project Type"
- **Value**: "Surveys"

#### Step 2: Basic Information
- **Title**: "Basic Information"
- **Fields**:
  - Survey Title (Text, required)
  - Description (Textarea, optional)
  - Survey Category (Dropdown)

#### Step 3: Survey Configuration
- **Title**: "Survey Configuration"
- **Fields**:
  - Survey Type (Dropdown)
    - Options: Engagement, Pulse, Exit Interview, Culture, Custom
  - Total Questions (Number)
  - Anonymous Responses (Toggle)
  - Allow Comments (Toggle)
  - Show Progress Bar (Toggle)

#### Step 4: Distribution
- **Title**: "Distribution"
- **Fields**:
  - Departments (Multi-select)
  - Job Levels (Multi-select)
  - Distribution Scope (Radio)
    - Options: Company-wide, Targeted

#### Step 5: Schedule & Reminders
- **Title**: "Schedule & Reminders"
- **Fields**:
  - Launch Date (Date picker)
  - Close Date (Date picker)
  - Send Reminders (Checkbox)

#### Step 6: Action Buttons
- **Primary Button**: "Create Survey"
- **Secondary Button**: "Save as Draft" (optional)
- **Tertiary Button**: "Cancel"

---

## 4. Training Programs

### Flow Steps

#### Step 1: Project Type Selection
- **Field**: Dropdown
- **Label**: "Select Project Type"
- **Value**: "Training Programs"

#### Step 2: Basic Information
- **Title**: "Basic Information"
- **Fields**:
  - Program Name (Text, required)
  - Description (Textarea, optional)
  - Program Category (Dropdown)

#### Step 3: Program Structure
- **Title**: "Program Structure"
- **Fields**:
  - Delivery Mode (Dropdown)
    - Options: Instructor-led, Self-paced, Blended
  - Total Duration (Number, hours)
  - Number of Modules (Number)
  - Skills to Develop (Multi-select from taxonomy)
  - Completion Requirement (Dropdown)
    - Options: Complete all modules, Pass assessment, Attendance + assessment, Custom
  - Issue Certificate on Completion (Toggle)

#### Step 4: Content & Resources
- **Title**: "Content & Resources"
- **Fields**:
  - Upload Training Materials (File upload button)
  - External Resource Links (Text field, comma-separated)
  - Trainer/Facilitator Names (Text field)

#### Step 5: Target Audience
- **Title**: "Target Audience"
- **Fields**:
  - Departments (Multi-select)
  - Job Roles/Levels (Multi-select)

#### Step 6: Schedule
- **Title**: "Schedule"
- **Fields**:
  - Program Start Date (Date picker)
  - Program End Date (Date picker)

#### Step 7: Action Buttons
- **Primary Button**: "Create Training Program"
- **Secondary Button**: "Save as Draft" (optional)
- **Tertiary Button**: "Cancel"

---

## 5. Coaching

### Flow Steps

#### Step 1: Project Type Selection
- **Field**: Dropdown
- **Label**: "Select Project Type"
- **Value**: "Coaching"

#### Step 2: Basic Information
- **Title**: "Basic Information"
- **Fields**:
  - Coaching Program Name (Text, required)
  - Objective (Textarea, required)
  - Coaching Focus Area (Dropdown)

#### Step 3: Coaching Structure
- **Title**: "Coaching Structure"
- **Fields**:
  - Coaching Type (Dropdown)
    - Options: Executive Coaching, Performance Coaching, Career Coaching, Skills Coaching, Wellness Coaching
  - Total Sessions (Number)
  - Session Duration (Number, minutes)
  - Session Frequency (Dropdown)
    - Options: Weekly, Bi-weekly, Monthly, Custom
  - Track Session Notes (Toggle)

#### Step 4: Coach & Coachee Assignment
- **Title**: "Coach & Coachee Assignment"
- **Fields**:
  - Assign Coach (Dropdown)
    - Sub-field: Coach Type (Radio: Internal / External)
  - Coachees (Multi-select individuals)
  - Coaching Format (Radio)
    - Options: 1-on-1, Group Coaching

#### Step 5: Goals & Metrics
- **Title**: "Goals & Metrics"
- **Fields**:
  - Development Goals (Textarea)
  - Success Metrics (Multi-select)
  - Require Progress Updates (Toggle)

#### Step 6: Timeline
- **Title**: "Timeline"
- **Fields**:
  - Program Duration (Date range picker)

#### Step 7: Action Buttons
- **Primary Button**: "Create Coaching Program"
- **Secondary Button**: "Save as Draft" (optional)
- **Tertiary Button**: "Cancel"

---

## 6. Mentoring

### Flow Steps

#### Step 1: Project Type Selection
- **Field**: Dropdown
- **Label**: "Select Project Type"
- **Value**: "Mentoring"

#### Step 2: Basic Information
- **Title**: "Basic Information"
- **Fields**:
  - Mentoring Program Name (Text, required)
  - Program Description (Textarea, optional)
  - Mentoring Theme (Dropdown)

#### Step 3: Program Structure
- **Title**: "Program Structure"
- **Fields**:
  - Mentoring Type (Dropdown)
    - Options: Onboarding Mentoring, Leadership Development, Technical Mentoring, Cross-functional Mentoring
  - Program Duration (Number, months)
  - Meeting Frequency (Dropdown)
    - Options: Weekly, Bi-weekly, Monthly, Quarterly
  - Reverse Mentoring Option (Toggle)
  - Peer Mentoring Circles (Toggle)

#### Step 4: Matching & Pairing
- **Title**: "Matching & Pairing"
- **Fields**:
  - Available Mentors (Multi-select individuals)
  - Mentees (Multi-select individuals)
  - Matching Method (Dropdown)
    - Options: Auto-match by skills/interests, Manual assignment, Self-select (mentees choose)

#### Step 5: Goals & Milestones
- **Title**: "Goals & Milestones"
- **Fields**:
  - Program Objectives (Textarea)
  - Milestone Checkpoints (Number)
  - Track Mentee Progress (Toggle)

#### Step 6: Timeline
- **Title**: "Timeline"
- **Fields**:
  - Program Period (Date range picker)

#### Step 7: Action Buttons
- **Primary Button**: "Create Mentoring Program"
- **Secondary Button**: "Save as Draft" (optional)
- **Tertiary Button**: "Cancel"

---

## 7. eLearning Assignment

### Flow Steps

#### Step 1: Project Type Selection
- **Field**: Dropdown
- **Label**: "Select Project Type"
- **Value**: "eLearning Assignment"

#### Step 2: Basic Information
- **Title**: "Basic Information"
- **Fields**:
  - Assignment Title (Text, required)
  - Learning Objectives (Textarea)
  - Content Category (Dropdown)

#### Step 3: Course Configuration
- **Title**: "Course Configuration"
- **Fields**:
  - Select eLearning Course (Dropdown - from internal library)
  - External Course URL (Text field, conditional - shown if "External Course" selected)
  - Estimated Duration (Number, hours)
  - Completion Criteria (Dropdown)
    - Options: Complete all modules, Pass final quiz, Time-based completion, Custom
  - Passing Score (Number, percentage, conditional - shown if quiz-based)
  - Allow Multiple Attempts (Toggle)
  - Prerequisites (Multi-select, optional - other courses/assessments)

#### Step 4: Target Learners
- **Title**: "Target Learners"
- **Fields**:
  - Departments (Multi-select)
  - Job Roles (Multi-select)
  - Assignment Type (Radio)
    - Options: Mandatory, Optional

#### Step 5: Schedule & Reminders
- **Title**: "Schedule & Reminders"
- **Fields**:
  - Assignment Date (Date picker)
  - Completion Deadline (Date picker)
  - Send Automated Reminders (Toggle)

#### Step 6: Action Buttons
- **Primary Button**: "Create eLearning Assignment"
- **Secondary Button**: "Save as Draft" (optional)
- **Tertiary Button**: "Cancel"

---

## 8. Webinars

### Flow Steps

#### Step 1: Project Type Selection
- **Field**: Dropdown
- **Label**: "Select Project Type"
- **Value**: "Webinars"

#### Step 2: Basic Information
- **Title**: "Basic Information"
- **Fields**:
  - Webinar Title (Text, required)
  - Description (Textarea, optional)
  - Webinar Topic/Category (Dropdown)
  - Tags/Keywords (Multi-select chips/tokens)

#### Step 3: Webinar Setup
- **Title**: "Webinar Setup"
- **Fields**:
  - Platform (Dropdown)
    - Options: Zoom, Microsoft Teams, Webex, Custom/Other
  - Meeting Link (Text field, conditional - shown if external platform or Custom)
  - Speaker/Presenter Names (Multi-select or text field)
  - Max Attendees (Number, optional)
  - Enable Q&A Session (Toggle)

#### Step 4: Date & Duration
- **Title**: "Date & Duration"
- **Fields**:
  - Webinar Start (DateTime picker)
  - Duration (Number, minutes)
  - Timezone (Dropdown)
  - Allow On-Demand Replay (Toggle)

#### Step 5: Registration & Audience
- **Title**: "Registration & Audience"
- **Fields**:
  - Access Type (Radio)
    - Options: Open to all, Invite-only
  - Target Departments (Multi-select, conditional - for targeted webinars)
  - Require Registration (Toggle)

#### Step 6: Notifications
- **Title**: "Notifications"
- **Fields**:
  - Send Invites (Checkbox)
  - Send Reminders (Checkbox)
    - Sub-options: 1 day before, 1 hour before

#### Step 7: Action Buttons
- **Primary Button**: "Create Webinar"
- **Secondary Button**: "Save as Draft" (optional)
- **Tertiary Button**: "Cancel"

---

## 9. Talent Development Programs

**Note**: This is a composite project type that combines multiple activities into a single integrated program.

### Flow Steps

#### Step 1: Project Type Selection
- **Field**: Dropdown
- **Label**: "Select Project Type"
- **Value**: "Talent Development Programs"

#### Step 2: Basic Information
- **Title**: "Basic Information"
- **Fields**:
  - Program Name (Text, required)
  - Program Description (Textarea, optional)
  - Program Type (Dropdown)
    - Options: Leadership Development, High-Potential Program, Technical Track, Succession Planning

#### Step 3: Activity Composition
- **Title**: "Activity Composition"
- **Description**: "Select and sequence the activities that make up this development program"
- **Fields**:
  - Include Assessments (Multi-select)
    - Options: Select from existing assessments OR "Create New Assessment"
  - Include Training Modules (Multi-select)
    - Options: Select from existing training programs OR "Create New Training"
  - Include Coaching Sessions (Multi-select)
    - Options: Select from existing coaching programs OR "Create New Coaching"
  - Include Mentoring (Multi-select)
    - Options: Select from existing mentoring programs OR "Create New Mentoring"
  - Include eLearning Courses (Multi-select)
    - Options: Select from existing eLearning OR "Create New eLearning"
  - Include Webinars (Multi-select)
    - Options: Select from existing webinars OR "Create New Webinar"
  - Add Custom Activity (Button - opens modal to define custom activity)
  - Activity Sequencing (Toggle)
    - Options: Sequential (activities must be completed in order) / Parallel (activities can be completed simultaneously)

#### Step 4: Program Structure
- **Title**: "Program Structure"
- **Fields**:
  - Total Duration (Number, months)
  - Cohort Size (Number, optional)
  - Completion Requirements (Dropdown)
    - Options: Complete all activities, Complete X% of activities, Pass all assessments, Custom criteria
  - Issue Program Certificate (Toggle)

#### Step 5: Target Participants
- **Title**: "Target Participants"
- **Fields**:
  - Departments (Multi-select)
  - Job Levels (Multi-select)
  - Individuals (Multi-select, optional - for nomination-based programs)

#### Step 6: Schedule & Milestones
- **Title**: "Schedule & Milestones"
- **Fields**:
  - Program Start Date (Date picker)
  - Program End Date (Date picker)
  - Define Milestones (Button - opens milestone definition modal)

#### Step 7: Action Buttons
- **Primary Button**: "Create Talent Development Program"
- **Secondary Button**: "Save as Draft" (optional)
- **Tertiary Button**: "Cancel"

---

## UI/UX Specifications

### Form Layout
- **Container**: `.create-panel` (from existing CSS)
- **Form Groups**: `.form-group` with `.form-label` and `.form-input/.form-select/.form-textarea`
- **Section Dividers**: `.section-label` between major steps
- **Responsive**: Two-column grid on desktop (`.form-row`), single column on mobile

### Button Styles
- **Primary Button**: `.btn.btn-primary` (gold background, white text)
- **Secondary Button**: `.btn` (default card background with border)
- **Tertiary Button**: `.btn` with text-only styling

### Field Types Reference
- **Text**: `<input type="text" class="form-input">`
- **Textarea**: `<textarea class="form-textarea">`
- **Number**: `<input type="number" class="form-input">`
- **Dropdown**: `<select class="form-select">`
- **Multi-select**: Custom component or `<select multiple>` with enhanced styling
- **Date Picker**: `<input type="date" class="form-input">`
- **DateTime Picker**: `<input type="datetime-local" class="form-input">`
- **Date Range**: Two date inputs side by side
- **Radio**: `<input type="radio">` with custom styling
- **Checkbox**: `<input type="checkbox">` with custom styling
- **Toggle**: Custom toggle switch component
- **File Upload**: `<input type="file">` with custom button styling

### Validation
- Required fields marked with asterisk (*) in label
- Real-time validation on blur
- Error messages displayed below field in red
- Success state with green border (optional)
- Form-level validation before submission

### Progressive Disclosure
- Conditional fields appear/hide based on selections
- Example: "External Course URL" only shows when "External Course" is selected
- Example: "Passing Score" only shows when completion criteria includes assessment

### Empty States
- When multi-selects have no options: "No items available. Create new?"
- When dropdowns load: "Loading options..."

### Help Text
- Small helper text below complex fields
- Example: "Select skills that participants will develop during this program"
- Color: `var(--text-muted)`
- Font size: 11px

---

## Implementation Notes

### State Management
- Form state should be saved to `localStorage` or `sessionStorage` as user progresses
- Auto-save draft every 30 seconds if form has changes
- Restore from draft on page load if exists

### API Integration
- POST endpoint: `/api/talent-projects/create`
- Payload structure should match project type
- Return project ID and redirect to project detail page on success

### Accessibility
- All form labels properly associated with inputs
- Keyboard navigation support
- ARIA labels for custom components
- Focus management for modals/dialogs
- Error announcements for screen readers

### Mobile Considerations
- Single column layout on screens < 800px
- Larger touch targets for buttons (min 44x44px)
- Date/time pickers use native mobile inputs
- Multi-selects use native select with multiple attribute on mobile

---

## Future Enhancements

1. **AI-Powered Suggestions**
   - Suggest skills based on job roles
   - Recommend coaching/mentoring matches based on profiles
   - Auto-populate program structure based on development goals

2. **Templates**
   - Pre-built project templates for common scenarios
   - "Leadership Development Standard Track"
   - "New Manager Onboarding Program"
   - "Technical Skills Bootcamp"

3. **Bulk Import**
   - CSV/Excel import for mass project creation
   - Particularly useful for annual performance review cycles

4. **Project Cloning**
   - Duplicate existing project with all settings
   - Useful for recurring programs

5. **Advanced Scheduling**
   - Recurring project schedules (quarterly assessments)
   - Automatic cohort rotation for development programs

---

## Appendix: Field Value Options

### Assessment Types
- Psychometric Assessment
- Technical Skills Assessment
- Leadership Competency Assessment
- 360-Degree Feedback
- Custom Assessment

### Survey Types
- Employee Engagement Survey
- Pulse Survey
- Exit Interview Survey
- Culture Survey
- Custom Survey

### Delivery Modes
- Instructor-Led Training (ILT)
- Virtual Instructor-Led Training (VILT)
- Self-Paced eLearning
- Blended Learning
- On-the-Job Training

### Coaching Types
- Executive Coaching
- Performance Coaching
- Career Development Coaching
- Skills Coaching
- Wellness & Life Coaching

### Mentoring Types
- Onboarding Mentoring
- Leadership Development Mentoring
- Technical/Functional Mentoring
- Cross-Functional Mentoring
- Reverse Mentoring

### Program Types (Talent Development)
- Leadership Development Program
- High-Potential (HiPo) Program
- Technical Excellence Track
- Succession Planning Program
- Graduate/Early Career Program

### Proficiency Scales
- **1-5 Likert Scale**: 1 (No knowledge) to 5 (Expert)
- **Novice to Expert**: Novice, Advanced Beginner, Competent, Proficient, Expert
- **Aware-Working-Proficient-Expert**: 4-level scale
- **Custom**: User-defined levels

### Completion Requirements
- Complete all modules/activities
- Complete X% of modules/activities
- Pass all assessments with minimum score
- Attendance + assessment
- Time-based completion
- Custom criteria

### Session Frequencies
- Daily
- Weekly
- Bi-weekly
- Monthly
- Quarterly
- Custom

### Update Frequencies
- Weekly
- Monthly
- Quarterly
- Bi-annual
- Annual
- Custom

---

**Document Version**: 1.0  
**Last Updated**: 2026-04-08  
**Owner**: SIP Product Team
