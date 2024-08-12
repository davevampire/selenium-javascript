import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js'; 

export const createDriver = async () => {
    const options = new chrome.Options();
    
    // options.addArguments('--headless'); // Commented out or removed
    options.addArguments('window-size=1280,1024'); 

    return await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
};
