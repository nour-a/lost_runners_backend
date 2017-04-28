module.exports = {
    DB: {
        dev: {
            'host': 'localhost',
            'port': '5432',
            'database': 'lost_runner_api',
            'user': 'lost_runner',
            'password': 'lost_runner_user'
        }, 
        test: {
            'host': 'localhost',
            'port': '5432',
            'database': 'lost_runner_api',
            'user': 'lost_runner',
            'password': 'lost_runner_user'
        }
    },
    PORT: {
        dev: 3000,
        test: 3030
    }
};