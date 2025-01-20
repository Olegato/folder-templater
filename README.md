# folder-templater

**folder-templater** is a tool for creating folder and file structures in the web and generating a script that can be executed on a local machine to recreate that structure. It’s a simple tool that helps automate the creation of files and folders based on a JSON structure.

### Features

- Creates folder and file structures of any depth.
- Generates scripts for creating files and folders.
    - For Unix-like systems (Linux/macOS), it uses the `mkdir -p` command for directories and `touch` for files.
    - For Windows, it uses the `mkdir` command for directories and `echo. >` to create files.
- Easily customizable for different operating systems.
- Intuitive web interface for creating folder structures directly in the browser.

