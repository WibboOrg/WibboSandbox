export const isValidField = (...args: any[]) => args.every(value => value !== undefined && value !== null);

export const isValidNumber = (...args: number[]) => args.every(value => typeof value === 'number' && !Number.isNaN(value));

export const isValidString = (...args: string[]) => args.every(value => typeof value === 'string');

export const isValidBoolean = (...args: boolean[]) => args.every(value => typeof value === 'boolean');

export const isValidBase64 = (...args: string[]) => args.every(value => typeof value === 'string' && value.length > 0 && /^(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value));
