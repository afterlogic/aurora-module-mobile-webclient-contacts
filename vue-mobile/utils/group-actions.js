import notification from 'src/utils/notification'

import eventBus from 'src/event-bus'
import { defineAsyncComponent } from 'vue'

export const groupActions = {
  deleteGroup: {
    method: () => { notification.showReport('Comming soon') },
    name: 'deleteGroup',
    component: null,
    getComponent: () => { return defineAsyncComponent(() => import('../components/dialogs/DeleteGroupDialog')) },
    displayName: 'Gelete group',
    icon: 'DeleteIcon',
    isShowAction: () => true,
  },
}

export const getGroupActions = () => {
  eventBus.$emit('ContactsMobileWebClient::getGroupActionsList', groupActions)
  return groupActions
}
