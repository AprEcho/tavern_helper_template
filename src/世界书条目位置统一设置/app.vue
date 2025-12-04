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
          <select id="wb-pos-override-type" v-model="settings.position" class="text_pole" :disabled="!settings.enabled">
            <option v-for="opt in positionOptions" :key="opt.value" :value="opt.value">
              {{ opt.text }}
            </option>
          </select>
        </div>

        <div v-if="settings.position === 'at_depth'" class="block">
          <label for="wb-pos-override-depth">插入深度: </label>
          <input
            id="wb-pos-override-depth"
            v-model.number="settings.depth"
            type="number"
            class="text_pole"
            min="1"
            :disabled="!settings.enabled"
          />
        </div>

        <hr class="sysHR" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from './settings';

const { settings } = useSettingsStore();

const positionOptions: { value: WorldbookEntry['position']['type']; text: string }[] = [
  { value: 'before_character_definition', text: '角色定义之前' },
  { value: 'after_character_definition', text: '角色定义之后' },
  { value: 'before_example_messages', text: '示例消息之前' },
  { value: 'after_example_messages', text: '示例消息之后' },
  { value: 'before_author_note', text: '作者注释之前' },
  { value: 'after_author_note', text: '作者注释之后' },
  { value: 'at_depth', text: '插入到指定深度' },
];
</script>
