import { URL } from 'url';
import axios from 'axios';
import { Health } from '../../models/Health';
import { ServiceErrorResponse } from '../../models/ServiceErrorResponse';
import { ServiceOkResponse } from '../../models/ServiceOkResponse';
import { ServiceResponse } from '../../models/ServiceResponse';

export async function performServiceCalls(urls: URL[]): Promise<Health> {
  const responses: ServiceResponse[] = await Promise.all(
    urls.map(async (url: URL) => {
      try {
        const response = await axios.get(url.toString());
        return new ServiceOkResponse(response);
      } catch (error) {
        return new ServiceErrorResponse(error);
      }
    })
  );

  return new Health(responses);
}
