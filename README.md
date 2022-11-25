# 作品概要
1. Raspberryに接続した超音波センサからディスプレイから物体への距離を30秒毎に計測する。
2. 計測した距離情報をスプレッドシートに追記する。
3. スプレッドシートに距離情報を追記したタイミングで2時間で一度もディスプレイから1m以上離れていなければ、警告する内容をLINEに送信。
## 必要な物
- HC-SR04(距離センサー)
- Raspberry pi 4 
- LINE アカウント
- LINE Notify アカウント
## 利用するサービス
- Google スプレッドシート
- Google Apps Script
- LINE Notify
## 作り方の手順
1. Google スプレッドシートとGoogle Apps Scriptを連携する。
2. Google Apps ScriptにLINE Notifyのトークンを貼る。
3. Raspberry PiにGoogle スプレッドシートのURLを貼る。
