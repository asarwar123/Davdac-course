module.exports={
    db: process.env.MONGODB_URI || 'mongodb://localhost/startup',
    port: process.env.PORT || 8999,
    env: process.env.NODE_ENV || 'development',
    jwtsecret: process.env.JWT_SECRET || '@sarwar123!',
    mailgun:{
        apikey:process.env.MAILGUN_API_KEY || 'f4706d7db3a1823a8799863e6a48960d-c8e745ec-8b1496c8',
        domain:process.env.MAILGUN_DOMAN || 'sandbox88621dc35d974e428cf21a6d8f496eea.mailgun.org',
    }
};