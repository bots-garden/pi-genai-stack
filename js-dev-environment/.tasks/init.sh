#!/bin/bash

# ------------------------------------
# Install Code Server Extensions
# ------------------------------------
code-server --install-extension wesbos.theme-cobalt2
code-server --install-extension PKief.material-icon-theme
code-server --install-extension PKief.material-product-icons
code-server --install-extension aaron-bond.better-comments
code-server --install-extension gitpod.gitpod-theme

yarn --cwd js-dev-environment install


echo "🌍 open: http://0.0.0.0:${JS_DEV_ENV_HTTP_PORT}"
