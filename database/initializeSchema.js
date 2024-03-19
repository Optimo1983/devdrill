require('dotenv').config();
const db = require('./db');
const config = require('config');

const tables = [
   `CREATE TABLE users (
      UserId INT AUTO_INCREMENT PRIMARY KEY,
      Username VARCHAR(32) UNIQUE NOT NULL,
      Email VARCHAR(255) UNIQUE NOT NULL,
      PasswordHash VARCHAR(255) NOT NULL,
      RegistrationDate DATETIME DEFAULT(CURRENT_TIMESTAMP) NOT NULL
   );`,
   `CREATE TABLE cards (
      CardId INT AUTO_INCREMENT PRIMARY KEY,
      UserId INT NOT NULL
         CONSTRAINT fk_cards_users FOREIGN KEY REFERENCES users(UserId),
      CreationDate DATETIME DEFAULT(CURRENT_TIMESTAMP) NOT NULL
   );`,
   `CREATE TABLE card_sides (
      CardSideId INT AUTO_INCREMENT PRIMARY KEY,
      CardId INT NOT
         CONSTRAINT fk_cardSides_cards FOREIGN KEY REFERENCES cards(CardId),
      CardTemplateId INT NOT NULL
         CONSTRAINT fk_cardSides_cardTemplates FOREIGN KEY REFERENCES card_templates(CardTemplateId),
      Title VARCHAR(1022),
      Body VARCHAR(1022),
      ImageSource(1022),
      LinkUrl(1022),
      IsAnswer BOOL NOT NULL
   );`,
   `CREATE TABLE card_templates (
      CardTemplateId INT AUTO_INCREMENT PRIMARY KEY,
      Html VARCHAR(2046)
   );`,
   `CREATE TABLE decks (
      DeckId INT AUTO_INCREMENT PRIMARY KEY,
      UserId INT NOT NULL
         CONSTRAINT fk_decks_users FOREIGN KEY REFERENCES users(UserId),
      Name VARCHAR(255),
      Description VARCHAR(255),
      IsPublic BOOL
   );`,
   `CREATE TABLE decks_cards (
      DeckCardId INT AUTO_INCREMENT PRIMARY KEY,
      DeckId INT NOT NULL,
         CONSTRAINT fk_decksCards_decks FOREIGN KEY REFERENCE decks(DeckId)
      CardId INT NOT NULL
         CONSTRAINT fk_decksCards_cards FOREIGN KEY REFERENCE cards(CardId)
   );`
]

const initialize = function() {
   for (let query of tables) {
      db.query(query, [], (err, result, fields) => {
         if (err) return console.log(err);
         console.log(result);
      })
   }
}

initialize();

