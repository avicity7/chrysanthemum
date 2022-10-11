const {send, getTransactionHistory} = require("./safePublish");
const articleAddress = "0x305DCFACF0CF1fd5ba800677C818aE3730208De7";
var data;
function parseArticle(article) {
    var output = [];
    for (var x = 0; x<article.length;x++){
        output.push(article[x].split("^"));
    }
    return output
}

function pushArticle(topic,header,author,bio,discipline,body){
    var articleNumber = 1;
    let transactionHistory = getTransactionHistory(articleAddress);
    transactionHistory.then(function(result) {
        data = parseArticle(result);
        for (var x = 0; x<data.length; x++) {
            if (data[x][0] == topic) {
                articleNumber = parseInt(data[x][1]) + 1;
                break
            }
        }
        send(topic+"^"+articleNumber+"^"+header+"^"+author+"^"+bio+"^"+discipline+"^"+body,articleAddress)
    });
    return
}

//pushArticle("test","test3","test3","test3","test3","test3");

