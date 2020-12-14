<template>
  <div>
    <heading class="mb-6">{{ title }}</heading>

    <div class="flex border-b-2 border-50">
      <div class="w-1/5 px-8 py-2">
        <label class="inline-block text-80 pt-2 leading-tight">{{ __('Filter') }}</label>
      </div>
      <div class="w-4/5 py-2 px-8 relative">
            <span
                v-if="filterString"
                @click="filterString = ''"
                class="cursor-pointer text-primary absolute clear-filter-icon"
                :title="__('Clear filter')">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </span>
        <input type="text"
               :placeholder="__('Filter') + ': By key or translation'"
               class="w-full form-control form-input form-input-bordered"
               v-model="filterString">
      </div>
    </div>

    <card v-if="showTable" class="my-6">
      <nav class="bg-white px-8 pt-2 border-b-2 border-50 overflow-x-auto overflow-y-hidden text-center cursor-pointer whitespace-nowrap">
          <a v-for="(translation, group) in filterdTranslations" :key="group"
              :class="currentGroup === group ? 'text-primary border-primary' : ' text-grey border-transparent'"
              class="no-underline border-b-2 uppercase tracking-wide font-bold text-s py-3 mx-2 px-3 inline-block"
              @click="currentGroup = group">
            {{ group }}&nbsp;({{ Object.keys(translation).length }})
          </a>
      </nav>

      <div v-for="(translation, group) in filterdTranslations" v-if="currentGroup === group" :key="group + 'tab'">
        <table class="table overflow-x-auto">
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

        <div class="text-center p-3">
          <button class="btn btn-default btn-primary" @click="showNewModal = true">Add row</button>
          <button class="btn btn-default btn-primary mr-3" type="button" @click="save(currentGroup)">{{ __('Save') }} "{{ currentGroup }}"</button>
        </div>
      </div>
    </card>

    <div class="text-right my-2" v-if="showTable">
      <a class="btn btn-link dim cursor-pointer text-80 ml-auto mr-6 router-link-active nova-router-link nova-cancel-button"
        @click="$router.go()">
        {{ __('Cancel') }}
      </a>
      <button class="btn btn-default btn-primary" type="button" @click="save()">{{ __('Save all') }}</button>
    </div>

    <add-row-modal :group="currentGroup" :existing-keys="existingKeys" v-if="showNewModal" @close="showNewModal = false" @create="addRow"></add-row-modal>

    <div v-if="!showTable && loaded" class="toasted nova error">
      <p class="mb-2">You have not translation groups (aka translation file) activated in your `config/nova-translation-editor.php` config file.</p>
      <p>Please add at least one group to the `groups` array element (for example `auth`, `validation`, etc.).</p>
    </div>
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
      loaded: false,
      languages: [],
      useTabs: true,
      filterString: ''
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    existingKeys() {
      return Object.keys(this.translations[this.currentGroup]);
    },
    showTable() {
      return this.translations && Object.keys(this.translations).length > 0;
    },
    filterdTranslations() {
      let filtered = {};

      if(this.filterString) {
        for(let groupName in this.translations) {
          const group = this.translations[groupName];
          filtered[groupName] = {};

          for(let key in group) {
            for(let lang in group[key]) {
              const text = group[key][lang],
                reg = new RegExp(this.filterString, 'i');
              if(text.match(reg) || key.match(reg)) {
                filtered[groupName][key] = group[key];
              }
            }
          }
        }
      }
      else {
        filtered = this.translations;
      }

      return filtered;
    },
  },
  methods: {
    getData() {
      Nova.request().get(this.apiUrl + 'index').then(response => {
        this.loaded = true;
        if (response.data && response.data.translations) {
          this.translations = response.data.translations;
          this.languages = response.data.languages;
          this.currentGroup = Object.keys(this.translations)[0];
        }
      });
    },

    search(value, key) {
      if(key && key.search(this.filterString) >= 0) {
        return value;
      }

      for(let lang in value) {
        const trans = value[lang];

        if(typeof trans === 'string') {
          if(trans.search(this.filterString) >= 0) {
            return value;
          }
        }
        else {
          return this.search(trans, lang);
        }
      }

      return null;
    },

    addRow(name) {
      let row = {};
      for(let i in this.languages) {
        row[this.languages[i]] = '';
      }
      if(typeof this.translations[this.currentGroup] === 'object') {
        this.translations[this.currentGroup] = {}
      }
      this.$set(this.translations[this.currentGroup], name, row);
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

<style scoped>
.clear-filter-icon {
  right: 2.5rem;
  top: 1rem;
}
table {
  display: block;
}
textarea {
  min-width: 220px;
}
.whitespace-nowrap {
  white-space: nowrap;
}
</style>
