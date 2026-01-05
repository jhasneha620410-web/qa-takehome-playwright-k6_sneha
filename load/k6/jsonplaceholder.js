import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 10 }, // ramp up to 10 VUs
    { duration: '30s', target: 10 }, // hold
    { duration: '15s', target: 0 },  // ramp down
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'],   // <2% errors allowed
    http_req_duration: ['p(95)<500'], // 95% < 500ms
  },
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts/1', {
    tags: { name: 'GET /posts/1' },
    timeout: '10s',
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings && r.timings.duration < 500,
    'has userId': (r) => {
      if (r.status !== 200) return false;
      try {
        const body = r.json(); // k6 built-in JSON parsing
        return body && body.userId !== undefined;
      } catch (e) {
        return false;
      }
    },
  });

  sleep(1);
}
