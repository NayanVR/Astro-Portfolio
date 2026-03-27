/// <reference types="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly LISTMONK_HOST_URL: string;
  readonly LISTMONK_LIST_ID: number;
  readonly LISTMONK_USER: string;
  readonly LISTMONK_PASS: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY: string;
  readonly TURNSTILE_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
