/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react';
import {HTTP_TYPES} from '../constants';
import http from '../services/http';

interface IProps {
  url: string;
}

const useMutation = ({url}: IProps) => {
  const [loading, setLoading] = useState(false);

  const mutate = async (
    body: object,
    method?: HTTP_TYPES,
    customHeaders?: object,
    requestUrl?: string,
  ) => {
    setLoading(true);

    const headers = {
      headers: {
        ...customHeaders,
      },
    };
    try {
      const response = await http[method || HTTP_TYPES.POST](
        requestUrl || url,
        body,
        headers,
      );
      console.log({response});

      setLoading(false);
      return {
        success: true,
        data: response?.data,
        errors: null,
      };
    } catch (err: any) {
      setLoading(false);
      return {
        success: false,
        data: null,
        errors: err,
      };
    }
  };

  return {loading, mutate};
};

export {useMutation};
