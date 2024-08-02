import { APP_PATH } from '../constants';
import { router } from '../lib';

export const responseHasError = (response: {
  status: number;
  data: object;
}) => {
  switch (response.status) {
    case 200:
      return false;
    case 500:
      router.go(APP_PATH.ERROR);
      break;
    default: {
      const error = (response.data as unknown as { reason: string }).reason;
      if (error.includes('Cookie')) {
        return error;
      } else {
        throw Error(error);
        // if(modalController.opened)showModalAlert(error);
        // else showAlert(error);
      }
      //if (error) throw Error(error);
      return error;
    }
  }
};

// function fetchWithRetry(url: string, options: unknown = {}): Promise<Response> {
//     const {tries = 1} = options;

//       function onError(err: string){
//           const triesLeft = tries - 1;
//           if (!triesLeft){
//               throw err;
//           }

//           return fetchWithRetry(url, {...options, tries: triesLeft});
//       }

//       return fetch(url, options).catch(onError);
//   }
