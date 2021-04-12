<template>
  <div class="common-rep-block smartphone-only">
    <SfHeading
      class="heading-offer"
      :title="$t('Get Exclusive Special Offers & The Latest News')"
    />
    <SfLink class="sf-product-card__link subscribePDP"
      >SUBSCRIBE / SIGN UP >
    </SfLink>
    <div class="smartphone-only">
      <SfButton
        class="sf-add-to-cart__button atbbtnPDP repButton"
        :disabled="loading"
        @click="
          addItem({
            product,
            quantity: parseInt(qty),
            repId: 'rep01',
          })
        "
      >
        Find a Representative
      </SfButton>
      <SfButton
        class="sf-add-to-cart__button atbbtnPDP repButton"
        :disabled="loading"
        @click="
          addItem({
            product,
            quantity: parseInt(qty),
            repId: 'rep01',
          })
        "
      >
        Become a Representative
      </SfButton>
    </div>
  </div>
</template>
<script>
import { SfButton, SfHeading, SfLink } from "@storefront-ui/vue";
export default {
  name: "BottomRepBlock",
  components: {
    SfHeading,
    SfButton,
    SfLink,
  },
  setup(props, context) {},
};
</script>
<style>
.subscribePDP {
  color: var(--c-primary);
  text-align: center;
  align-items: center;
  line-height: 2rem;
  font-family: var(--font-family);
}
.atbbtnPDP {
  font-size: 10pt;
  font-weight: bold;
  background-color: var(--c-primary);
  color: white;
  height: 40px !important;
  border-radius: 5px;
  margin: 0px;
  font-family: var(--font-family);
}
.repButton {
  margin: 10px auto;
  width: 380px;
}
</style>