export function validateUsername(username) {
  if (!username || username.trim() === "") {
    return "username rong";
  }

  if (username.length < 3) {
    return "username qua ngan";
  }

  if (username.length > 50) {
    return "username qua dai";
  }

  const validUsernameRegex = /^[a-zA-Z0-9_.-]+$/.test(username);

  if (!validUsernameRegex) {
    return "ky tu dac biet khong hop le";
  }

  return "username hop le";
}
