export const isValidField = (...args: any[]) => args.find((value) => typeof value === 'undefined') === undefined

export const isValidNumber = (...args: number[]) => args.find((value) => Number.isNaN(value)) === undefined

export const isValidString = (...args: string[]) => args.find((value) => typeof value !== 'string') === undefined

export const isValidBoolean = (...args: boolean[]) => args.find((value) => typeof value !== 'boolean') === undefined