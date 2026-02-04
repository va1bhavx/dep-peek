# dep-peek 

**dep-peek** is a lightweight CLI tool that helps you **peek into your project and identify unused dependencies** by analyzing real import usage in your source code.

This tool is **read-only** and **safe by design** it does **not** remove or modify any dependencies.  
It simply tells you what is *actually used* vs what is *declared*.

> ⚠️ This is **v1** of dep-peek. The focus is correctness and clarity over advanced analysis.

---

## Why dep-peek?

In many projects, dependencies get added over time but never removed.  
Unused dependencies:
- increase bundle size
- slow down installs
- add maintenance overhead
- create security noise

`dep-peek` solves this by **statically analyzing your source files** and comparing real usage against `package.json`.

---

## Features (v1)

- Works with **JavaScript & TypeScript**
- Supports **ESM (`import`) and CommonJS (`require`)**
- Detects **used vs unused dependencies**
- Ignores:
  - relative imports (`./`, `../`)
  - Node.js built-in modules (`fs`, `path`, etc.)
- Handles **scoped packages** (`@babel/parser`)
- Safe, non-destructive, read-only CLI

---

## Installation

### Global install (recommended)
```bash
npm install -g dep-peek
```
## Usage

Run inside your project root:

`dep-peek .` 

Example output:

```
Used dependencies:
- fast-glob
- @babel/parser
- @babel/traverse

Unused dependencies:
- chalk
- commander` 
```

This tells you **exactly** which dependencies are declared but never used.

---

## How it works (high level)

1.  Scans your project source files (`.js`, `.ts`, `.jsx`, `.tsx`)
    
2.  Extracts imports using AST parsing
    
3.  Normalizes and filters valid external packages
    
4.  Compares them with `package.json` dependencies
    
5.  Reports **used vs unused** dependencies

No heuristics. No guesses. Just static analysis.

---
### Limitations (v1)

This version intentionally keeps scope limited:

-   Does **not** analyze `devDependencies`
    
-   Does **not** remove or modify dependencies
    
-   Does **not** handle dynamic imports (`import()` with variables)
    
-   No config file support yet

-  Path aliases (@/) are treated as external imports

-  Framework-managed dependencies (e.g. react-dom in Next.js) may appear as unused

-  CLI tools installed as dependencies may appear unused
    
These are planned improvements.

## Planned features (future versions)

-   🔜 `devDependencies` audit
    
-   🔜 `--json` structured output
    
-   🔜 Better reporting & formatting
    
-   🔜 Performance optimizations for large codebases
    

----------

## Who is this for?

-   Developers who want to **clean up dependency bloat**
    
-   Teams looking for a **safe audit tool**
    
-   CI pipelines that want visibility (future versions)
    
-   Anyone who prefers **clarity over magic**
    

----------

## Author

**Vaibhav Kumar**

-   GitHub: https://github.com/va1bhavx
    
-   Portfolio: [https://kumarvaibhav.xyz](https://kumarvaibhav.xyz)

---
