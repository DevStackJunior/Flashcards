import DecksController from '#controllers/decks_controller'
import UsersController from '#controllers/users_controller'
import FlashcardController from '#controllers/flashcards_controller'
import router from '@adonisjs/core/services/router'
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

router.group(() => {
  // Route principale pour afficher tous les decks
  router.get('latest-decks', [DecksController, 'showLatestDecks'])

  // Route pour afficher un deck unique
  router.get('deck/:id', [DecksController, 'showOneDeck'])

  // Routes pour éditer/modifier un deck
  router.get('decks/:id/edit', [DecksController, 'edit'])
  router.put('decks/:id', [DecksController, 'update'])

  // Route pour créer un deck
  router.post('decks', [DecksController, 'create'])

  // Route pour supprimer un deck
  router.delete('decks/:id', [DecksController, 'destroy'])

  // Route pour publier un deck
  router.post('decks/:id/publish', [DecksController, 'create'])

  // Routes pour les flashcards
  router
    .get('decks/:deckId/flashcards', [DecksController, 'getFlashcardsByDeck'])
    .as('flashcards.index')

  // Routes resource users
  router.resource('users', UsersController).apiOnly()
})

//Données affichées seulement pour les utilisateurs connectés
/*router
  .group(() => {
    router.post('/comments', [CommentsController, 'store'])
    router.post('/evaluates', [EvaluatesController, 'store'])
    router.put('/comments/:id', [CommentsController, 'update'])
    router.put('/evaluates/:id', [EvaluatesController, 'update'])
    router.delete('/comments/:id', [CommentsController, 'destroy'])
    router.delete('/evaluates/:id', [EvaluatesController, 'destroy'])
    router.post('/books', [BooksController, 'store'])
    router.put('/books/:id', [BooksController, 'update'])
    router.delete('/books/:id', [BooksController, 'destroy'])
  })
  .use(middleware.auth())

//Utilisateur
router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('user')
*/
