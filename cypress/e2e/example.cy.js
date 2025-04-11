const randomNumber = Math.floor(10000 + Math.random() * 90000) 
const email = `testemail${randomNumber}@mail.com`

describe('Signup/Login Page', () => {
    it('should register user', () => {       
        //Home page
        cy.visit('https://www.automationexercise.com/')
        cy.screenshot('signup-image 1')

        //Login page
        cy.contains('Signup / Login').should('exist').click()
        cy.screenshot('signup-image 2')
        cy.contains('New User Signup!').should('exist')
        // cy.get('input[name="name"]').should('exist').type('Test Name')
        cy.get('[data-qa="signup-name"]').should('exist').type('Test Name')
        cy.get('[data-qa="signup-email"]').should('exist').type(email)
        cy.screenshot('signup-image 3')
        cy.get('[data-qa="signup-button"]').should('exist').click()
        cy.screenshot('signup-image 4')

        //Register page
        cy.get('#id_gender1').check() 
        cy.get('[data-qa="password"]').should('exist').type('TestPassword123')
        cy.get('[data-qa="days"]').select('10')      
        cy.get('[data-qa="months"]').select('May')  
        cy.get('[data-qa="years"]').select('1990')   
        cy.get('#newsletter').check()
        cy.get('#optin').check()
        cy.get('[data-qa="create-account"]').click()
        cy.screenshot('signup-image 5')

        //Address
        cy.get('[data-qa="first_name"]').should('exist').type('Test')
        cy.get('[data-qa="last_name"]').should('exist').type('QA')
        cy.get('[data-qa="company"]').type('Test Company Ltd.')
        cy.get('[data-qa="address"]').should('exist').type('123 Street')
        cy.get('[data-qa="address2"]').type('Apt. 456')
        cy.get('[data-qa="country"]').select('Canada') 
        cy.get('[data-qa="state"]').type('stateTest')
        cy.get('[data-qa="city"]').should('exist').type('cityTest')
        cy.get('[data-qa="zipcode"]').should('exist').type('400001')
        cy.get('[data-qa="mobile_number"]').should('exist').type('9876543210')
        cy.screenshot('signup-image 6')
        cy.get('[data-qa="create-account"]').click()

        cy.contains('Account Created!').should('exist')
        cy.screenshot('signup-image 7')


    });
});
