// src/routes/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
  // 현재 URL 경로가 '/'일 때만 리다이렉트
  if (url.pathname === '/') {
    throw redirect(307, '/application');
  }
};
