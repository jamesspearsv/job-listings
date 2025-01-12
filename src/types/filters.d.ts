export type filterUpdater = (
  action: 'add' | 'remove' | 'clear',
  value?: string
) => void;
