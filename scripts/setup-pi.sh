#!/usr/bin/env bash
# Raspberry Pi initial setup — installs Node.js LTS and the deploy user.
# Run once on a fresh Raspberry Pi OS Lite install.
# Usage: sudo bash setup-pi.sh
set -euo pipefail

echo "==> Updating system packages"
apt-get update && apt-get upgrade -y

echo "==> Installing prerequisites"
apt-get install -y curl ca-certificates gnupg

echo "==> Installing Node.js LTS via NodeSource"
rm -f /etc/apt/sources.list.d/nodesource.list
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs

echo "Node.js version: $(node --version)"
echo "npm version:     $(npm --version)"

echo "==> Creating deploy user"
if ! id "deploy" &>/dev/null; then
    useradd -m deploy
    mkdir -p /home/deploy/.ssh
    chmod 700 /home/deploy/.ssh
    chown deploy:deploy /home/deploy/.ssh
    echo "Add your deploy public key to /home/deploy/.ssh/authorized_keys"
fi

echo "==> Replacing MOTD"
cat > /etc/motd << 'MOTD'
 ____                                 ____  ___     ____          _
/ ___|  ___ _ ____   _____ _ __      |  _ \|_ _|   / ___|___ _ __| |__  _ __ _   _ ___
\___ \ / _ \ '__\ \ / / _ \ '__|____ | |_) || |   | |   / _ \ '__| '_ \| '__| | | / __|
 ___) |  __/ |   \ V /  __/ |  |____||  __/ | |   | |__|  __/ |  | |_) | |  | |_| \__ \
|____/ \___|_|    \_/ \___|_|        |_|   |___|   \____\___|_|  |_.__/|_|   \__,_|___/

MOTD

echo "==> Setup complete"
echo "Run add-site.sh to configure individual sites."