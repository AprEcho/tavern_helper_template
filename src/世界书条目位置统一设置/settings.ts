import { defineStore } from 'pinia';

interface Settings {
  enabled: boolean;
  position: WorldbookEntry['position']['type'];
  depth: number;
}

export const useSettingsStore = defineStore('worldbook-position-override', () => {
  const settings = reactive<Settings>({
    enabled: true,
    position: 'before_character_definition',
    depth: 1,
  });

  return { settings };
});
