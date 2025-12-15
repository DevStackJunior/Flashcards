import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { FlashcardFactory } from '#database/factories/flashcard_factory'
import Deck from '#models/deck'

export default class extends BaseSeeder {
  async run() {
    // Get all decks to associate flashcards with them
    const decks = await Deck.all()

    if (decks.length === 0) {
      console.warn('No decks found. Please run DeckSeeder first.')
      return
    }

    // Create flashcards and randomly assign them to decks
    for (let i = 0; i < 10; i++) {
      const randomDeck = decks[Math.floor(Math.random() * decks.length)]
      await FlashcardFactory.merge({ deckId: randomDeck.id }).create()
    }
  }
}
