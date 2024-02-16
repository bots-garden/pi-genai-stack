#!/bin/bash

# ------------------------------------
# Install Code Server Extensions
# ------------------------------------
code-server --install-extension wesbos.theme-cobalt2
code-server --install-extension PKief.material-icon-theme
code-server --install-extension PKief.material-product-icons
code-server --install-extension aaron-bond.better-comments
code-server --install-extension gitpod.gitpod-theme
code-server --install-extension ms-python.python

pip install --upgrade -r python-dev-environment/workspace/requirements.txt

echo "🌍 open: http://0.0.0.0:${PYTHON_APP_TPL_HTTP_PORT}"
