// import { json } from '@sveltejs/kit';
// import type { RequestHandler } from '@sveltejs/kit';
// import { domainData } from '$lib/data/tasks';
//
// const tasks = domainData;
//
// export const GET: RequestHandler = async () => {
//   return json(tasks, { status: 200 });
// };
//
// export const POST: RequestHandler = async ( { request } ) => {
//   const { name, category, description, link, hashtag } = await request.json();
//
//   // 가장 큰 ID를 찾고 +1
//   const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) : 0;
//   const newId = maxId + 1;
//
//   // 새로운 작업 생성
//   const newTask = { id: newId, name, category, description, link, hashtag };
//
//   // 기존 배열에 추가 (또는 데이터베이스에 저장)
//   // @ts-ignore
//   tasks.push(newTask);
//
//   // 응답으로 새로운 작업 반환
//   return new Response(JSON.stringify(newTask), { status: 201 });
// }
//
// export const PATCH: RequestHandler = async ({ request }) => {
//   try {
//     const { id, status, priority, title } = await request.json();
//
//     // id에 해당하는 task 인덱스 찾기
//     let taskIndex = tasks.findIndex(task => task.id === id);
//
//     // 일치하는 id가 없으면 404 반환
//     if (taskIndex === -1) {
//       return json({ error: 'Task not found' }, { status: 404 });
//     }
//
//     // task 업데이트
//     tasks[taskIndex] = {
//       ...tasks[taskIndex],
//       status,
//       priority,
//       title
//     };
//
//     return json({ message: 'Task updated successfully', task: tasks[taskIndex] }, { status: 200 });
//   } catch (error) {
//     return json({ error }, { status: 400 });
//   }
// };
//
// export const DELETE: RequestHandler = async ( { request } ) => {
//   try {
//     const data = await request.json();
//     const ids = Object.keys(data).map(Number).sort((a, b) => b - a);
//     // 키 값으로 배열 정렬, 내림차순 설정
//
//     ids.forEach (id => {
//       tasks.splice(id, 1);
//     })
//
//     return json( tasks , { status: 200 });
//   } catch (error) {
//     return json({ error }, { status: 400 });
//   }
// }