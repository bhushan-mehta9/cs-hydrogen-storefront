import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';
import {GOOGLE_FONTS_CSP} from './lib/googleFontsCsp';
import {resolveCheckoutDomain, normalizeShopHost} from './lib/shopifyEnv';

/**
 * @param {Env} env
 * @returns {string[]}
 */
function getCatalogSenseConnectOrigins(env) {
  if (!env.PUBLIC_CATALOGSENSE_PUBLISHABLE_KEY?.trim()) return [];

  const raw =
    env.PUBLIC_CATALOGSENSE_API_ORIGIN?.trim() ||
    'https://vapp.catalogsense.com';

  try {
    return [new URL(raw).origin];
  } catch {
    return ['https://vapp.catalogsense.com'];
  }
}

/**
 * @param {Request} request
 * @param {number} responseStatusCode
 * @param {Headers} responseHeaders
 * @param {EntryContext} reactRouterContext
 * @param {HydrogenRouterContextProvider} context
 */
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  reactRouterContext,
  context,
) {
  const catalogSenseConnectOrigins = getCatalogSenseConnectOrigins(
    context.env,
  );

  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: resolveCheckoutDomain(context.env),
      storeDomain: normalizeShopHost(context.env.PUBLIC_STORE_DOMAIN),
    },
    styleSrc: GOOGLE_FONTS_CSP.styleSrc,
    fontSrc: GOOGLE_FONTS_CSP.fontSrc,
    ...(catalogSenseConnectOrigins.length
      ? {connectSrc: catalogSenseConnectOrigins}
      : {}),
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

/** @typedef {import('@shopify/hydrogen').HydrogenRouterContextProvider} HydrogenRouterContextProvider */
/** @typedef {import('react-router').EntryContext} EntryContext */
