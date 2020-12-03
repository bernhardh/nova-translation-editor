<template>
  <div>
    <heading class="mb-6">{{ title }}</heading>

    <card v-if="translations" class="my-6">
      <nav class="bg-white px-8 pt-2 border-b">
        <div class="-mb-px flex justify-center cursor-pointer">
          <a v-for="(translation, group) in translations" :key="group"
              :class="currentGroup === group ? 'text-primary border-primary' : ' text-grey border-transparent'"
              class="no-underline border-b-2 uppercase tracking-wide font-bold text-s py-3 mx-2 px-3 inline-block"
              @click="currentGroup = group">
            {{ group }}
          </a>
        </div>
      </nav>

      <div v-for="(translation, group) in translations" v-show="currentGroup === group" :key="group + 'tab'">
        <table class="table w-full">
          <thead>
            <tr>
              <th class="text-left w-1/5">Key</th>
              <th class="text-left" v-for="lang in languages">Translation&nbsp;{{ lang }}</th>
              <th class="hidden"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trans, key) in translation">
              <td class="text-left py-2">
                {{ key }}
                <p class="text-xs	mt-2 text-dark-grey">{{ group}}.{{ key}}</p>
              </td>
              <td class="text-left" v-for="lang in languages">
                <textarea type="text" class="w-full form-input form-input-bordered py-3 m-1 h-auto" v-model="trans[lang]" />
              </td>
              <td class="hidden"></td>
            </tr>
          </tbody>
        </table>

        <div class="text-center m-3">
          <button class="btn btn-default btn-primary" @click="showNewModal = true">Add row</button>
        </div>
      </div>
    </card>

    <div class="text-right my-2">
      <a class="btn btn-link dim cursor-pointer text-80 ml-auto mr-6 router-link-active nova-router-link nova-cancel-button"
        @click="$router.go()">
        {{ __('Cancel') }}
      </a>
      <button class="btn btn-default btn-primary mr-3" type="button" @click="save(currentGroup)">{{ __('Save') }} "{{ currentGroup}}"</button>
      <button class="btn btn-default btn-primary" type="button" @click="save">{{ __('Save all') }}</button>
    </div>

    <add-row-modal :group="currentGroup" :existing-keys="existingKeys" v-if="showNewModal" @close="showNewModal = false" @create="addRow"></add-row-modal>
  </div>
</template>

<script>

import AddRowModal from "./AddRowModal";
export default {
  components: {AddRowModal},
  metaInfo() {
    return {
      title: this.title + ' - ' + this.currentGroup
    };
  },
  data: () => {
    return {
      title: 'Nova Translation Editor',
      apiUrl: '/nova-vendor/nova-translation-editor/',
      translations: null,
      currentGroup: null,
      showNewModal: false,
      languages: []
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    existingKeys() {
      return Object.keys(this.translations[this.currentGroup]);
    }
  },
  methods: {
    getData() {
      Nova.request().get(this.apiUrl + 'index').then(response => {
        if (response.data && response.data.translations) {
          this.translations = response.data.translations;
          this.languages = response.data.languages;
          this.currentGroup = Object.keys(this.translations)[0];
        }
      });
    },

    addRow(name) {
      let row = {};
      for(let i in this.languages) {
        row[this.languages[i]] = '';
      }
      this.translations[this.currentGroup][name] = row;
      this.showNewModal = false;
    },

    save(group) {
      let data = {};
      if(group) {
        data[group] = this.translations[group]
      }
      else {
        data = this.translations;
      }

      Nova.request().post(this.apiUrl + 'save', {data: data}).then(response => {
        this.$toasted.show('Saved', {type: 'success'});
      }).catch(error => {
        this.$toasted.show(error, {type: 'error'});
      });
    }
  }
}
</script>
