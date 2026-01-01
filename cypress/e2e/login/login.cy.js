/**
 * Login Test Suite for OrangeHRM Demo
 * Author: Satyadipon Deb
 * Description: Comprehensive test cases for login functionality
 */

const LoginPage = require('../../pages/LoginPage')

describe('OrangeHRM Login Tests', () => {
  let loginPage
  let testData

  before(() => {
    // Load test data from fixtures
    cy.fixture('credentials').then((data) => {
      testData = data
    })
  })

  beforeEach(() => {
    // Initialize page object
    loginPage = new LoginPage()
    
    // Clear browser data and visit login page
    cy.clearBrowserData()
    cy.visitLoginPage()
    
    // Log test start
    cy.log(`**Starting test: ${Cypress.currentTest.title}**`)
  })

  afterEach(() => {
    // Log test completion
    cy.log(`**Completed test: ${Cypress.currentTest.title}**`)
  })

  describe('Positive Login Tests', () => {
    
    it('should successfully login with valid credentials', () => {
      cy.log('**Test Case: Valid Login**')
      
      // Test data
      const { username, password } = testData.validCredentials
      
      // Perform login using custom command
      cy.login(username, password)
      
      // Additional verification
      cy.url().should('include', testData.testData.dashboardUrl)
      loginPage.dashboardHeader.should('contain.text', testData.testData.expectedTexts.dashboardTitle)
      
      // Take screenshot for documentation
      cy.takeScreenshot('successful_login')
      
      // Logout for cleanup
      cy.logout()
    })

    it('should login using page object methods directly', () => {
      cy.log('**Test Case: Login using POM methods**')
      
      const { username, password } = testData.validCredentials
      
      // Use page object methods directly
      loginPage
        .enterUsername(username)
        .enterPassword(password)
        .clickLogin()
        .verifyLoginSuccess()
      
      // Verify dashboard elements
      loginPage.userDropdown.should('be.visible')
      loginPage.sidePanel.should('be.visible')
      
      cy.logout()
    })
  })

  describe('Negative Login Tests', () => {
    
    it('should show error message for invalid password', () => {
      cy.log('**Test Case: Invalid Password**')
      
      const { username, password } = testData.invalidCredentials.wrongPassword
      const expectedError = testData.testData.expectedErrorMessages.invalidCredentials
      
      // Attempt login with wrong password
      loginPage.login(username, password)
      
      // Verify error message and page state
      loginPage.verifyLoginFailure(expectedError)
      cy.url().should('include', testData.testData.loginUrl)
      
      // Verify error message using custom command
      cy.verifyErrorMessage(expectedError)
      
      cy.takeScreenshot('invalid_password_error')
    })

    it('should show error message for invalid username', () => {
      cy.log('**Test Case: Invalid Username**')
      
      const { username, password } = testData.invalidCredentials.wrongUsername
      const expectedError = testData.testData.expectedErrorMessages.invalidCredentials
      
      loginPage.login(username, password)
      loginPage.verifyLoginFailure(expectedError)
      
      cy.takeScreenshot('invalid_username_error')
    })

    it('should show error message for both invalid credentials', () => {
      cy.log('**Test Case: Both Credentials Invalid**')
      
      const { username, password } = testData.invalidCredentials.bothWrong
      const expectedError = testData.testData.expectedErrorMessages.invalidCredentials
      
      loginPage.login(username, password)
      loginPage.verifyLoginFailure(expectedError)
      
      cy.takeScreenshot('both_credentials_invalid')
    })
  })

  describe('Empty Credentials Tests', () => {
    
    it('should show required field validation for empty username and password', () => {
      cy.log('**Test Case: Both Fields Empty**')
      
      // Click login without entering credentials
      loginPage.clickLogin()
      
      // Verify required field validation appears
      loginPage.verifyRequiredFieldValidation(testData.testData.expectedErrorMessages.requiredField)
      
      // Verify using custom command
      cy.verifyRequiredFieldValidation('username and password')
      
      // Verify page remains on login
      cy.url().should('include', testData.testData.loginUrl)
      
      cy.takeScreenshot('empty_credentials_validation')
    })

    it('should show required field validation for empty username', () => {
      cy.log('**Test Case: Empty Username**')
      
      const { password } = testData.emptyCredentials.emptyUsername
      
      loginPage
        .enterPassword(password)
        .clickLogin()
      
      loginPage.verifyRequiredFieldValidation()
      cy.url().should('include', testData.testData.loginUrl)
      
      cy.takeScreenshot('empty_username_validation')
    })

    it('should show required field validation for empty password', () => {
      cy.log('**Test Case: Empty Password**')
      
      const { username } = testData.emptyCredentials.emptyPassword
      
      loginPage
        .enterUsername(username)
        .clickLogin()
      
      loginPage.verifyRequiredFieldValidation()
      cy.url().should('include', testData.testData.loginUrl)
      
      cy.takeScreenshot('empty_password_validation')
    })
  })

  describe('UI Validation Tests', () => {
    
    it('should verify login page elements are present', () => {
      cy.log('**Test Case: Login Page UI Validation**')
      
      // Verify all essential elements are visible
      loginPage.loginContainer.should('be.visible')
      loginPage.loginTitle.should('be.visible').and('contain.text', testData.testData.expectedTexts.loginTitle)
      loginPage.usernameInput.should('be.visible')
      loginPage.passwordInput.should('be.visible')
      loginPage.loginButton.should('be.visible')
      loginPage.forgotPasswordLink.should('be.visible')
      
      // Verify placeholder texts
      loginPage.verifyPlaceholders()
      
      cy.takeScreenshot('login_page_ui_validation')
    })

    it('should verify input field functionality', () => {
      cy.log('**Test Case: Input Field Functionality**')
      
      const testUsername = 'testuser'
      const testPassword = 'testpass'
      
      // Test username input
      loginPage.enterUsername(testUsername)
      loginPage.getUsernameValue().should('equal', testUsername)
      
      // Test password input
      loginPage.enterPassword(testPassword)
      loginPage.getPasswordValue().should('equal', testPassword)
      
      // Test clear functionality
      loginPage.clearCredentials()
      loginPage.getUsernameValue().should('be.empty')
      loginPage.getPasswordValue().should('be.empty')
      
      cy.takeScreenshot('input_field_functionality')
    })
  })

  describe('Security Tests', () => {
    
    it('should mask password field input', () => {
      cy.log('**Test Case: Password Field Masking**')
      
      // Enter password and verify it's masked
      loginPage.enterPassword('secretpassword')
      loginPage.passwordInput.should('have.attr', 'type', 'password')
      
      cy.takeScreenshot('password_field_masking')
    })

    it('should not expose credentials in network requests', () => {
      cy.log('**Test Case: Credential Security in Network**')
      
      // Intercept login request to verify credentials are properly handled
      cy.intercept('POST', '**/auth/validate', (req) => {
        // Verify request contains credentials but they should be in request body, not URL
        expect(req.url).to.not.contain('admin123')
        expect(req.url).to.not.contain('Admin')
      }).as('loginRequest')
      
      const { username, password } = testData.validCredentials
      loginPage.login(username, password)
      
      cy.wait('@loginRequest')
      cy.logout()
    })
  })

  describe('Error Handling Tests', () => {
    
    it('should handle network timeouts gracefully', () => {
      cy.log('**Test Case: Network Timeout Handling**')
      
      // Simulate slow network response
      cy.intercept('POST', '**/auth/validate', (req) => {
        req.reply((res) => {
          res.delay(2000) // 2 second delay
        })
      }).as('slowLogin')
      
      const { username, password } = testData.validCredentials
      loginPage.login(username, password)
      
      // Should eventually succeed
      cy.wait('@slowLogin', { timeout: 15000 })
      loginPage.verifyLoginSuccess()
      
      cy.logout()
    })

    it('should handle special characters in credentials', () => {
      cy.log('**Test Case: Special Characters in Credentials**')
      
      const specialPassword = 'P@ssw0rd!@#$%'
      const { username } = testData.validCredentials
      
      // This should fail but handle gracefully
      loginPage.login(username, specialPassword)
      loginPage.verifyLoginFailure()
      
      cy.takeScreenshot('special_characters_handling')
    })
  })
})