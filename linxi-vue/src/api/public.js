// 引入axios
import axios from '~/axios'

// 获取请求ip接口
export function ip() {
    // http://myip.ipip.net/json
    return axios.get("/ip")
}

// 获取时间
export function getDateTime(type) {
    var date = new Date();
    var hengGang = "-";
    var maoHao = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var curDate = date.getDate();
    var curHours = date.getHours();
    var curMinutes = date.getMinutes();
    var curSeconds = date.getSeconds();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (curDate >= 0 && curDate <= 9) {
        curDate = "0" + curDate;
    }
    if (curHours >= 0 && curHours <= 9) {
        curHours = "0" + curHours;
    }
    if (curMinutes >= 0 && curMinutes <= 9) {
        curMinutes = "0" + curMinutes;
    }
    if (curSeconds >= 0 && curSeconds <= 9) {
        curSeconds = "0" + curSeconds;
    }
    var currentdate = "";
    if (type == "year") {
        currentdate = year;
        return currentdate;
    } else if (type == "month") {
        currentdate = year + hengGang + month;
        return currentdate;
    } else {
        currentdate = year + hengGang + month + hengGang + curDate + " "
        return currentdate;
    }
}