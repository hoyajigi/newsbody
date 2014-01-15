var jsdom = require('jsdom'),
    request = require('request'),
    _ = require('underscore'),
    Iconv = require('iconv').Iconv,
    iconv = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');

var NewsBody = module.exports = {
    extract: function(url, callback) {
        jsdom.env({
            url: url,
            encoding: 'binary',
            scripts: ['//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js'],
            done: function (err, window) {
                var $ = window.jQuery,
                    br_containers = $('br').parent(),
                    content_body = _.max($('br').parent(), function(br_container) {
                        return $(br_container).children('br').length;
                    }),
                    refined = content_body.innerHTML
                        .replace(/\<style\>[\w\W]+\<\/style\>/gi,"") // remove <style>
                        .replace(/\<script\>[\w\W]+\<\/script\>/gi,"") // remove <script>
                        .replace(/\<[^\>]+\>/gi,"") // remove other tag
                        .replace(/\r?\n|\r/gi,""); // remove enter key (carrage returen)
                var buf = new Buffer(refined.length);
                buf.write(refined, 0, refined.length, 'binary');
                callback(iconv.convert(buf).toString());
            }
        });
    }
}
