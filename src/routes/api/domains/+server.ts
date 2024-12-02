// import { json } from '@sveltejs/kit';
// import type { RequestHandler } from '@sveltejs/kit';
// import { domainData } from '$lib/data/tasks';
//
// // 에러 처리 없이 간단하게 구현
//
// // GET 요청 핸들러
// export const GET: RequestHandler = async () => {
//   return json(domainData, { status: 200 });
// };
//
// // POST 요청 핸들러
// export const POST: RequestHandler = async ( { request } ) => {
//   const { name, category, description, link, hashtags } = await request.json();
//
//   // 가장 큰 ID 찾은 뒤 +1
//   const maxId = domainData.length > 0 ? Math.max(...domainData.map(task => task.id)) : 0;
//   const newId = maxId + 1;
//
//   const newTask = { id: newId, name, category, description, link, hashtags };
//
//   // 기존 데이터에 추가
//   domainData.push(newTask);
//
//   // 응답으로 새로운 작업 반환
//   return new Response(JSON.stringify(newTask), { status: 201 });
// }
//
// // DELETE 요청 핸들러
// export const DELETE: RequestHandler = async ({ request }) => {
//   const idsToDelete: number[] = await request.json();
//
//   // 해당 ID를 가진 요소 삭제 - 역순 순회 splice
//   for (let i = domainData.length - 1; i >= 0; i--) {
//     if (idsToDelete.includes(domainData[i].id)) {
//       domainData.splice(i, 1);
//     }
//   }
//
//   return new Response(
//     JSON.stringify({ message: 'Tasks deleted successfully', data: domainData }),
//     { status: 200 }
//   );
// };
