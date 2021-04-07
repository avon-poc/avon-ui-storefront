import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _189bb199 = () => interopDefault(import('../pages/Category.vue' /* webpackChunkName: "pages/Category" */))
const _5662dde1 = () => interopDefault(import('../pages/Checkout.vue' /* webpackChunkName: "" */))
const _3a2a13a6 = () => interopDefault(import('../pages/Checkout/Billing.vue' /* webpackChunkName: "" */))
const _fccb6f90 = () => interopDefault(import('../pages/Checkout/Payment.vue' /* webpackChunkName: "" */))
const _8ba3f428 = () => interopDefault(import('../pages/Checkout/Shipping.vue' /* webpackChunkName: "" */))
const _b8885cda = () => interopDefault(import('../pages/Checkout/ThankYou.vue' /* webpackChunkName: "" */))
const _3b080a7a = () => interopDefault(import('../pages/Home.vue' /* webpackChunkName: "" */))
const _9dd9b754 = () => interopDefault(import('../pages/MyAccount.vue' /* webpackChunkName: "pages/MyAccount" */))
const _3f513770 = () => interopDefault(import('../pages/MyAccount/BillingDetails.vue' /* webpackChunkName: "pages/MyAccount/BillingDetails" */))
const _37d3e09d = () => interopDefault(import('../pages/MyAccount/LoyaltyCard.vue' /* webpackChunkName: "pages/MyAccount/LoyaltyCard" */))
const _1e8608ee = () => interopDefault(import('../pages/MyAccount/MyNewsletter.vue' /* webpackChunkName: "pages/MyAccount/MyNewsletter" */))
const _60a7e6c4 = () => interopDefault(import('../pages/MyAccount/MyProfile.vue' /* webpackChunkName: "pages/MyAccount/MyProfile" */))
const _afaa6f94 = () => interopDefault(import('../pages/MyAccount/MyReviews.vue' /* webpackChunkName: "pages/MyAccount/MyReviews" */))
const _0c69ab62 = () => interopDefault(import('../pages/MyAccount/OrderHistory.vue' /* webpackChunkName: "pages/MyAccount/OrderHistory" */))
const _5ab11e5b = () => interopDefault(import('../pages/MyAccount/ShippingDetails.vue' /* webpackChunkName: "pages/MyAccount/ShippingDetails" */))
const _5cadd2a4 = () => interopDefault(import('../pages/Product.vue' /* webpackChunkName: "pages/Product" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Category",
    component: _189bb199,
    name: "Category___en"
  }, {
    path: "/checkout",
    component: _5662dde1,
    name: "checkout___en",
    children: [{
      path: "billing",
      component: _3a2a13a6,
      name: "billing___en"
    }, {
      path: "payment",
      component: _fccb6f90,
      name: "payment___en"
    }, {
      path: "shipping",
      component: _8ba3f428,
      name: "shipping___en"
    }, {
      path: "thank-you",
      component: _b8885cda,
      name: "thank-you___en"
    }]
  }, {
    path: "/Checkout",
    component: _5662dde1,
    name: "Checkout___en",
    children: [{
      path: "Billing",
      component: _3a2a13a6,
      name: "Checkout-Billing___en"
    }, {
      path: "Payment",
      component: _fccb6f90,
      name: "Checkout-Payment___en"
    }, {
      path: "Shipping",
      component: _8ba3f428,
      name: "Checkout-Shipping___en"
    }, {
      path: "ThankYou",
      component: _b8885cda,
      name: "Checkout-ThankYou___en"
    }]
  }, {
    path: "/de",
    component: _3b080a7a,
    name: "home___de"
  }, {
    path: "/Home",
    component: _3b080a7a,
    name: "Home___en"
  }, {
    path: "/MyAccount",
    component: _9dd9b754,
    name: "MyAccount___en",
    children: [{
      path: "BillingDetails",
      component: _3f513770,
      name: "MyAccount-BillingDetails___en"
    }, {
      path: "LoyaltyCard",
      component: _37d3e09d,
      name: "MyAccount-LoyaltyCard___en"
    }, {
      path: "MyNewsletter",
      component: _1e8608ee,
      name: "MyAccount-MyNewsletter___en"
    }, {
      path: "MyProfile",
      component: _60a7e6c4,
      name: "MyAccount-MyProfile___en"
    }, {
      path: "MyReviews",
      component: _afaa6f94,
      name: "MyAccount-MyReviews___en"
    }, {
      path: "OrderHistory",
      component: _0c69ab62,
      name: "MyAccount-OrderHistory___en"
    }, {
      path: "ShippingDetails",
      component: _5ab11e5b,
      name: "MyAccount-ShippingDetails___en"
    }]
  }, {
    path: "/Product",
    component: _5cadd2a4,
    name: "Product___en"
  }, {
    path: "/de/Category",
    component: _189bb199,
    name: "Category___de"
  }, {
    path: "/de/checkout",
    component: _5662dde1,
    name: "checkout___de",
    children: [{
      path: "billing",
      component: _3a2a13a6,
      name: "billing___de"
    }, {
      path: "payment",
      component: _fccb6f90,
      name: "payment___de"
    }, {
      path: "shipping",
      component: _8ba3f428,
      name: "shipping___de"
    }, {
      path: "thank-you",
      component: _b8885cda,
      name: "thank-you___de"
    }]
  }, {
    path: "/de/Checkout",
    component: _5662dde1,
    name: "Checkout___de",
    children: [{
      path: "Billing",
      component: _3a2a13a6,
      name: "Checkout-Billing___de"
    }, {
      path: "Payment",
      component: _fccb6f90,
      name: "Checkout-Payment___de"
    }, {
      path: "Shipping",
      component: _8ba3f428,
      name: "Checkout-Shipping___de"
    }, {
      path: "ThankYou",
      component: _b8885cda,
      name: "Checkout-ThankYou___de"
    }]
  }, {
    path: "/de/Home",
    component: _3b080a7a,
    name: "Home___de"
  }, {
    path: "/de/MyAccount",
    component: _9dd9b754,
    name: "MyAccount___de",
    children: [{
      path: "BillingDetails",
      component: _3f513770,
      name: "MyAccount-BillingDetails___de"
    }, {
      path: "LoyaltyCard",
      component: _37d3e09d,
      name: "MyAccount-LoyaltyCard___de"
    }, {
      path: "MyNewsletter",
      component: _1e8608ee,
      name: "MyAccount-MyNewsletter___de"
    }, {
      path: "MyProfile",
      component: _60a7e6c4,
      name: "MyAccount-MyProfile___de"
    }, {
      path: "MyReviews",
      component: _afaa6f94,
      name: "MyAccount-MyReviews___de"
    }, {
      path: "OrderHistory",
      component: _0c69ab62,
      name: "MyAccount-OrderHistory___de"
    }, {
      path: "ShippingDetails",
      component: _5ab11e5b,
      name: "MyAccount-ShippingDetails___de"
    }]
  }, {
    path: "/de/Product",
    component: _5cadd2a4,
    name: "Product___de"
  }, {
    path: "/de/my-account/:pageName?",
    component: _9dd9b754,
    name: "my-account___de"
  }, {
    path: "/de/p/:id/:slug",
    component: _5cadd2a4,
    name: "product___de"
  }, {
    path: "/de/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?",
    component: _189bb199,
    name: "category___de"
  }, {
    path: "/my-account/:pageName?",
    component: _9dd9b754,
    name: "my-account___en"
  }, {
    path: "/p/:id/:slug",
    component: _5cadd2a4,
    name: "product___en"
  }, {
    path: "/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?",
    component: _189bb199,
    name: "category___en"
  }, {
    path: "/",
    component: _3b080a7a,
    name: "home___en"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
