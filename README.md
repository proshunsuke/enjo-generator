# 炎上ジェネレーター
炎上ジェネレーターです。

URLです。：https://enjo-generator.herokuapp.com/

## 使う人

### インストール

```shell
$ make install
```

### run

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

```shell
$ make run
```

[http://localhost:3000/](http://localhost:3000/) にアクセス

## 動作環境
<table>
<tr>
<td>node</td><td>0.10.33</td>
</tr>
<tr>
<td>express</td><td>4.9.0</td>
</tr>
<tr>
<td>etc</td><td>0.5.9</td>
</tr>
<tr>
<td>node-twitter-api</td><td>1.5.0</td>
</tr>
<tr>
<td>metro-ui-css</td><td>2.*</td>
</tr>
<tr>
<td>canvas</td><td>1.1.6</td>
</tr>
</table>
