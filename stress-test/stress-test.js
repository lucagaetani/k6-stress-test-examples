/**
 * What is this?
 * 
 * It's a stress test made with Grafana k6 and xk6. I used it to test concurrency on Bookings' REST API
 * It needs a k6 executable in the same directory (stress-test) as the script to run it
 */

import http from 'k6/http';
import { check } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { handleSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';


export const options = {
  stages: [
    { duration: '10s', target: 200 },
    { duration: '5s', target: 200 },
    { duration: '3s', target: 0 },
  ],
};

export default function () {
  const randomUUID = uuidv4();

  const url = 'http://localhost:3000/bookings/insertBookings';

  const payload = JSON.stringify({
    email: `${randomUUID}@test.com`,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'Status is 200': (r) => r.status === 200,
  });
}