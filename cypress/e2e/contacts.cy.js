/// <reference types="cypress" />

describe('Testes de funcionalidades de Agenda de Contatos', () => {
  beforeEach(() => {
    cy.visit('https://ebac-agenda-contatos-tan.vercel.app')
  })

  //Testar funcionalidades: adição, edicão e remoção de contatos

  //Adicionar novo contato
  it('Deve adicionar novo contato', () => {
    cy.get('input[type="text"]').type('Isabela Ramos')
    cy.get('input[type="email"]').type('isabelaramos@teste.com')
    cy.get('input[type="tel"]').type('11 912345678')
    cy.get('.adicionar').click()

    cy.contains('div.contato', 'Isabela Ramos').should('exist')
    cy.contains('div.contato', 'isabelaramos@teste.com').should('exist')
    cy.contains('div.contato', '11 912345678').should('exist')
  })

  //Editar informações de contato
  it('Deve ativar modo de edição', () => {
    cy.get(':nth-child(2) > .sc-gueYoa > .edit').click()
    cy.get('[type="text"]').should('have.length.greaterThan', 0)
  })

  it('Deve alterar o primeiro contato selecionado', () => {
    cy.get('.edit').last().click()
  
    //Alterar e-mail
    cy.get('[type="email"]').clear()
    cy.get('[type="email"]').type('isabela@teste.com')

    //Alterar telefone
    cy.get('[type="tel"]').clear()
    cy.get('[type="tel"]').type('11 989765432')

    //Salvar alterações
    cy.get('.alterar').click()
  })

  //Deletar contato
  it('Deve apagar o ultimo contato', () => {
    cy.get('.delete').last().click()
  })
});
