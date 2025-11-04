export function validatePassword(password) {
  if (!password || password.trim() === "") {
    return "password rong";
  }

  if (password.length < 6) {
    return "password qua ngan";
  }

  if (password.length > 100) {
    return "password qua dai";
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLetter) {
    return "password khong co chu";
  }

  if (!hasNumber) {
    return "password khong co so";
  }

  return "password hop le";
}
