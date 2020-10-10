let db = require('../utils/database');

function getTop5User(){
    return db.execute('SELECT * FROM leaderboards ORDER BY score DESC LIMIT 5')
}

function addUser(data) {
    let sql = "Insert into leaderboards (username, score) values ('" + data.username+ "','"+ data.score+ "')";
    db.execute(sql);
}


module.exports = {
    add : addUser,
    getTop5 : getTop5User,
}