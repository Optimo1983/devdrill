module.exports = {
   users: `CREATE TABLE users (
      UserId INT AUTO_INCREMENT PRIMARY KEY,
      Username VARCHAR(32) UNIQUE NOT NULL,
      Email VARCHAR(255) UNIQUE NOT NULL,
      PasswordHash VARCHAR(255) NOT NULL,
      RegistrationDate DATETIME DEFAULT(CURRENT_TIMESTAMP) NOT NULL
   );`,
   cardTemplates: `CREATE TABLE card_templates (
      CardTemplateId INT AUTO_INCREMENT PRIMARY KEY,
      Html VARCHAR(2046)
   );`,
   cards: `CREATE TABLE cards (
      CardId INT AUTO_INCREMENT PRIMARY KEY,
      UserId INT NOT NULL,
         CONSTRAINT fk_cards_users FOREIGN KEY (UserId)
         REFERENCES users(UserId),
      CreationDate DATETIME DEFAULT(CURRENT_TIMESTAMP) NOT NULL
   );`,
   cardSides: `CREATE TABLE card_sides (
      CardSideId INT AUTO_INCREMENT PRIMARY KEY,
      CardId INT NOT NULL,
         CONSTRAINT fk_cardSides_cards FOREIGN KEY (CardId)
         REFERENCES cards(CardId),
      CardTemplateId INT NOT NULL,
         CONSTRAINT fk_cardSides_cardTemplates FOREIGN KEY (CardTemplateId)
         REFERENCES card_templates(CardTemplateId),
      Title VARCHAR(1022),
      Body VARCHAR(1022),
      ImageSource VARCHAR(1022),
      IsAnswer BOOL NOT NULL
   );`,
   decks: `CREATE TABLE decks (
      DeckId INT AUTO_INCREMENT PRIMARY KEY,
      UserId INT NOT NULL,
         CONSTRAINT fk_decks_users FOREIGN KEY (UserId)
         REFERENCES users(UserId),
      Name VARCHAR(255),
      Description VARCHAR(255),
      IsPublic BOOL
   );`,
   decksCards: `CREATE TABLE decks_cards (
      DeckCardId INT AUTO_INCREMENT PRIMARY KEY,
      DeckId INT NOT NULL,
         CONSTRAINT fk_decksCards_decks FOREIGN KEY (DeckId)
         REFERENCES decks(DeckId),
      CardId INT NOT NULL,
         CONSTRAINT fk_decksCards_cards FOREIGN KEY (CardId)
         REFERENCES cards(CardId)
   );`
}