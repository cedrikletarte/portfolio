# 🚀 Portfolio Next.js

A multilingual portfolio built with Next.js, Docker, and CI/CD ready for GitLab Runner.

---

## 🏁 Getting Started

### 1. Clone the repository

Clone this project to your local machine:

```bash
git clone ssh://git@192.168.2.100:2424/cedrik/portfolio.git
cd portfolio
```

### 2. Install dependencies

Install all required dependencies (this will create the `node_modules` folder):

```bash
npm install
```

To automatically install all libraries listed in `requirements.txt`, run the following command at the root of the project:

**PowerShell:**
```powershell
Get-Content requirements.txt | ForEach-Object { npm install $_ }
```

**Bash:**
```bash
xargs -a requirements.txt -n 1 npm install
```

This will install each dependency listed in the file.

### 3. Run the development server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🚀 Manual Deployment

Build a new Docker image for the Next.js app:

```bash
docker build -f portfolio.cloud.Dockerfile -t portfolio-app .
```

Run a container from the new image (with automatic restart):

```bash
docker run -d --restart always -p 3000:3000 --name portfolio-app portfolio-app
```

---

## 🤖 Automatic Deployment (GitLab Runner)

To set up CI/CD with GitLab Runner and Docker, follow these steps:

### 1. Access the GitLab Runner container

```bash
docker exec -it gitlab-runner /bin/bash
```

### 2. Register the runner

```bash
gitlab-runner register --url http://<ip-address-server>:8929 --token <your-token> --docker-network-mode 'host'
```

- **URL**: Use your GitLab instance URL (e.g. `http://gitlab:8929`)
- **Token**: Use the registration token from your GitLab project or group
- **Executor**: Choose `docker`
- **Default Docker image**: `docker:latest`

### 3. Update the runner config for Docker socket access

This allows your CI jobs to build and run Docker containers:

```bash
docker exec gitlab-runner bash -c 'cat > /etc/gitlab-runner/config.toml << '\''EOF'\''
concurrent = 1
check_interval = 0
shutdown_timeout = 0
[session_server]
  session_timeout = 1800
[[runners]]
  name = "docker_runner"
  url = "http://gitlab:8929"
  id = 75
  token = "<your-token>"
  token_obtained_at = 2025-06-21T23:01:30Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"
  [runners.cache]
    MaxUploadedArchiveSize = 0
    [runners.cache.s3]
    [runners.cache.gcs]
    [runners.cache.azure]
  [runners.docker]
    tls_verify = false
    image = "docker:latest"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache"]
    network_mode = "host"
    shm_size = 0
    network_mtu = 0
EOF'
```

---

## 📝 Notes

- Replace `<your-token>` with your actual GitLab runner registration token.
- The Docker socket volume (`/var/run/docker.sock:/var/run/docker.sock`) is required for Docker-in-Docker builds.
- Make sure your runner has network access to your GitLab instance.
- For more information, see the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment) and [GitLab Runner Docs](https://docs.gitlab.com/runner/).