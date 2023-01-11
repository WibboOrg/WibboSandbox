declare let SandboxConfig: Record<string, string>

export const getConfig = (key: string) => SandboxConfig[key]
