import { URL } from 'url';
import axios from 'axios';
import { ServiceResponse } from '../base/ServiceResponse';

export const axiosConfig = {
  validateStatus: (): boolean => true,
  timeout: 2000
};
export async function performServiceCalls(
  urls: URL[]
): Promise<ServiceResponse[]> {
  const http = axios.create(axiosConfig);

  return Promise.all(
    urls.map(async (url: URL) => {
      const response = await http.get(url.toString());

      return new ServiceResponse({
        ...response
      });
    })
  );
}
