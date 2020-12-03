<template>
  <modal>
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
          <button type="button" class="btn text-80 font-normal h-9 px-3 mr-3 btn-link" @click="handleClose">
            {{ __('Cancel') }}
          </button>

          <button type="submit" class="btn btn-default btn-primary">
            <span>{{ __('Create') }}</span>
          </button>
        </div>
      </div>
    </form>
  </modal>
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
    handleClose() {
      this.$emit('close')
    },
    handleSubmit() {
      this.keyName = this.keyName.trim();
      if(this.existingKeys.indexOf(this.keyName) != -1) {
        this.$toasted.show('This key is already in use', {type: 'error'});
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
    this.$refs.keyNameInput.focus()
  },
}
</script>

<style scoped>
</style>
