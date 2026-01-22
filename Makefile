# StacksLend Frontend Development Makefile

.PHONY: help install dev build start lint clean docker-build docker-run docker-stop docker-clean setup env-setup info

help: ## Show this help message
	@echo "StacksLend Frontend Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

dev: ## Start dev server
	npm run dev

build: ## Build app
	npm run build

start: ## Start production server
	npm run start

lint: ## Lint code
	npm run lint

clean: ## Clean build artifacts
	rm -rf .next out node_modules/.cache

docker-build: ## Build Docker image
	docker build -t stackslend-frontend .

docker-run: ## Run Docker image
	docker run -it --rm -p 3000:3000 stackslend-frontend

docker-stop: ## No-op placeholder
	@echo "Nothing to stop."

docker-clean: ## Clean docker image
	docker rmi -f stackslend-frontend || true

setup: install ## Setup development environment
	@echo "Setup complete."

env-setup: ## Create .env template
	@echo "Creating .env file..."
	@echo "# StacksLend Frontend env" > .env
	@echo "NEXT_PUBLIC_APP_NAME=StacksLend" >> .env
	@echo "NEXT_PUBLIC_STACKS_NETWORK=mainnet" >> .env

info: ## Show project information
	@echo "StacksLend Frontend - Next.js"
	@echo "Framework: Next.js"
	@echo "Wallet: Stacks Connect"