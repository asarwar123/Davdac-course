module.exports={
    db: process.env.MONGODB_URI || 'mongodb://localhost/startup',
    port: process.env.PORT || 8999,
    env: process.env.NODE_ENV || 'development',
    jwtsecret: process.env.jwtsecret || '@sarwar123!'
};