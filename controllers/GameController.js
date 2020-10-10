
let LeaderBoard = require("../models/LeaderBoard")

exports.summaryPage = (req, res, next) => {
    let score = req.body.score
    console.log("yo" + score)
    res.render('summary', { pageTitle: 'Individual Assignment', score: score })

}
exports.leaderboard = (req, res, next) => {
    let username = req.body.username
    let score = req.body.score
    let rank
    let userScore = {
        username: username,
        score: score,
    }
    LeaderBoard.add(userScore)
    let top5Users = LeaderBoard.getTop5();

    top5Users.then(([rows, fieldData]) => {
        let top5Arr = []
        let index = 1;
        rows.forEach(row => {
            let userDataObj = {}
            userDataObj.username = row.username
            userDataObj.score = row.score
            userDataObj.rank = index++
            top5Arr.push(userDataObj)
        })
        res.render('leaderboard', { pageTitle: 'COMP-ASSIGNMENT', username: username, score: score, list: top5Arr});
    })
}