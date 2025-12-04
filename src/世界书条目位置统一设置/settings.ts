import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

interface Settings {
  enabled: boolean;
  position: WorldbookEntry['position']['type'];
  depth: number;
}

export const useSettingsStore = defineStore('worldbook-position-override', () => {
  const settings = useStorage<Settings>(
    'worldbook-position-override-settings',
    {
      enabled: true,
      position: 'before_character_definition',
      depth: 1,
    },
    localStorage,
    { mergeDefaults: true },
  );

  return { settings };
});
