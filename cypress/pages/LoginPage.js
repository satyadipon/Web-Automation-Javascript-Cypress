/**
 * LoginPage - Page Object Model for OrangeHRM Login Page
 * Author: Satyadipon Deb
 * Description: Contains all selectors and methods for login page interactions
 */

class LoginPage {
  
  // Page selectors
  get usernameInput() {
    return cy.get('[name="username"]')
  }
  
  get passwordInput() {
    return cy.get('[name="password"]')
  }
  
  get loginButton() {
    return cy.get('[type="submit"]')
  }
  
  get errorMessage() {
    return cy.get('.oxd-alert-content-text')
  }
  
  get loginContainer() {
    return cy.get('.orangehrm-login-container')
  }
  
  get loginTitle() {
    return cy.get('.orangehrm-login-title')
  }
  
  get forgotPasswordLink() {
    return cy.get('.orangehrm-login-forgot-header')
  }
  
  get requiredFieldMessage() {
    return cy.get('.oxd-input-field-error-message')
  }
  
  // Dashboard page selectors (for login verification)
  get dashboardHeader() {
    return cy.get('.oxd-topbar-header-breadcrumb h6')
  }
  
  get userDropdown() {
    return cy.get('.oxd-userdropdown-name')
  }
  
  get sidePanel() {
    return cy.get('.oxd-sidepanel')
  }
  
  // Page methods
  
  /**
   * Navigate to login page
   */
  visit() {
    cy.visit('/web/index.php/auth/login')
    this.verifyLoginPageLoaded()
    return this
  }
  
  /**
   * Verify login page is loaded properly
   */
  verifyLoginPageLoaded() {
    this.loginContainer.should('be.visible')
    this.loginTitle.should('contain.text', 'Login')
    this.usernameInput.should('be.visible')
    this.passwordInput.should('be.visible')
    this.loginButton.should('be.visible')
    return this
  }
  
  /**
   * Enter username
   * @param {string} username 
   */
  enterUsername(username) {
    this.usernameInput.clear().type(username)
    return this
  }
  
  /**
   * Enter password
   * @param {string} password 
   */
  enterPassword(password) {
    this.passwordInput.clear().type(password)
    return this
  }
  
  /**
   * Click login button
   */
  clickLogin() {
    this.loginButton.click()
    return this
  }
  
  /**
   * Complete login process
   * @param {string} username 
   * @param {string} password 
   */
  login(username, password) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.clickLogin()
    return this
  }
  
  /**
   * Verify successful login by checking dashboard elements
   */
  verifyLoginSuccess() {
    cy.url().should('include', '/web/index.php/dashboard/index')
    this.dashboardHeader.should('be.visible').and('contain.text', 'Dashboard')
    this.userDropdown.should('be.visible')
    this.sidePanel.should('be.visible')
    return this
  }
  
  /**
   * Verify login failure with error message
   * @param {string} expectedMessage 
   */
  verifyLoginFailure(expectedMessage = 'Invalid credentials') {
    this.errorMessage.should('be.visible').and('contain.text', expectedMessage)
    cy.url().should('include', '/web/index.php/auth/login')
    return this
  }
  
  /**
   * Verify required field validation
   * @param {string} expectedMessage 
   */
  verifyRequiredFieldValidation(expectedMessage = 'Required') {
    this.requiredFieldMessage.should('be.visible').and('contain.text', expectedMessage)
    return this
  }
  
  /**
   * Clear username field
   */
  clearUsername() {
    this.usernameInput.clear()
    return this
  }
  
  /**
   * Clear password field
   */
  clearPassword() {
    this.passwordInput.clear()
    return this
  }
  
  /**
   * Clear both username and password fields
   */
  clearCredentials() {
    this.clearUsername()
    this.clearPassword()
    return this
  }
  
  /**
   * Get current username value
   */
  getUsernameValue() {
    return this.usernameInput.invoke('val')
  }
  
  /**
   * Get current password value
   */
  getPasswordValue() {
    return this.passwordInput.invoke('val')
  }
  
  /**
   * Verify placeholder texts
   */
  verifyPlaceholders() {
    this.usernameInput.should('have.attr', 'placeholder', 'Username')
    this.passwordInput.should('have.attr', 'placeholder', 'Password')
    return this
  }
  
  /**
   * Click forgot password link
   */
  clickForgotPassword() {
    this.forgotPasswordLink.click()
    return this
  }
}

module.exports = LoginPage