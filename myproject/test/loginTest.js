
import { createDriver } from '../../config/config.js';
import LoginPage from '../pages/login.js';
import { expect } from 'chai';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Convert URL to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, '../../data/data.json');
const testData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Sleep function to handle delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('Login Test', function() {
    this.timeout(15000); // Set timeout for all tests to 15 seconds

    let driver;
    let loginPage;

    before(async function() {
        driver = await createDriver();
        loginPage = new LoginPage(driver, expect);
        
        await driver.get('https://www.demoblaze.com/index.html'); // Navigate first
        await loginPage.clearCache(); // Then clear cache
    });

    after(async function() {
        if (driver) {
            await driver.quit();
        }
    });


    it('should log in successfully', async function() {
        await loginPage.openLoginModal();
        await loginPage.enterCredentials(testData.validUser.username, testData.validUser.password);
        await loginPage.submitLogin();
        await loginPage.isLoggedIn();
        await sleep(3000);
    });

    it('should log out successfully', async function() {
        await loginPage.logout();
        await loginPage.isLoggedOut();

    });
});
