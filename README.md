# 校园APP


## 安卓证书

campus.keystore 就是签名证书,别名是campus，密钥是123456

```
# 生成keystore
keytool -genkey -alias campus -keyalg RSA -keysize 2048 -validity 36500 -keystore campus.keystore
# 查看应用签名md5
keytool -list -v -keystore campus.keystore
```