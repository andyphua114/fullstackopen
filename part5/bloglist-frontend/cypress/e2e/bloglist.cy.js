describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const user2 = {
      name: 'Andy Phua',
      username: 'aphua',
      password: 'auhpa'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-submit').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-submit').click()

      cy.get('.wrong').should('contain', 'wrong username or password')
      cy.get('.wrong').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.wrong').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({ title: 'first blog', author: 'author 1', url: 'http://firstblog.com' })
      cy.createBlog({ title: 'second blog', author: 'author 2', url: 'http://secondblog.com' })
      cy.createBlog({ title: 'third blog', author: 'author 3', url: 'http://thirdblog.com' })
    })

    it('A blog can be created', function () {
      cy.contains('first blog author 1')
    })

    it('User can like a blog', function () {
      cy.contains('first blog author 1').parent().find('button').as('theButton')
      cy.get('@theButton').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
      cy.contains('like').click()
      cy.contains('likes 2')
    })

    it('User can delete a blog', function () {
      cy.contains('first blog author 1').parent().find('button').as('theButton')
      cy.get('@theButton').click()
      cy.contains('remove').click()
      cy.contains('first blog author 1').should('not.exist')
    })

    it('User cannot delete blog not belonging to user', function () {
      cy.contains('logout').click()

      cy.get('#username').type('aphua')
      cy.get('#password').type('auhpa')
      cy.get('#login-submit').click()

      cy.contains('first blog author 1').parent().find('button').as('theButton')
      cy.contains('remove').should('not.exist')
    })
  })

  describe('blog ordering', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({ title: 'first blog', author: 'author 1', url: 'http://firstblog.com' })
      cy.createBlog({ title: 'second blog', author: 'author 2', url: 'http://secondblog.com' })
      cy.createBlog({ title: 'third blog', author: 'author 3', url: 'http://thirdblog.com' })
    })

    it.only('blog in order', function () {
      cy.get('.blog').eq(0).should('contain', 'first blog author 1')
      cy.get('.blog').eq(1).should('contain', 'second blog author 2')
      cy.get('.blog').eq(2).should('contain', 'third blog author 3')

      cy.get('.blog').eq(2).find('button').click()
      cy.contains('like').click()
      cy.contains('likes 1')
      cy.contains('hide').click()

      cy.get('.blog').eq(0).should('contain', 'third blog author 3')
      cy.get('.blog').eq(1).should('contain', 'first blog author 1')
      cy.get('.blog').eq(2).should('contain', 'second blog author 2')

      cy.get('.blog').eq(2).find('button').click()
      cy.contains('like').click()
      cy.contains('likes 1')
      cy.contains('like').click()
      cy.contains('likes 2')
      cy.contains('hide').click()

      cy.get('.blog').eq(0).should('contain', 'second blog author 2')
      cy.get('.blog').eq(1).should('contain', 'third blog author 3')
      cy.get('.blog').eq(2).should('contain', 'first blog author 1')
    })
  })
})
