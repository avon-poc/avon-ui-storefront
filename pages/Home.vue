<template>
  <div id="home">
    <LazyHydrate when-idle>
      <SfHero class="hero">
        <SfHeroItem
          v-for="(hero, i) in heroes"
          :key="i"
          :title="hero.title"
          :subtitle="hero.subtitle"
          :button-text="hero.buttonText"
          :background="hero.background"
          :image="hero.image"
          :class="hero.className"
        />
      </SfHero>
    </LazyHydrate>
    <LazyHydrate>
      <div class="avon_card">
        <div class="card__image">
          <img src="/homepage/card1.png" />
        </div>
        <h2 class="card__title">Skincare Saviours</h2>
        <p class="card__description">
          Cleanse, Tone and moisturise your way to skin perfection.
        </p>
        <button class="card__cta">Shop Now</button>
      </div>
    </LazyHydrate>
    <LazyHydrate>
      <div class="avon_card">
        <div class="card__image">
          <img src="/homepage/card2.png" />
        </div>
        <h2 class="card__title">Family Hygiene</h2>
        <p class="card__description">
          Help protect your family with our 64% alcohol and get.
        </p>
        <button class="card__cta">Shop Now</button>
      </div>
    </LazyHydrate>
    <LazyHydrate>
      <div class="avon_card">
        <div class="card__image">
          <img src="/homepage/card1.png" />
        </div>
        <h2 class="card__title">Skincare Saviours</h2>
        <p class="card__description">
          Cleanse, Tone and moisturise your way to skin perfection.
        </p>
        <button class="card__cta">Shop Now</button>
      </div>
    </LazyHydrate>
    <LazyHydrate>
      <div class="common-rep-block">
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
    </LazyHydrate>
    <!-- <LazyHydrate when-visible>
      <SfBannerGrid :banner-grid="1" class="banner-grid">
        <template v-for="item in banners" v-slot:[item.slot]>
          <SfBanner
            :key="item.slot"
            :title="item.title"
            :subtitle="item.subtitle"
            :description="item.description"
            :button-text="item.buttonText"
            :image="item.image"
            :class="item.class"
          />
        </template>
      </SfBannerGrid>
    </LazyHydrate> -->

    <!-- <LazyHydrate when-visible>
      <div class="similar-products">
        <SfHeading title="Match with it" :level="3"/>
        <nuxt-link :to="localePath('/c/women')" class="smartphone-only">See all</nuxt-link>
      </div>
    </LazyHydrate> -->

    <!-- <LazyHydrate when-visible>
        <SfCarousel class="carousel" :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }">
          <template #prev="{go}">
            <SfArrow
              aria-label="prev"
              class="sf-arrow--left sf-arrow--long"
              @click="go('prev')"
            />
          </template>
          <template #next="{go}">
            <SfArrow
              aria-label="next"
              class="sf-arrow--right sf-arrow--long"
              @click="go('next')"
            />
          </template>
          <SfCarouselItem class="carousel__item" v-for="(product, i) in products" :key="i">
            <SfProductCard
              data-cy="home-url_product"
              :title="product.title"
              :image="product.image"
              :regular-price="product.price.regular"
              :max-rating="product.rating.max"
              :score-rating="product.rating.score"
              :show-add-to-cart-button="true"
              :is-on-wishlist="product.isOnWishlist"
              link="/"
              class="carousel__item__product"
              @click:wishlist="toggleWishlist(i)"
            />
          </SfCarouselItem>
        </SfCarousel>
    </LazyHydrate> -->

    <!-- <LazyHydrate when-visible>
      <SfCallToAction
        title="Subscribe to Newsletters"
        button-text="Subscribe"
        description="Be aware of upcoming sales and events. Receive gifts and special offers!"
        image="/homepage/newsletter.webp"
        class="call-to-action"
      />
    </LazyHydrate> -->

    <LazyHydrate when-visible>
      <MobileStoreBanner />
    </LazyHydrate>
  </div>
</template>
<script>
import {
  SfHero,
  SfBanner,
  SfImage,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfBannerGrid,
  SfHeading,
  SfArrow,
  SfButton,
} from "@storefront-ui/vue";
import InstagramFeed from "~/components/InstagramFeed.vue";
import MobileStoreBanner from "~/components/MobileStoreBanner.vue";
import LazyHydrate from "vue-lazy-hydration";
export default {
  components: {
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
    MobileStoreBanner,
    LazyHydrate,
  },
  layout: "avonLayout",
  data() {
    return {
      heroes: [
        {
          title: "Colorful summer makeup are already in store",
          subtitle: "SUMMER COLLECTION 2021",
          buttonText: "Learn more",
          background: "#eceff1",
          image: "/homepage/homepage-slide-1.jpeg",
          link: "/c/women/women-clothing-shirts",
        },
        {
          title: "Colorful summer makeup are already in store",
          subtitle: "SUMMER COLLECTION 2021",
          buttonText: "Learn more",
          background: "#efebe9",
          image: "/homepage/homepage-slide-2.jpeg",
          link: "/c/women/women-shoes-sandals",
          className:
            "sf-hero-item--position-bg-top-left sf-hero-item--align-right",
        },
        {
          title: "Colorful summer makeup are already in store",
          subtitle: "SUMMER COLLECTION 2021",
          buttonText: "Learn more",
          background: "#fce4ec",
          image: "/homepage/homepage-slide-1.jpeg",
          link: "/c/women/women-clothing-dresses",
        },
      ],
      banners: [
        {
          slot: "banner-A",
          subtitle: "Dresses",
          title: "Cocktail & Party",
          description:
            "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
          buttonText: "Shop now",
          image: {
            mobile: "/homepage/homepage-slide-1.jpeg",
            desktop: "/homepage/homepage-slide-1.jpeg",
          },
          class: "sf-banner--slim desktop-only",
          link: "/c/women/women-clothing-skirts",
        },
        {
          slot: "banner-B",
          subtitle: "Dresses",
          title: "Linen Dresses",
          description:
            "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
          buttonText: "Shop now",
          image: "/homepage/homepage-slide-2.jpeg",
          class: "sf-banner--slim banner-central desktop-only",
          link: "/c/women/women-clothing-dresses",
        },
        {
          slot: "banner-C",
          subtitle: "T-Shirts",
          title: "The Office Life",
          image: "/homepage/homepage-slide-1.jpeg",
          class: "sf-banner--slim banner__tshirt",
          link: "/c/women/women-clothing-shirts",
        },
        {
          slot: "banner-D",
          subtitle: "Summer Sandals",
          title: "Eco Sandals",
          image: "/homepage/homepage-slide-2.jpeg",
          class: "sf-banner--slim",
          link: "/c/women/women-shoes-sandals",
        },
      ],
      products: [
        {
          title: "Cream Beach Bag",
          image: "/homepage/productA.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isOnWishlist: true,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productB.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isOnWishlist: false,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productC.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isOnWishlist: false,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productA.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isOnWishlist: false,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productB.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isOnWishlist: false,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productC.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isOnWishlist: false,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productA.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isOnWishlist: false,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productB.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isOnWishlist: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        --hero-item-wrapper-text-align: right;
        --hero-item-subtitle-width: 100%;
        --hero-item-title-width: 100%;
        --hero-item-wrapper-padding: var(--spacer-sm) var(--spacer-sm)
          var(--spacer-sm) var(--spacer-2xl);
      }
    }
  }
}

::v-deep .sf-hero__controls {
  --hero-controls-display: none;
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }
  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.carousel {
  margin: 0 calc(var(--spacer-sm) * -1) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
}

/* card */
.avon_card {
  margin: 50px 0px 20px 0px;
  .card {
    &__image {
      img {
        width: 100%;
      }
    }
    &__title {
      font-family: var(--font-family);
      font-size: 20px;
      color: #000;
      text-align: center;
      margin-top: 10px;
    }
    &__description {
      font-family: var(--font-family);
      font-size: 17px;
      color: #000;
      text-align: center;
      font-weight: 200;
      width: 80%;
      margin: 0 auto;
    }
    &__cta {
      margin: 0 auto;
      display: block;
      margin-top: 15px;
      border: none;
      background: var(--c-primary);
      color: #fff;
      padding: 14px 11px;
      width: 220px;
      border-radius: 5px;
      font-size: 18px;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
}

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
