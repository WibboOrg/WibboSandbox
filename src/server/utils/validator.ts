// Vérifie si tous les arguments sont définis et non vides
export const isValidField = (...args: any[]) => args.every(value => value !== undefined && value !== null);

// Vérifie si tous les arguments sont des nombres valides
export const isValidNumber = (...args: number[]) => args.every(value => typeof value === 'number' && !Number.isNaN(value));

// Vérifie si tous les arguments sont des chaînes de caractères non vides
export const isValidString = (...args: string[]) => args.every(value => typeof value === 'string');

// Vérifie si tous les arguments sont des booléens
export const isValidBoolean = (...args: boolean[]) => args.every(value => typeof value === 'boolean');
