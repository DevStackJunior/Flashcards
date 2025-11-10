import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Flashcard extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  //INPUT PERSONNALISES
  @column()
  declare question: string

  @column()
  declare reponse: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}