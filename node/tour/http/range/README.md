# 范围请求 206

> 在浏览器中一般范围请求用的比较少，因为一旦客户端关闭，这个范围请求也就无效了，跟迅雷的暂停下载功能是不同的

## 发送请求
```bash
curl -v --header "Range:bytes=0-5" http://www.baidu.com/img/baidu_jgylogo3.gif
```

## 服务器响应
这时候对应的请求以及相应内容如下
```
*   Trying 115.239.210.27...
* TCP_NODELAY set
* Connected to www.baidu.com (115.239.210.27) port 80 (#0)
> GET /img/baidu_jgylogo3.gif HTTP/1.1
> Host: www.baidu.com
> User-Agent: curl/7.51.0
> Accept: */*
> Range:bytes=0-5
>
< HTTP/1.1 206 Partial Content
< Accept-Ranges: bytes
< Cache-Control: max-age=315360000
< Connection: Keep-Alive
< Content-Length: 6
< Content-Range: bytes 0-5/705
< Content-Type: image/gif
< Date: Wed, 01 Aug 2018 09:19:58 GMT
< Etag: "2c1-4a6473f6030c0"
< Expires: Sat, 29 Jul 2028 09:19:58 GMT
< Last-Modified: Wed, 22 Jun 2011 06:40:43 GMT
< P3p: CP=" OTI DSP COR IVA OUR IND COM "
< Server: Apache
< Set-Cookie: BAIDUID=648E88E2A5BAAA5AE949068D3590A800:FG=1; expires=Thu, 01-Aug-19 09:19:58 GMT; max-age=31536000; path=/; domain=.baidu.com; version=1
<
* Curl_http_done: called premature == 0
* Connection #0 to host www.baidu.com left intact
GIF89a%
```

## 关键字段
其中比较关键的信息为请求头中 `Range`，相应内容中的 `206`，`Accept-Ranges: bytes`，`Content-Range: bytes 0-5/705`，
