const Template = require('./CardTemplate');

class CardSide {
   template;
   title;
   body;
   imageSource;
   
   constructor(template, title, body, imageSource) {
      if ( !template instanceof Template ) throw new Error('"template" argument must be of type "Template"');
      this.template = template;
      this.title = title;
      this.body = body;
      this.imageSource = imageSource;
   }
}

module.exports = CardSide;