const User = require('./User');
const CardSide = require('./CardSide');

class Card {
   userId;
   createdDate;
   question;
   answer;
   
   constructor(user, question, answer) {
      if ( !user instanceof User ) throw new Error('"user" argument must be of type "User"');
      if ( !question instanceof CardSide ) throw new Error('"question" argument must be of type "CardSide"');
      if ( !answer instanceof CardSide ) throw new Error('"answer" argument must be of type "CardSide"');

      this.user = user;
      this.question = question;
      this.answer = answer;
      this.createdDate = new Date().toUTCString();
   }
}

module.exports = Card;