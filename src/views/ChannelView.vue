<template>
  <Toast pt:root="custom-toast" />

  <div class="grid h-full w-full grid-cols-12 gap-4 text-white">
    <div class="col-span-4 bg-fuchsia-950/60">
      <ChannelList @open-dialog="openNew" />
    </div>
    <div class="col-span-6"></div>
  </div>

  <Dialog
    v-model:visible="channelDialog"
    :style="{ width: '450px' }"
    header="Channel Details"
    :modal="true"
    pt:root="!bg-white !text-black"
  >
    <div class="flex flex-col gap-6">
      <div>
        <label for="name" class="mb-3 block font-bold">Name</label>
        <InputText v-model="channel.name" fluid pt:root="custom-inputtext" />
        <small v-if="submitted && !channel.name" class="text-red-500">Name is required.</small>
      </div>

      <div>
        <label for="balance" class="mb-3 block font-bold">Members</label>
        <AutoComplete
          v-model="channel.members"
          inputId="multiple-ac-1"
          multiple
          fluid
          :suggestions="filteredUsers"
          @complete="search"
          optionLabel="name"
          optionValue="id"
          pt:root="custom-autocomplete"
        >
          <template #chip="slotProps">
            <Chip removable removeIcon="pi pi-times" @remove="removeUser(slotProps)">
              <div class="flex items-center gap-4">
                <div class="flex flex-col justify-center">
                  <p class="text-xs">
                    {{ slotProps.value.emailaddress }}
                  </p>
                </div>
              </div>
            </Chip>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <span class="text-xs">
                {{ slotProps.option.emailaddress }}
              </span>
            </div>
          </template>
          <template #empty>
            <span class="text-xs"> No results found. Check spelling or try another name. </span>
          </template>
        </AutoComplete>
        <small v-if="submitted && !channel.members.length" class="text-red-500"
          >Members is required.</small
        >
      </div>
    </div>

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="hideDialog"
        pt:root="custom-button cancel"
        pt:label="custom-button-label"
        pt:icon="custom-button-icon"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        @click="saveChannel"
        pt:root="custom-button save"
        pt:label="custom-button-label"
        pt:icon="custom-button-icon"
      />
    </template>
  </Dialog>
</template>

<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import AutoComplete from 'primevue/autocomplete'
import Chip from 'primevue/chip'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'

import ChannelList from '@/components/channels/List.vue'

import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

import UserFunctions from '@/components/users/user'
import ChannelFunctions from '@/components/channels/channel'

import { useChannelsStore } from '@/stores/channel.store'

const channelStore = useChannelsStore()

const { listUsers } = UserFunctions()
const { postChannel } = ChannelFunctions()

const toast = useToast()

const channelDialog = ref(false)
const submitted = ref(false)
const channel = ref({
  name: '',
  members: []
})

const openNew = async () => {
  channel.value = {
    name: '',
    members: []
  }
  submitted.value = false
  channelDialog.value = true
  users.value = await listUsers()
}

const hideDialog = () => {
  channelDialog.value = false
  submitted.value = false
}

const saveChannel = async () => {
  submitted.value = true
  if (channel.value.name.trim() && channel.value.members.length) {
    const memberIds = channel.value.members.map((member) => member.id)
    const channelData = {
      name: channel.value.name,
      user_ids: memberIds
    }
    if (channel.value.id) {
      toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Channel Updated',
        life: 3000
      })
    } else {
      await postChannel(channelData)
        .then(() => {
          toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Channel Created',
            life: 3000
          })
        })
        .catch((error) => {
          console.error('Error creating channel:', error)
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create channel',
            life: 3000
          })
        })
    }
    await channelStore.setChannels()
    hideDialog()
    channel.value = {
      name: '',
      members: []
    }
  }
}

const filteredUsers = ref([])
const users = ref([])

const search = (event) => {
  const query = event.query.toLowerCase()
  const members = channel.value.members || []
  filteredUsers.value = users.value.filter((user) => {
    const isMatch = user.emailaddress.toLowerCase().includes(query)
    const notAlreadySelected = !members.some((m) => m.id === user.id)
    return isMatch && notAlreadySelected
  })
}

const removeUser = (slotProps) => {
  const index = channel.value.members.findIndex((m) => m.id === slotProps.value.id)
  if (index !== -1) {
    channel.value.members.splice(index, 1)
  }
}
</script>
