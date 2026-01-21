<template>
  <Dropdown title="Headings" placement="bottom" :auto-hide="true">
    <button :class="{ active: isAnyHeadingActive }">
      <IconHeader />
    </button>

    <template #popper="{ hide }">
      <div class="popper-menu">
        <button
          v-for="level in headingLevels"
          :key="level"
          :title="`Heading ${level}`"
          class="popper-item"
          :class="{ active: editor.isActive('heading', { level }) }"
          @click="onHeadingClick(level, hide)"
        >
          <component :is="headingIcons[level]" />
        </button>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { Dropdown } from 'floating-vue'
import 'floating-vue/dist/style.css'
import { computed } from 'vue'

import IconHeader1 from '~icons/mdi/format-header-1'
import IconHeader2 from '~icons/mdi/format-header-2'
import IconHeader3 from '~icons/mdi/format-header-3'
import IconHeader4 from '~icons/mdi/format-header-4'
import IconHeader5 from '~icons/mdi/format-header-5'
import IconHeader6 from '~icons/mdi/format-header-6'
import IconHeader from '~icons/mdi/format-size'

const props = defineProps<{ editor: any }>()
const editor = props.editor

const headingLevels = [1, 2, 3, 4, 5, 6]
const headingIcons: Record<number, any> = {
  1: IconHeader1,
  2: IconHeader2,
  3: IconHeader3,
  4: IconHeader4,
  5: IconHeader5,
  6: IconHeader6
}

function editorCmdAndHide(hide: () => void, name: string, attrs?: any) {
  ;(editor.chain().focus() as any)[name](attrs).run()
  hide()
}

function onHeadingClick(level: number, hide: () => void) {
  if (!editor.isActive('heading', { level })) editorCmdAndHide(hide, 'setHeading', { level })
  else editorCmdAndHide(hide, 'setParagraph')
}

const isAnyHeadingActive = computed(() =>
  headingLevels.some((level) => editor.isActive('heading', { level }))
)
</script>

<style scoped></style>
