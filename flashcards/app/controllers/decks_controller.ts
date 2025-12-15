// import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import { HttpContext } from '@adonisjs/core/http'
import Flashcard from '#models/flashcard'
import { dd } from '@adonisjs/core/services/dumper'

export default class DecksController {
  // Affichage d'un deck unique
  public async showSingleDeck({ params, view }: HttpContext) {
    // Récupère le deck avec toutes ses flashcards

    const deck = await Deck.query()
      .preload('flashcards', (flashcardQuery) => {
        flashcardQuery.orderBy('created_at', 'asc')
      })
      .where('id', params.id)
      .firstOrFail()

    // Passe l'objet deck avec ses flashcards à la vue
    return view.render('components/decks/detail', { deck })
  }

  // Affichage de tous les decks dans ordre décroissant
  public async getDecksByPublishedDate({ view }: HttpContext) {
    const decks = await Deck.query().orderBy('published_date', 'desc')

    return view.render('components/decks/list', { decks })
  }

  // Création d'un deck
  async create({ request, auth, response }: HttpContext) {
    //const user = auth.user!
    // UPDATE 0.1 | Request.only à enlever -> validateur s'en charge
    const data = request.only(['published_date', 'updatedAt'])
    const deck = await Deck.create({
      ...data,
      //userId: user.id,
    })

    return response.created(deck)
  }

  // Création d'un deck
  async store({ request, auth, response }: HttpContext) {
    // UPDATE 0.1 | Request.only à enlever -> validateur s'en charge
    const data = request.only(['published_date', 'updatedAt'])
    const deck = await Deck.create({
      ...data,
    })

    return response.created(deck)
  }

  // Formulaire d'édition
  async edit({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    return view.render('decks/edit', { deck })
  }

  //updating the datas over
  async update({ params, request }: HttpContext) {
    // Récupération des données

    // UPDATE 0.1 | Request.only à enlever -> validateur s'en charge
    const data = request.only(['publishedDate']) //validateur
    // Vérification de l'existence du deck
    const deck = await Deck.findOrFail(params.id)
    // Mise à jour des données du deck
    deck.merge(data)
    // Sauvegarde des modifications
    await deck.save()
    // Retourne le json du deck mis à jour
    // UPDATER le retour en objet similaire à
    return deck
  }

  /**
   * Handle the form submission to delete a specific post by id.
   */
  async destroy({ params, auth, response }: HttpContext) {
    //const user = auth.user!
    const deck = await Deck.findOrFail(params.id)
    await deck.delete()
    return response.ok({ message: 'Livre supprimé avec succès.' })
  }
}
