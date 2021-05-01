## 分隔符

经常使用的分隔符是正斜线(*/*)、hash符号(*#*)   以及取反符号(*~*)。下面的例子都是使用合法分隔符的模式。

举例：

```text
/foo bar/
#^[^0-9]$#
+php+
%[a-zA-Z0-9_-]%
```

如果分隔符需要在模式内进行匹配，它必须使用反斜线进行转义。

```text
/http:\/\//
#http://#

```

## 元字符说明：

.  匹配除换行符外的任何字符(默认) 

* 量词，0 次或多次匹配；  + 量词，1 次或多次匹配。

? 作为量词，表示 0 次或 1 次匹配。位于量词后面用于改变量词的贪婪特性。

```text
举例： .*?   这里的“?”在量词”*”后面，用于改变“*”的贪婪性。
例如： /<a .*?href="(.*?)".*?>/is
这个例子中两个地方使用了”.*?”，用于批量超链接中的网址。
```

 \ 转义字符 

^ $ 这两个元字符共同组成了断言的开始和结束

^ 仅在作为第一个字符(方括号内)时，表明字符类取反 



## PHP中使用正则表达式

匹配html中的视频和链接

```text

<strong>如下视频动态展示这个过程。</strong></p>
<div style="width: 720px;" class="wp-video"><!--[if lt IE 9]><script>document.createElement('video');</script><![endif]-->
<video class="wp-video-shortcode" id="video-2660-1" width="720" height="1542" poster="http://www.abot.cn/wp-content/themes/abotcn/uploads/2020/12/202012291443008967.png" preload="metadata" controls="controls"><source type="video/mp4" src="https://cloud.video.taobao.com//play/u/791260090/p/1/e/6/t/1/293683963228.mp4?_=1" /><a href="https://cloud.video.taobao.com//play/u/791260090/p/1/e/6/t/1/293683963228.mp4">https://cloud.video.taobao.com//play/u/791260090/p/1/e/6/t/1/293683963228.mp4</a></video></div>
<h2>软件开发公司费用一览表</h2>
<p>如果对于总价有异议，可以使用“查看明细”这个功能。在价格明细中我们不难看到，小程序的基础开发价格仅为<span lang="EN-US">99</span>元。<span lang="EN-US">99</span>元的小程序商城已经是独立的小程序账号啦，


preg_match_all('/<video .*?>.*?<a .*?href="(.*?)".*?>.*?<\/a><\/video>/is', $content, $video_list)

返回：

Array
(
    [0] => Array
        (
            [0] => <video class="wp-video-shortcode" id="video-2660-1" width="720" height="1542" poster="http://www.abot.cn/wp-content/themes/abotcn/uploads/2020/12/202012291443008967.png" preload="metadata" controls="controls"><source type="video/mp4" src="https://cloud.video.taobao.com//play/u/791260090/p/1/e/6/t/1/293683963228.mp4?_=1" /><a href="https://cloud.video.taobao.com//play/u/791260090/p/1/e/6/t/1/293683963228.mp4">https://cloud.video.taobao.com//play/u/791260090/p/1/e/6/t/1/293683963228.mp4</a></video>
        )

    [1] => Array
        (
            [0] => https://cloud.video.taobao.com//play/u/791260090/p/1/e/6/t/1/293683963228.mp4
        )

)


```

