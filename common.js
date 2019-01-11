var util = {};


//唤醒主屏幕
util.wakeUp = function(){
    if(!device.isScreenOn()){
        device.wakeUpIfNeeded();
    }
}

//打开APP
util.launch = function(appName) {
    //打开应用
    app.launchApp(appName);

    //如果存在提示，则点击允许
    var loop = 0;
    while(loop < 5){
        loop++;
        util.UITextClick("允许");
    }

    //设置屏幕缩放
    setScreenMetrics(1080, 1920);
    sleep(15000);
};

//通过坐标点击
util.boundsClick = function(item) {
    var bounds = item.bounds();
    click(bounds.centerX(),bounds.centerY());
    sleep(1000);
}

//通过UI点击
util.UIClick = function(eleId) {
    var uiele = id(eleId).findOnce();
    if(uiele){
        uiele.click();
    }
    sleep(1000);
}

//通过UI文本点击
util.UITextClick = function(textContent) {
    var uiele = text(textContent).findOnce();
    if(uiele){
        uiele.click();
    }
    sleep(1000);
}

//通过UI文本的坐标点击
util.UITextBoundsClick = function(textContent) {
    var thisEle = text(textContent).findOnce();
    var flag = false;
    if (thisEle) {
        util.boundsClick(thisEle);
        flag = true;
    }
    sleep(1000);
    return flag;
}

//通过UI点击
util.backToIndex = function(indexFlagText) {
    var indexBtn = false;
    while(!indexBtn){
        back();
        sleep(1000);
        indexBtn = text(indexFlagText).findOnce();
    }
}

//滑动阅读新闻
util.swapeToRead = function() {
    //滑动阅读新闻
    swipe(device.width / 2, device.height * 0.8 ,
        device.width / 2, device.height * 0.5, 5000);

    swipe(device.width / 2, device.height * 0.8 ,
        device.width / 2, device.height * 0.5, 5000);
}

module.exports = util;