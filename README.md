# RDV Project - DevOps Infrastructure Documentation

This document describes the Kubernetes-based infrastructure and GitOps workflow for the RDV project.

## 🏗️ Architecture Overview

The infrastructure is built on **Kubernetes** and managed via **ArgoCD** for continuous deployment.

### Components
- **Namespace**: `rdv` (Application) & `argocd` (Management).
- **Database**: PostgreSQL 15 (Alpine).
- **Backend Services**: 
  - FastAPI (Python)
  - Spring Boot (Java)
- **Secrets Management**: Dynamic injection of `.env` variables into Kubernetes Secrets.

---

## 🚀 Getting Started

### 1. Prerequisites
- A running Kubernetes cluster (Kind, Minikube, or Cloud provider).
- `kubectl` CLI installed.
- `base64` and `sed` utilities.

### 2. Namespace Creation
Create the dedicated namespace for the application:
```bash
kubectl apply -f backend/k8s/namespace.yaml
```

### 3. Secrets Configuration
The application uses a secret named `rdv-secrets` injected from the `backend/.env` file. To create it with the correct values:

```bash
kubectl create secret generic rdv-secrets -n rdv \
  --from-literal=db-name=$(grep DB_NAME backend/.env | cut -d'=' -f2) \
  --from-literal=db-user=$(grep DB_USER backend/.env | cut -d'=' -f2) \
  --from-literal=db-password=$(grep DB_PASSWORD backend/.env | cut -d'=' -f2)
```

### 4. Deploying Infrastructure
Apply the manifests in the following order:

```bash
# Database
kubectl apply -f backend/k8s/postgres.yaml

# Backend Services
kubectl apply -f backend/k8s/fastapi.yaml
kubectl apply -f backend/k8s/spring-boot.yaml
```

---

## 🐙 ArgoCD Setup (GitOps)

### 1. Installation
Install ArgoCD using the server-side apply to avoid annotation size limits:
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml --server-side
```

### 2. Accessing the UI
- **Port Forwarding**:
  ```bash
  kubectl port-forward svc/argocd-server -n argocd 8443:443
  ```
- **Login Credentials**:
  - **URL**: `https://localhost:8443`
  - **Username**: `admin`
  - **Password**: Retrieve it using:
    ```bash
    kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
    ```

---

## 🛠️ Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| `path "...postgres.yml" does not exist` | Ensure you use `.yaml` extension (not `.yml`). |
| `rdv-secrets` shows `DATA 0` | The secret was created empty. Delete it and use the `kubectl create secret` command above. |
| Pods stuck in `Pending` | Check if your local cluster has enough resources or if the image pull is slow. |
| ArgoCD CRD invalid (too long) | Always use `--server-side` flag when applying ArgoCD manifests. |

### Monitoring Status
```bash
# Check all pods in the project
kubectl get pods -n rdv

# Check ArgoCD pods in real-time
kubectl get pods -n argocd -w

# Check deployment rollout
kubectl rollout status deployment/rdv-db -n rdv
```
