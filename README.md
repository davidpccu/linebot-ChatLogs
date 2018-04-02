# Line Chatbot
使用 Node.js 建立 Line機器人 利用Google試算表紀錄聊天內容


## Todolist

+ A little side project
+ 單純順手筆記紀錄一下

### 1. 建立Google表單

- 進入Google雲端
- 建立 → 更多 → Google表單

在這裡我們會利用Google表單地回復功能，來記錄機器人所在群組所以有文字訊息

### 2. 建立回應試算表

- 回復 → 建立新試算表

建立完成後回到雲端硬碟內應該會看到兩個試算表

<img src="https://i.imgur.com/SnyDZH9.jpg" width="60%">


### 3. 觀察Request

點選預覽表單，可以看到我設定了一個問題與三個選項

<img src="https://i.imgur.com/m1wNJeO.jpg" width="60%">

選取第二個選項後，我們來觀察一下Request的內容

<img src="https://i.imgur.com/syyHCpI.jpg" width="60%">


在上方我們可以觀察到以下資訊

+ https://docs.google.com
+ /forms/d/e/1FAIpQLSdF-LzuuEw12q7xUerltXagXv52c0Yaz2NGmnqfbg4G4v8UMg/formResponse?
+ entry.715183979=B567


我們可以觀察到試算表的回覆內容是透過QueryString來做傳遞
1. entry.715183979 就是我們所設定的題目
2. B567 是選項內容
3. path: d/e/1FAI....v8UMg/formResponse 中間這串就試算表得編號


組合出來的網址貼上網址列送出，就會發現回應表單內新增一筆新資料

``` html
https://docs.google.com/forms/d/e/1FAIpQLSdF-LzuuEw12q7xUerltXagXv52c0Yaz2NGmnqfbg4G4v8UMg/formResponse?entry.715183979=B567
```

所以如果我們要透過試算表紀錄聊天內容
只需要在建立表單時候，將選項設定成『簡答』即可

## 4. 實作紀錄聊天內容

``` javascript
var request = require("request");
var userId = encodeURI('Me');
var msg = encodeURI('Test');

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

```

<img src="https://i.imgur.com/95wWluU.jpg" width="60%">