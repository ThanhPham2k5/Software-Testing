export function validatePassword(password) {
  if (!password || password.trim() === "") {
    return "Password cannot be empty.";
  }

  if (password.length < 6) {
    return "Password is too short.";
  }

  if (password.length > 100) {
    return "Password is too long.";
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLetter) {
    return "Password must have letters.";
  }

  if (!hasNumber) {
    return "Password must have numbers.";
  }

  return "Password is valid.";
}
