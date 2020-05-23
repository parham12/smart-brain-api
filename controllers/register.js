
const handleRegister = (postgres, bcrypt) => (req, res) => {
    const {name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    if (!email || !password || !name) {
        return res.status(400).json('Error! fill all the required fields.');
    }
    postgres.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json(err))
};

module.exports = {
    handleRegister: handleRegister
};