# 万能表单插件使用说明

万能表单和问卷调查的微信小程序插件，快速制作在线表单收集信息

项目最新的更新信息和使用说明见：

[https://github.com/longmix/wxa-plugin-wannengbiaodan](https://github.com/longmix/wxa-plugin-wannengbiaodan)

## 调用方法

### 在app.json中引入插件

```javascript
"plugins": {
    "live-player-plugin": {
        "version": "1.0.17",
        "provider": "wx00d1e2843c3b3f77" 
    }
  }
```

如果是通过第三方服务商开发小程序，可以在ext.json中

### 在具体的页面中调用

```javascript

      var params_str = 'sellerid=pmyxQxkkU&token=abcdefg&formid=1234';

      wx.navigateTo({
        url: 'plugin-private://wx00d1e2843c3b3f77/pages/selfform?'+ params_str    
      })
```

关于参数的说明，见下文。

### 效果预览

![image](http://yanyubao.tseo.cn/saasdocs/wp-content/uploads/2021/03/Wan_Neng_Biao_Dan_Cha_Jian_Yu_Lan_001_Fu_Ben.png)

## 参数说明


| No. | 参数名称 | 必填 | 参数说明 |
| :-: | :-: | :-: | :- |
| 1 | sellerid | 是 | 延誉宝商户编号，用于动态获取头部和按钮的背景颜色。 |
| 2 | token | 否 | 微读客项目Token，可选，用于验证formid是否合法。 |
| 3 | formid | 是 | 万能表单ID，用于显示表单的内容 |
| 4 | form_type | 否 | 表单类型，默认为2，代表读取微读客的万能表单 |
| 5 | submit_url | 否 | 数据提交的网址入口，URL的域名必须在小程序的request域名列表中，具体见下面说明。 |
| 6 | 其他参数 | 否 | 在进入小程序页面时候带进去，并随着其他字段一起提交到网址。 |
| 7 | scene | 否 | 小程序中的场景ID，可以生产无限多个小程序码。 |

### 关于submit_url说明

submit_url: 数据提交的网址入口，URL的域名必须在小程序的request域名列表中。
数据以post方式提交，格式为 aaa=1234&bbb=5678。
建议拦截数据并保存的同时，通过这个API接口提交给CMS存储一份副本。
submit_url必须返回的格式为 {'code':1, 'msg':'success'}，其中code为1代表保存成功。

### 关于“其他参数”说明

在进入小程序页面时候带进去，并随着其他字段一起提交到网址。
举例说明：form_type=2&token=abcdefg&formid=1234&orderno=87654321，那么“orderno”就是其他参数，保存数据的时候，会被一起提交到服务器。

### 关于scene参数的说明

在微信小程序中：以上设置支持scene参数模式（scene：小程序中的场景ID），可以生产无限多个小程序码。
格式为：sellerid#formtype#token#formid，例如“pmyxQxkkU2#abcd#1234”
代表 :
sellerid等于pmyxQxkkU，form_type等于 2，token为abcdef，formid为1234。

如果form_type为3，参考为2的情况（小程序端暂不支持为3的场景）；
如果为1，则后面两个参数随便填写，但是必须填写。

其他小程序和APP：暂不支持scene参数自动生成小程序码或者二维码。

## 设置万能表单

在延誉宝后台设置万能表单，操作路径为：延誉宝SaaS云 &gt;&gt; CMS控制台 &gt;&gt; 万能表单

操作界面截图如下：

![image](http://yanyubao.tseo.cn/saasdocs/wp-content/uploads/2021/03/wannengbiaodan001.png)

![image](http://yanyubao.tseo.cn/saasdocs/wp-content/uploads/2021/03/wannengbiaodan002.png)

后台提供强大的自定义表单字段的功能，同时对于收集到的表单信息，及时通过微信模板消息和电子邮件通知，以便及时查看和处理。

## 项目演示

### 通版商城小程序调用此项目

**延誉宝商城小程序**，商城源代码支持最新的微信小程序开放接口，包括使用open-data获取微信用户的头像和昵称信息等。

[https://github.com/longmix/shopmallminiprogram](https://github.com/longmix/shopmallminiprogram)


## 常见问题

### 如何设置表单头部的背景颜色和字体颜色

* 设置路径： SaaS云后台>>商城设置>>商城模板>>APP/小程序模板
* 设置选项：“全局设置”中的“导航栏背景颜色”和“导航栏文字颜色”

### 如何设置表单中的项目

* 设置路径：SaaS云后台>>CMS控制台>>万能表单
* 操作方法：在具体某一个表单的操作区，找到“输入项”，在这里调整即可。

### 如何自动接收新的表单提交项的通知？是否支持短信通知？

支持微信模板消息通知和邮件通知，可以绑定139和189等邮箱，以实现短信通知。

* 设置路径：SaaS云后台>>CMS控制台>>万能表单
* 操作方法：在具体某一个表单的操作区，找到“设置”，在这里调整即可。
