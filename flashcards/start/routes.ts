import DecksController from '#controllers/decks_controller'
import UsersController from '#controllers/users_controller'
import FlashcardController from '#controllers/flashcards_controller'
import router from '@adonisjs/core/services/router'
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'
import AuthController from '#controllers/auth_controller'

router.group(() => {
  // Routes d'authentification
  router.get('/register', [AuthController, 'registerShow']).as('auth.register.show')
  router.post('/register', [AuthController, 'register']).as('auth.register.store')
  router.get('/login', [AuthController, 'loginShow']).as('auth.login.show')
  router.post('/login', [AuthController, 'login']).as('auth.login.store')
  router.post('/logout', [AuthController, 'logout']).as('auth.logout')

  // Affichage tous les decks
  router.get('/', [DecksController, 'index']).as('home')
  // Affichage deck unique
  router
    .get('decks/:id', [DecksController, 'showSingleDeck'])
    .as('decks.showSingleDeck')
    .where('id', router.matchers.number())
  // Liste flashcards d'un deck
  router.get('decks/:deck_id/cards', [FlashcardController, 'index']).as('flashcards.index')
})

router
  .group(() => {
    router.get('decks/add', [DecksController, 'create']).as('decks.create')
    router.post('decks/add', [DecksController, 'store']).as('decks.store')
    router.get('decks/:id/edit', [DecksController, 'edit']).as('decks.edit')
    router.put('decks/:id', [DecksController, 'update']).as('decks.update')
    router.delete('decks/:id', [DecksController, 'destroy']).as('decks.destroy')
    router.post('decks/:id/publish', [DecksController, 'publish']).as('decks.publish')

    router
      .get('decks/:deck_id/cards/create', [FlashcardController, 'create'])
      .as('flashcards.create')
    router.post('decks/:deck_id/cards', [FlashcardController, 'store']).as('flashcards.store')
    router.get('flashcards/:id/edit', [FlashcardController, 'edit']).as('flashcards.edit')
    router.put('flashcards/:id', [FlashcardController, 'update']).as('flashcards.update')
    router.delete('flashcards/:id', [FlashcardController, 'destroy']).as('flashcards.destroy')
  })
  .use(middleware.auth())
