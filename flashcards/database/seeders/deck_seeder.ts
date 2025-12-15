import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DeckFactory } from '#database/factories/deck_factory'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await DeckFactory.createMany(10)
  }
}
