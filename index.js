var linebot = require('linebot');
var express = require('express');
var http = require("https");
var bot = linebot({
    channelId: 'channel Id',
    channelSecret: 'channel Secret',
    channelAccessToken: 'channel Access Token'
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});


bot.on('message', function(event) {
    console.log(event.source.userId);
    console.log(event.message.text);

    kkbox(event);
});

function SaveMessage(event, userId, msg) {
    if (event.message.type != 'text') { return }

    userId = encodeURI('Me');
    msg = encodeURI('Test');

    var options = {
        "method": "POST",
        "hostname": "docs.google.com",
        "port": null,
        "path": '/forms/d/e/1FAIpQLSdF-LzuuEw12q7xUerltXagXv52c0Yaz2NGmnqfbg4G4v8UMg/formResponse?entry.715183979=' + userId + '&entry.715183980=' + msg,
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "accept-encoding": "gzip, deflate, br"
        }
    };

    var req = http.request(options);
    req.end();
}