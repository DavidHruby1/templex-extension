# Product Requirements Document: Templex

**Name:** Templex  
**Version:** 0.3  
**Date:** 28-10-2025  

---

## Executive Summary

This document outlines the requirements for **Templex**, a browser extension that provides users with a personal library to manage, store, and quickly use prompts for AI chatbots. The **Minimum Viable Product (MVP)** will focus on core local storage, intuitive prompt management, and dynamic variable handling to streamline the workflow of frequent AI chatbot users.

---

## Product Overview

### Purpose

The Templex extension is designed to eliminate the repetitive and disorganized process of managing AI prompts. It provides a centralized, browser-integrated solution for saving, categorizing, and reusing prompts, making interactions with AI chatbots faster and more efficient.

### Target Audience

**Primary Users:** Power users of AI chatbots (e.g., ChatGPT, Claude, Gemini), including content creators, developers, researchers, and students who rely on a variety of structured prompts for their work.

### Project Goals

- Launch a functional MVP to the relevant browser web stores that solves the core problem.
- Establish a foundation for future features like cloud sync and AI-powered enhancements.

### Color Palette

| Name           | Hex       |
|----------------|-----------|
| primary        | `#0c0c0c` |
| secondary      | `#171717` |
| text-dark      | `#8B949E` |
| text-white     | `#D5D5D5` |
| accent         | `#58A6FF` |
| accent-dark    | `#2C5A99` |
| black          | `#000000` |

### Font

**Primary:** `Inter`

---

## Problem Statement

### Current State

Frequent chatbot users currently manage their prompts using scattered notes, documents, or spreadsheets. This process is inefficient, leading to time wasted searching for the right prompt and manually editing placeholders or variables for each use case.  
There is no seamless integration between their prompt storage and the chatbot interface.

### Desired Future State

Users have an instantly accessible library within their browser. They can save a new prompt with a single click, organize it in folders, and reuse it effortlessly. Prompts with variables are handled by a guided workflow, ensuring they are correctly filled out before use, significantly improving speed and reducing errors.

---

## User Personas and Flows

### Persona: Alex, the Content Creator

- **Demographics:** 28, freelance writer.
- **Goals:** Generate creative blog post ideas, social media captions, and email newsletters using AI. Needs to quickly switch between different prompt structures for different tones and formats.
- **Pain Points:** Wastes time searching through a messy "Prompts.txt" file. Forgets which variables need to be changed in complex prompts, leading to errors and re-runs.
- **Technical Proficiency:** Intermediate.

#### User Flows for Alex

**Flow 1: Saving a Discovered Prompt**  
- Alex finds a good prompt online → Right-click "Add to Templex" → Simple modal appears in the center of a page with Title input → Titles it "Blog Idea Generator" → Presses Enter (or clicks outside) to save

**Flow 2: Using a Prompt with Variables**  
- Opens extension → Finds "Twitter Post" → Clicks "Inject" → Modal asks for topic + tone → Prompt is injected directly into the chat interface

---

### Persona: David, the Developer

- **Demographics:** 35, Backend Developer.
- **Goals:** Accelerate development by generating boilerplate code, writing documentation, and refactoring functions.
- **Pain Points:** Constantly retyping long, complex prompts for code generation and debugging.
- **Technical Proficiency:** Advanced.

#### User Flows for David

**Flow 1: Iterating and Saving a Utility Prompt**  
- Crafts multi-step prompt in ChatGPT → Clicks the injected "Save prompt" button above the chat window → Simple modal appears in the center of a page with Title input → Names it "Python function with tests" and presses Enter (or clicks outside) to save → Prompt is instantly available

**Flow 2: Checking the Prompt's Token Count**  
- Needs to send a prompt to AI → Opens prompt library → Finds "Code Refactoring" prompt → Checks the prompt's token count: 2150 tokens → Confidently proceeds to inject it

---

### Persona: Sarah, the Entrepreneur

- **Demographics:** 42, solo founder of an e-commerce business.
- **Goals:** Use AI for investor updates, marketing copy, and customer support templates.
- **Pain Points:** Prompts are scattered across various documents, struggles to track which ones are the most effective.
- **Technical Proficiency:** Beginner/Intermediate.

#### User Flows for Sarah

**Flow 1: Building a Prompt Library**  
- Attends webinar → Copies a useful prompt → Presses shortcut to open the side panel → Clicks "Add prompt" → Pastes and titles it "E-commerce Product Description" → Drags the prompt to "Business" folder she got herself set up earlier.

**Flow 2: Filtering & Using a Prompt**  
- Needs investor update → Opens side panel → Writes "Investor Relations" → It shows only the searched folder → Sees prompts she needs → Clicks "Inject" on "Quarterly Update Summary" → Prompt is pasted directly into the chatbot

---

## Functional Requirements

### Feature 1: Core Library & Side Panel UI

**User Story:** As a user, I want a clean and accessible interface to view and manage my prompts without disrupting my workflow.

**Description:** The extension is implemented as a side panel using an `<iframe>` that loads `sidebar.html`. The iframe is injected into the browser's native side panel container and provides full CSS isolation and compatibility even on pages with strict CSP.

**Acceptance Criteria:**

- [ ] The extension's UI will be implemented using an `<iframe>` with `src="chrome.runtime.getURL('sidebar.html')"` injected into the browser's native side panel container.
- [ ] The side panel can be opened/toggled by two ways:
  - Clicking the extension icon in the browser toolbar.
  - Using a keyboard shortcut the user can bind.
- [ ] The side panel can be closed by clicking the 'X' button on the browser's panel or using the shortcut again.
- [ ] There is also a Settings gear icon. Clicking on that will move user to the settings page where user can configure the app.
- [ ] At the top, there is a Search bar where user can search quick for prompts. It can filter both folders and files. User can also bind a keyboard shortcut to quickly search.
- [ ] Just below that, there are two buttons: **Add folder**, **Add prompt**:
  - Adding a folder creates a new folder in the list right away waiting for user to name it. If it's empty and user presses 'Enter' or clicks outside, it will glow red and won't let user escape the editing window. User has to cancel using 'Esc'. 
  - Adding a prompt moves user to a new page where user can set the title and content of the prompt. This "new prompt" page follows the same interaction model as the "edit prompt" page (described in Feature 3). After the prompt is successfully created and user clicks the 'Back' button, the user is returned to the main list view with the new prompt added at the end of the list.
  - User can also right-click a folder and choose an 'Add prompt' there so it automatically creates the prompt in the selected folder.
- [ ] How does the 'moving' between pages work? When clicking on Settings or adding a prompt it starts an animation. The main list view slides out of the iframe content and the new page slides in. There is a 'Back' button that returns user immediately to the main page. The pages are used only for Settings and adding or viewing a prompt.
- [ ] Prompts are displayed in a list folder > file structure but having folders is not mandatory.
- [ ] Hovering above folder shows a 'Plus' icon that when clicked, adds a new prompt directly inside the folder associated to that button.
- [ ] Each folder has a counter showing how many prompts are inside. If > 0, then after clicking on it will unroll the dropdown with the prompts.
- [ ] Each prompt (file) has a token count on the right side. If you hover above the prompt, an animation occurs sliding the token count out of the way and sliding in the three icons: 'Copy', 'Inject', 'Delete'.
- [ ] Right-clicking on the folder shows a little modal window with many options like: 'Add folder (yes, nesting folders is possible)', 'Add prompt', 'Duplicate', 'Move folder to...', 'Rename', 'Delete'
- [ ] Right-clicking on the prompt is similar - it shows extra: 'Open prompt', 'Set as default (This will be covered later)', 'Copy content' and 'Show snippet' which will activate a small popover I'm describing right below this.
- [ ] Hovering above the prompt file and pressing 'Ctrl + Alt' will show a popover tooltip with a full Title name and a few lines of the content text. If the prompt is longer, a scroll will be available there. It will be below or above the prompt tile (depends on where is more space) so if user wants to interact with the prompt furthermore, he clicks on the tile.

---

### Feature 2: Adding Prompts to the Library

**User Story:** As a user, I want multiple, seamless ways to save prompts without context switching.

**Description:** Users can add prompts from multiple entry points: directly from a webpage, from within a chatbot interface, or manually inside the extension UI.

**Acceptance Criteria:**

- [ ] Storage will be implemented using `chrome.storage.local` (export function will be needed to sync with other devices).
- [ ] **Context Menu:** Right-clicking on selected text on any webpage presents an 'Add to Templex' option.
  - It will show the typical modal with the Title input.
- [ ] There will also be injected button **"Add prompt"** above the chat window. If a text is written in the chat window, you can create a prompt out of the text. It will normally open the modal with the Title input.
- [ ] **Manual Prompt Add:** A dedicated 'Add prompt' button is always available within the side panel UI. It will take user once again to the dedicated page using the animation. There is also an option for user to use a shortcut to quickly add prompt or to bind his own shortcut in the Settings. The same goes for adding a folder.
- [ ] Clicking **'Add folder'** creates an inline element. There is several scenarios:
  - The text is empty and user presses Enter: Nothing happens, only the border will change color to red for a second.
  - The text is not empty and user presses Enter: The folder saves.
  - The text is empty and user clicks out: Same as pressing 'Enter' on the empty text - it will not let the user leave until it is correctly saved or cancelled.
  - The text is not empty and user clicks out: The folder saves.
  - The user presses Esc: The creation cancels out.
- [ ] When title is too long it will be cut and show three dots via the ellipsis effect `text-overflow`. This applies for both folders and prompts.
  - If you resize the sidebar, it will also make the title longer therefore it can become visible fully.
- [ ] No prompt or folder can have the same name.
- [ ] Each single prompt will have a limit of 10 000 words per prompt.

#### UI Logic for Adding Prompts (Clarification)

**Use Case 1: External Triggers (Modal)**  
*When:* The user is outside the Templex side panel (e.g., browsing a webpage, in a chatbot).  
*Triggers:* Right-click context menu ("Add to Templex"), Injected "Add prompt" button above a chat window.  
*UI:* A simple, centered modal is shown. This is a low-friction "quick add" that only asks for a Title (the content is pre-filled from selection/chat input). It does not interrupt the main side panel view.

**Use Case 2: Internal Triggers (Side Panel Page)**  
*When:* The user is already working inside the Templex side panel.  
*Triggers:* Clicking the Add prompt button, right-clicking a folder and selecting Add prompt.  
*UI:* The side panel animates to the "new page" view. This is a "full add" experience where the user can write the Title and Content from scratch. Saving is handled automatically per the model in Feature 3.

**Use Case 3: Plus Icon on Folder**  
*When:* Hovering above a folder which shows the plus icon.  
*Triggers:* Clicking the plus icon on the folder.  
*UI:* The side panel animates to the "new page" view. This is a "full add" experience where the user can write the Title and Content from scratch. Saving is handled automatically. After that, the prompt is automatically added into the folder.

---

### Feature 3: Using & Managing Prompts

**User Story:** As a user, I want to quickly use, edit, and manage my saved prompts directly from the card interface.

**Description:** Each prompt card is an interactive element providing all necessary actions for using and managing the prompt efficiently.

**Acceptance Criteria:**

- [ ] Choosing **'Move to...'** from the right click context menu will open a small modal window in the sidebar showing all the folders available for the move.
- [ ] Choosing **'Open prompt'** from the right click context menu will move user to the new page using the animation mentioned earlier. User will see the whole prompt on the new page where he can also edit the prompt if needed.
- [ ] To edit the prompt user can simply left-click on the prompt, it will take him to the new page where he can click again on the Title or content text and it will switch into editing mode.
  - Changes are saved automatically if a user clicks outside the text area while editing.
  - Pressing 'Enter' will also save the changes and exit editing mode.
  - If the user presses 'Esc', it will cancel and revert the changes to what it was before.
  - If the user clicks on the 'Back' button, it will also cancel the changes and move the user back to the main page list view. It will cancel changes only if it is not saved so if user clicks outside, saves the changes, he is then safe to leave using the 'Back' button.
  - The prompt's content text **can not stay empty** so if user tries to save it empty, the border will glow red and won't let the user lose focus and escape the page until there's at least one character. If the user deletes all and then presses 'Esc' or 'Back' it will let the user escape the editing mode by reverting to the last known changes back.
  - This applies to both Title and content text.
  - One last thing: If the user is creating a completely new prompt file, if he is in the new page and writes 0 characters in either the Title or content text, by pressing the 'Esc' or 'Back' button, the prompt creation will cancel and no prompt will be added.
- [ ] It was mentioned before - after hovering above the prompt file, it will show three actions: **'Copy'**, **'Inject'**, **'Delete'**.
  - **Copy:** Copies the prompt's content into clipboard turning the icon green for a second and then returning back to its grey 'text-dark' color.
  - **Inject:** Pastes the prompt's content text right into the chat.
  - **Delete:** Shows small modal asking if the user really wants to delete the item. After clicking 'Delete' on the modal, the item will be removed. User can mark the checkbox to not ask again and the modal will stop showing when deleting next items. In Settings he can turn it on again.
- [ ] If user click **'Delete'** on a folder, all the prompts inside will be deleted too.
- [ ] **Variable Handling:** If a prompt contains variables in double square brackets (e.g., `[[topic]]`), clicking "Inject" first opens a modal. The modal prompts the user to fill in values for each variable before the final text is processed and injected.
- [ ] **Set as Default:** Setting a prompt as default will save it in the 'Default prompt' button injected on the AI website. If a user wants to quickly paste a prompt on multiple AI pages, this is the right feature to do it.

---

### Feature 4: Organization

**User Story:** As a user, I want to search, and filter my prompts so I can find the right one instantly.

**Description:** The library supports a powerful organization system with a search bar and sorting options to effectively manage a large collection of prompts.

**Acceptance Criteria:**

- [ ] Sorting works automatically. Numbers have higher priority so if user wants a certain folder or prompt to be first he can add a number 1 in front of the Title. This can be changed in Settings where user can for example select alphabetical order as the highest priority or more.
- [ ] Users can drag and drop items. Dragging a prompt file onto a folder will move that prompt into the folder. Dragging a folder onto another folder will nest it. Manual re-ordering of prompts within a folder via drag-and-drop is not supported; ordering is handled by the sorting rules.

---

## Technical Requirements

### Folder Structure
templex/
├── public/
│   ├── icons/
│   │   ├── icon16.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   ├── manifest.json
│   └── sidebar.html
│
├── src/
|   ├── assets/
│   ├── common/
│   │   ├── components/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx
│   │   │   │   └── Input.module.css
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── Modal.module.css
│   │   │   └── Toast/
│   │   │       ├── Toast.tsx
│   │   │       └── Toast.module.css
│   │   ├── theme/
│   │   │   ├── ThemeProvider.tsx
│   │   ├── hooks/
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useTheme.ts
│   │   │   └── useKeyboardShortcut.ts
│   │   └── utils/
│   │       └── storage.ts
│   │
│   ├── modules/
│   │   ├── prompts/
│   │   │   ├── components/
│   │   │   │   ├── PromptList.tsx
│   │   │   │   ├── PromptCard.tsx
│   │   │   │   ├── PromptEditor.tsx
│   │   │   │   └── VariableModal.tsx
│   │   │   ├── hooks/
│   │   │   │   └── usePrompts.ts
|   │   │   ├── utils/
|   │   │   │   └── tokenCounter.ts
│   │   │   ├── prompts.module.css
│   │   │   └── types.ts
│   │   │
│   │   ├── folders/
│   │   │   ├── components/
│   │   │   │   ├── FolderTree.tsx
│   │   │   │   └── FolderCard.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useFolders.ts
│   │   │   ├── folders.module.css
│   │   │   └── types.ts
│   │   │
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── search.module.css
│   │   │   └── useSearch.ts
│   │   │
│   │   └── settings/
│   │       ├── SettingsPage.tsx
│   │       ├── settings.module.css
│   │       └── useSettings.ts
│   │
│   ├── sidepanel/
│   │   ├── Sidebar.tsx
│   │   ├── Sidebar.module.css
|   |   ├── main.tsx
│   │   └── index.css
│   │
│   ├── background/
│   │   └── background.ts
│   │
│   ├── content/
│   │   └── content.ts
│   │
│   └── types/
│       └── index.ts
│
├── tsconfig.json
├── vite.config.ts
└── package.json

### System Architecture

- **Framework:** React + TypeScript
- **State Management:** React Hooks (`useContext`, `useState`, `useReducer`)
- **Storage:** Browser Local Storage (`storage.local` WebExtensions API)
- **Build Tool:** Vite
- **Side Panel Implementation:** `<iframe>` with `src="chrome.runtime.getURL('sidebar.html')"` for full isolation and CSP compatibility

---

## Non-Functional Requirements

- **Performance:** UI opens in <500ms, with minimal performance impact on the host page.
- **Security:** All user data is stored locally on the user's machine. No external transmission of prompts or personal data.
- **Browser Compatibility:** Chrome, Edge, and other Chromium-based browsers.
- **Data Privacy:** The extension will request only the minimum permissions necessary for its core functionality.

---

## Assumptions and Dependencies

### Assumptions

- Users are on modern desktop browsers.
- Users have a basic understanding of how to interact with AI prompts.

### Dependencies

- The in-page injection and save functionalities depend on the DOM structure of target chatbot sites (e.g., ChatGPT, Claude). These features may be subject to breakage if the sites are updated.

---

## Robustness & Error Handling

### Graceful Degradation

- The extension must not crash or break the host page if the DOM structure of a target site changes unexpectedly.

### Injection Failure

- If the "Inject" action fails because the target input field cannot be found, a non-intrusive error notification (e.g., a toast message saying **"Could not inject prompt"**) will appear.

### Injection Fallback

- As a user-friendly fallback for a failed injection, the complete prompt text is automatically copied to the user's clipboard, allowing them to paste it manually.

---

## Scope and Exclusions

### In Scope (MVP)

- All Functional Requirements listed above.
- Local-only storage of prompts.
- Compatibility with major Chromium browsers.

### Future Features (Post-MVP)

- Import & Export
- Prompt-chaining