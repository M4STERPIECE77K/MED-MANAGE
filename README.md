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

## 🚀 Getting Started (Local PC, Windows/PowerShell)

### 1. Prerequisites
- Docker Desktop installed and running.
- `kubectl` already available.

### 2. Install Helm, kind, and Argo CD CLI (local user bin)
```powershell
$bin = "$env:USERPROFILE\bin"
New-Item -ItemType Directory -Force $bin | Out-Null

# Helm
Invoke-WebRequest -Uri "https://get.helm.sh/helm-v3.16.2-windows-amd64.zip" -OutFile "$env:TEMP\helm.zip"
Expand-Archive -Force "$env:TEMP\helm.zip" "$env:TEMP\helm"
Move-Item "$env:TEMP\helm\windows-amd64\helm.exe" "$bin\helm.exe" -Force

# kind
Invoke-WebRequest -Uri "https://kind.sigs.k8s.io/dl/v0.24.0/kind-windows-amd64" -OutFile "$bin\kind.exe"

# Argo CD CLI
Invoke-WebRequest -Uri "https://github.com/argoproj/argo-cd/releases/download/v2.12.6/argocd-windows-amd64.exe" -OutFile "$bin\argocd.exe"

# Add user bin to PATH
$env:Path = "$bin;$env:Path"
$userPath = [Environment]::GetEnvironmentVariable("Path","User")
if (-not $userPath) { $userPath = "" }
if ($userPath -notlike "*$bin*") { [Environment]::SetEnvironmentVariable("Path", "$bin;$userPath", "User") }
```

### 3. Create a local cluster (kind)
```powershell
$env:Path = "$env:USERPROFILE\bin;$env:Path"
kind create cluster --name rdv-cluster
```

### 4. Install Argo CD
```powershell
kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml --server-side --force-conflicts
```

### 5. Build images locally (from repo root)
```powershell
docker build -t rdv-fastapi-backend:latest "D:\FREELANCE\inventory-management\MED-MANAGE\backend\fastapi"
docker build -t rdv-spring-backend:latest "D:\FREELANCE\inventory-management\MED-MANAGE\backend\spring-boot"
```

### 6. Load images into kind
```powershell
$env:Path = "$env:USERPROFILE\bin;$env:Path"
kind load docker-image rdv-fastapi-backend:latest --name rdv-cluster
kind load docker-image rdv-spring-backend:latest --name rdv-cluster
```

### 7. Create secrets and deploy the stack
```powershell
kubectl create secret generic rdv-secrets \
  --from-literal=db-user=masterpiece \
  --from-literal=db-password=rdv_password \
  --from-literal=db-name=rdv_db \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl apply -f backend/k8s/postgres.yaml
kubectl apply -f backend/k8s/fastapi.yaml
kubectl apply -f backend/k8s/spring-boot.yaml
```

### 8. Wait for pods to be ready
```powershell
kubectl rollout status deployment/rdv-db --timeout=300s
kubectl rollout status deployment/rdv-fastapi-backend --timeout=300s
kubectl rollout status deployment/rdv-spring-backend --timeout=300s
```

### 9. Access services (local port-forward)
```powershell
kubectl port-forward svc/argocd-server -n argocd 8081:443
kubectl port-forward svc/rdv-fastapi-backend 8000:8000
kubectl port-forward svc/rdv-spring-backend 8080:8080
```

---

## 🐙 ArgoCD Setup (GitOps)

### 1. Installation
Install ArgoCD using server-side apply to avoid annotation size limits:
```powershell
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml --server-side --force-conflicts
```

### 2. Accessing the UI
- **Port Forwarding**:
  ```powershell
  kubectl port-forward svc/argocd-server -n argocd 8081:443
  ```
- **Login Credentials**:
  - **URL**: `https://localhost:8081`
  - **Username**: `admin`
  - **Password**: Retrieve it using:
    ```powershell
    $pwd = kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}";
    [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($pwd))
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
```powershell
# Check all pods in the project
kubectl get pods -n rdv

# Check ArgoCD pods in real-time
kubectl get pods -n argocd -w

# Check deployment rollout
kubectl rollout status deployment/rdv-db -n rdv
```
