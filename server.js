var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    winston = require('winston'),
    helmet = require('helmet'),
    cors = require('cors'),
    bodyparser = require('body-parser'),
    config = require('./config'),
    passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('./app/models/users');

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('Hello World!');
// }).listen(8000);

var app = express();
app.use(helmet());
app.use(cors());
app.use(bodyparser.json());

//Passport Setup

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtsecret;

passport.use(new JwtStrategy(opts,function(jwt_payload,done){
    User.findById(jwt_payload.id,function(err,user){
        if(err)
        {
            return done(err,false);
        }
        if(user){
            return(null,true);            
        }else
        {
            return(null,false);
        }

    })
}));

app.use(passport.initialize());

var port = config.port;

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (config.env != 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

app.use(require('./app/routes/routes'));

app.listen(port, function (err) {
    logger.info('listening at http://localhost:' + port);
});

mongoose.promise = global.promise;
mongoose.connect(config.db, { useNewUrlParser: true });

mongoose.connection.on('error', (err) => {
    logger.info('Mongodb connection error, Please confirm db is running');
    logger.error('Err:', err);
    process.exit;
});