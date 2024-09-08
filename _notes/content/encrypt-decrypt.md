+++
title = "Encrypt / Decrypt"
date = 2018-08-01

[taxonomies]
tags = ["shell"]
+++

Show list of ciphers:

```
openssl list-cipher-commands
```

Encrypt `file.txt` to `file.cryp` using `256-bit AES` in CBC mode:

```
openssl enc -aes-256-cbc -salt -in file.txt -out file.cryp
```

<!-- more -->

Same as above, only the output is `base64` encoded (for e-mails, etc):

```
openssl enc -aes-256-cbc -a -salt -in file.txt -out file.cryp
```

Decrypt binary `file.cryp`:

```
openssl enc -d -aes-256-cbc -in file.cryp
```

Decrypt base64-encoded version:

```
openssl enc -d -aes-256-cbc -a -in file.cryp
```

