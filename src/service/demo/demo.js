/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { RequestServerClass } from "../../utils/request.js";

export class RainSituationServer {
  rSerivce;
  constructor(opt) {
    this.rSerivce = new RequestServerClass(opt);
  }
  getWeixingTotal() {
    const url = "/gapi/gemp-dangerous/api/gemp/dangerous/beidou/count/v1";
    return new Promise((resolve, reject) => {
      this.rSerivce.serverObj
        .post(url)
        .then((res) => {
          if (res.status === 200) {
            resolve([null, res.data]);
          }
        })
        .catch((err) => {
          resolve([err, undefined]);
        });
    });
  }

  // 调取方法 async getWeixingTotal(){ const [err,res] = await getWeixingTotal()} 这种封装的好处在于接口报错我们可以继续往下执行通过判断err
}
