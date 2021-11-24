import publishObjectPath from '@/utils/configRegistry';
// 从json中取对应的服务器地址
const configServerPath = publishObjectPath.value && publishObjectPath.value.serverPath;
import { RainSituationServer } from './demo/demo';
// 登录请求
const rainSituationServer = new RainSituationServer({baseURL: configServerPath});



export {
  rainSituationServer
};
