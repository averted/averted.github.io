+++
title = "Merge a public PR into your fork"
date = 2025-01-17

[taxonomies]
tags = ["git"]
+++

Merge a public pull request into your own fork:

```sh
~/your-fork $ git remote add pr-source https://github.com/<user-providing-pull-request>/<repo-name>

~/your-fork $ git fetch pr-source

~/your-fork $ git merge pr-source/<pull-request-branch-name>
```
