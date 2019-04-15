'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('full_name', 155).nullable()
      table.integer('mobile_phone', 155).nullable()
      table.boolean('is_actived').nullable()
      table.boolean('is_email_verified').nullable()
      table.string('temp_pin_verifiy', 255).nullable()
      table.integer('reward_point', 100).nullable()
      table.timestamp('device_signup').nullable()
      table.timestamp('device_last_signin').nullable()
      table.string('social_media_provider').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
