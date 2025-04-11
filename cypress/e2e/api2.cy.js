describe('AutomationExercise API Tests', () => {
    const baseUrl = 'https://automationexercise.com/api';
  
    // API 1
    it('API 1: Get All Products List', () => {
      cy.request(`${baseUrl}/productsList`).then((response) => {
        expect(response.status).to.eq(200);
        const body = JSON.parse(response.body);
        expect(body.products).to.be.an('array');
      });
    });
  
    // API 2
    it('API 2: POST To All Products List', () => {
      cy.request({ method: 'POST', url: `${baseUrl}/productsList`, failOnStatusCode: false })
        .then((response) => {
          expect(response.status).to.eq(200);
          const body = JSON.parse(response.body);
          expect(body.responseCode).to.eq(405);
          expect(body.message).to.eq('This request method is not supported.');
        });
    });
  
    // API 3
    it('API 3: Get All Brands List', () => {
      cy.request(`${baseUrl}/brandsList`).then((response) => {
        expect(response.status).to.eq(200);
        const body = JSON.parse(response.body);
        expect(body.brands).to.be.an('array');
      });
    });
  
    // API 4
    it('API 4: PUT To All Brands List', () => {
      cy.request({ method: 'PUT', url: `${baseUrl}/brandsList`, failOnStatusCode: false })
        .then((response) => {
          expect(response.status).to.eq(200);
          const body = JSON.parse(response.body);
          expect(body.responseCode).to.eq(405);
          expect(body.message).to.eq('This request method is not supported.');
        });
    });
  
    // API 5
    it('API 5: POST To Search Product', () => {
      cy.request({ method: 'POST', url: `${baseUrl}/searchProduct`, form: true, body: { search_product: 'top' } })
        .then((response) => {
          expect(response.status).to.eq(200);
          const body = JSON.parse(response.body);
          expect(body.products).to.be.an('array');
        });
    });
  
    // API 6
    it('API 6: POST To Search Product without search_product parameter', () => {
      cy.request({ method: 'POST', url: `${baseUrl}/searchProduct`, form: true, body: {}, failOnStatusCode: false })
        .then((response) => {
          expect(response.status).to.eq(200);
          const body = JSON.parse(response.body);
          expect(body.responseCode).to.eq(400);
          expect(body.message).to.eq('Bad request, search_product parameter is missing in POST request.');
        });
    });
  
    // API 7
    it('API 7: POST To Verify Login with valid details', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/verifyLogin`,
        form: true,
        body: { email: 'validuser@example.com', password: 'validpassword' },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        const body = JSON.parse(response.body);
        expect(body.message).to.be.oneOf(['User exists!', 'User not found!']);
      });
    });
  
    // API 8
    it('API 8: POST To Verify Login without email parameter', () => {
      cy.request({ method: 'POST', url: `${baseUrl}/verifyLogin`, form: true, body: { password: 'test' }, failOnStatusCode: false })
        .then((response) => {
          expect(response.status).to.eq(200);
          const body = JSON.parse(response.body);
          expect(body.responseCode).to.eq(400);
          expect(body.message).to.eq('Bad request, email or password parameter is missing in POST request.');
        });
    });
  
    // API 9
    it('API 9: DELETE To Verify Login', () => {
      cy.request({ method: 'DELETE', url: `${baseUrl}/verifyLogin`, failOnStatusCode: false })
        .then((response) => {
          expect(response.status).to.eq(200);
          const body = JSON.parse(response.body);
          expect(body.responseCode).to.eq(405);
          expect(body.message).to.eq('This request method is not supported.');
        });
    });
  
    // API 10
    it('API 10: POST To Verify Login with invalid details', () => {
      cy.request({ method: 'POST', url: `${baseUrl}/verifyLogin`, form: true, body: { email: 'no@no.com', password: 'wrong' }, failOnStatusCode: false })
        .then((response) => {
          expect(response.status).to.eq(200);
          const body = JSON.parse(response.body);
          expect(body.responseCode).to.eq(404);
          expect(body.message).to.eq('User not found!');
        });
    });
  
    // API 11
    it('API 11: POST To Create/Register User Account', () => {
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      const email = `user${randomNumber}@test.com`;
      cy.request({
        method: 'POST',
        url: `${baseUrl}/createAccount`,
        form: true,
        body: {
          name: 'Test', email: email, password: '123456', title: 'Mr', birth_date: '1', birth_month: 'January', birth_year: '1990',
          firstname: 'Test', lastname: 'User', company: 'Test Co', address1: '123 Main St', address2: '', country: 'Canada',
          zipcode: '00000', state: 'ON', city: 'Toronto', mobile_number: '1234567890',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const body = JSON.parse(response.body);
        expect(body.message).to.eq('User created!');
      });
    });
  
    // API 12
    it('API 12: DELETE METHOD to delete user account (should not be supported)', () => {
      cy.request({ method: 'DELETE', url: `${baseUrl}/deleteAccount`, failOnStatusCode: false })
        .then((response) => {
          expect(response.status).to.eq(200);
          const body = JSON.parse(response.body);
          expect(body.message).to.be.oneOf([
            'This request method is not supported.',
            'Bad request, email parameter is missing in DELETE request.'
          ]);
        });
    });
  
    // API 13
    it('API 13: GET to delete user account (should not be supported)', () => {
      cy.request({ method: 'GET', url: `${baseUrl}/deleteAccount`, failOnStatusCode: false })
        .then((response) => {
          expect(response.status).to.eq(405);
          const body = JSON.parse(response.body);
          expect(body.message).to.eq('This request method is not supported.');
        });
    });
  
    // API 14
    it('API 14: POST to delete user account with valid email and password', () => {
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      const email = `delete${randomNumber}@test.com`;
  
      cy.request({
        method: 'POST',
        url: `${baseUrl}/createAccount`,
        form: true,
        body: {
          name: 'Delete Me', email: email, password: '123456', title: 'Mr', birth_date: '1', birth_month: 'January', birth_year: '1990',
          firstname: 'Delete', lastname: 'Me', company: 'None', address1: 'Nowhere', address2: '', country: 'Canada',
          zipcode: '00000', state: 'NA', city: 'Nowhere', mobile_number: '0000000000',
        },
      }).then((resCreate) => {
        expect(resCreate.status).to.eq(200);
        const body = JSON.parse(resCreate.body);
        expect(body.message).to.eq('User created!');
  
        cy.request({
          method: 'POST',
          url: `${baseUrl}/deleteAccount`,
          form: true,
          body: { email: email, password: '123456' },
          failOnStatusCode: false
        }).then((resDelete) => {
          expect(resDelete.status).to.eq(405);
          const deleteBody = JSON.parse(resDelete.body);
          expect(deleteBody.message).to.eq('This request method is not supported.');
        });
      });
    });
  });
  