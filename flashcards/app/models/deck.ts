import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  //INPUT PERSONNALISES
  @column.dateTime()
  declare publishedDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}