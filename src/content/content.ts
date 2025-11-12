let sidebarIframe: HTMLIFrameElement | null = null;
const IFRAME_ID = 'templex-sidebar-iframe';

function createSidebarIframe(): HTMLIFrameElement {
    const iframe = document.createElement('iframe');
    iframe.id = IFRAME_ID;

    iframe.src = chrome.runtime.getURL('sidebar.html'); 

    document.body.appendChild(iframe);
    return iframe;
}

function getSidebar(): HTMLIFrameElement {
    if (sidebarIframe) {
        return sidebarIframe;
    }
    
    const existingIframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement;
    if (existingIframe) {
        sidebarIframe = existingIframe;
        return sidebarIframe;
    }
    
    sidebarIframe = createSidebarIframe();
    return sidebarIframe;
}


function toggleSidebar(): void {
    const sidebar = getSidebar();
    sidebar.classList.toggle('visible');
}

function hideSidebar(): void {
    const sidebar = getSidebar();
    sidebar.classList.remove('visible');
}

function handleDocumentClick(event: MouseEvent): void {
    const sidebar = getSidebar();

    if (
        sidebar.classList.contains('visible') &&
        event.target !== sidebar
    ) {
        hideSidebar();
    }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse): boolean => {
    if (message.type === 'TOGGLE_SIDEBAR') {
        toggleSidebar();
        sendResponse({ status: "sidebar toggled" });
    }

    return true; 
});

document.addEventListener('mousedown', handleDocumentClick);

console.log("Templex Content Script (with click-outside) loaded.");