<template>
  <Dropdown title="Table Controls" placement="bottom" :auto-hide="true">
    <button :class="{ active: editor.isActive('table') }">
      <IconTable />
    </button>

    <template #popper="{ hide }">
      <div class="popper-menu">
        <button
          title="Table"
          @click="() => onToggleTable(hide)"
          :class="{ active: editor.isActive('table') }"
        >
          <IconTable />
        </button>
        <button
          title="Add column before"
          :disabled="!editor.isActive('table')"
          @click="() => editorCmdAndHide(hide, 'addColumnBefore')"
        >
          <IconTableColumnPlusBefore />
        </button>
        <button
          title="Add column after"
          :disabled="!editor.isActive('table')"
          @click="() => editorCmdAndHide(hide, 'addColumnAfter')"
        >
          <IconTableColumnPlusAfter />
        </button>
        <button
          title="Delete column"
          :disabled="!editor.isActive('table')"
          @click="() => editorCmdAndHide(hide, 'deleteColumn')"
        >
          <IconTableColumnRemove />
        </button>
        <button
          title="Add row before"
          :disabled="!editor.isActive('table')"
          @click="() => editorCmdAndHide(hide, 'addRowBefore')"
        >
          <IconTableRowPlusBefore />
        </button>
        <button
          title="Add row after"
          :disabled="!editor.isActive('table')"
          @click="() => editorCmdAndHide(hide, 'addRowAfter')"
        >
          <IconTableRowPlusAfter />
        </button>
        <button
          title="Delete row"
          :disabled="!editor.isActive('table')"
          @click="() => editorCmdAndHide(hide, 'deleteRow')"
        >
          <IconTableRowRemove />
        </button>
        <button
          title="Merge or split"
          :disabled="!editor.isActive('table')"
          @click="() => editorCmdAndHide(hide, 'mergeOrSplit')"
        >
          <IconTableMergeCells />
        </button>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { Dropdown } from 'floating-vue'
import 'floating-vue/dist/style.css'
import IconTable from '~icons/mdi/table'
import IconTableColumnPlusAfter from '~icons/mdi/table-column-plus-after'
import IconTableColumnPlusBefore from '~icons/mdi/table-column-plus-before'
import IconTableColumnRemove from '~icons/mdi/table-column-remove'
import IconTableMergeCells from '~icons/mdi/table-merge-cells'
import IconTableRowPlusAfter from '~icons/mdi/table-row-plus-after'
import IconTableRowPlusBefore from '~icons/mdi/table-row-plus-before'
import IconTableRowRemove from '~icons/mdi/table-row-remove'

const props = defineProps<{ editor: any }>()
const editor = props.editor

function editorCmdAndHide(hide: () => void, name: string, attrs?: any) {
  ;(editor.chain().focus() as any)[name](attrs).run()
  hide()
}

function onToggleTable(hide: () => void) {
  if (!editor.isActive('table'))
    editorCmdAndHide(hide, 'insertTable', { rows: 3, cols: 3, withHeaderRow: true })
  else editorCmdAndHide(hide, 'deleteTable')
}
</script>

<style scoped></style>
