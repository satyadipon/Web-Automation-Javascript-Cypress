# OrangeHRM Cypress Automation Framework

## Overview
Production-ready Cypress automation framework for testing the OrangeHRM demo website using JavaScript and Page Object Model design pattern.

**Author:** Satyadipon Deb  
**Target Application:** https://opensource-demo.orangehrmlive.com/  
**Test Credentials:** Username: Admin, Password: admin123

## Project Structure
```
cypress/
├── e2e/
│   └── login/
│       └── login.cy.js          # Login test specifications
├── pages/
│   └── LoginPage.js             # Page Object Model for login
├── fixtures/
│   └── credentials.json         # Test data and credentials
├── support/
│   ├── commands.js              # Custom Cypress commands
│   └── e2e.js                   # Support file and global config
├── screenshots/                 # Auto-generated screenshots
├── videos/                      # Auto-generated test videos
└── reports/                     # Mochawesome test reports
```

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
1. **Clone/Navigate to the project directory**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify Cypress installation:**
   ```bash
   npx cypress verify
   ```

## ⚡ Test Execution

### Interactive Mode (Headed)
```bash
# Open Cypress Test Runner
npm run cypress:open

# Alternative command
npx cypress open
```

### Headless Mode
```bash
# Run all tests headless
npm run test

# Run tests with browser head visible
npm run test:headed

# Run specific test file
npm run cypress:run:spec "cypress/e2e/login/login.cy.js"
```

### Command Reference
| Command | Description |
|---------|-------------|
| `npm run cypress:open` | Opens Cypress Test Runner (interactive) |
| `npm run cypress:run` | Runs all tests in headless mode |
| `npm run test:headed` | Runs tests with visible browser |
| `npm run test:headless` | Runs tests in headless mode |
| `npm run report:generate` | Generates HTML test report |
| `npm run report:open` | Opens generated HTML report |

## 🧪 Test Scenarios

### Positive Test Cases
- **Valid Login:** Successful login with correct credentials
- **Dashboard Verification:** Verify successful navigation to dashboard
- **UI Element Validation:** Verify all login page elements are present

### Negative Test Cases
- **Invalid Password:** Login attempt with wrong password
- **Invalid Username:** Login attempt with wrong username
- **Invalid Credentials:** Both username and password incorrect

### Validation Test Cases
- **Empty Credentials:** Login attempt with empty fields
- **Required Field Validation:** Verify required field messages
- **Input Field Functionality:** Test input field behavior
- **Password Masking:** Verify password field security

### Security Test Cases
- **Credential Protection:** Verify credentials not exposed in network
- **Special Characters:** Handle special characters in input
- **Network Timeout:** Graceful handling of network delays

## 🏗️ Framework Features

### Page Object Model (POM)
- **LoginPage.js:** Encapsulates all login page interactions
- **Reusable Methods:** Common actions like login, verification
- **Maintainable Selectors:** Centralized element locators

### Custom Commands
```javascript
// Login with default or custom credentials
cy.login()                           // Uses default Admin/admin123
cy.login('username', 'password')     // Custom credentials

// Other utility commands
cy.logout()                          // Logout and verify
cy.visitLoginPage()                  // Navigate to login page
cy.clearBrowserData()               // Clear cookies/storage
cy.takeScreenshot('name')           // Custom screenshot
cy.verifyErrorMessage('message')    // Verify error messages
```

### Test Data Management
- **Fixtures:** JSON files for test data
- **Environment Variables:** Configurable test parameters
- **Multiple Datasets:** Valid, invalid, and edge case data

### Reporting & Documentation
- **Mochawesome Reports:** Detailed HTML test reports
- **Screenshots:** Automatic capture on failures
- **Videos:** Full test execution recordings
- **Logs:** Detailed test execution logs

## Test Reporting

### Generate Reports
```bash
# Run tests and generate report
npm run cypress:run
npm run report:generate

# Open HTML report
npm run report:open
```

### Report Features
- Test execution summary
- Pass/fail statistics
- Screenshots for failures
- Execution duration
- Detailed test steps

## Configuration

### Cypress Configuration (cypress.config.js)
- **Base URL:** https://opensource-demo.orangehrmlive.com/
- **Viewport:** 1280x720 (consistent across tests)
- **Timeouts:** Optimized for web application
- **Video/Screenshot:** Enabled with cleanup for passed tests
- **Retry Logic:** 2 retries in run mode

### Environment Variables
```javascript
// cypress.config.js
e2e: {
  baseUrl: 'https://opensource-demo.orangehrmlive.com/',
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  retries: { runMode: 2, openMode: 0 }
}
```

## Best Practices Implemented

### Code Quality
- ✅ No hard-coded waits (cy.wait without alias)
- ✅ Proper element waiting strategies
- ✅ Meaningful test descriptions
- ✅ Comprehensive assertions
- ✅ Error handling and recovery

### Test Design
- ✅ Independent test cases
- ✅ Proper setup and cleanup
- ✅ Data-driven testing
- ✅ Realistic user scenarios
- ✅ Cross-browser compatibility

### Maintenance
- ✅ Page Object Model pattern
- ✅ Reusable custom commands
- ✅ Centralized test data
- ✅ Clear documentation
- ✅ Version control friendly

## Troubleshooting

### Common Issues
1. **Test Failures:** Check screenshot in `cypress/screenshots/`
2. **Network Issues:** Verify application URL accessibility
3. **Element Not Found:** Update selectors in LoginPage.js
4. **Timeout Issues:** Adjust timeout values in cypress.config.js

### Debug Mode
```bash
# Run with debug information
DEBUG=cypress:* npm run cypress:run

# Open DevTools
npm run cypress:open
# Then click on test file and open DevTools
```

## Extending the Framework

### Adding New Page Objects
1. Create new page class in `cypress/pages/`
2. Follow LoginPage.js pattern
3. Import in test files

### Adding New Test Suites
1. Create new test files in `cypress/e2e/`
2. Follow naming convention: `*.cy.js`
3. Import required page objects

### Adding Custom Commands
1. Add commands in `cypress/support/commands.js`
2. Use consistent naming and documentation
3. Include proper error handling

## Contributing
1. Follow existing code patterns
2. Add proper documentation
3. Include test cases for new features
4. Maintain backward compatibility

---
**Framework Version:** 1.0.0  
**Last Updated:** January 2026  
**Cypress Version:** ^13.6.3