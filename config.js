module.exports = {
    DB: {
        dev: process.env.DATABASE_URL || {
            'host': 'localhost',
            'port': '5432',
            'database': 'lost_runner_api',
            'user': 'nour',
            'password': '12345'
        }, 
        test: {
            'host': 'localhost',
            'port': '5432',
            'database': 'lost_runner_api',
            'user': 'nour',
            'password': '12345'
        }
    },
    PORT: {
        dev: 3000,
        test: 3030
    }
};
