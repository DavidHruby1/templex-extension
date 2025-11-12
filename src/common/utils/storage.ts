// chrome.storage.local.set({key: value})
// chrome.storage.local.get(['key'])  // specific key
// chrome.storage.local.get(null)     // all data
// erorr handling will be handled by a function I'll make
import type { StorageData, Settings } from "@app-types/index";

export const mockSettings: Settings = {
    theme: 'dark',
    defaultPromptId: null,
    deleteConfirmation: true,
    sorting: {
        prompts: {
            by: 'title',
            order: 'asc',
        },
        folders: {
            by: 'title',
            order: 'asc',
        },
    },
    shortcuts: {
        openPanel: 'Ctrl+Shift+Q',
        addPrompt: 'Ctrl+Shift+A',
        search: 'Ctrl+Shift+F',
    },
}

export const default_storage: StorageData = {
    prompts: [{id: "1", parentId: null, title: "Sample Prompt", createdAt: 1, tokenCount: 10, content: "This is a sample prompt."}],
    folders: [],
    settings: mockSettings,
    storageVersion: 1,
};


export const getPromptData = async (): Promise<void> => {
    try {
        const promptData: StorageData = await chrome.storage.local.get(null);
        console.log(promptData);
    } catch (error) {
        console.error("Error getting data: ", error);
    }
}


/*
export const savePromptData = async ({key: value}) => {
    try {
        await chrome.storage.local.set({key: value});
    } catch (error) {
        console.error('Error saving prompt: ', error);
    }
};
*/