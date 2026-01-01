/**
 * Cypress Support File - e2e.js
 * Author: Satyadipon Deb
 * Description: Main support file that loads before every test
 */

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import custom commands and utilities
require('./commands')

// Global configuration and settings
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test on uncaught exceptions
  // This is useful for applications that have expected errors
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false
  }
  if (err.message.includes('Non-Error promise rejection captured')) {
    return false
  }
  return true
})

// Before each test hook
beforeEach(() => {
  // Clear browser data before each test
  cy.clearCookies()
  cy.clearLocalStorage()
  
  // Set viewport for consistency
  cy.viewport(1280, 720)
  
  // Add custom headers if needed
  cy.intercept('**/*', (req) => {
    req.headers['accept-language'] = 'en-US,en;q=0.9'
  })
})

// After each test hook
afterEach(() => {
  // Take screenshot on failure
  if (Cypress.currentTest.state === 'failed') {
    const testName = Cypress.currentTest.title.replace(/\s+/g, '_')
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    cy.screenshot(`failed_${testName}_${timestamp}`)
  }
})

// Global test configuration
Cypress.config({
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  pageLoadTimeout: 30000,
  viewportWidth: 1280,
  viewportHeight: 720
})