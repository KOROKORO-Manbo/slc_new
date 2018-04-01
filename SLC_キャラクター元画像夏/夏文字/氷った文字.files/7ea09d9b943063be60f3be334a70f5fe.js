







var ninja_ads_count = typeof(ninja_ads_count) == 'undefined' ? 1 : ninja_ads_count + 1;
(function(d){
    var cookie_name = 'ninja_adm_uid';
    var cookies = document.cookie + ";";
    var index = cookies.indexOf(cookie_name + "=");
    if (index == -1) {
        document.cookie = 'ninja_adm_uid=a0e448ce-7c80-4cf7-b588-6bc9b26d2e9f; expires=Tue Apr 30 13:20:18 GMT 2013; ';
    }
    document.write('<span id="ninja_iframe_' + ninja_ads_count + '" style="width:300px; height:250px;"><!--http://adm.shinobi.jp/a/7ea09d9b943063be60f3be334a70f5fe--></span>');
    var script = d.createElement('script');
    var head = d.getElementsByTagName('head')[0];
    script.defer = 'defer';
    script.async = 'async';
    script.src  = 'http://adm.shinobi.jp/js/ads.js';
    head.insertBefore(script, head.firstChild);
    document.write('<img src="http://sync.fout.jp/sync?xid=ninja" width="1" height="1" />');
})(document);

