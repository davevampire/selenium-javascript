import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js'; // Ensure correct path and ES module usage

export const createDriver = async () => {
    const options = new chrome.Options();
    // Remove the headless argument to run with a visible browser window
    // options.addArguments('--headless'); // Commented out or removed
    options.addArguments('window-size=1280,1024'); // Set default window size

    return await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
};
