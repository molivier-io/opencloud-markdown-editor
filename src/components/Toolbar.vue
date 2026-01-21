<template>
  <div v-if="!isReadOnly" class="toolbar">
    <!-- Undo / Redo -->
    <div class="button-group">
      <button title="Undo" @click="editorCmd('undo')" :disabled="!canUndo">
        <IconUndo />
      </button>
      <button title="Redo" @click="editorCmd('redo')" :disabled="!canRedo">
        <IconRedo />
      </button>
    </div>

    <!-- Formatting -->
    <div class="button-group">
      <Headings :editor="editor" />
      <button
        title="Bold"
        @click="() => editorCmd('toggleBold')"
        :class="{ active: editor.isActive('bold') }"
      >
        <IconBold />
      </button>
      <button
        title="Italic"
        @click="() => editorCmd('toggleItalic')"
        :class="{ active: editor.isActive('italic') }"
      >
        <IconItalic />
      </button>
      <button
        title="Underline"
        @click="() => editorCmd('toggleUnderline')"
        :class="{ active: editor.isActive('underline') }"
      >
        <IconUnderline />
      </button>
      <button
        title="Strikethrough"
        @click="() => editorCmd('toggleStrike')"
        :class="{ active: editor.isActive('strike') }"
      >
        <IconStrikethrough />
      </button>
    </div>

    <!-- Lists / Blocks / TableControls -->
    <div class="button-group">
      <Lists :editor="editor" />
      <Blocks :editor="editor" />
      <TableControls :editor="editor" />
    </div>

    <!-- Code / Link / Horizontal Line -->
    <div class="button-group">
      <button
        title="Code"
        @click="() => editorCmd('toggleCode')"
        :class="{ active: editor.isActive('code') }"
      >
        <IconCode />
      </button>
      <button title="Link" @click="openLinkDialog" :class="{ active: editor.isActive('link') }">
        <IconLink />
      </button>
      <button title="Horizontal Line" @click="() => editorCmd('setHorizontalRule')">
        <IconHorizontalLine />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import IconUndo from '~icons/mdi/arrow-u-left-top'
import IconRedo from '~icons/mdi/arrow-u-right-top'
import IconCode from '~icons/mdi/code-tags'
import IconBold from '~icons/mdi/format-bold'
import IconItalic from '~icons/mdi/format-italic'
import IconStrikethrough from '~icons/mdi/format-strikethrough'
import IconUnderline from '~icons/mdi/format-underline'
import IconHorizontalLine from '~icons/mdi/horizontal-line'
import IconLink from '~icons/mdi/link'

import Blocks from './Blocks.vue'
import Headings from './Headings.vue'
import Lists from './Lists.vue'
import TableControls from './TableControls.vue'

const props = defineProps<{ editor: any; isReadOnly?: boolean; openLinkDialog: () => void }>()
const editor = props.editor
const isReadOnly = props.isReadOnly ?? false

function editorCmd(name: string, attrs?: any) {
  ;(editor.chain().focus() as any)[name](attrs).run()
}

const canUndo = computed(() => {
  try {
    return editor.can().chain().focus().undo().run()
  } catch (e) {
    return false
  }
})

const canRedo = computed(() => {
  try {
    return editor.can().chain().focus().redo().run()
  } catch (e) {
    return false
  }
})

const openLinkDialog = props.openLinkDialog
</script>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid var(--oc-role-chrome);
  background: var(--oc-role-surface-container-lowest);
}

.button-group {
  display: flex;
}
</style>
