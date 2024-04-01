class User {
   userName;
   email;
   passwordHash;
   registrationDate;
   
   constructor(userName, email) {
      this.userName = userName;
      this.email = email;
      this.registrationDate = new Date().toUTCString();
   }
}

module.exports = User;