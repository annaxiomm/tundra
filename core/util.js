export function truncateString(string, maxLength) {
  if (string.length > maxLength) {
    return string.substring(0, maxLength) + "...";
  }

  return string;
}

export function truncateDir(dir) {
  if (dir.startsWith("/home/anon")) {
    return immutableReplace(dir, "/home/anon", "~")
  }
  return dir;
}

export function immutableReplace(str, key, value) {
  let tmp = str;
  return tmp.replace(key, value)
}
