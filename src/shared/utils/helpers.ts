export const isEqual = (lhs: string, rhs: string): boolean => {
    return lhs === rhs
}

export const isEmpty = (value: unknown): boolean => {
    const is = value instanceof Array ||
      value instanceof Set ||
      value instanceof Object || (typeof value === 'string' && value.length)
    return !is;
  }