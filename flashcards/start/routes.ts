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

router.group(() => {
  // Route principale pour afficher tous les decks
  router.get('decks', [DecksController, 'getDecksByPublishedDate'])

  // Route pour afficher un deck unique
  router.get('decks/:id', [DecksController, 'showSingleDeck'])

  // Routes pour éditer/modifier un deck
  router.get('decks/:id/edit', [DecksController, 'edit'])
  router.put('decks/:id', [DecksController, 'update'])

  // Route Affichage Formulaire
  router.get('decks/add', [DecksController, 'create'])

  // Route pour créer un deck
  router.post('decks/add', [DecksController, 'store'])

  // Route pour supprimer un deck
  router.delete('decks/:id', [DecksController, 'destroy'])

  // Route pour publier un deck
  router.post('decks/:id/publish', [DecksController, 'create'])

  // Routes pour les flashcards
  router.get('decks/:id/cards', [FlashcardController, 'getFlashcardsByDeck']).as('flashcards.index')

  // Routes resource users
  router.resource('users', UsersController).apiOnly()
})

router.group(() => {
  //Affichage des decks publiés

  router.get('decks/:deck_id/flashcards', [FlashcardController, 'getFlashcardsByDeck']) // Liste des flashcards

  router.get('decks/:deck_id/flashcards/:id', [FlashcardController, 'index'])

  router.post('flashcard/add', [FlashcardController, 'store']) // Créer une flashcard
  //router.get('/flashcards/latest', [FlashcardController, 'showLatestFlashcards']) // Voir 10 dernières flashcards
  // Route pour éditer/modifier une flashcard
  router.put('flashcard/:id/edit', [FlashcardController, 'update']) // Mettre à jour

  //router.delete('/:id', [FlashcardController, 'destroy']) // Supprimer
})
