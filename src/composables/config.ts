declare let SandboxConfig: Record<string, string | boolean | number>

export const getConfig = <T>(key: string) => SandboxConfig[key] as T
