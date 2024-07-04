/**
 * Преобразует содержимое файла в формате Base64.
 *
 * @param {File} file - Объект файла для чтения.
 *
 * @returns {Promise<string>} Промис, который разрешается строкой в формате Base64 или отклоняется в случае ошибки.
 *
 * @example
 * const file = document.getElementById('inputFile').files[0];
 * if (file) {
 *   getBase64(file).then(base64String => {
 *     console.log('Содержимое файла в формате Base64:', base64String);
 *   }).catch(error => {
 *     console.error('Ошибка при чтении файла:', error);
 *   });
 * }
 */
export const getBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
  
      reader.readAsDataURL(file)
  
      reader.onload = () => {
        resolve(String(reader.result))
      }
  
      reader.onerror = reject
    })
  }