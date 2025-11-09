export type Prompt = {
    id: string;
    parentId: string | null;
    title: string;
    createdAt: number;
    tokenCount: number;
    content: string;
    isDefault: boolean;
};

export type Folder = {
    id: string;
    parentId: string | null;
    title: string;
    createdAt: number;
}

export type Settings = {
    theme: 'light' | 'dark';
    defaultPromptId: string | null;
    deleteConfirmation: boolean;
    sorting: {
        prompts: {
            by: 'title' | 'createdAt' | 'tokenCount';
            order: 'asc' | 'desc';
        };
        folders: {
            by: 'title' | 'createdAt';
            order: 'asc' | 'desc';
        };
    };
    shortcuts: {
        openPanel: string;
        addPrompt: string;
        search: string;
    };
}

export type StorageData {
  prompts: Prompt[];
  folders: Folder[];
  settings: Settings;
  storageVersion: number; // key for migration
}