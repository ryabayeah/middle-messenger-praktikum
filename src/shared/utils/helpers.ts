export const isEqualString = (lhs: string, rhs: string): boolean => {
  return lhs === rhs;
};

export const isEmpty = (value: unknown): boolean => {
  const is =
    value instanceof Array ||
    value instanceof Set ||
    value instanceof Object ||
    (typeof value === 'string' && value.length);
  return !is;
};

export const trim = (value: string, excludeChars?: string) => {
  let newValue = value.trim();

  if (excludeChars) {
    const re = new RegExp(`[${excludeChars}]`, 'gi');

    newValue = newValue.replace(re, '');
  }
  return newValue;
};

type Indexed<T = unknown> = {
  [key in string]: T;
};

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (rhs[p]?.constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
};

export type PlainObject<T = unknown> = {
  [k in string]: T;
};

export const isPlainObject = (value: unknown): value is PlainObject => {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
};

export const isArray = (value: unknown): value is [] => {
  return Array.isArray(value);
};

export const isArrayOrObject = (value: unknown): value is [] | PlainObject => {
  return isPlainObject(value) || isArray(value);
};

export const isEqual = (lhs: PlainObject, rhs: PlainObject) => {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (
        isEqual(
          value as PlainObject<unknown>,
          rightValue as PlainObject<unknown>,
        )
      ) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
};

// export function cloneDeep(obj: Record<string, unknown | any>): Record<string, unknown | any> {
//   return (function _cloneDeep(item: any): Record<string, unknown | any> {
//       // Handle:
//       // * null
//       // * undefined
//       // * boolean
//       // * number
//       // * string
//       // * symbol
//       // * function
//       if (item === null || typeof item !== 'object') {
//           return item;
//       }

//       // Handle:
//       // * Date
//       if (item instanceof Date) {
//           return new Date(item.valueOf());
//       }

//       // Handle:
//       // * Array
//       if (item instanceof Array) {
//           const copy: any = [];

//           item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

//           return copy;
//       }

//       // Handle:
//       // * Set
//       if (item instanceof Set) {
//           const copy = new Set();

//           item.forEach((v) => copy.add(_cloneDeep(v)));

//           return copy;
//       }

//       // Handle:
//       // * Map
//       if (item instanceof Map) {
//           const copy = new Map();

//           item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

//           return copy;
//       }

//       // Handle:
//       // * Object
//       if (item instanceof Object) {
//           const copy: any = {};

//           // Handle:
//           // * Object.symbol
//           Object.getOwnPropertySymbols(item).forEach((s) => (copy[s] = _cloneDeep(item[s])));

//           // Handle:
//           // * Object.name (other)
//           Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k])));

//           return copy;
//       }

//       throw new Error(`Unable to copy object: ${item}`);
//   }(obj));
// }

// type StringIndexed = Record<string, any>;

// const obj: StringIndexed = {
//   key: 1,
//   key2: "test",
//   key3: false,
//   key4: true,
//   key5: [1, 2, 3],
//   key6: { a: 1 },
//   key7: { b: { d: 2 } }
// };

// function queryStringify(data: StringIndexed): string | never {
//   if (typeof data !== "object") {
//     throw new Error("Data must be object");
//   }

//   const keys = Object.keys(data);
//   return keys.reduce((result, key, index) => {
//     const value = data[key];
//     const endLine = index < keys.length - 1 ? "&" : "";

//     if (Array.isArray(value)) {
//       const arrayValue = value.reduce<StringIndexed>(
//         (result, arrData, index) => ({
//           ...result,
//           [`${key}[${index}]`]: arrData
//         }),
//         {}
//       );

//       return `${result}${queryStringify(arrayValue)}${endLine}`;
//     }

//     if (typeof value === "object") {
//       const objValue = Object.keys(value || {}).reduce<StringIndexed>(
//         (result, objKey) => ({
//           ...result,
//           [`${key}[${objKey}]`]: value[objKey]
//         }),
//         {}
//       );

//       return `${result}${queryStringify(objValue)}${endLine}`;
//     }

//     return `${result}${key}=${value}${endLine}`;
//   }, "");
// }
