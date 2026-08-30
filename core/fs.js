class FSNode {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
}

export class File extends FSNode {
  constructor(name, contents) {
    super(name, "file");
    this.contents = contents;
  }
}

export class Directory extends FSNode {
  constructor(name) {
    super(name, "directory");
    this.children = new Map();
  }
}

class FileSystem {
  constructor() {
    this.root = new Directory("/");
  }

  resolve(path) {
    const parts = path.split("/").filter(Boolean);
    let current = this.root;

    for (const part of parts) {
      if (!(current instanceof Directory)) {
        return null;
      }

      current = current.children.get(part);

      if (!current) {
        return null;
      }
    }

    return current;
  }

  mkdir(path) {
    const parts = path.split("/").filter(Boolean);
    let current = this.root;

    for (const part of parts) {
      if (!current.children.has(part))
        current.children.set(part, new Directory(part));

      current = current.children.get(part);
    }
  }

  touch(path) {
    const parts = path.split("/").filter(Boolean);
    const filename = parts.pop();
    const dir = this.resolve("/" + parts.join("/"));

    dir.children.set(filename, new File(filename, ""));
  }

  readFile(path) {
    const file = this.resolve(path);
    if (!(file instanceof File)) {
      console.error("not a file!");
      return;
    }

    return file.contents;
  }

  writeFile(path, contents) {
    const file = this.resolve(path);
    if (!(file instanceof File)) {
      console.error("not a file!");
      return;
    }

    file.contents = contents;
  }

  ls(path) {
    const dir = this.resolve(path);
    if (!(dir instanceof Directory)) {
      console.error("not a directory!");
      return;
    }

    return [...dir.children.keys()];
  }

  // more comprehensive ls
  listDir(path) {
    const dir = this.resolve(path);
    if (!(dir instanceof Directory)) {
      console.error("not a directory!");
      return;
    }

    let dir_list = [];

    Array.from(dir.children.keys()).forEach((e) => {
      let file_object = fs.resolve(path + "/" + e);
      dir_list.push({
        name: file_object.name,
        type: file_object.type
      })
    })

    return dir_list;
  }

  // converts relative path to absolute path
  // e.g. starting from "/bin", "../home" -> "/home"
  resolvePath(currentdir, path) {
    if (path.startsWith("/"))
      return path;

    if (path === "~")
      return "/home/anon";

    if (path.startsWith("~/"))
      return "/home/anon" + path.slice(2);

    const stack = currentdir.split("/").filter(Boolean);

    for (const part of path.split("/")) {
      if (part === "" || part === ".")
        continue;

      if (part === "..") {
        if (stack.length)
          stack.pop();
      } else {
        stack.push(part);
      }
    }
    return "/" + stack.join("/");
  }
}

export var fs = new FileSystem();

// sets up the filesystem with a basic fileset
export function initFilesystem() {
  console.log("[filesystem] initialising filesystem...");

  fs.mkdir("/boot");
  fs.mkdir("/dev");
  fs.mkdir("/etc");
  fs.mkdir("/usr/bin");
  fs.mkdir("/home/anon");
  fs.touch("/home/anon/README.txt");
  fs.writeFile("/home/anon/README.txt", "congrats! you found the *secret*");

  loadCmdsNames();
}

function loadCmdsNames() {
  fs.touch("/usr/bin/cat");
  fs.touch("/usr/bin/shell");
  fs.touch("/usr/bin/fetch");
}
