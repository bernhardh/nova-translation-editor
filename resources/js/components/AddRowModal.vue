<template>
  <Modal :show="true" @close="$emit('close')">
    <form autocomplete="off" class="bg-white rounded-lg shadow-lg overflow-hidden" @submit.prevent="handleSubmit">
      <div>
        <heading :level="2" class="border-b border-40 py-4 px-2">{{ __('Create') }} "{{ group }}"</heading>

        <div class="p-3">
          <label class="inline-block text-80 mb-2 leading-tight nova-form-label">{{ __('Key of new translation') }}</label><br>
          <input type="text" ref="keyNameInput" required class="w-full form-control form-input form-input-bordered" v-model="keyName">
        </div>
      </div>
      <div class="bg-30 px-6 py-3 flex">
        <div class="flex items-center ml-auto">
          <CancelButton
              tabindex="0"
              dusk="cancel-create-button"
              type="button"
              @click="$emit('create-cancelled')"
          />

          <LoadingButton
              :loading="false"
              type="submit"
              class="btn btn-default btn-primary"
          >
            <span>{{ __('Create') }}</span>
          </LoadingButton>
        </div>
      </div>
    </form>
  </Modal>
</template>

<script>
export default {
  name: "AddRowModal",
  props: {
    group: {},
    existingKeys: {}
  },
  data() {
    return {
      keyName: ''
    }
  },
  methods: {
    handleSubmit() {
      this.keyName = this.keyName.trim();
      if(this.existingKeys.indexOf(this.keyName) != -1) {
        Nova.error('This key is already in use');
      }
      else {
        this.$emit('create', this.keyName)
      }
    },
  },
  /**
   * Mount the component.
   */
  mounted() {
    //this.$refs.keyNameInput.focus()
  },
}
</script>

<style scoped>
</style>
