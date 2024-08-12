import { By, until } from 'selenium-webdriver';

class LoginPage {
    constructor(driver, expect) {
        this.driver = driver;
        this.expect = expect; // Store expect as a class property
        this.loginButtonId = By.id('login2');
        this.usernameFieldId = By.id('loginusername');
        this.passwordFieldId = By.id('loginpassword');
        this.loginModalButtonXPath = By.xpath('//*[@id="logInModal"]/div/div/div[3]/button[2]');
        this.logoutButtonXPath = By.linkText('Log out')
        this.welcomeMessageId = By.id('nameofuser');
    }

    async openLoginModal() {
        let loginButton = await this.driver.wait(until.elementLocated(this.loginButtonId), 10000);
        await this.driver.wait(until.elementIsVisible(loginButton), 10000);
        await loginButton.click();
    }

    async enterCredentials(username, password) {
        let usernameField = await this.driver.wait(until.elementLocated(this.usernameFieldId), 10000);
        await this.driver.wait(until.elementIsVisible(usernameField), 10000);
        await usernameField.sendKeys(username);

        let passwordField = await this.driver.wait(until.elementLocated(this.passwordFieldId), 10000);
        await this.driver.wait(until.elementIsVisible(passwordField), 10000);
        await passwordField.sendKeys(password);
    }

    async submitLogin() {
        let loginModalButton = await this.driver.wait(until.elementLocated(this.loginModalButtonXPath), 10000);
        await this.driver.wait(until.elementIsVisible(loginModalButton), 10000);
        await loginModalButton.click();
    }

    async logout() {
        try {
            let logoutButton = await this.driver.wait(until.elementLocated(this.logoutButtonXPath), 10000);
            await this.driver.wait(until.elementIsVisible(logoutButton), 10000);
            await logoutButton.click();
        } catch (error) {
            if (error.name === 'StaleElementReferenceError') {
                let logoutButton = await this.driver.findElement(this.logoutButtonXPath);
                await logoutButton.click();
            } else {
                throw error;
            }
        }
    }
    
    async isLoggedIn() {
        try {
            let profileIcon = await this.driver.wait(until.elementLocated(this.profileIconId), 10000);
            return await this.driver.wait(until.elementIsVisible(profileIcon), 10000);
        } catch (error) {
            return false;
        }
    }

    async isLoggedOut() {
        try {
            let loginModal = await this.driver.wait(until.elementLocated(this.loginModalId), 10000);
            return await this.driver.wait(until.elementIsVisible(loginModal), 10000);
        } catch (error) {
            return false;
        }
    }
    async clearCache() {
        await this.driver.executeScript('window.localStorage.clear();');
        await this.driver.executeScript('window.sessionStorage.clear();');
        await this.driver.manage().deleteAllCookies();
    }
}

export default LoginPage;


