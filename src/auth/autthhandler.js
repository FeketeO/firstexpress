const jwt = require('jsonwebtoken');
const adminonly = require('./adminonly');


const Users = [ 
    {
        username: 'admin',
        password: 'admin_pw',
        role: 'admin'
    },
    {
        username: 'user',
        password: 'user_pw',
        role: 'user'
    }
];

const refreshTokens = [];

module.exports.login = (req, res) => {
    const { username, password } = req.body;

    const user = Users.find( 
        user => user.username === username && user.password === password
        );

        if (user) {
            const accessToken = jwt.sign({
                username: user.username,
                role: user.role
            }, process.env.ACCESS_TOKEN_SECRET, 
            {
                expiresIn: process.env.TOKEN_EXPIRY
            }
            );

            const refreshToken = jwt.sign({
                username: user.username,
                role: user.role
            }, process.env.REFRESH_TOKEN_SECRET);

            refreshTokens.push(refreshToken);

            res.json({
                accessToken,
                refreshToken
            });
        } else {
            res.send('Username or password incorrect')
        }
};

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


const jwt = require('jsonwebtoken');



