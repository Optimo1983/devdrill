

class Card {
   #dateCreated;
   
   constructor() {
      this.#dateCreated = Date.now();
   }

   getDateCreated() {
      console.log('Accessing date created')
      return this.#dateCreated;
   }
}

const newCard = new Card();
console.log(newCard.dateCreated);