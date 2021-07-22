import bcrypt from "bcrypt";

export default (password: string | number = '') => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(function(err, salt) {
      if (err) return reject(err);

      bcrypt.hash(password, 10, function(err, hash) {
        if (err) return reject(err);
        resolve(hash)
      });
    });
  })
}