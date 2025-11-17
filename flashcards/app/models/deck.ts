import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Flashcard from '#models/flashcard'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  //INPUTS PERSONNALISES
  @column.dateTime()
  declare publishedDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Flashcard)
  declare public flashcards: HasMany<typeof Flashcard>
}
