/*
 *  device.js
 *  项目地址: https://github.com/matthewhudson/current-device
 */
import Device from 'current-device'

//device.type	        'mobile', 'tablet', 'desktop', or 'unknown'
//device.orientation	'landscape', 'portrait', or 'unknown'
//device.os	            'ios', 'iphone', 'ipad', 'ipod', 'android', 'blackberry', 'windows', 'fxos', 'meego', 'television', or 'unknown'

export default Device;

function bro() {
    var strStart = 0, strStop = 0, device = '', version = '';

    var userAgent = window.navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform

    if (userAgent.indexOf('Firefox') != -1) {
        strStart = userAgent.indexOf('Firefox');
        device = 'Firefox';
    }

    if (userAgent.indexOf('Safari') != -1) {
        if (userAgent.indexOf("Chrome") != -1) {
            strStart = userAgent.indexOf('Chrome');
            strStop = userAgent.indexOf(' Safari');
            device = 'Chrome';
        } else {
            strStart = userAgent.indexOf('Version');
            strStop = userAgent.indexOf(' Safari');
            device = 'Safari';
        }
    }

    if (userAgent.indexOf('Edge') != -1) {
        strStart = userAgent.indexOf('Edge');
        strStop  = userAgent.length
        device = 'Edge';
    }

    strStop  = strStop || userAgent.length
    version = userAgent.substring(strStart, strStop).split('/')[1].split('.')[0];
    return {version, device}
}

function dynamicLoadJs(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    head.appendChild(script);
    script.type = 'text/javascript';
    script.src = url;
    if (typeof(callback) == 'function') {
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
    }
}
var broDicScript = {
    Chrome: 51,
    Safari: 10,
    Edge: 14,
    Firefox: 53,
}



