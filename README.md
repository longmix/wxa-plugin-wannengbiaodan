# 万能表单插件使用说明

万能表单和问卷调查的微信小程序插件，快速制作在线表单收集信息，是万能表单、问卷调查、自定义表单、信息收集表、数据采集表的功能软件。

最新的插件版本，除了支持**万能表单**之外，还支持**自定义页面**，<u>将传统H5网页自动转为图文并茂的小程序原生页面</u>。

项目最新的更新信息和使用说明见：

[https://github.com/longmix/wxa-plugin-wannengbiaodan](https://github.com/longmix/wxa-plugin-wannengbiaodan)

Version 1.2.8
万能表单控件增加隐藏平铺广告和显示并自动播放视频两个选项。

Version 1.2.7
增加将链接内容复制到剪切板的功能，链接的语法为“copytext://”，在函数copy_text中响应，具体调用方法见插件说明文档。

Version 1.2.6
1、万能表单提交的时候，增加对隐藏字段的处理。 2、万能表单提交成功后，跳转到一个提示界面，避免停留在原界面不动。

Version 1.2.5
优化富媒体显示，增加插件内链接点击事件的回调函数。

Version 1.2.3
修正1.2.0版本反馈的BUG，补正对一些参数的支持。

Version 1.2.0
优化万能表单，增加自定义页面。

Version 1.1.0
支持组件模式调用插件。


### 自定义页面功能模块

调用自定义页面请移步：

*[https://github.com/longmix/wxa-plugin-wannengbiaodan/blob/main/welcome_page_readme.md](https://github.com/longmix/wxa-plugin-wannengbiaodan/blob/main/welcome_page_readme.md)*

> *以下是万能表单的功能调用*

## 【调用方法1】通过Page跳转调用的方法

### 在app.json中引入插件

```javascript
"plugins": {
    "yyb_selfform_plugin": {
        "version": "1.2.7",
        "provider": "wx00d1e2843c3b3f77" 
    }
  }
```

其中的版本号可能会有所变化。如果是通过第三方服务商开发小程序，可以在ext.json中。

### 在具体的页面中调用

```javascript
var params_str = 'sellerid=pmyxQxkkU&token=abcdefg&formid=1234';

      wx.navigateTo({
        url: 'plugin-private://wx00d1e2843c3b3f77/pages/selfform?'+ params_str  
      })
```

或者

```javascript
var params_str = 'sellerid=pmyxQxkkU&token=abcdefg&formid=1234';

      wx.navigateTo({
        url: 'plugin://yyb_selfform_plugin/pages/selfform?'+ params_str  
      })
```

注意：url的路径有两种写法，都是小程序插件的标准。

### 调用参数举例

参数举例如下，关于参数的说明，见下文。


| No. | 参数举例 | 参数说明 |
| :-: | :-: | :-: |
| 1 | sellerid | 是 | 延誉宝商户编号，用于动态获取头部和按钮的背景颜色。 |
| 2 | form_token | 否 |  微读客项目Token，可选，用于验证formid是否合法。 |
| 3 | formid | 是 |  万能表单ID，用于显示表单的内容 |
| 4 | form_type | 否 |  表单类型，默认为2，代表读取微读客的万能表单 |
| 5 | submit_url | 否 |  数据提交的网址入口，URL的域名必须在小程序的request域名列表中，具体见下面说明。 |
| 6 | hidden_ad_img_list | 否 |  如果值等于1，则不显示平铺广告 |
| 7 | video_url | 否 |  如果有视频，这里传入视频的URL网址（请做encodeURIComponent转换） |
| 8 | video_cover_url | 否 |  如果有视频，这里传入视频封面的URL（请做encodeURIComponent转换） |
| 9 | video_autoplay | 否 |  如果有视频，video_autoplay值等于1，则自动播放视频 |
| 10 | 其他参数 | 否 |  在进入小程序页面时候带进去，并随着其他字段一起提交到网址。  |
| 11 | scene | 否 |  小程序中的场景ID，可以生产无限多个小程序码。  |
| 12 | openid | 否 |  如果form_type等于2，则可以带上openid，以获取之前填写的数据。  |
| 13 | userid | 否 |  如果form_type等于1，则userid参数必带，请做好身份验证。  |

> 备注001： sellerid=**pmyxQxkkU**&form_type=2&form_token=**mrfuhd1546833814**&formid=**342**&submit_url=**https%3A%2F%2Fyanyubao.tseo.cn%2Fopenapi%2FJianghanyinhua%2Fsubmit_data_notify_type**&openid=**oTESv4sCTCIMncMYUisOKRgNBTFg**
> （填写CMS系统中ID为342的万能表单，并将数据保存到指定的网址submit_url，同时，如果openid:oTESv4sCTCIMncMYUisOKRgNBTFg）

### 底部导航中的跳转链接

* 如果底部导航中有拨打电话的功能的，则使用默认的即可。
* 如果底部导航中需要跳转到其他页面，请在引用插件的时候，声明export，

```bash
"plugins": {
    "yyb_selfform_plugin": {
      "version": "1.2.7",
      "provider": "wx00d1e2843c3b3f77",
      "export": "exportToPlugin.js"
    }
  }
```

* 特别注意：增加了“"export": "exportToPlugin.js"”，该文件的代码具体见：
  *[https://github.com/longmix/wxa-plugin-wannengbiaodan/blob/main/miniprogram/exportToPlugin.js](https://github.com/longmix/wxa-plugin-wannengbiaodan/blob/main/miniprogram/exportToPlugin.js)*
* exportToPlugin.js中的函数名称“`link_item_click`”和“`copy_text`”不可以修改，必须使用这个名字。
* 因为在插件中没有权限调用wx.NavagteTo接口，所以link_item_click这个函数里面同样不可以通过这个接口跳转到其他界面或者H5页面；但是可以使用复制到剪切板等其他接口。
* 如果希望这个点击事件可以跳转出去，需要通过【调用方法2】实现。

## 【调用方法2】通过组件调用的方法

> 如果不想做深入集成，通过方法1完全够用，此方法可以无视。

### 在app.json中引入插件，与通过Page跳转调用一样

```javascript
"plugins": {
    "live-player-plugin": {
        "version": "1.2.7",
        "provider": "wx00d1e2843c3b3f77" 
    }
  }
```

其中的版本号可能会有所变化。

同样，如果是通过第三方服务商开发小程序，可以放在ext.json中。

调用的示例代码见
[https://github.com/longmix/wxa-plugin-wannengbiaodan/blob/main/miniprogram/pages/show_form/show_form.js](https://github.com/longmix/wxa-plugin-wannengbiaodan/blob/main/miniprogram/pages/show_form/show_form.js)

### 在具体的页面中调用

在页面中调用过程与Page跳转不同，

#### 1、需要在json中声明组件

```javascript
{
  "usingComponents": {

    "selfform-tag": "plugin://yyb_selfform_plugin/selfform-tag"
  }
}
```

#### 2、需要在wxml的view标签中插入以下代码

```javascript
<selfform-tag  
        wx:if="{{show_selfform_tag == 1}}"  
        callback_data = "{{callback_data}}"
        bind:link_item_click="link_item_click"
        bind:copy_text="copy_text"
        />
```

#### 3、在onLoad函数中，引用插件的函数，并初始化插件的数据表单的网络请求

```javascript
var selfform_data_params = {
            data:{
              sellerid:options.sellerid, 
              form_token: options.form_token,
              formid : options.formid,
              form_type : options.form_type,

            }, 
            callback:this.__selfform_data_callback};


      if(options.openid){
        selfform_data_params.data.openid = options.openid;
      }

      if(options.userid){
        selfform_data_params.data.userid = options.userid;
      }
      if(options.checkstr){
        selfform_data_params.data.checkstr = options.checkstr;
      }

      //引用第三方插件的函数
      var my_plugin = requirePlugin('yyb_selfform_plugin');
      my_plugin.get_selfform_data(selfform_data_params);



      //=====分析参数=====
      if(options){
        var arr = Object.keys(options);

        var options_len = arr.length;


        if (options_len > 0){
          var params_str = '';
  
          for(var key in options){
            params_str += key+'='+options[key]+'&';
          }
          params_str = params_str.substr(0, params_str.length - 1);
  
          this.setData({
            current_params_str:params_str
          });
        }
      }
      //===== End ======
```

这样做的主要目的，是在页面显示前，将服务器端设置好的表单数据先拉取到小程序中，并在onShow执行的时候，可以快速显示出来。

函数 selfform_data_callback 主要处理回到的数据，用于渲染顶部导航栏的背景颜色和文字颜色。

#### 4、经过以上步骤，插件既可以正常显示并使用了。

以上步骤的完整代码，在本项目的miniprogram目录，路径：

*[https://github.com/longmix/wxa-plugin-wannengbiaodan/blob/main/miniprogram/pages/show_form/show_form.js](https://github.com/longmix/wxa-plugin-wannengbiaodan/blob/main/miniprogram/pages/show_form/show_form.js)*

其中`onShareAppMessage`定义了分享给微信好友的参数，可以直接使用。

## 万能表单的参数说明


| No. | 参数名称 | 必填 | 参数说明 |
| :-: | :-: | :-: | :- |
| 1 | sellerid | 是 | 延誉宝商户编号，用于动态获取头部和按钮的背景颜色。 |
| 2 | form_token | 否 | 微读客项目Token，可选，用于验证formid是否合法。 |
| 3 | formid | 是 | 万能表单ID，用于显示表单的内容 |
| 4 | form_type | 否 | 表单类型，默认为2，代表读取微读客的万能表单 |
| 5 | submit_url | 否 | 数据提交的网址入口，URL的域名必须在小程序的request域名列表中，具体见下面说明。 |
| 6 | 其他参数 | 否 | 在进入小程序页面时候带进去，并随着其他字段一起提交到网址。 |
| 7 | scene | 否 | 小程序中的场景ID，可以生产无限多个小程序码。 |
| 8 | openid | 否 | 如果form_type等于2，则可以带上openid，以获取之前填写的数据。 |
| 9 | userid | 否 | 如果form_type等于1，则userid参数必带，请做好身份验证。 |

### 关于submit_url说明

submit_url: 数据提交的网址入口，URL的域名必须在小程序的request域名列表中。
数据以post方式提交，格式为 aaa=1234&bbb=5678。
建议拦截数据并保存的同时，通过这个API接口提交给CMS存储一份副本。
submit_url必须返回的格式为 {'code':1, 'msg':'success'}，其中code为1代表保存成功。

### 关于“其他参数”说明

在进入小程序页面时候带进去，并随着其他字段一起提交到网址。
举例说明：form_type=2&form_token=abcdefg&formid=1234&orderno=87654321，那么“orderno”就是其他参数，保存数据的时候，会被一起提交到服务器。

### 关于scene参数的说明

在微信小程序中：以上设置支持scene参数模式（scene：小程序中的场景ID），可以生产无限多个小程序码。
格式为：sellerid#formtype#form_token#formid，例如“pmyxQxkkU2#abcd#1234”
代表 :
sellerid等于pmyxQxkkU，form_type等于 2，form_token为abcdef，formid为1234。

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
