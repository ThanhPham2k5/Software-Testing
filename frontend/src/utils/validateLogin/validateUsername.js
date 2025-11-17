export function validateUsername(username) {
  if (!username || username.trim() === "") {
    return "Username cannot be empty.";
  }

  if (username.length < 3) {
    return "Username is too short.";
  }

  if (username.length > 50) {
    return "Username is too long.";
  }

  const validUsernameRegex = /^[a-zA-Z0-9_.-]+$/.test(username);

  if (!validUsernameRegex) {
    return "Special characters allowed are [_.-]";
  }

  return "Username is valid.";
}
