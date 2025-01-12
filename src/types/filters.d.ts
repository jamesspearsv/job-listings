export type filterType = {
  active: boolean;
  role: string[];
  level: string[];
  languages: string[];
  tools: string[];
};

export type filterUpdater = (
  action: 'add' | 'remove' | 'clear',
  filter?: 'role' | 'level' | 'languages' | 'tools',
  value?: string
) => void;
