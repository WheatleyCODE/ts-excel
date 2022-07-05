import { waxios } from '@waxios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const $api = waxios.create({
  baseUrl: API_URL,
  locate: 'client'
});
