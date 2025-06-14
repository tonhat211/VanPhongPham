import { useEffect } from 'react';
import axiosInstance from './axiosInstance'; 
import { useFEContext } from '~/context/FEProvider';

function LoadingInterceptor() {
  const { setIsLoading } = useFEContext();

  useEffect(() => {
    let pending = 0;

    const req = axiosInstance.interceptors.request.use(cfg => {
      pending++;
      setIsLoading(true);
      return cfg;
    });

    const res = axiosInstance.interceptors.response.use(
      rsp => {
        if (--pending === 0) setIsLoading(false);
        return rsp;
      },
      err => {
        if (--pending === 0) setIsLoading(false);
        return Promise.reject(err);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(req);
      axiosInstance.interceptors.response.eject(res);
    };
  }, [setIsLoading]);

  return null;
}

export default LoadingInterceptor;
