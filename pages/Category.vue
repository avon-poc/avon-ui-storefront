<template>
  <div id="category">
    <div class="smartphone-only icondiv">
      <SfIcon
        v-bind="icon"
        color="#7f28c4"
        icon="mail"
        size="sm"
        class="iconSize parallelIcon"
      />
      <SfImage
        src="/plp/fb.jpg"
        alt="Vila stripe maxi shirt dress"
        :width="35"
        :height="33"
        class="parallelIcon"
      />
      <SfImage
        src="/plp/twitter.jpg"
        alt="Vila stripe maxi shirt dress"
        :width="29"
        :height="30"
        class="parallelIcon"
      />
      <SfImage
        src="/plp/tumblr.jpg"
        alt="Vila stripe maxi shirt dress"
        :width="33"
        :height="33"
      />
    </div>
    <div class="smartphone-only">
      <SfLink
        link="https://www.storefrontui.io/"
        class="sf-product-card__link navTitle"
      >
        Previous Page
        <SfIcon
          v-bind="icon"
          icon="chevron_left"
          class="navIcon"
          color="#7f28c4"
          size="sm"
        />
      </SfLink>
    </div>
    <div class="smartphone-only">
      <SfImage
        src="/plp/anew.png"
        alt="Vila stripe maxi shirt dress"
        :width="380"
        :height="175"
        class="parallelIcon banner_plp"
      />
    </div>
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />

    <div class="navbar section dividerColor">
      <div class="navbar__aside desktop-only">
        <LazyHydrate never>
          <SfHeading
            :level="3"
            :title="$t('Bestsellers Top Rated Whats New')"
            class="navbar__title"
          />
        </LazyHydrate>
      </div>

      <div class="navbar__main">
        <!-- <LazyHydrate on-interaction>
          <SfButton
            class="sf-button--text navbar__filters-button"
            data-cy="category-btn_filters"
            aria-label="Filters"
            @click="toggleFilterSidebar"
          >
            <SfIcon
              size="24px"
              color="dark-secondary"
              icon="filter2"
              class="navbar__filters-icon"
              data-cy="category-icon_"
            />
            {{ $t('Filters') }}
          </SfButton>
        </LazyHydrate> -->

        <LazyHydrate never class="desktop-only">
          <SfHeading
            :level="3"
            :title="breadcrumbs ? breadcrumbs[breadcrumbs.length - 1].text : ''"
            class="navbar__title"
          />
        </LazyHydrate>

        <div class="navbar__sort sortBy">
          <span class="navbar__label">{{ $t("Sort By") }}:</span>
          <LazyHydrate on-interaction>
            <SfSelect
              :value="sortBy.selected"
              placeholder="Select sorting"
              data-cy="category-select_sortBy"
              class="navbar__select"
              @input="th.changeSorting"
            >
              <SfSelectOption
                v-for="option in sortBy.options"
                :key="option.id"
                :value="option.id"
                class="sort-by__option"
                >{{ option.value }}</SfSelectOption
              >
            </SfSelect>
          </LazyHydrate>
        </div>

        <!-- <div class="navbar__counter">
          <span class="navbar__label desktop-only"
            >{{ $t("Products found") }}:
          </span>
          <span class="desktop-only">{{ pagination.totalItems }}</span>
          <span class="navbar__label smartphone-only"
            >{{ pagination.totalItems }} {{ $t("Items") }}</span
          >
        </div> -->

        <div class="navbar__view desktop-only">
          <SfIcon
            data-cy="category-icon_grid-view"
            class="navbar__view-icon"
            :color="isCategoryGridView ? '#dfc5f3' : 'dark-secondary'"
            icon="tiles"
            size="20px"
            role="button"
            aria-label="Change to grid view"
            :aria-pressed="isCategoryGridView"
            @click="toggleCategoryGridView"
          />
          <SfIcon
            data-cy="category-icon_list-view"
            class="navbar__view-icon"
            :color="!isCategoryGridView ? 'dark-secondary' : '#dfc5f3'"
            icon="list"
            size="20px"
            role="button"
            aria-label="Change to list view"
            :aria-pressed="!isCategoryGridView"
            @click="toggleCategoryGridView"
          />
        </div>
      </div>
    </div>

    <div class="main section">
      <div class="sidebar desktop-only">
        <LazyHydrate never>
          <SfHeading
            :level="3"
            :title="$t('Categories')"
            class="navbar__title categoryHeader"
          />
        </LazyHydrate>
        <LazyHydrate when-idle>
          <SfLoader :class="{ loading }" :loading="loading">
            <SfAccordion :open="activeCategory" :show-chevron="true">
              <SfAccordionItem
                v-for="(cat, i) in categoryTree && categoryTree.items"
                :key="i"
                :header="cat.label"
              >
                <template>
                  <SfList class="list">
                    <SfListItem class="list__item">
                      <SfMenuItem
                        :count="cat.count || ''"
                        :data-cy="`category-link_subcategory_${cat.slug}`"
                        :label="cat.label"
                      >
                        <template #label>
                          <nuxt-link
                            :to="localePath(th.getCatLink(cat))"
                            :class="
                              cat.isCurrent ? 'sidebar--cat-selected' : ''
                            "
                          >
                            All
                          </nuxt-link>
                        </template>
                      </SfMenuItem>
                    </SfListItem>
                    <SfListItem
                      class="list__item"
                      v-for="(subCat, j) in cat.items"
                      :key="j"
                    >
                      <SfMenuItem
                        :count="subCat.count || ''"
                        :data-cy="`category-link_subcategory_${subCat.slug}`"
                        :label="subCat.label"
                      >
                        <template #label="{ label }">
                          <nuxt-link
                            :to="localePath(th.getCatLink(subCat))"
                            :class="
                              subCat.isCurrent ? 'sidebar--cat-selected' : ''
                            "
                          >
                            {{ label }}
                          </nuxt-link>
                        </template>
                      </SfMenuItem>
                    </SfListItem>
                  </SfList>
                </template>
              </SfAccordionItem>
            </SfAccordion>
          </SfLoader>
        </LazyHydrate>
        <div><hr class="sf-divider divider" /></div>
      </div>
      <SfLoader :class="{ loading }" :loading="loading">
        <div class="products" v-if="!loading">
          <transition-group
            v-if="isCategoryGridView"
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <ProductCard
              data-cy="category-product-card"
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              :regular-price="
                $n(productGetters.getPrice(product).regular, 'currency')
              "
              :special-price="
                productGetters.getPrice(product).special &&
                $n(productGetters.getPrice(product).special, 'currency')
              "
              v-model="qty"
              :max-rating="5"
              :score-rating="productGetters.getAverageRating(product)"
              :show-add-to-cart-button="true"
              :isOnWishlist="false"
              :isAddedToCart="isInCart({ product })"
              :variant="getVariant(product)"
              :link="
                localePath(
                  `/p/${productGetters.getId(product)}/${productGetters.getSlug(
                    product
                  )}`
                )
              "
              class="products__product-card"
              @click:wishlist="addItemToWishlist({ product })"
              @click:add-to-cart="
                addItemToCart({ product, quantity: parseInt(qty) })
              "
            />
          </transition-group>
          <transition-group
            v-else
            appear
            name="products__slide"
            tag="div"
            class="products__list"
          >
            <ProductCardHorizontal
              data-cy="category-product-cart_wishlist"
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              :regular-price="
                $n(productGetters.getPrice(product).regular, 'currency')
              "
              :special-price="
                productGetters.getPrice(product).special &&
                $n(productGetters.getPrice(product).special, 'currency')
              "
              v-model="qty"
              :variant="getVariant(product)"
              :max-rating="5"
              :score-rating="3"
              :is-on-wishlist="false"
              class="products__product-card-horizontal"
              @click:wishlist="addItemToWishlist({ product })"
              @click:add-to-cart="
                addItemToCart({ product, quantity: parseInt(qty) })
              "
              :link="
                localePath(
                  `/p/${productGetters.getId(product)}/${productGetters.getSlug(
                    product
                  )}`
                )
              "
            >
              <template #configuration>
                <SfProperty
                  class="desktop-only"
                  name="Size"
                  value="XS"
                  style="margin: 0 0 1rem 0"
                />
                <SfProperty class="desktop-only" name="Color" value="white" />
              </template>
              <template #actions>
                <SfButton
                  class="sf-button--text desktop-only"
                  style="margin: 0 0 1rem auto; display: block"
                  @click="() => {}"
                >
                  {{ $t("Save for later") }}
                </SfButton>
              </template>
            </ProductCardHorizontal>
          </transition-group>

          <LazyHydrate on-interaction>
            <SfPagination
              v-if="!loading"
              data-cy="category-pagination"
              class="products__pagination desktop-only"
              v-show="pagination.totalPages > 1"
              :current="pagination.currentPage"
              :total="pagination.totalPages"
              :visible="5"
            />
          </LazyHydrate>

          <div
            v-show="pagination.totalPages > 1"
            class="products__show-on-page"
          >
            <span class="products__show-on-page__label">{{
              $t("Show on page")
            }}</span>
            <LazyHydrate on-interaction>
              <SfSelect
                :value="pagination.itemsPerPage.toString()"
                class="products__items-per-page"
                @input="th.changeItemsPerPage"
              >
                <SfSelectOption
                  v-for="option in pagination.pageOptions"
                  :key="option"
                  :value="option"
                  class="products__items-per-page__option"
                >
                  {{ option }}
                </SfSelectOption>
              </SfSelect>
            </LazyHydrate>
          </div>
          <div class="common-rep-block smartphone-only">
            <BottomRepBlock />
          </div>
        </div>
      </SfLoader>
    </div>

    <LazyHydrate when-visible>
      <SfSidebar
        :visible="isFilterSidebarOpen"
        title="Filters"
        class="sidebar-filters"
        @close="toggleFilterSidebar"
      >
        <div class="filters desktop-only">
          <div v-for="(facet, i) in facets" :key="i">
            <SfHeading
              :level="4"
              :title="facet.label"
              class="filters__title sf-heading--left"
              :key="`filter-title-${facet.id}`"
            />
            <div
              v-if="isFacetColor(facet)"
              class="filters__colors"
              :key="`${facet.id}-colors`"
            >
              <SfColor
                v-for="option in facet.options"
                :key="`${facet.id}-${option.value}`"
                :data-cy="`category-filter_color_${option.value}`"
                :color="option.value"
                :selected="isFilterSelected(facet, option)"
                class="filters__color"
                @click="() => selectFilter(facet, option)"
              />
            </div>
            <div v-else>
              <SfFilter
                v-for="option in facet.options"
                :key="`${facet.id}-${option.value}`"
                :data-cy="`category-filter_${facet.id}_${option.value}`"
                :label="
                  option.id + `${option.count ? ` (${option.count})` : ''}`
                "
                :selected="isFilterSelected(facet, option)"
                class="filters__item"
                @change="() => selectFilter(facet, option)"
              />
            </div>
          </div>
        </div>
        <SfAccordion class="filters smartphone-only">
          <div v-for="(facet, i) in facets" :key="i">
            <SfAccordionItem
              :key="`filter-title-${facet.id}`"
              :header="facet.label"
              class="filters__accordion-item"
            >
              <SfFilter
                v-for="option in facet.options"
                :key="`${facet.id}-${option.id}`"
                :label="option.id"
                :selected="isFilterSelected(facet, option)"
                class="filters__item"
                @change="() => selectFilter(facet, option)"
              />
            </SfAccordionItem>
          </div>
        </SfAccordion>
        <template #content-bottom>
          <div class="filters__buttons">
            <SfButton class="sf-button--full-width" @click="applyFilters">{{
              $t("Done")
            }}</SfButton>
            <SfButton
              class="sf-button--full-width filters__button-clear"
              @click="clearFilters"
              >{{ $t("Clear all") }}</SfButton
            >
          </div>
        </template>
      </SfSidebar>
    </LazyHydrate>
  </div>
</template>

<script>
import {
  SfSidebar,
  SfButton,
  SfList,
  SfLink,
  SfIcon,
  SfHeading,
  SfMenuItem,
  SfFilter,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfBreadcrumbs,
  SfLoader,
  SfColor,
  SfProperty,
  SfImage,
} from "@storefront-ui/vue";
import { ref, computed, onMounted } from "@vue/composition-api";
import {
  useCart,
  useWishlist,
  productGetters,
  useFacet,
  facetGetters,
} from "@vue-storefront/commercetools";
import { useUiHelpers, useUiState } from "~/composables";
import { onSSR } from "@vue-storefront/core";
import LazyHydrate from "vue-lazy-hydration";
import Vue from "vue";
import ProductCard from "../components/ProductCard";
import ProductCardHorizontal from "../components/ProductCardHorizontal";
import BottomRepBlock from "../components/BottomRepBlock";
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js";

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default {
  transition: "fade",
  setup(props, context) {
    const th = useUiHelpers();
    const uiState = useUiState();
    const { addItem: addItemToCart, isInCart } = useCart();
    const { addItem: addItemToWishlist } = useWishlist();
    const { result, search, loading } = useFacet();

    const products = computed(() => facetGetters.getProducts(result.value));
    const categoryTree = computed(() =>
      facetGetters.getCategoryTree(result.value)
    );
    const breadcrumbs = computed(() =>
      facetGetters.getBreadcrumbs(result.value)
    );
    const sortBy = computed(() => facetGetters.getSortOptions(result.value));
    const facets = computed(() =>
      facetGetters.getGrouped(result.value, ["color", "size"])
    );
    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    //test code commit
    const pagination = computed(() => facetGetters.getPagination(result.value));
    const activeCategory = computed(() => {
      const items = categoryTree.value.items;

      if (!items) {
        return "";
      }

      const category = items.find(
        ({ isCurrent, items }) =>
          isCurrent || items.find(({ isCurrent }) => isCurrent)
      );

      return category?.label || items[0].label;
    });

    onSSR(async () => {
      await search(th.getFacetsFromURL());
      console.log("products>>>>>>>>>>>>", products.value[0]);
      console.log("breadcrumbs>>>>>>>>>>>> ", breadcrumbs.value[1].text);
      console.log("sortBy>>>>>>>>>>>>", th.getFacetsFromURL());
      // console.log("isCategoryGridView>>>>>>>>>>>>", isCategoryGridView.value);
    });

    const { changeFilters, isFacetColor } = useUiHelpers();
    const {
      toggleFilterSidebar,
      toggleCategoryGridView,
    } = useUiState();
    const selectedFilters = ref({});
    const qty = ref(1);
    onMounted(() => {
      context.root.$scrollTo(context.root.$el, 2000);
      if (!facets.value.length) return;
      selectedFilters.value = facets.value.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.id]: curr.options.filter((o) => o.selected).map((o) => o.id),
        }),
        {}
      );
    });

    const isFilterSelected = (facet, option) =>
      (selectedFilters.value[facet.id] || []).includes(option.id);

    const selectFilter = (facet, option) => {
      if (!selectedFilters.value[facet.id]) {
        Vue.set(selectedFilters.value, facet.id, []);
      }

      if (selectedFilters.value[facet.id].find((f) => f === option.id)) {
        selectedFilters.value[facet.id] = selectedFilters.value[
          facet.id
        ].filter((f) => f !== option.id);
        return;
      }

      selectedFilters.value[facet.id].push(option.id);
    };

    const clearFilters = () => {
      toggleFilterSidebar();
      selectedFilters.value = {};
      changeFilters(selectedFilters.value);
    };

    const applyFilters = () => {
      toggleFilterSidebar();
      changeFilters(selectedFilters.value);
    };

    const getVariant = (product) => {
      var variant = product.attributesRaw.find((obj) => {
        return obj.name === "variantType";
      });
      console.log("product>>>>>>>>", product, variant ? variant.value : "");
      return variant ? variant.value : "";
    };

    return {
      ...uiState,
      th,
      products,
      categoryTree,
      loading,
      productGetters,
      pagination,
      activeCategory,
      sortBy,
      facets,
      breadcrumbs,
      addItemToWishlist,
      addItemToCart,
      isInCart,
      isFacetColor,
      selectFilter,
      isFilterSelected,
      selectedFilters,
      clearFilters,
      applyFilters,
      qty,
      getVariant,
      toggleCategoryGridView,
      isMobile,
    };
  },
  components: {
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfColor,
    SfHeading,
    SfProperty,
    LazyHydrate,
    ProductCard,
    ProductCardHorizontal,
    SfImage,
    BottomRepBlock,
  },
};
</script>

<style lang="scss" scoped>
.divider {
  border-top: 1px dotted black;
}

.sortBy {
  border: 1px solid black;
  padding: 5px;
  padding-left: 1rem;
  border-radius: 5px;
  margin-top: 0px !important;
  margin-left: 35px !important;
}
.categoryHeader {
  font-weight: bold;
  color: #181818;
  text-transform: uppercase;
  line-height: 2.4rem;
  font-family: Montserrat, Arial;
  font-size: 1.4rem;
}
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}

.navbar__main{
  justify-content: flex-start !important
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }
  &__aside {
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }
  &__main {
    flex: 1;
    padding: 0;
    justify-content: space-between;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }
  &__filters-icon {
    margin: 0 0 0 var(--spacer-xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }
  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      order: 2;
    }
    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }
    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }
  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-text-muted);
    @include for-desktop {
      color: var(--c-link);
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }
  &__select {
    --select-width: 220px;
    --select-padding: 0;
    --select-height: auto;
    --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --select-margin: 0;
    --select-option-font-size: var(--font-size-sm);
    --select-error-message-height: 0;
    ::v-deep .sf-select__dropdown {
      @include for-mobile {
        width: 280px;
      }
      background: var(--c-background-two);
      font-family: var(--font-family);
      font-weight: var(--font-weight--light);
      font-size: 16px;
      margin: 0;
    }
    ::v-deep .sf-select__placeholder {
      --select-option-font-size: var(--font-size-sm);
    }
  }
  &__sort {
    display: flex;
    align-items: center;
    @include for-mobile {
      margin: 0 auto 0 var(--spacer-2xl);
    }
  }
  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
    @include for-desktop {
      margin: auto 0 auto auto;
      order: 0;
    }
  }
  &__view {
    display: flex;
    align-items: center;
    order: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }
    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}
.sort-by {
  flex: unset;
  width: 11.875rem;
}
.main {
  display: flex;
}
.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.sidebar-filters {
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}
.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid {
    justify-content: space-between;
    @include for-desktop {
      justify-content: flex-start;
    }
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
}
::v-deep .sf-sidebar__aside {
  --sidebar-z-index: 3;
}
.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }
  &__colors {
    display: flex;
  }
  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }
  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }
  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);
    &:last-child {
      border-bottom: 0;
    }
    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }
  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
  &__buttons {
    margin: var(--spacer-sm) 0;
  }
  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
}

.dividerColor {
  border-bottom-style: solid;
  border-bottom-color: grey;
}

.iconSize {
  width: 35px;
  height: 33px;
}
.parallelIcon {
  float: left;
}
.icondiv {
  margin-top: 10px;
  margin-left: 10px;
}
.navTitle {
  margin: 10px;
  margin-bottom: 0px;
  padding: 18px;
  background: whitesmoke;
  width: 350px;
}
.navIcon {
  float: right;
  margin-bottom: 10px;
  margin-top: -12px;
  margin-right: -26px;
}
.navbar__sort {
  @include for-mobile {
    width: 90%;
    margin-left: 0 !important;
  }
  // margin-left: 400px !important;
  border: 1px solid #cccccc;
  background: var(--c-background-two);
}

/* Common */
.atbbtnPDP {
  font-size: 10pt;
  font-weight: bold;
  background-color: #7f28c4;
  color: white;
  height: 40px !important;
  border-radius: 5px;
  margin: 0px;
  font-family: var(--font-family);
}
.subscribePDP {
  color: #7f28c4;
  text-align: center;
  align-items: center;
  line-height: 2rem;
  font-family: Montserrat, Arial;
}
.repButton {
  margin: 10px auto;
  width: 380px;
}
.navbar__label {
  font-family: var(--font-family);
  font-size: 16px;
}
.banner_plp {
  margin: 20px 20px 10px 15px;
}
</style>
