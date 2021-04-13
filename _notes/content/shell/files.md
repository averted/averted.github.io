_August 1, 2018_
___

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

### Encrypt / Decrypt

Show list of ciphers:

```
openssl list-cipher-commands
```

Encrypt `file.txt` to `file.cryp` using `256-bit AES` in CBC mode:

```
openssl enc -aes-256-cbc -salt -in file.txt -out file.cryp
```

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
