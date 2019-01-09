const commons = require('common.js');
const templates = require('template.js');


templates.init({
    appName:"趣头条"
});

templates.run({
    signIn:function(){
        commons.UITextBoundsClick("任务");
        sleep(2000);
        click(1,1919);
    },
    findNewsItem:function(){
        return  className("android.support.v4.view.ViewPager").className("LinearLayout").findOnce();
    }
});
