<template>
  <div class="worldbook-position-override-settings">
    <div class="inline-drawer">
      <div class="inline-drawer-toggle inline-drawer-header">
        <b>{{ `世界书条目位置统一设置` }}</b>
        <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
      </div>
      <div class="inline-drawer-content">
        <div class="block">
          <input v-model="settings.enabled" type="checkbox" />
          <label>{{ `启用统一设置` }}</label>
        </div>

        <div class="block">
          <label for="wb-pos-override-type">插入位置: </label>
          <select id="wb-pos-override-type" v-model="settings.position" class="text_pole">
            <option v-for="pos in positions" :key="pos" :value="pos">{{ pos }}</option>
          </select>
        </div>

        <div v-if="settings.position === 'at_depth'" class="block">
          <label for="wb-pos-override-depth">插入深度: </label>
          <input id="wb-pos-override-depth" v-model.number="settings.depth" type="number" class="text_pole" min="1" />
        </div>

        <hr class="sysHR" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from './settings';

const { settings } = useSettingsStore();

const positions: WorldbookEntry['position']['type'][] = [
  'before_character_definition',
  'after_character_definition',
  'before_example_messages',
  'after_example_messages',
  'before_author_note',
  'after_author_note',
  'at_depth',
];
</script>
