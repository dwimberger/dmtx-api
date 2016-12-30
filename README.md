# Datamatrix API

Simple API that will encode and decode Datamatrix 2D barcodes.

## Docker

1. Build image `docker build -t dwimberger/dmtx-api .`
2. Run the image using  `docker run -e ... dwimberger/dmtx-api`

## Encode datamatrix code

```
  curl localhost:8080/dmtx/`uuidgen` > test.png
```

## Decode datamatrix code

```
  curl -F "image=@test.png" localhost:8080/dmtx
```

You can set environment variables e.g.:
1. Debug Logs: `-e "DEBUG=app,handler"`