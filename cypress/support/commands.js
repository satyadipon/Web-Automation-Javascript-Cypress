/**
 * Custom Cypress Commands for OrangeHRM Automation
 * Author: Satyadipon Deb
 * Description: Reusable commands for common test operations
 */

const LoginPage = require('../pages/LoginPage')

/**
 * Custom command to perform login
 * @param {string} username - Username for login
 * @param {string} password - Password for login
 * @param {boolean} shouldVerify - Whether to verify successful login (default: true)
 */
Cypress.Commands.add('login', (username = 'Admin', password = 'admin123', shouldVerify = true) => {
  cy.log(`**Attempting login with username: ${username}**`)
  
  const loginPage = new LoginPage()
  
  // Navigate to login page if not already there
  cy.url().then((currentUrl) => {
    if (!currentUrl.includes('/auth/login')) {
      loginPage.visit()
    }
  })
  
  // Perform login
  loginPage.login(username, password)
  
  // Verify successful login if required
  if (shouldVerify) {
    loginPage.verifyLoginSuccess()
    cy.log(`**Login successful for user: ${username}**`)
  }
})

/**
 * Custom command to logout
 */
Cypress.Commands.add('logout', () => {
  cy.log(`**Performing logout**`)
  
  // Click on user dropdown
  cy.get('.oxd-userdropdown').click()
  
  // Click logout
  cy.get('a[href="/web/index.php/auth/logout"]').click()
  
  // Verify logout by checking login page
  cy.url().should('include', '/auth/login')
  cy.get('.orangehrm-login-container').should('be.visible')
  
  cy.log(`**Logout successful**`)
})

/**
 * Custom command to visit login page and verify it loads
 */
Cypress.Commands.add('visitLoginPage', () => {
  cy.log(`**Visiting login page**`)
  
  const loginPage = new LoginPage()
  loginPage.visit()
  
  cy.log(`**Login page loaded successfully**`)
})

/**
 * Custom command to clear browser data
 */
Cypress.Commands.add('clearBrowserData', () => {
  cy.log(`**Clearing browser data**`)
  
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.clearAllSessionStorage()
  
  cy.log(`**Browser data cleared**`)
})

/**
 * Custom command to take screenshot with custom name
 * @param {string} screenshotName - Name for the screenshot
 */
Cypress.Commands.add('takeScreenshot', (screenshotName) => {
  cy.log(`**Taking screenshot: ${screenshotName}**`)
  cy.screenshot(screenshotName)
})

/**
 * Custom command to wait for page load
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 */
Cypress.Commands.add('waitForPageLoad', (timeout = 10000) => {
  cy.log(`**Waiting for page to load**`)
  
  // Wait for page to be in ready state
  cy.window().should('have.property', 'document')
  cy.document().should('have.property', 'readyState', 'complete')
  
  // Wait for any loading indicators to disappear
  cy.get('body', { timeout }).should('be.visible')
})

/**
 * Custom command to verify error message
 * @param {string} expectedMessage - Expected error message text
 */
Cypress.Commands.add('verifyErrorMessage', (expectedMessage) => {
  cy.log(`**Verifying error message: ${expectedMessage}**`)
  
  cy.get('.oxd-alert-content-text')
    .should('be.visible')
    .and('contain.text', expectedMessage)
})

/**
 * Custom command to verify required field validation
 * @param {string} fieldType - Type of field (username, password, etc.)
 */
Cypress.Commands.add('verifyRequiredFieldValidation', (fieldType = '') => {
  cy.log(`**Verifying required field validation for: ${fieldType}**`)
  
  cy.get('.oxd-input-field-error-message')
    .should('be.visible')
    .and('contain.text', 'Required')
})

/**
 * Custom command to generate random test data
 * @param {string} type - Type of data to generate (username, password, email)
 */
Cypress.Commands.add('generateTestData', (type) => {
  const timestamp = Date.now()
  
  switch (type) {
    case 'username':
      return `testuser_${timestamp}`
    case 'password':
      return `testpass_${timestamp}`
    case 'email':
      return `test_${timestamp}@example.com`
    default:
      return `testdata_${timestamp}`
  }
})

/**
 * Custom command to retry action with custom timeout
 * @param {function} action - Action to retry
 * @param {number} retries - Number of retries (default: 3)
 * @param {number} delay - Delay between retries in ms (default: 1000)
 */
Cypress.Commands.add('retryAction', (action, retries = 3, delay = 1000) => {
  cy.log(`**Retrying action up to ${retries} times**`)
  
  const attempt = (remainingRetries) => {
    if (remainingRetries <= 0) {
      throw new Error('Max retries exceeded')
    }
    
    try {
      action()
    } catch (error) {
      cy.wait(delay)
      attempt(remainingRetries - 1)
    }
  }
  
  attempt(retries)
})

// Support for preserving cookies between tests
Cypress.Commands.add('preserveSession', () => {
  Cypress.Cookies.preserveOnce('sessionId', 'authToken')
})