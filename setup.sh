#!/usr/bin/env bash

# StacksLend Frontend Setup Script

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

print_info "Setting up StacksLend Frontend..."

if ! command_exists node; then
  print_warning "Node.js not found. Install Node.js 18+ to run the app."
else
  print_success "Node.js found."
fi

if ! command_exists npm; then
  print_warning "npm not found. Install npm to install dependencies."
else
  npm install
  print_success "Dependencies installed."
fi

if [[ ! -f ".env" ]]; then
  cat > .env << EOF
# StacksLend Frontend env
NEXT_PUBLIC_APP_NAME=StacksLend
NEXT_PUBLIC_STACKS_NETWORK=mainnet
EOF
  print_success ".env created."
else
  print_info ".env already exists."
fi

print_success "Setup complete."
echo ""
print_info "Next steps:"
echo "  1. Run dev server: make dev"
echo "  2. Lint: make lint"
echo "  3. Build: make build"