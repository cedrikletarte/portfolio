## Getting Started


### 1. Clone the repository

Clone this project to your local machine:

```bash
git clone ssh://git@192.168.2.100:2424/cedrik/portfolio.git
```

### 2. Install dependencies

Install all required dependencies (this will create the `node_modules` folder):

```bash
npm install
```

### 3. Run the development server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Installation

To automatically install all libraries listed in `requirements.txt`, run the following command in PowerShell at the root of the project:

```powershell
Get-Content requirements.txt | ForEach-Object { npm install $_ }
```

This will install each dependency listed in the file.
