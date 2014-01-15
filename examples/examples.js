var NewsBody = require('../newsbody');

NewsBody.extract('http://news.chosun.com/site/data/html_dir/2014/01/15/2014011500210.html', function(html) {
    console.log(html);
});
