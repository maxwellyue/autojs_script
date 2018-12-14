const utils = require('common.js');

/**
 * 全局参数
 */
var lastNewsText="";//上一次新闻标题
var totalNewsReaded = 0;//已经阅读的新闻条数
var totalNewsOneTime = 50;//一次性阅读多少条新闻
var loopTimeToFindNews=20;//找了多少次新闻找不到会退出

/**
 * 所有的控件ID
 */
var newsItemId = "";//新闻条目ID
var newsTitleId = "tv_title";//新闻标题ID
var indexFlagText="发布";//首页特有的标志文字
var indexBtnId="rl_bottom_1";//刷新按钮ID

//开始刷新闻，主循环
utils.wakeUp(); 
utils.launch("微鲤看看");
jumpToIndex();
while(true){
    //领取时段奖励
    getAward();
    //点击进入新闻
    getOneNews();
    //阅读新闻60s
    readNews(60);
    //返回新闻列表
    utils.backToIndex(indexFlagText);
}

//跳转到首页
function jumpToIndex(){
    //循环关闭所有的弹出框
    var flag = text(indexFlagText).findOnce();
    while(!flag){
        
        //领取奖励
        utils.UIClick("iv_take");

        //关闭广告
        utils.UIClick("iv_close");

        //关闭提示
        utils.UIClick("ll_no_code");

        //关闭提示
        utils.UIClick("bt_ok");

        sleep(1000);
        flag = text(indexFlagText).findOnce();
    }
}

//领取时段奖励
function getAward(){

    //关闭继续阅读
    utils.UIClick("text_ok");
}

// 获取一条新闻
function getOneNews(){

    //阅读超过50条，刷新页面
    if(totalNewsReaded > totalNewsOneTime){
        totalNews = 0;
        utils.UIClick(indexBtnId);
        sleep(2000);
    }

    //上滑找新闻
    var isFindNews = false;//是否找到新闻
    var newsText = "";//新闻标题
    loopTimeToFindNews = 0;
    while((!isFindNews || lastNewsText === newsText)  && loopTimeToFindNews < 20){
        //找新闻次数+1
        loopTimeToFindNews++;

        //进行下翻
        swipe(device.width / 2, device.height / 4 * 2,device.width / 2, device.height / 4, 1000);
        sleep(1000);

        //找到阅读次数，这个是正规的新闻
        newsItem = id(newsTitleId).findOnce(1);
        if(newsItem){
            newsText = newsItem.text();
            isFindNews=true;
        }
    }

    /**
     * 找到新闻
     */
    if(newsItem){
        lastNewsText = newsText;
        totalNewsReaded++;
        utils.boundsClick(newsItem);
    }else{
        toast("20次滑动没有找到新闻，请检查新闻ID");
        exit();
    }
}

//阅读新闻
function readNews(seconds){
    var times = seconds/10;

    //开始滑动
    for(var i = 1;i < times;i++){
        //滑动阅读新闻
        utils.swapeToRead();

        //关闭继续阅读
        var textOk = id("text_ok").findOnce();
        if(textOk){
            textOk.click();
        }
    }
}