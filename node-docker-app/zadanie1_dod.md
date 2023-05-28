# NodeJS + Docker

Aplikację można zbudować dla trzech platform sprzętowych: `linux/arm/v7`, `linux/arm64/v8` i `linux/amd64` przy użyciu wbudowanego sterownika QEMU w Docker Desktop.

Obraz powinien zostać wypchnięty do repozytorium [`dawid10/nodeapp`](https://hub.docker.com/r/dawid11/nodeapp/tags) w DockerHub.

Wykorzystany został cache typu `inline`, to znaczy, że dołączany jest on do wybudowanego obrazu. Pomaga to osobom po raz pierwszy budujący obraz w szybszym zbudowaniu go.

Jeśli nie została jeszcze stworzona instancja `buildx`, wykonać:

```
$ docker buildx create --use
```

Obraz buduje się to przy pomocy komendy:


```
$ docker buildx build -t dawid11/nodeapp:1.0.0 . --platform linux/arm/v7,linux/arm64/v8,linux/amd64 --push --cache-to type=inline --cache-from type=registry,ref=dawid11/nodeapp:1.0.0
```

```log
[+] Building 18.9s (43/43) FINISHED                                                                                                                                                                                             
 => [internal] booting buildkit                                                                                                                                                                                            1.9s
 => => pulling image moby/buildkit:buildx-stable-1                                                                                                                                                                         1.4s
 => => creating container buildx_buildkit_eloquent_pike0                                                                                                                                                                   0.5s
 => [internal] load .dockerignore                                                                                                                                                                                          0.1s
 => => transferring context: 59B                                                                                                                                                                                           0.0s
 => [internal] load build definition from Dockerfile                                                                                                                                                                       0.1s
 => => transferring dockerfile: 361B                                                                                                                                                                                       0.0s
 => resolve image config for docker.io/docker/dockerfile:1                                                                                                                                                                 1.9s
 => [auth] docker/dockerfile:pull token for registry-1.docker.io                                                                                                                                                           0.0s
 => docker-image://docker.io/docker/dockerfile:1@sha256:39b85bbfa7536a5feceb7372a0817649ecb2724562a38360f4d6a7782a409b14                                                                                                   1.8s
 => => resolve docker.io/docker/dockerfile:1@sha256:39b85bbfa7536a5feceb7372a0817649ecb2724562a38360f4d6a7782a409b14                                                                                                       0.0s
 => => sha256:a47ff7046597eea0123ea02817165350e3680f75000dc5d69c9a310258e1bedd 11.55MB / 11.55MB                                                                                                                           1.7s
 => => extracting sha256:a47ff7046597eea0123ea02817165350e3680f75000dc5d69c9a310258e1bedd                                                                                                                                  0.1s
 => [linux/amd64 internal] load metadata for docker.io/library/node:18-alpine                                                                                                                                              4.0s
 => [linux/arm64 internal] load metadata for docker.io/library/node:18-alpine                                                                                                                                              3.7s
 => [linux/arm/v7 internal] load metadata for docker.io/library/node:18-alpine                                                                                                                                             3.7s
 => [auth] library/node:pull token for registry-1.docker.io                                                                                                                                                                0.0s
 => importing cache manifest from dawid11/nodeapp:1.0.0                                                                                                                                                                    2.6s
 => [internal] load build context                                                                                                                                                                                          0.1s
 => => transferring context: 32.82kB                                                                                                                                                                                       0.0s
 => [linux/arm64 build 1/6] FROM docker.io/library/node:18-alpine@sha256:1ccc70acda680aa4ba47f53e7c40b2d4d6892de74817128e0662d32647dd7f4d                                                                                  0.0s
 => => resolve docker.io/library/node:18-alpine@sha256:1ccc70acda680aa4ba47f53e7c40b2d4d6892de74817128e0662d32647dd7f4d                                                                                                    0.0s
 => [linux/amd64 build 1/6] FROM docker.io/library/node:18-alpine@sha256:1ccc70acda680aa4ba47f53e7c40b2d4d6892de74817128e0662d32647dd7f4d                                                                                  0.0s
 => => resolve docker.io/library/node:18-alpine@sha256:1ccc70acda680aa4ba47f53e7c40b2d4d6892de74817128e0662d32647dd7f4d                                                                                                    0.0s
 => [linux/arm/v7 build 1/6] FROM docker.io/library/node:18-alpine@sha256:1ccc70acda680aa4ba47f53e7c40b2d4d6892de74817128e0662d32647dd7f4d                                                                                 0.0s
 => => resolve docker.io/library/node:18-alpine@sha256:1ccc70acda680aa4ba47f53e7c40b2d4d6892de74817128e0662d32647dd7f4d                                                                                                    0.0s
 => [auth] dawid11/nodeapp:pull token for registry-1.docker.io                                                                                                                                                             0.0s
 => CACHED [linux/arm64 stage-1 2/4] WORKDIR /usr/local/app                                                                                                                                                                0.0s
 => CACHED [linux/arm64 build 2/6] COPY package*.json ./                                                                                                                                                                   0.0s
 => CACHED [linux/arm64 build 3/6] RUN npm install                                                                                                                                                                         0.0s
 => CACHED [linux/arm64 build 4/6] COPY tsconfig.json ./                                                                                                                                                                   0.0s
 => CACHED [linux/arm64 build 5/6] COPY src ./src                                                                                                                                                                          0.0s
 => CACHED [linux/arm64 build 6/6] RUN npm run build                                                                                                                                                                       0.0s
 => CACHED [linux/arm64 stage-1 3/4] COPY --from=build node_modules ./node_modules                                                                                                                                         0.0s
 => CACHED [linux/arm64 stage-1 4/4] COPY --from=build dist ./dist                                                                                                                                                         0.5s
 => CACHED [linux/amd64 stage-1 2/4] WORKDIR /usr/local/app                                                                                                                                                                0.0s
 => CACHED [linux/amd64 build 2/6] COPY package*.json ./                                                                                                                                                                   0.0s
 => CACHED [linux/amd64 build 3/6] RUN npm install                                                                                                                                                                         0.0s
 => CACHED [linux/amd64 build 4/6] COPY tsconfig.json ./                                                                                                                                                                   0.0s
 => CACHED [linux/amd64 build 5/6] COPY src ./src                                                                                                                                                                          0.0s
 => CACHED [linux/amd64 build 6/6] RUN npm run build                                                                                                                                                                       0.0s
 => CACHED [linux/amd64 stage-1 3/4] COPY --from=build node_modules ./node_modules                                                                                                                                         0.0s
 => CACHED [linux/amd64 stage-1 4/4] COPY --from=build dist ./dist                                                                                                                                                         0.5s
 => CACHED [linux/arm/v7 stage-1 2/4] WORKDIR /usr/local/app                                                                                                                                                               0.0s
 => CACHED [linux/arm/v7 build 2/6] COPY package*.json ./                                                                                                                                                                  0.0s
 => CACHED [linux/arm/v7 build 3/6] RUN npm install                                                                                                                                                                        0.0s
 => CACHED [linux/arm/v7 build 4/6] COPY tsconfig.json ./                                                                                                                                                                  0.0s
 => CACHED [linux/arm/v7 build 5/6] COPY src ./src                                                                                                                                                                         0.0s
 => CACHED [linux/arm/v7 build 6/6] RUN npm run build                                                                                                                                                                      0.0s
 => CACHED [linux/arm/v7 stage-1 3/4] COPY --from=build node_modules ./node_modules                                                                                                                                        0.0s
 => CACHED [linux/arm/v7 stage-1 4/4] COPY --from=build dist ./dist                                                                                                                                                        0.5s
 => preparing layers for inline cache                                                                                                                                                                                      0.1s
 => exporting to image                                                                                                                                                                                                     5.8s
 => => exporting layers                                                                                                                                                                                                    0.0s
 => => exporting manifest sha256:6247ef69da60051f1bc6f590b69859d547977f321c6e36c70d7784596c08643d                                                                                                                          0.0s
 => => exporting config sha256:e9d0bb186d0b63813ae06d0254ac3d8d3ed1760726bb96c7456c3c7d2e1451b8                                                                                                                            0.0s
 => => exporting attestation manifest sha256:efddaae21d2e2b39535ba5891ec4ca02e54d2c5e80bb9ea98f4bf5bc9dbd9871                                                                                                              0.0s
 => => exporting manifest sha256:81d7833be0abb9c9b012627dfd936d536cd359fae2c61b43857a67284dc52395                                                                                                                          0.0s
 => => exporting config sha256:0740b6b3ee43b275ca5dd529c525979c1bbaa95e77d3d65e5ffa2752bb81f0ae                                                                                                                            0.0s
 => => exporting attestation manifest sha256:b97c53515aa07ec1aaf00f45a5a8b0a108ca6b8a4baef126a376a0dac4e9e67c                                                                                                              0.0s
 => => exporting manifest sha256:47833a292edc17f06100710ced67ee9181088d933455e2d8b4719a3b1a6d09a8                                                                                                                          0.0s
 => => exporting config sha256:c0c8fce6a6df925d79ea502d53da611f96e7998df45987c6878d50197b04515a                                                                                                                            0.0s
 => => exporting attestation manifest sha256:ca1076a7f8dc956ee0db4b4bf69ffcfc4847b5306ae0244eb43eb465a5b9184a                                                                                                              0.0s
 => => exporting manifest list sha256:2f390a38e6bbba4c2e13b96843e88a00f959ee0f935ac181cbb77a50ac8c8997                                                                                                                     0.0s
 => => pushing layers                                                                                                                                                                                                      2.8s
 => => pushing manifest for docker.io/dawid11/nodeapp:1.0.0@sha256:2f390a38e6bbba4c2e13b96843e88a00f959ee0f935ac181cbb77a50ac8c8997                                                                                        2.6s
 => [auth] dawid11/nodeapp:pull,push token for registry-1.docker.io                                                                                                                                                        0.0s
```
