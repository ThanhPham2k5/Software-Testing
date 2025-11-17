import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    // thời gian và số lượng gọi api
    { duration: "1s", target: 100 },
    { duration: "2s", target: 500 },
    { duration: "2s", target: 1000 },
    { duration: "1s", target: 0 },
  ],
};

export default function () {
  const url = "http://localhost:8080/api/products";

  const res = http.get(url);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}
