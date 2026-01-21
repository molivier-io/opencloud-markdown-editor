<template>
  <div class="markdown-editor">
    <Toolbar :editor="editor" :isReadOnly="isReadOnly" :openLinkDialog="openLinkDialog" />

    <div v-if="showLinkDialog" class="link-dialog">
      <input v-model="linkText" type="text" placeholder="link text" />
      <input
        v-model="linkUrl"
        type="url"
        placeholder="https://example.com"
        @keydown.enter.prevent="confirmLink"
      />
      <div class="link-dialog-buttons">
        <button title="OK" class="ok" @click="confirmLink">✔</button>
        <button title="Cancel" class="cancel" @click="cancelLink">✖</button>
      </div>
    </div>

    <EditorContent class="editor" :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import { TableKit } from '@tiptap/extension-table'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { Markdown } from 'tiptap-markdown'
import { onBeforeUnmount, ref, watch } from 'vue'

import Toolbar from './components/Toolbar.vue'
import './assets/global.css'

const props = defineProps<{ currentContent: string; isReadOnly?: boolean }>()
const emit = defineEmits(['update:currentContent'])

const showLinkDialog = ref(false)
const linkText = ref('')
const linkUrl = ref('')

const editor = new Editor({
  editable: !props.isReadOnly,
  content: props.currentContent,
  extensions: [
    StarterKit,
    TaskList,
    TaskItem.configure({
      nested: true
    }),
    TableKit.configure({
      table: { resizable: true }
    }),
    Markdown.configure({ html: false, tightLists: true })
  ],
  onUpdate({ editor }) {
    emit('update:currentContent', (editor.storage as any).markdown.getMarkdown())
  }
})

function openLinkDialog() {
  const { from, to } = editor.state.selection
  linkText.value = editor.state.doc.textBetween(from, to) || ''
  linkUrl.value = editor.getAttributes('link').href ?? ''
  showLinkDialog.value = true
}

function confirmLink() {
  if (!linkUrl.value) {
    resetLinkDialog()
    return
  }

  editor
    .chain()
    .focus()
    .insertContent({
      type: 'text',
      text: linkText.value || linkUrl.value,
      marks: [
        {
          type: 'link',
          attrs: { href: linkUrl.value }
        }
      ]
    })
    .run()

  resetLinkDialog()
}

function cancelLink() {
  resetLinkDialog()
}

function resetLinkDialog() {
  showLinkDialog.value = false
  linkText.value = ''
  linkUrl.value = ''
}

watch(
  () => props.currentContent,
  (value) => {
    const current = (editor.storage as any).markdown.getMarkdown()
    if (value !== current) editor.commands.setContent(value)
  }
)

onBeforeUnmount(() => editor.destroy())
</script>

<style scoped>
.markdown-editor {
  display: flex;
  flex-direction: column;
}

.editor {
  flex: 1 1 auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.link-dialog {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
  background: var(--oc-role-surface-container-lowest);
  border-bottom: 1px solid var(--oc-role-chrome);
}

.link-dialog input {
  flex: 1 1 auto;
  min-width: 80px;
  padding: 4px;
  border-radius: 4px;
}

.link-dialog-buttons {
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
}
</style>
