import { urlJoin } from '@opencloud-eu/web-client'
import {
  AppMenuItemExtension,
  AppWrapperRoute,
  defineWebApplication,
  useOpenEmptyEditor,
  useUserStore
} from '@opencloud-eu/web-pkg'
import { computed } from 'vue'
// @ts-ignore
import { useGettext } from 'vue3-gettext'
import translations from '../l10n/translations.json'
import App from './App.vue'

export default defineWebApplication({
  setup({ applicationConfig }) {
    const { $gettext } = useGettext()
    const userStore = useUserStore()
    const { openEmptyEditor } = useOpenEmptyEditor()

    const appId = 'markdown-editor'

    const routes = [
      {
        name: appId,
        path: '/:driveAliasAndItem(.*)?',
        component: AppWrapperRoute(App, {
          applicationId: appId
        }),
        meta: {
          authContext: 'hybrid',
          title: $gettext('Markdown Editor'),
          patchCleanPath: true
        }
      }
    ]

    const appInfo = {
      name: $gettext('Markdown Editor'),
      id: appId,
      icon: 'markdown',
      color: '#4b6489',
      defaultExtension: 'md',
      meta: {
        fileSizeLimit: 2000000
      },
      extensions: [
        {
          extension: 'md',
          routeName: appId,
          hasPriority: true,
          icon: 'markdown',
          newFileMenu: {
            menuTitle() {
              return $gettext('Markdown File')
            }
          }
        }
      ]
    }

    const menuItems = computed<AppMenuItemExtension[]>(() => {
      const items: AppMenuItemExtension[] = []

      if (userStore.user) {
        items.push({
          id: `app.${appInfo.id}.menuItem`,
          type: 'appMenuItem',
          label: () => appInfo.name,
          color: appInfo.color,
          icon: appInfo.icon,
          priority: 10,
          path: urlJoin(appInfo.id),
          handler: () => openEmptyEditor(appInfo.id, appInfo.defaultExtension)
        })
      }

      return items
    })

    return {
      appInfo,
      routes,
      translations,
      extensions: menuItems
    }
  }
})
