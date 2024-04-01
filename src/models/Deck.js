class Deck {
   name;
   description;
   public;
   
   constructor(name, description, public) {
      this.name = name;
      this.description = description;
      this.public = public
   }
}

module.exports = Deck;