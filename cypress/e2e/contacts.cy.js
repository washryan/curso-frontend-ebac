describe('Agenda de contatos - Testes E2E', () => {
  const base = '/' // com baseUrl definido no cypress.config.js

  function addContact(name, email, phone) {
    // tenta localizar inputs por placeholder ou por atributo name
    cy.get('input[placeholder*="Nome"], input[placeholder*="nome"], input[name*="nome"], input[aria-label*="Nome"]').first().clear().type(name)
    cy.get('input[placeholder*="E-mail"], input[placeholder*="Email"], input[name*="email"], input[aria-label*="Email"]').first().clear().type(email)
    cy.get('input[placeholder*="Telefone"], input[placeholder*="telefone"], input[name*="telefone"], input[aria-label*="Telefone"]').first().clear().type(phone)

    // botão de submissão: procura por textos comuns (adicionar, salvar, criar)
    cy.contains('button', /adicionar|salvar|criar|incluir|enviar|guardar/i).first().click()
  }

  beforeEach(() => {
    cy.visit(base)
  })

  it('Deve adicionar dois contatos', () => {
    addContact('Fulano de Tal', 'fulano@example.com', '11999990000')
    // esperar a UI atualizar — uso de assertions é preferível ao wait
    cy.contains(/Fulano de Tal/i).should('exist')

    addContact('Beltrano Silva', 'beltrano@example.com', '21988880000')
    cy.contains(/Beltrano Silva/i).should('exist')

    // checar que existem pelo menos 2 itens com texto dos nomes
    cy.contains(/Fulano de Tal/i).should('exist')
    cy.contains(/Beltrano Silva/i).should('exist')
  })

  it('Deve editar um contato existente', () => {
    const original = 'Fulano de Tal'
    const updated = 'Fulano Alterado'

    // garantir que existe (se não existir, cria)
    cy.contains(original).then($el => {
      if (!$el.length) {
        addContact(original, 'fulano@example.com', '11999990000')
        cy.contains(original).should('exist')
      }
    })

    // localiza o item com o nome e procura pelo botão de editar dentro desse contexto
    cy.contains(original)
      .closest('li')
      .within(() => {
        cy.get('button.edit').click()
      })



    // agora atualiza o campo de nome (tenta encontrar input de edição)
    cy.get('input[placeholder*="Nome"], input[name*="nome"], input[aria-label*="Nome"]').first().clear().type(updated)
    // clicar em salvar/atualizar
    cy.contains('button', /salvar|atualizar|confirmar/i).first().click()

    cy.contains(updated).should('exist')
  })

  it('Deve remover um contato', () => {
    const toRemove = 'Beltrano Silva'

    // garantir que existe (se não existir, cria)
    cy.contains(toRemove).then($el => {
      if (!$el.length) {
        addContact(toRemove, 'beltrano@example.com', '21988880000')
        cy.contains(toRemove).should('exist')
      }
    })

    // localiza o item e clica em excluir/remover
    cy.contains(toRemove)
      .closest('li, .contact-item, .contato, .post-comment, tr')
      .within(() => {
        cy.contains(/remover|excluir|apagar|delete/i).first().click()
      })

    // verificar que não existe mais
    cy.contains(toRemove).should('not.exist')
  })
})
