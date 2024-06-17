import {HttpInterceptorFn} from "@angular/common/http";

const HEADER_CORS = 'Access-Control-Allow-Origin';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  let authRequest = req.clone(
      {
        headers: req.headers.set(HEADER_CORS, '*')
      });
  console.log('request intercepted', authRequest);
  return next(authRequest);
};
