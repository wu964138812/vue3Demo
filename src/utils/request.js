/* eslint-disable no-undef */

import axios from 'axios';
import { Promise } from 'core-js';

const instance = (obj) => {
  const request = axios.create({
    ...obj,
    headers: {},
    timeout: 1000 * 60,
  });

  request.interceptors.request.use(
    (config) => {
      // 黑名单
      const black = [
        '/model-outfire/gsafety/model/chemicaloutfire',
        '/model-fire/gsafety/model/chemicalfire',
        '/model-fire/gsafety/model/chemical/list',
        '/python/reconstruction/api/v2/query_recommend_general_result',
        '/python/reconstruction/api/v2/click_details',
        '/python/reconstruction/api/v2/recommend_result',
        '/python/reconstruction/api/v2/query_result',
      ];
      const bool = black.find((item) => config.url?.includes(item));
      if (!bool) {
        let token = sessionStorage.getItem('token');

        if (typeof token === 'string') {
          try {
            token = JSON.parse(token);
          } catch (error) {
            console.log(error);
          }
        }

        config.headers.token = token
          ? // 这里是线上token
            token
          : // 这里是本地token
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHB0IiwiZXhwIjoxNjM3ODAzNDg5LCJpYXQiOjE2Mzc1NDQyMzl9.mOYPT_-aEIQ3RRwHBFNQpSQneEtZAGuM3_mCOxdxGhM';
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  request.interceptors.response.use(
     (respones) => {
      if (respones.status === 200 || respones.status === 201 || respones.status === 202 || respones.status === 204) {
        let data  = Promise.resolve(respones);
        return data
      } else {
        return Promise.resolve({});
      }
    },
    error => {
      if(error.response.status === 401) {
        // 401 说明 token 验证失败
        // 跳转到登录页面，重新登录获取 token
          const url = window.location.origin;
          window.location.href = `${url}/#/login`;
      } else if (error.response.status === 500) {
         // 服务器错误
         // do something
         return Promise.reject(error.response.data)
      }
      // 返回 response 里的错误信息
      return Promise.reject(error.response.data)
     },
  );

  return request;
};

export class RequestServerClass {
   serverObj

  constructor(opt) {
    const obj = Object.assign({}, opt);
    this.serverObj = instance(obj);
  }
}
