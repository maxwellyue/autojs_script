const utils = require('common.js');

/**
 * 全局参数
 */
var appName = "中青看点";
var lastNewsText="";//上一次新闻标题
var totalNewsReaded = 0;//已经阅读的新闻条数
var totalNewsOneTime = 50;//一次性阅读多少条新闻
var loopTimeToFindNews=20;//找了多少次新闻找不到会退出

/**
 * 全局控件ID
 */
var newsItemId = "";//新闻条目ID
var indexFlagText="美文";//首页特有的标志文字

/**
 * 主循环
 * 1、自动签到
 * 2、自动提现
 */
utils.wakeUp(); 
utils.launch(appName);
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

function signIn(){
    //进入我的
    click(1079,1919);
    sleep(500);
    //进入任务中心
    var taskCenter = text("任务中心").findOnce();
    if(taskCenter){
        utils.boundsClick(taskCenter);
        sleep(5000);
    }
    //点击签到领红包
    utils.UITextClick("签到领红包");
    sleep(1000);
    //返回主页面
    back();
    back();
    sleep(1000);
    //回到新闻
    click(1,1919);
}

//跳转到首页
function jumpToIndex(){
    //如果有弹框，关闭
    utils.UIClick("iv_close");
}

//领取时段奖励
function getAward(){

}

// 获取一条新闻
function getOneNews(){

    //阅读超过50条，刷新页面
    if(totalNewsReaded > totalNewsOneTime){
        totalNews = 0;
        click(1,1919);
        sleep(2000);
    }

    //上滑找新闻
    var isFindNews = false;//是否找到新闻
    var newsText = "";//新闻标题
    loopTimeToFindNews = 0;
    var newsItem;
    while((!isFindNews || lastNewsText === newsText)  && loopTimeToFindNews < 20){
        //找新闻次数+1
        loopTimeToFindNews++;

        //进行下翻
        swipe(device.width / 2, device.height / 4 * 2,device.width / 2, device.height / 4, 1000);
        sleep(1000);

        //找到阅读次数，这个是正规的新闻
        readCount = id("tv_read_count").findOnce(1);
        if(readCount){
            newsItem = readCount.parent().child(0);
            newsText = newsItem.text();
            isFindNews=true;
        }
    }

    //找到新闻
    if(newsItem){
        lastNewsText = newsText;
        totalNewsReaded++;
        readCount.parent().click();
    }else{
        toast("20次滑动没有找到新闻，请检查新闻ID");
        exit();
    }
}

//阅读新闻
function readNews(seconds){
    var times = seconds/10;

    swipe(device.width / 2, device.height / 5 * 3,
        device.width / 2, device.height / 4 * 1, 5000);

    //不存在奖励，直接退出
    if(!id("news_income_container").findOnce()){
        return;
    }

    //存在下载安装
    if(id("button2").findOnce()){
        id("button2").findOnce().click();
    }
    
    //开始滑动
    for(var i = 0 ;i < times;i++){
        //滑动阅读新闻
        utils.swapeToRead();
    }
}