+++
title = "Vim Buffers"
date = 2016-11-06

[taxonomies]
tags = ["vim"]
+++

### Navigation
Navigate through buffers:

```
:next | :n | ]]
:prev | :p | [[
```

### Open all files returned from `grep`
```
vim $(grep -lri 'pattern' .)
```

<!-- more -->

### Search and replace multiple files
Open multiple files into buffers:

```
vim ./*.js
```

run:

```
:bufdo %s/pattern/replace/ge  [| update]
```

`update` flag is optional if you have 'set hidden' vim flag enabled.

The same can be accomplished with `arglist` without loading files into buffers.

First add files to `arglist`:

```
:argadd *.js
```

Then replace with:

```
:argdo %s/foo/bar/ge
```
