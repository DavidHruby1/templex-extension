# Project Architecture (Implementation Plan)

This document outlines the final, step-by-step implementation plan for the Chrome extension, including a "Definition of Done" (DoD) for each phase.

---

## Step 1: Basic Project and Manifest Setup

*Build the technical "skeleton" of the extension.*

* **Project Creation:** Initialize the project (`Vite` + `React` + `TypeScript`).
* **`manifest.json` Setup:**
  * Permissions: `storage`, `contextMenus`, `activeTab`, `scripting`.
  * `background`: Define `background.ts`.
  * `content_scripts`: Define `content.ts`.
  * `web_accessible_resources`: Make `sidebar.html` accessible so the `<iframe>` can load it.
  * `action`: Define the icon for `chrome.action.onClicked`.
* **HTML Files:** Set up `sidebar.html` as the main entry point for the React application.
* **Absolute Paths:** Set up absolute paths in the Vite config file.

### Definition of Done (DoD)

The project builds successfully, loads into Chrome (in developer mode), and an empty `&lt;iframe&gt;` appears on the page after clicking the extension icon.

---

## Step 2: Data Layer and API Abstraction

*Define the application's "brain" and how it communicates with the world (Chrome APIs and storage).*

* **Type Definitions:** Create global types (in `src/types/index.ts`) for `Prompt` and `Folder`.
* **Storage Wrapper:** Create `storage.ts` (in `src/common/utils/`) wrapping `chrome.storage.local`.  
  ➜ **Add field `storageVersion: 1`** inside the wrapper so future migrations are trivial.
* **Chrome API Wrapper:** Create `chromeMessaging.ts` (in `src/common/utils/`) as a type-safe wrapper for `chrome.runtime.sendMessage` and `chrome.tabs.sendMessage`.
* **Centralized Hooks (SSoT):** Create Single Source of Truth hooks at the module level:
  * `src/modules/prompts/hooks/usePrompts.ts`
  * `src/modules/folders/hooks/useFolders.ts`
  * These hooks will contain all CRUD logic and be the only place that calls `storage.ts`.
* **Context Provider:** Wrap the entire React application in providers that supply these hooks.
* **Tests:** Write unit tests for `storage.ts` and `chromeMessaging.ts`. Mock the `chrome.storage` and `chrome.runtime` APIs (per Rule 3.7, we test our wrapper, not Chrome).

### Definition of Done (DoD)

The `usePrompts` and `useFolders` hooks return mock data. The `storage.ts` and `chromeMessaging.ts` wrappers are unit-tested (with mocks) and contain `storageVersion`.

---

## Step 3: Core UI, Layout, and Robustness

*Build the UI "skeleton" and reusable elements.*

* **Layout Component:** Create `src/sidepanel/Sidebar.tsx`. It will manage "page" transitions (animated transitions between the main list, editor, and settings) and render persistent elements (like a "Back" button).
* **Error Boundary:** Create `src/common/components/ErrorBoundary/ErrorBoundary.tsx`. Use it in `Sidebar.tsx` to wrap the active "page," so an error in one module doesn't crash the entire panel.
* **Common Components:** Create `Button`, `Input`, `Modal`, etc., in `src/common/components/`. Each will have strict co-location (`Button.tsx`, `Button.module.css`, `Button.test.tsx`).
* **Main UI (Read-Only):** Build `PromptList.tsx` and `FolderTree.tsx`. Connect them to the hooks from Step 2 and display static data.

### Definition of Done (DoD)

All common components exist and have tests. `Sidebar` renders, and the `ErrorBoundary` correctly catches a test error. The list of prompts is displayed (read-only).

---

## Step 4: CRUD Implementation and Domain Logic

*Bring the application to life and implement business logic in the correct places.*

* **Editor:** Implement `PromptEditor.tsx`. Start with local hooks (e.g., `usePromptEditor.ts`) directly in the component's folder, as per Rule 1.9.
* **Token Counter:** Create `tokenCounter.ts` in `src/modules/prompts/utils/` (not in `common`!). This is domain-specific logic for prompts.
* **Optimistic Updates:**  
  ➜ CRUD actions immediately update React state (and UI) and call `chrome.storage.local.set()` in the background. On storage failure show a toast and revert the change.
* **Deletion:** Add deletion logic (including a confirmation modal) connected to `usePrompts` and `useFolders`.
* **Drag and Drop:** Implement D&D (per PRD Feature 4). Wrap the library logic (e.g., `dnd-kit`) in a domain-specific hook in `src/modules/prompts/hooks/`.

### Definition of Done (DoD)

The user can create, edit, and delete a prompt/folder. The token count is displayed. Drag-and-drop for prompts into folders works. All actions are saved to storage with optimistic updates.

---

## Step 5: Browser Integration

*Connect the React application with the background and content scripts.*

* **Handling in `background.ts`:** Create `src/background/handlers/` (e.g., `onToggleSidebar.ts`, `onInjectPrompt.ts`). The main `background.ts` will just be a router that calls the appropriate handler based on the message type (from `chromeMessaging.ts`).
* **Keyboard Shortcuts (Global):** The main `background.ts` will also listen to `chrome.commands.onCommand` (e.g., for 'toggle-sidebar') and call the relevant handler.
* **`content_script.ts`:** Will use `chromeMessaging.ts` to listen for commands (like "DO_INJECT") and to inject buttons ("Add prompt") into the DOM.  
  ➜ **Start with ChatGPT only** – the most stable DOM; add Claude/Gemini after ChatGPT injection is solid.

### Definition of Done (DoD)

Clicking 'Inject' in the React UI inserts text into the active window. A global keyboard shortcut (from `chrome.commands`) opens/closes the panel. Injection works reliably on ChatGPT.

---

## Step 6: Advanced Features and Local Shortcuts

*Finalize module-specific features.*

* **`VariableModal` (per Rule 1.11):** Implement the logic for variables:
  * UI: `src/modules/prompts/components/VariableModal/VariableModal.tsx`
  * Business Logic: `src/modules/prompts/utils/variableParser.ts` (for extracting and validating `[[variable]]`).  
    ➜ **Add validation to reject nested variables** (`[[prompt]]` containing `[[topic]]`) and show helpful error.
  * Glue: `src/modules/prompts/hooks/useVariableExtraction.ts`.
* **Search (per Rule of Three):** Implement search. The component is module-specific, not in `common`:
  * UI: `src/modules/prompts/components/SearchBar/SearchBar.tsx`.
  * Logic: `src/modules/prompts/hooks/useSearch.ts`.
* **Keyboard Shortcuts (Local):** Create `src/common/hooks/useKeyboardShortcut.ts` for local shortcuts within the sidebar (e.g., 'Esc' to close a modal, 'Ctrl+F' to focus the `SearchBar`).
* **Settings Page:** Implement the `settings` module (`src/modules/settings/`).

### Definition of Done (DoD)

Search filters prompts and folders. Injecting a prompt with a variable displays the `VariableModal` with validation. Local keyboard shortcuts ('Esc', 'Ctrl+F') work within the sidebar.

---

## Step 7: Testing (Integration and E2E)

*Ensure the quality of the final product.*

* **Unit Tests:** Were written continuously (co-located) for utilities, hooks, and components.
* **Integration Tests:** Write integration tests (using Testing Library) for complete user flows.
  * **Happy Path (Rule 3.4):** "Open panel → Add prompt → Fill form → Save → Find in list → Inject".
  * **Edge Cases (Rule 3.5):** "Save empty prompt (validation)", "Delete folder with prompts (confirmation)", "Injection failure (toast notification)".
* **Recommended E2E Tests:**  
  ➜ **Use Playwright** (instead of Puppeteer) – better extension support and stability against dynamic pages.  
  Test the full flow that unit/integration tests cannot:
  * Click the extension icon in the Chrome toolbar.
  * Verify the `&lt;iframe&gt;` appears on the page (e.g., ChatGPT).
  * Click a prompt in the sidebar.
  * Verify the text actually appeared in the text field on the host page.

### Definition of Done (DoD)

All main "Happy Path" scenarios are covered by integration tests. An E2E test proves that the core functionality (injection) works in a real browser environment.