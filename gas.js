/*function doPost(e) {
  let data = JSON.parse(e.postData.getDataAsString());
  let distance = data.param;

  //現在日時を取得
  let now = new Date();

  //スプレッドシートの最終行の1つ下の行に現在時刻と距離情報を追記
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getActiveSheet();
  sheet.appendRow([now,distance]);
}*/

function doGet(e) {
  let distance = e.parameter.data1;


  //現在日時を取得
  let now = new Date();

  //スプレッドシートの最終行の1つ下の行に現在時刻と距離情報を追記
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getActiveSheet();
  sheet.appendRow([now,distance]);

  let lastRow = sheet.getLastRow();

  //const COUNT2H = 120;
  //const COUNT3H = 180;
  const COUNT2H = 5;
  const COUNT3H = 10;

  //配列初期化
  let baseArray = [];

  //直近の測定180回分(3時間分)の距離情報を取得して配列化
  for (let i = 0; i < COUNT3H; i++) {
    //取得対象のセルから値を取得
    let int = lastRow-i;
    let range = sheet.getRange("B"+int);
    let value = range.getValue();
    baseArray.push(value);
  }

  //二時間以内に席を立った回数
  let leave2h = 0;
  //三時間以内に席を立った回数
  let leave3h = 0;

  //取得した3個の距離情報のうち、距離が80以下の値の数を特定
  leave3h = baseArray.filter(function(item) {
    return item > 80;
  }).length;

  leave2h = baseArray.slice(0,COUNT2H).filter(function(item) {
    return item > 80;
  }).length;

  if (leave2h > 0) {
      // 通知を行わない
      console.log("警告通知不要");
  } else {
    // 通知を行う
    console.log("警告通知を行う");

    // LINEへ警告メッセージを送信する
    // 通知メッセージ設定
    let messageText = ''
    if (leave3h > 0) {
      messageText = '2時間以上座ってるよ！\nそろそろ体を動かそうね！'

    }else (
      messageText = '3時間以上座ってるよ！\nまずいよ!!!'
    )


    //LINEトークン設定
    //LINE Notifyの設定時に取得したトークンをここで設定する
    let token = ""

    //通知内容設定
    let options = {
      "method" : "post",
      "headers" : {
        "Authorization" : "Bearer "+ token
      },
      "payload" : {
        "message" : messageText
      }
    }
    //通知送信要求
    let url  = "https://notify-api.line.me/api/notify"
    UrlFetchApp.fetch(url, options)
  }
}


function del() {
  //スプレッドシート内の最終行を取得
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getActiveSheet();
  let lastRow = sheet.getLastRow();

  if(lastRow > 2000){
   sheet.deleteRows(1,1500);
   console.log("古い1500件の距離情報を削除しました。")
  }
}