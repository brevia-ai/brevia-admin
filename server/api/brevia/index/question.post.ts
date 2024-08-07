import { v4 as uuidv4 } from 'uuid';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.document_id) {
      body.document_id = uuidv4();
    }
    body.content = `${body.title}\n${body.answer}`;
    delete body.title;
    delete body.answer;

    const response: any = await $fetch(apiUrl('/index'), {
      method: 'POST',
      headers: apiHeaders(true),
      body,
    });

    return response;
  } catch (err: any) {
    console.log(err);
    return { error: err?.message || 'Unknown error' };
  }
});
