# 炎上ジェネレーター
炎上ジェネレーターです。

URLです。：https://enjo-generator.herokuapp.com/

## 使う人
```shell
$ npm install
$ bower install
```

やさしさアンチックをここ（ http://www.fontna.com/blog/1122/ ）からダウンロードしてくる。

`/public/font`に解凍したものを置く

twitter連携機能は、特定のアカウントにツイートさせて、twitter上にアップロードされた画像のurlを持ち込んでいる。
ツイートさせるアカウントでdeveloper登録を行い、consumerkeyなどを取得する必要がある。

取得してきたものを、`/config/default.json`に置く

```json
{
    "twitter": {
        "consumerKey": "yourConsumerKey",
        "consumerSecret": "yourConsumerSecret",
        "accessToken": "yourAccessToken",
        "accessTokenSecret": "yourAccessTokenSecret"
    }
}
```


