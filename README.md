# 校园APP


## 安卓证书

campus.keystore 就是签名证书,别名是campus，密钥是123456, 应用签名是：fae55fa9a2a90ee4c5b27f8f37c8122f （FA:E5:5F:A9:A2:A9:0E:E4:C5:B2:7F:8F:37:C8:12:2F）

```
# 生成keystore
keytool -genkey -alias campus -keyalg RSA -keysize 2048 -validity 36500 -keystore campus.keystore
# 查看应用签名md5
keytool -list -v -keystore campus.keystore
```