import './Sidebar.module.css'
import '@assets/copy.svg'
import { useEffect } from 'react';
import { getPromptData } from '@utils/storage'; // Ujistěte se, že cesta sedí

function Sidebar() {

    useEffect(() => {
        const loadData = async () => {
            console.log("Načítám data ze storage...");
            const data = await getPromptData();
            console.log("Načtená data:", data);
        };
        
        loadData();
    }, []); // Prázdné pole znamená, že se to spustí jen jednou po montáži komponenty

    return <></>;
}

export default Sidebar
