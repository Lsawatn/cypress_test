describe('API: GET All Products List', () => {
    it('should return status 200 and valid product data', () => {
      cy.request('https://automationexercise.com/api/productsList')
        .then((response) => {
          // แปลง string → object (เพราะ API นี้ส่งเป็น text/plain)
          const body = JSON.parse(response.body)
          cy.log(body)
  
          // ตรวจสอบ status code
          expect(response.status).to.eq(200)
          expect(body.responseCode).to.eq(200)
  
          // ตรวจสอบว่า products เป็น array และมีสินค้า
          expect(body.products).to.be.an('array')
          expect(body.products.length).to.be.greaterThan(0)
  
          // ตรวจสอบว่า product ตัวแรกมี key
          const firstProduct = body.products[0]
          expect(firstProduct).to.have.property('id')
          expect(firstProduct).to.have.property('name')
          expect(firstProduct).to.have.property('price')
          expect(firstProduct).to.have.property('brand')
          expect(firstProduct).to.have.property('category')
  
          // ตรวจสอบ nested category
          expect(firstProduct.category).to.have.property('usertype')
          expect(firstProduct.category.usertype).to.have.property('usertype')
          expect(firstProduct.category).to.have.property('category')
        })
    })
 
    it('should return products related to keyword "top"', () => {
        cy.request({
          method: 'POST',
          url: 'https://automationexercise.com/api/searchProduct',
          form: true, // บอกว่าเราจะส่งเป็น x-www-form-urlencoded
          body: {
            search_product: 'top'
          }
        }).then((response) => {
          expect(response.status).to.eq(200)
    
          const body = JSON.parse(response.body)
    
          expect(body).to.have.property('products')
          expect(body.products).to.be.an('array')
          expect(body.products.length).to.be.greaterThan(0)
    
          const match = body.products.some(p =>
            p.name.toLowerCase().includes('top') ||
            p.category.category.toLowerCase().includes('top')
          )
          expect(match).to.be.true
        })
      })
      const keywords = ['top', 'shirt', 'bikini']
 
    keywords.forEach((keywords) => {
        it(`should return products related to keyword ${keywords}`, () => {
            cy.request({
              method: 'POST',
              url: 'https://automationexercise.com/api/searchProduct',
              form: true, // บอกว่าเราจะส่งเป็น x-www-form-urlencoded
              body: {
                search_product: keywords
              }
            }).then((response) => {
              expect(response.status).to.eq(200)
        
              const body = JSON.parse(response.body)
        
              expect(body).to.have.property('products')
              expect(body.products).to.be.an('array')
              expect(body.products.length).to.be.greaterThan(0)
        
              const match = body.products.some(p =>
                p.name.toLowerCase().includes(keywords) ||
                p.category.category.toLowerCase().includes(keywords)
              )
              expect(match).to.be.true
            })
          })
    })
 






  })