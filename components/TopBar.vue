<template>
  <SfTopBar class="topbar">
    <template #left>
      <SfButton data-cy="top-bar-btn_faq" class="sf-button--text">{{
        $t("Help & FAQs")
      }}</SfButton>
    </template>
    <template #center>
      <div>
      <nuxt-link :to="localePath('/rep')" v-if="!rep">
        <!-- <p>{{ $t('Download') }}</p> -->
        <SfButton data-cy="top-bar-btn_more" class="topbar__button sf-button--text">{{ $t('Find A Representative') }}</SfButton>
      </nuxt-link>
      <p v-else> <i>you are shopping with:</i> <span style="color:blueviolet">{{rep}}</span></p>
      </div>
      </template>
      <template #right>
        <LocaleSelector />
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import LocaleSelector from './LocaleSelector';
import {ref, onMounted} from '@vue/composition-api';

export default {
  components: {
    SfTopBar,
    SfButton,
    LocaleSelector
  },
  setup(){
    const rep = ref('');
    onMounted(()=>{
        rep.value = sessionStorage.getItem('rep');
    })
    return {
      rep
    }
  }
};
</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 2;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
</style>
