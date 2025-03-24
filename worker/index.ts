// @ts-nocheck
addEventListener('fetch', async (event) => {
  event.respondWith(new Response('', { headers: { 'x-skip-request': '' }}))
})