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
  // login
  const login_url = "http://localhost:8080/api/auth/login";
  const login_payload = JSON.stringify({
    username: "admin",
    password: "@Admin123",
  });

  const login_params = {
    headers: { "Content-Type": "application/json" },
  };

  const login_res = http.post(login_url, login_payload, login_params);

  const token = login_res.json("token");

  check(login_res, {
    "login success": (r) => r.status === 200 && token !== undefined,
  });

  // get products
  const prod_url = "http://localhost:8080/api/products";

  const prod_params = {
    params: {
      page: 0,
      size: 1000,
    },
    headers: { Authorization: `Bearer ${token}` },
  };

  const prod_res = http.get(prod_url, prod_params);

  check(prod_res, {
    "products loaded": (r) => r.status === 200,
  });

  sleep(1);
}
