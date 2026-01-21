<template>
  <Dropdown title="Blocks" placement="bottom" :auto-hide="true">
    <button :class="{ active: editor.isActive('blockquote') || editor.isActive('codeBlock') }">
      <IconBlock />
    </button>

    <template #popper="{ hide }">
      <div class="popper-menu">
        <button
          title="Block Quote"
          @click="() => editorCmdAndHide(hide, 'toggleBlockquote')"
          :class="{ active: editor.isActive('blockquote') }"
        >
          <IconQuote />
        </button>
        <button
          title="Code Block"
          @click="() => editorCmdAndHide(hide, 'toggleCodeBlock')"
          :class="{ active: editor.isActive('codeBlock') }"
        >
          <IconCodeBlock />
        </button>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { Dropdown } from 'floating-vue'
import 'floating-vue/dist/style.css'
import IconCodeBlock from '~icons/mdi/code-block-tags'
import IconBlock from '~icons/mdi/code-brackets'
import IconQuote from '~icons/mdi/format-quote-close'

const props = defineProps<{ editor: any }>()
const editor = props.editor

function editorCmdAndHide(hide: () => void, name: string, attrs?: any) {
  ;(editor.chain().focus() as any)[name](attrs).run()
  hide()
}
</script>

<style scoped></style>
