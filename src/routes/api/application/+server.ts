import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { applicationData } from '$lib/data/tasks';

export const GET: RequestHandler = async () => {
  return json(applicationData, { status: 200 });
};