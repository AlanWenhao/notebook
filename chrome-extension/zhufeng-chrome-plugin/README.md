# ele-chrome-plugin

## 功能
- 获取多平台后台用户待上传短信
- 预审核
- 上传（至饿了么短信审核平台）或拒绝（多平台后台）短信审核
- 自动更新状态，将多平台短信与饿了么短信后台短信对比，状态发生改变，则更新

## 文件结构
- chrome插件配置文件 `/manifest.json`
- 插件popup界面 `/popup.html`
- 插件后台界面（常运行）`/background.html`
- 插件功能JS脚本 `/js/background.js`

## 注意
饿了么商家后台认证会不定期失效，如果失效，可至商家后台重新抓取http报文，修改 `initFetchData` 与 `initUploadData` 两函数请求体
