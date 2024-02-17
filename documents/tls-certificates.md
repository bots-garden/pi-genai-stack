# Add a TLS certificate to a development environment

Update the `*.env` files with the name of the certificate and the key:

For example:
```
TLS_CERT=hal.genai-stack.ninja.crt
TLS_CERT_KEY=hal.genai-stack.ninja.key
```

- Copy the certificate and the key to the `./certs` folder of the development environment (ex: `python-dev-environment/certs`)
- Give the appropriates rights to the files: `chmod 777 hal.genai-stack.ninja.*`
- Add this to your hosts file: 
  - if you work locally: `0.0.0.0 hal.genai-stack.ninja`
  - if you work remotely: `<ip address of the pi> hal.genai-stack.ninja`
- Use this entrypoint in the `app.yaml` file: `entrypoint: ["code-server", "--cert", "/python-dev-environment/certs/${TLS_CERT}", "--cert-key", "/python-dev-environment/certs/${TLS_CERT_KEY}", "--auth", "none", "--host", "0.0.0.0", "--port", "${PYTHON_APP_TPL_HTTP_PORT}", "/python-dev-environment/workspace"]`

open https://hal.genai-stack.ninja:3000

### Use Mkcert to generate your own certificates

> ✋ **this methods will only work if you work locally**

Install [mkcert](https://github.com/FiloSottile/mkcert)

> On macOS: `brew install mkcert`

#### Create your own certificate authority and public key infrastructure

```bash
# just once
# Install a new local CA in the system trust store
mkcert -install
```

#### Generate certificate

```bash
cd certs
mkcert \
-cert-file hal.personal.cloud.crt \
-key-file hal.personal.cloud.key \
personal.cloud "*.personal.cloud" localhost 127.0.0.1 ::1
```

#### Update hosts file

```bash
0.0.0.0 hal.personal.cloud
```
> the URL will be https://hal.personal.cloud:3000
