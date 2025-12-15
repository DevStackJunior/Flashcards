// import type { HttpContext } from '@adonisjs/core/http'
import Flashcard from '#models/flashcard'
import { HttpContext } from '@adonisjs/core/http'

export default class FlashcardsController {
  // SHOW LATEST FLASHCARDS
  async index({ view, params }: HttpContext) {
    const flashcard = await Flashcard.query().where('id', params.id).firstOrFail()

    return view.render('components/flashcards/detail', { flashcard })
  }

  // Récupérer toutes les notes et commentaires pour ce livre
  public async getFlashcardsByDeck({ params, response, view }: HttpContext) {
    const deckId = params.deck_id
    try {
      // Liaison des flashcards par deck
      const flashcards = await Flashcard.query().where('deck_id', deckId)
      /*console.log(
        'flashcards details:',
        flashcards.map((i) => i.toJSON())
      )*/
      return view.render('components/flashcards/list', { flashcards })
    } catch (error) {
      return response.internalServerError({
        message: 'Erreur serveur',
        error: error.message,
      })
    }
  }

  // CREATE A FLASHCARD
  async store({ request, view }: HttpContext) {
    const data = request.only(['question', 'answer', 'deck_id'])

    const flashcard = await Flashcard.create(data)
    return view.render('flashcard/create', { flashcard })
  }

  // UPDATE A FLASHCARD
  async update({ params, request, view }: HttpContext) {
    // Récupération des données
    const data = request.only(['question', 'reponse'])
    // Vérification de l'existence de
    const flashcard = await Flashcard.findOrFail(params.id)
    // Mise à jour des données de l'élève
    flashcard.merge(data)
    // Sauvegarde des modifications
    await flashcard.save()
    // Retourne le json de l'élève mis à jour
    return view.render('flashcard/create', { flashcard })
  }

  // DELETE A FLASHCARD
  //async destroy({ params, request }) {}
}
