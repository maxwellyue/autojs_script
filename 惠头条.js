const utils = require('common.js');

/**
 * 全局参数
 */
var lastNewsText="";//上一次新闻标题
var totalNewsReaded = 0;//已经阅读的新闻条数
var totalNewsOneTime = 50;//一次性阅读多少条新闻
var loopTimeToFindNews=20;//找了多少次新闻找不到会退出
var indexFlagText="刷新";//首页特有的标志文字

/**
 * 主循环
 */
utils.wakeUp(); 
utils.launch("惠头条");
jumpToIndex();
signIn();
while(true){
    //领取时段奖励
    getAward();
    //找到一条新闻
    getOneNews();
    //阅读新闻60s
    readNews(60);
    //返回新闻列表
    utils.backToIndex(indexFlagText);
}

//跳转到首页
function jumpToIndex(){
    //跳转到首页
    click(20,1917);
}

//签到
function signIn(){
    utils.UITextBoundsClick("任务中心");
    sleep(1000);
    utils.UIClick("sign_btn_container");
    sleep(1000);
    click(20,1917);
    sleep(1000);
    click(20,1917);
}

//领取时段奖励
function getAward(){
    utils.UITextBoundsClick("点击领取");
    sleep(1000);
    back();
}

// 获取一条新闻
function getOneNews(){

    //阅读超过50条，刷新页面
    if(totalNewsReaded > totalNewsOneTime){
        totalNews = 0;
        click(20,1917);
        sleep(2000);
    }

     //上滑找新闻
     var isFindNews = false;//是否找到新闻
     var newsText = "";//新闻标题
     var newsItem;//新闻条目
     loopTimeToFindNews = 0;//循环次数
     while((!isFindNews || lastNewsText === newsText)  && loopTimeToFindNews < 20){
        //找新闻次数+1
        loopTimeToFindNews++;

        //进行下翻
        swipe(device.width / 2, device.height / 4 * 2,  device.width / 2, device.height / 4, 1000);
        sleep(1000);

        //新闻条目
        newsItem =  id("tv_title").findOnce(1);
        if(newsItem){
            newsText = newsItem.text();
            isFindNews = true;
        }
    }

    //找到新闻，点击阅读
    if(isFindNews){
        lastNewsText = newsText;
        totalNewsReaded++;
        newsItem.parent().click();
    }else{
        toast("20次滑动没有找到新闻，请检查新闻ID");
        exit();
    }
}

//阅读新闻
function readNews(seconds){

    //滑动阅读新闻
    for(var i = 0 ;i < seconds/10 ;i++){
        utils.swapeToRead();
    }

}