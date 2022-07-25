Jan 12, 2014
___

### Restore Version
Restore a version of a file to the one before commit `h0a0s0h` (~1 for 1 above version):

```
git checkout h0a0s0h~1 -- file1/to/restore file2/to/restore
```

### Checkout from specific branch
Example - if your current branch is `feature/123`, and you're rebasing it on top of `master`:

```
git checkout feature/123
git rebase master
```

and run into conflicts on some file (`src/some/file.js`), you can revert this file to `master`'s version with:

```
git checkout master -- src/some/file.js
```

or use `ours` and `theirs` aliases:

```
git checkout --ours src/some/file.js
git checkout --theirs src/some/file.js
```

### Diff between branches
Show difference between HEAD and specific branch:

```
git diff master src/some/file.js
```
