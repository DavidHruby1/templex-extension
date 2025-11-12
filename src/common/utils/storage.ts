// chrome.storage.local.set({key: value})
// chrome.storage.local.get(['key'])  // specific key
// chrome.storage.local.get(null)     // all data
// erorr handling will be handled by a function I'll make
import { StorageData, Settings } from "@app-types/index";

const mockSettings: Settings = {
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

const storage: StorageData = {
    prompts: [],
    folders: [],
    settings: mockSettings,
    storageVersion: 1,
};

const setStorageData = async ({key: value}) => {

}