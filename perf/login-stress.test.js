import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    // thời gian và số lượng gọi api
    { duration: "1s", target: 200 },
    { duration: "2s", target: 500 },
    { duration: "2s", target: 8000 },
    { duration: "1s", target: 1200 },
    { duration: "1s", target: 1500 },
    { duration: "1s", target: 2000 },
    { duration: "1s", target: 0 },
  ],
};

export default function () {
  const url = "http://localhost:8080/api/auth/login";
  const payload = JSON.stringify({
    username: "admin",
    password: "@Admin123",
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}
