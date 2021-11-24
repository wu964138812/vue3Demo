/* eslint-disable no-debugger */
/*
 * @Author: your name
 * @Date: 2021-08-27 14:26:30
 * @LastEditTime: 2021-10-08 14:22:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \eads-yzt\src\util\configRegistry.ts
 */
import { serverPathConfig } from './publishObjectPath'
const  publishObjectPath =  {
    serverPath : '',
};

Object.defineProperty(publishObjectPath, 'serverPath', {
    set(data) {
        this.value = data;
    },
});

function  pathCallback () {
    const urlIp = window.location.host.split('.')[0];
    let urlConfig = '';
    switch (urlIp) {
        case '120': // 互联网
            urlConfig = 'json/publishObjectPath-ww.json';
            break;
        case '59': // 政务外网
            urlConfig = 'json/publishObjectPath-zw.json';
            break;
        case '20': // 指挥网
            urlConfig = 'json/publishObjectPath-zh.json';
            break;
        default:  // 开发环境和本地测试环境
            urlConfig = serverPathConfig;
            break;
    }
    publishObjectPath.serverPath = urlConfig;
}
pathCallback();

export default publishObjectPath;
