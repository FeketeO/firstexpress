const jwt = require('jsonwebtoken');
const adminonly = require('./adminonly');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // Bearer dgfdggfhgfhsgg
        const token = authHeader.split('')[1];
        // a token így néz ki: az eleje a típusa, aztán a titkosított rész. Splittel a szóköznél szétszedem, és fogom a második tagját a tömbnek ami a dgfdggfhgfhsgg, a titkosított token

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();

            // tehát, ha sikerül beazonosítani a usert, akkor a request úgy megy már tovább,hogy van bene egy user, és az adminonly már ezt kapja meg, ahol az meg megnézi,hogy admin.e
        })
    } else {
        // ha már az authHeader sincs meg az elején
        res.sendStatus(401)
    }
};