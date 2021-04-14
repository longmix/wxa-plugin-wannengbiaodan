# 万能表单插件使用说明 - 自定义页面模块

自定义页面：将传统H5网页自动转为图文并茂的小程序原生页面</u>，支持动态设置底部导航菜单。

为了便于项目集中管理，“自定义页面”不再另起项目，而是集成在“万能表单插件”中，该插件是万能表单和问卷调查的微信小程序插件，快速制作在线表单收集信息，是万能表单、问卷调查、自定义表单、信息收集表、数据采集表的功能软件。

项目最新的更新信息和使用说明（主要是万能表单功能的调用）见：

[https://github.com/longmix/wxa-plugin-wannengbiaodan](https://github.com/longmix/wxa-plugin-wannengbiaodan)

设置自定义页面的底部导航菜单，在SaaS云后台的路径为：云后台>>功能与扩展>>自定义页面。

https://yanyubao.tseo.cn/Supplier/WelcomePageMgr/index.html

> **以下是自定义页面的功能调用**

## 【调用方法1】通过Page跳转调用的方法

### 在app.json中引入插件

```javascript
"plugins": {
    "yyb_selfform_plugin": {
        "version": "1.2.3",
        "provider": "wx00d1e2843c3b3f77" 
    }
  }
```

其中的版本号可能会有所变化。如果是通过第三方服务商开发小程序，可以在ext.json中。

### 在具体的页面中调用

```javascript
var params_str = 'sellerid=pQNNmSkaq&platform=cms&imgid=7967';

      wx.navigateTo({
        url: 'plugin-private://wx00d1e2843c3b3f77/pages/welcome_page?'+ params_str  
      })
```

或者

```
var params_str = 'sellerid=pQNNmSkaq&platform=cms&imgid=7967';

wx.navigateTo({
url: 'plugin://yyb_selfform_plugin/welcome_page?'+ params_str
})
```

注意：url的路径有两种写法，都是小程序插件的标准。

### 调用参数举例

参数举例如下，关于参数的说明，见下文。


| No. | 参数举例 | 参数说明 |
| :-: | :-: | :-: |
| 1 | sellerid=**pQNNmSkaq**&platform=cms&imgid=**7967** | 获取CMS系统中的文章ID为7967的富媒体内容 |
| 2 | sellerid=**pQNNmSkaq**&platform=pic&imgid=**302** | 获取商城系统中的ID为302的广告图片 |
| 3 | 参数太长，见“备注002” | 通过网址获取自定义页面的内容，并设置推荐人ID为1234。 |
| 4 | sellerid=**pQNNmSkaq**&scene=**7967@0@cms** | 获取CMS系统中的文章ID为7967的富媒体内容 |
| 5 | sellerid=**pQNNmSkaq**&scene=**302@0@pic** | 获取商城系统中的ID为302的广告图片 |

> 备注002： sellerid=**pQNNmSkaq**&parentid=**1234**&data_url=**https%3A%2F%2Fyanyubao.tseo.cn%2Fopenapi%2FJianghanyinhua%2Fget_order_scan_report_page%3Forderno%3D20170123172139NJVOPW%26messageid%3D2968**

### 底部导航中的跳转链接

* 如果底部导航中有拨打电话的功能的，则使用默认的即可。
* 如果底部导航中需要跳转到其他页面，请在引用插件的时候，声明export，

```bash
"plugins": {
    "yyb_selfform_plugin": {
      "version": "1.2.3",
      "provider": "wx00d1e2843c3b3f77",
      "export": "exportToPlugin.js"
    }
  }
```

* 特别注意：增加了“"export": "exportToPlugin.js"”，改文件的代码具体见：
  *[https://github.com/longmix/wxa-plugin-wannengbiaodan/blob/main/miniprogram/exportToPlugin.js](https://github.com/longmix/wxa-plugin-wannengbiaodan/blob/main/miniprogram/exportToPlugin.js)*
* exportToPlugin.js中的函数名称“`link_item_click`”不可以修改，必须使用这个名字。

## 【调用方法2】通过组件调用的方法

> 同万能表单，如果不想做深入集成，通过方法1完全够用，此方法可以无视。
>
> js文件中具体调用方法见：
>
> *[https://github.com/longmix/wxa-plugin-wannengbiaodan/blob/main/miniprogram/pages/show_welcome_page/show_welcome_page.js](https://github.com/longmix/wxa-plugin-wannengbiaodan/blob/main/miniprogram/pages/show_welcome_page/show_welcome_page.js)*

### json和wxml文件中的设置

需要指出，因为是通过“插件”的“组件”来调用，所以需要在pages的json文件中声明：

```bash
{
  "usingComponents": {

    "welcome_page-tag": "plugin://yyb_selfform_plugin/welcome_page-tag"
  }
}
```

在wxml文件中则非常简单，代码如下：

```bash
<view>
		<welcome_page-tag  
			wx:if="{{show_welcome_page_tag == 1}}"
			callback_data = "{{callback_data}}"
			bind:link_item_click="link_item_click"
		/>

</view>
```

wxss文件则不需要做任何修改。

## 参数说明


| No. | 参数名 | 必填 | 参数说明 |
| :-: | :-: | :-: | :- |
| 1 | sellerid | 是 | 延誉宝商户编号，用于动态获取头部和按钮的背景颜色。 |
| 2 | platform | 是 | 内容所属的平台，支持cms和pic |
| 3 | imgid | 是 | 延誉宝CMS平台的文章ID，或者商城广告图片的ID |
| 4 | scene | 否 | 小程序中的场景ID，可以生产无限多个小程序码。 |
| 5 | data_url | 否 | 获取数据来源的网址，如果定义了此参数，则从这个获取媒体内容。 |
| 6 | parentid | 否 | 推荐人ID，可以为0，目前只有定义data_url的时候，可以在处理逻辑值扩展 |
| 7 | openid | 否 | 字符串，可为空 |
| 8 | userid | 否 | 数字，可为0 |
| 9 | checkstr | 否 | 字符串，可为空 |
