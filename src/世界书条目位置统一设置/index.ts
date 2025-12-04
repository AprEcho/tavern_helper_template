import { createScriptIdDiv, destroyScriptIdDiv, deteleportStyle, teleportStyle } from '@/util/script';
import App from './app.vue';
import { useSettingsStore } from './settings';

const app = createApp(App).use(createPinia());

$(() => {
  const $app = createScriptIdDiv();
  $('#extensions_settings2').append($app);
  teleportStyle();
  app.mount($app[0]);
});

$(window).on('pagehide', () => {
  app.unmount();
  deteleportStyle();
  destroyScriptIdDiv();
});

const positionMap: Record<WorldbookEntry['position']['type'], SillyTavern.FlattenedWorldInfoEntry['position']> = {
  before_character_definition: 0,
  after_character_definition: 1,
  before_example_messages: 2,
  after_example_messages: 3,
  before_author_note: 4,
  after_author_note: 5,
  at_depth: 6,
};

type LoreData = {
  globalLore: SillyTavern.FlattenedWorldInfoEntry[];
  characterLore: SillyTavern.FlattenedWorldInfoEntry[];
  chatLore: SillyTavern.FlattenedWorldInfoEntry[];
  personaLore: SillyTavern.FlattenedWorldInfoEntry[];
};
let cachedLores: LoreData | null = null;

function updateLorePositions(lores: LoreData) {
  const { settings } = useSettingsStore();

  if (!settings.enabled) {
    return;
  }

  const allEntries = [...lores.globalLore, ...lores.characterLore, ...lores.chatLore, ...lores.personaLore];
  const positionValue = positionMap[settings.position];

  for (const entry of allEntries) {
    entry.position = positionValue;
    if (settings.position === 'at_depth') {
      entry.depth = settings.depth;
    }
  }
}

eventOn(tavern_events.WORLDINFO_ENTRIES_LOADED, lores => {
  cachedLores = lores;
  updateLorePositions(lores);
});

const { settings } = useSettingsStore();
watch(settings, () => {
  if (cachedLores) {
    updateLorePositions(cachedLores);
  }
});
