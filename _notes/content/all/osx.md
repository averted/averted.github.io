---
title: OSX
---

## TN2450 (Remapping Keys)
https://developer.apple.com/library/archive/technotes/tn2450/_index.html

### Remove metadata from file
```
ls -la
-rw-r--r--@     1 user  staff   286B Jan 18  2021 some-file

xattr -c some-file

ls -la
-rw-r--r--      1 user  staff   286B Jan 18  2021 some-file
```
