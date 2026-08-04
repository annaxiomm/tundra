class FSNode {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
}

class File extends FSNode {
  constructor(name, contents) {
    super(name, "file");
    this.contents = contents;
  }
}

class Directory extends FSNode {
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
      if (!(current instanceof Directory))
        console.error("not a directory!");

      current = current.children.get(part);

      if (!current)
        console.error("path not found!")
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
}

export var fs = new FileSystem();
