// import { json } from '@sveltejs/kit';
// import type {RequestHandler} from "@sveltejs/kit";
// import { domainData } from "$lib/data/tasks";
//
// const tasks = domainData;
//
// export const GET: RequestHandler = async ({ params }) => {
//   const { index } = params;
//
//   // @ts-ignore
//   const taskIndex = parseInt(index);
//   if (!isNaN(taskIndex) && taskIndex >= 0 && taskIndex < tasks.length) {
//     return json(tasks[taskIndex], { status: 200 });
//   } else {
//     return json({ error: 'Task not found' }, { status: 404 });
//   }
// };