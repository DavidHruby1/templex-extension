export type Prompt = {
    id: string;
    parentId: string | null;
    title: string;
    createdAt: number;
    tokenCount: number;
    content: string;
};

export type Folder = {
    id: string;
    parentId: string | null;
    title: string;
    createdAt: number;
}


export type Theme = 'light' | 'dark';

export type Settings = {
    theme: Theme;
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

export type StorageData = {
  prompts: Prompt[];
  folders: Folder[];
  settings: Settings;
  storageVersion: number; // key for migration
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type Toast = {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

export type DragItemType = 'prompt' | 'folder';

export type DragItem = {
    id: string;
    parentId: string | null;
    type: DragItemType;
};

export type VariableValues = Record<string, string>;