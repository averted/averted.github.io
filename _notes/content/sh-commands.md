+++
title = "Useful shell commands"
date = 2018-08-01

[taxonomies]
tags = ["shell"]
+++

### Remove metadata from file
```
ls -la
-rw-r--r--@     1 user  staff   286B Jan 18  2021 some-file

xattr -c some-file

ls -la
-rw-r--r--      1 user  staff   286B Jan 18  2021 some-file
```

<!--more-->

### Chmod

Default permission:
```
chmod 755 # DIR     -rwxr-xr-x
chmod 644 # FILE    -rw-r--r--
```

Change all directories to `755`:

```
find . -type d -exec chmod 755 {} \;
```

Change all files to `644` under current directory:

```
find . -type f -exec chmod 644 {} \;
```

### Rename Multiple

```
for i in *.js; do mv "$i" "./${i/pattern/replace}"; done
```

Example:

```
Rename list of files from:
  ic-one.svg -> one.svg
  ic-two.svg -> two.svg
  ic-three.svg -> three.svg

for i in *.svg; do mv "$i" "./${i/ic-//}"; done
```
