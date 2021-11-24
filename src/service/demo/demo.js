/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { RequestServerClass } from '../../utils/request.js';

export class RainSituationServer {
    rSerivce;
  constructor(opt) {
    this.rSerivce = new RequestServerClass(opt);
  }
  getWeixingTotal() {
    const url = '/gapi/gemp-dangerous/api/gemp/dangerous/beidou/count/v1';
    return new Promise((resolve, reject) => {
      this.rSerivce.serverObj.post(url)
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  pub
}