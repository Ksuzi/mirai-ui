# `/ticket` Command for Task Tracking

Generate simple, clear task descriptions for solo developer tracking. No corporate overhead, just what you need.

---

## Command Configuration

**Command trigger:** `/ticket`

**Prompt:**

```
You are helping a solo developer create simple, clear task tickets for personal tracking.

RULES:
1. Title: 3-5 words, clear and scannable
2. Description: 2-5 sentences with good context
3. Keep it practical - what needs to be done and why
4. No unnecessary formality or enterprise speak
5. Easy to copy into any tracking tool (Notion, GitHub, Trello, etc.)

OUTPUT FORMAT:

[Title]
[Clear 2-5 sentence description with context and scope]

---

EXAMPLES:

Good:
```
Form Input Components
Build the missing form input components: Textarea, Select, Radio/RadioGroup, Switch, and Label. Each component needs to support standard variants (default, outlined, filled) and sizes (sm, md, lg). They should integrate with the existing Field component for consistent state handling and validation. Focus on accessibility and keyboard navigation.
```

```
User Authentication  
Implement email/password login system with JWT token management. Need protected routes that redirect unauthenticated users to login. Include logout functionality that clears session and redirects to home. Store auth state in context for easy access across the app.
```

```
Fix Form Validation
Form validation isn't triggering on submit button click. The validation function runs but doesn't prevent submission when there are errors. Need to check the submit handler and ensure validation state blocks the form submission. Also verify error messages are displayed correctly to users.
```

Bad:
```
Implement Comprehensive Form Input Component Suite with Full Feature Set
Create a complete set of form input components including Textarea with multi-line support and resize controls, Select with custom dropdown styling and native fallback, Radio buttons with RadioGroup wrapper for managing multiple options with proper keyboard navigation support, Switch toggle for boolean values, and standalone Label component. All components must support standard variants (default, outlined, filled), sizes (sm, md, lg), color schemes, state handling (default, error, success, warning), and integrate seamlessly with the existing Field component architecture. This implementation should follow SOLID principles and maintain backward compatibility with existing form implementations across the entire application ecosystem.
```
(Too formal, overly detailed, sounds like corporate speak)

STYLE:
- Casual but clear
- Focus on scope, not implementation
- Mention key parts/features
- Skip assumed stuff (tests, a11y, docs - you'll do those anyway)
- No ticket IDs unless user asks
- Plain text, easy to copy

CATEGORIES (auto-detect):
- Features: what to build
- Bugs: what's broken
- Refactoring: what to improve
- Docs: what to document
- Tooling: what to set up

GENERATE:
Based on user input, create ticket(s) in simple format. Group related items if they make sense together. Keep it lightweight.
```

---

## How to Add This Command to Cursor

1. Open Cursor Settings (Cmd/Ctrl + ,)
2. Navigate to "Rules for AI" section
3. Add a new rule:
   - **Name:** Ticket Generator
   - **Trigger:** `/ticket`
   - **Prompt:** [Copy the entire prompt above]
4. Save settings

## Usage Examples

### Example 1: Feature Development
```
/ticket for user authentication
```

**Output:**
```
User Authentication
Implement email/password login system with JWT token management. Need protected routes that redirect unauthenticated users to login. Include logout functionality that clears session and redirects to home. Store auth state in context for easy access across the app.
```

### Example 2: Bug Fix
```
/ticket form validation not working on submit
```

**Output:**
```
Fix Form Validation
Form validation isn't triggering on submit button click. The validation function runs but doesn't prevent submission when there are errors. Need to check the submit handler and ensure validation state blocks the form submission. Also verify error messages are displayed correctly to users.
```

### Example 3: Component Development
```
/ticket I need to build the missing form inputs
```

**Output:**
```
Form Input Components
Build the missing form input components: Textarea, Select, Radio/RadioGroup, Switch, and Label. Each component needs to support standard variants (default, outlined, filled) and sizes (sm, md, lg). They should integrate with the existing Field component for consistent state handling and validation. Focus on accessibility and keyboard navigation.
```

### Example 4: Refactoring
```
/ticket refactor API calls to use custom hook
```

**Output:**
```
Refactor API Calls
Move all API calls from components into reusable custom hooks. Create a base `useApi` hook that handles loading states, error handling, and retries. Each specific API endpoint should have its own hook (like `useUserData`, `useProducts`) that wraps the base hook. This will make the code more maintainable and reduce duplication.
```

### Example 5: Documentation
```
/ticket update component docs
```

**Output:**
```
Update Component Docs
Current component documentation is missing key information. Add accessibility guidelines for screen readers and keyboard navigation. Include code examples showing common use cases and prop combinations. Document all props with types, default values, and clear descriptions. Add visual examples where helpful.
```

---

## Tips

1. **Keep it scannable** - You should get it at a glance
2. **Add just enough context** - Future you needs to understand it quickly
3. **Group related work** - Don't over-split simple tasks
4. **Copy directly** - Output is ready for Notion, Trello, GitHub, or wherever you track
5. **Add IDs if you want** - Just mention it: "/ticket with ID format"

---

## Use Cases

- Planning your next work session
- Breaking down big ideas into chunks
- Creating GitHub issues
- Organizing your backlog
- Converting notes into tasks

