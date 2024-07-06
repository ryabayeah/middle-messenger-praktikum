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
