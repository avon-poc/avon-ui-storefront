import { mapConfigToSetupObject, CT_TOKEN_COOKIE_NAME } from '@vue-storefront/commercetools/nuxt/helpers'
import { integrationPlugin } from '@vue-storefront/core'

const moduleOptions = {"i18n":{"useNuxtI18nConfig":true},"locale":"en","currency":"GBP","country":"GB","acceptLanguage":["en","de"],"countries":[{"name":"US","label":"United States"},{"name":"AT","label":"Austria"},{"name":"DE","label":"Germany"},{"name":"NL","label":"Netherlands"},{"name":"GB","label":"United Kingdom"}],"currencies":[{"name":"GBP","label":"Pound"},{"name":"EUR","label":"Euro"}],"locales":[{"name":"en","label":"English"},{"name":"de","label":"German"}]};

export default integrationPlugin(({ app, integration }) => {
  const onTokenChange = (newToken) => {
    try {
      const currentToken = app.$cookies.get(CT_TOKEN_COOKIE_NAME);

      if (!currentToken || currentToken.access_token !== newToken.access_token) {
        app.$cookies.set(CT_TOKEN_COOKIE_NAME, newToken);
      }
    } catch (e) {
      // Cookies on is set after request has sent.
    }
  };

  const onTokenRemove = () => {
    app.$cookies.remove(CT_TOKEN_COOKIE_NAME);
  }

  const onTokenRead = () => {
    return app.$cookies.get(CT_TOKEN_COOKIE_NAME);
  };

  const settings = mapConfigToSetupObject({
    moduleOptions,
    app,
    additionalProperties: {
      auth: {
        onTokenChange,
        onTokenRead,
        onTokenRemove
      }
    }
  })

  integration.configure('ct', settings)
});
