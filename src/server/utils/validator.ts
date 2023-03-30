export const isValidNumber = (...args: number[]) => args.find((value) => Number.isNaN(value)) === undefined

export const isValidString = (...args: string[]) => args.find((value) => typeof value === 'string') === undefined