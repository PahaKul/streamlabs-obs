import Vue from 'vue';
import GenericForm from './GenericForm.vue';
import GenericFormTabbed from './GenericFormTabbed.vue';
import { Component, Prop } from 'vue-property-decorator';
import { ISettingsSubCategory } from '../../../services/settings';

@Component({
  components: { GenericForm, GenericFormTabbed },
})
export default class GenericFormGroups extends Vue {
  @Prop()
  value: ISettingsSubCategory[];

  collapsedGroups: Dictionary<boolean> = {};

  toggleGroup(index: string) {
    this.$set(this.collapsedGroups, index, !this.collapsedGroups[index]);
  }

  onInputHandler() {
    this.$emit('input', this.value);
  }

  hasAnyVisibleSettings(category: ISettingsSubCategory) {
    return !!category.parameters.find(setting => {
      return setting.visible;
    });
  }

  get isTabbed() {
    // TODO: improve this check after backend changes required to enable ECategoryType detection
    return (
      this.value[0] &&
      this.value[0].parameters[0].value === 'Advanced' &&
      this.value[1] &&
      this.value[1].nameSubCategory === 'Streaming'
    );
  }
}
