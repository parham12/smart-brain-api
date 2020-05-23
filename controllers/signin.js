
const handleSignin = (postgres, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Error! fill all the required fields.');
    }
    postgres.select('email', 'hash').from('login').where({email})
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return postgres.select('*').from('users').where({email})
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('unable to get user')) 
            } else {
                res.status(400).json('Wrong email or password')
            }
        })
        .catch(err => res.status(400).json('Wrong email or password'))
}

module.exports = {
    handleSignin: handleSignin
}