// import type { HttpContext } from '@adonisjs/core/http'
import Flashcard from '#models/flashcard'
import { HttpContext } from '@adonisjs/core/http'
import { flashcardValidator } from '#validators/flashcard'
import Deck from '#models/deck'

export default class FlashcardsController {
  // LIST FLASHCARDS FOR A DECK
  public async index({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deck_id)
    await deck.load('flashcards')
    return view.render('flashcards/index', { deck, flashcards: deck.flashcards })
  }

  // CREATE FORM
  async create({ params, view, auth, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.deck_id)

    if (auth.user?.id !== deck.userId && !auth.user?.isAdmin) {
      session.flash('error', "Vous n'avez pas la permission de modifier ce deck.")
      return response.redirect().toRoute('home')
    }
    return view.render('flashcards/create', { deck })
  }

  // STORE FLASHCARD
  async store({ params, request, response, session, auth }: HttpContext) {
    const deck = await Deck.findOrFail(params.deck_id)

    if (auth.user?.id !== deck.userId && !auth.user?.isAdmin) {
      session.flash('error', "Vous n'avez pas la permission de modifier ce deck.")
      return response.redirect().toRoute('home')
    }

    const data = await request.validateUsing(flashcardValidator)

    await deck.related('flashcards').create(data)

    session.flash('success', 'La flashcard a été ajoutée avec succès !')
    return response.redirect().toRoute('flashcards.index', { deck_id: deck.id })
  }

  // EDIT FORM
  async edit({ params, view, auth, response, session }: HttpContext) {
    const flashcard = await Flashcard.query().where('id', params.id).preload('deck').firstOrFail()

    if (auth.user?.id !== flashcard.deck.userId && !auth.user?.isAdmin) {
      session.flash('error', "Vous n'avez pas la permission de modifier cette flashcard.")
      return response.redirect().toRoute('home')
    }

    return view.render('flashcards/edit', { flashcard })
  }

  // UPDATE FLASHCARD
  async update({ params, request, response, session, auth }: HttpContext) {
    const flashcard = await Flashcard.query().where('id', params.id).preload('deck').firstOrFail()

    if (auth.user?.id !== flashcard.deck.userId && !auth.user?.isAdmin) {
      session.flash('error', "Vous n'avez pas la permission de modifier cette flashcard.")
      return response.redirect().toRoute('home')
    }

    const data = await request.validateUsing(flashcardValidator)

    flashcard.merge(data)
    await flashcard.save()

    session.flash('success', 'La flashcard a été mise à jour avec succès !')
    return response.redirect().toRoute('flashcards.index', { deck_id: flashcard.deckId })
  }

  // DESTROY FLASHCARD
  async destroy({ params, response, session, auth }: HttpContext) {
    const flashcard = await Flashcard.query().where('id', params.id).preload('deck').firstOrFail()

    if (auth.user?.id !== flashcard.deck.userId && !auth.user?.isAdmin) {
      session.flash('error', "Vous n'avez pas la permission de supprimer cette flashcard.")
      return response.redirect().toRoute('home')
    }

    const deckId = flashcard.deckId
    await flashcard.delete()
    session.flash('success', 'La flashcard a été supprimée avec succès !')
    return response.redirect().toRoute('flashcards.index', { deck_id: deckId })
  }
}
