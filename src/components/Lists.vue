<template>
  <Dropdown title="Lists" placement="bottom" :auto-hide="true" :close-on-content-click="true">
    <button
      :class="{
        active:
          editor.isActive('bulletList') ||
          editor.isActive('orderedList') ||
          editor.isActive('taskList')
      }"
    >
      <IconListBulleted />
    </button>

    <template #popper="{ hide }">
      <div class="popper-menu">
        <button
          title="Bullet List"
          @click="() => editorCmdAndHide(hide, 'toggleBulletList')"
          :class="{ active: editor.isActive('bulletList') }"
        >
          <IconListBulleted />
        </button>
        <button
          title="Ordered List"
          @click="() => editorCmdAndHide(hide, 'toggleOrderedList')"
          :class="{ active: editor.isActive('orderedList') }"
        >
          <IconListNumbered />
        </button>
        <button
          title="Task List"
          @click="() => editorCmdAndHide(hide, 'toggleTaskList')"
          :class="{ active: editor.isActive('taskList') }"
        >
          <IconListChecks />
        </button>
        <button
          title="Increse Indent"
          @click="() => onIncreaseIndent(hide)"
          :disabled="
            !editor.can().sinkListItem('listItem') && !editor.can().sinkListItem('taskItem')
          "
        >
          <IconIndentIncrease />
        </button>
        <button
          title="Decrease Indent"
          @click="() => onDecreaseIndent(hide)"
          :disabled="
            !editor.can().liftListItem('listItem') && !editor.can().liftListItem('taskItem')
          "
        >
          <IconIndentDecrease />
        </button>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { Dropdown } from 'floating-vue'
import 'floating-vue/dist/style.css'
import IconIndentDecrease from '~icons/mdi/format-indent-decrease'
import IconIndentIncrease from '~icons/mdi/format-indent-increase'
import IconListBulleted from '~icons/mdi/format-list-bulleted'
import IconListChecks from '~icons/mdi/format-list-checks'
import IconListNumbered from '~icons/mdi/format-list-numbered'

const props = defineProps<{ editor: any }>()
const editor = props.editor

function editorCmd(name: string, attrs?: any) {
  ;(editor.chain().focus() as any)[name](attrs).run()
}

function editorCmdAndHide(hide: () => void, name: string, attrs?: any) {
  editorCmd(name, attrs)
  hide()
}

function onIncreaseIndent(hide: () => void) {
  if (editor.can().sinkListItem('listItem')) editorCmdAndHide(hide, 'sinkListItem', 'listItem')
  else editorCmdAndHide(hide, 'sinkListItem', 'taskItem')
}

function onDecreaseIndent(hide: () => void) {
  if (editor.can().liftListItem('listItem')) editorCmdAndHide(hide, 'liftListItem', 'listItem')
  else editorCmdAndHide(hide, 'liftListItem', 'taskItem')
}
</script>

<style scoped></style>
