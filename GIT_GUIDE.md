# 🚀 Git Setup & Push Commands

## Initial Setup (First Time Only)

### 1. Install Git
```bash
# Check if git is installed
git --version

# If not installed, download from: https://git-scm.com/
```

### 2. Configure Git (Replace with your info)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `taskly` (or any name)
3. Description: "Premium Task Tracker with Streak Analytics"
4. Choose Public or Private
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

## Push to GitHub

### Option 1: New Repository (First Push)
```bash
# Navigate to your project folder
cd /path/to/your/taskly

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Taskly v1.0.0"

# Add remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option 2: Existing Repository (Updates)
```bash
# Check status
git status

# Add changed files
git add .

# Commit with message
git commit -m "Update: Your changes description"

# Push changes
git push
```

## Common Git Commands

### Check Status
```bash
git status                  # See what changed
git log                     # View commit history
git log --oneline          # Compact commit history
```

### Add Files
```bash
git add .                   # Add all files
git add index.html         # Add specific file
git add *.js               # Add all JS files
```

### Commit
```bash
git commit -m "Your message"              # Commit with message
git commit -m "Fix: Bug in streak logic"  # Good commit message
```

### Push & Pull
```bash
git push                    # Push to remote
git pull                    # Pull from remote
git push origin main       # Push to specific branch
```

### Branching
```bash
git branch                  # List branches
git branch feature-name    # Create new branch
git checkout feature-name  # Switch to branch
git checkout -b new-branch # Create and switch
git merge feature-name     # Merge branch
```

### Undo Changes
```bash
git checkout -- file.txt   # Discard changes in file
git reset HEAD file.txt    # Unstage file
git reset --soft HEAD~1    # Undo last commit (keep changes)
git reset --hard HEAD~1    # Undo last commit (lose changes)
```

### View Differences
```bash
git diff                    # Show changes
git diff file.txt          # Show changes in specific file
```

## Commit Message Best Practices

### Format
```
<type>: <description>

[optional body]
[optional footer]
```

### Types
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks

### Examples
```bash
git commit -m "feat: Add calendar heatmap visualization"
git commit -m "fix: Resolve streak calculation on month change"
git commit -m "docs: Update README with installation steps"
git commit -m "style: Improve button hover animations"
git commit -m "refactor: Simplify date formatting functions"
```

## .gitignore Tips

Already included in your project! It ignores:
- OS files (.DS_Store, Thumbs.db)
- Editor files (.vscode/, .idea/)
- Logs and temp files
- node_modules (if you add npm)
- Build outputs

## Troubleshooting

### Can't push to GitHub?
```bash
# Check remote URL
git remote -v

# Fix remote URL
git remote set-url origin https://github.com/USERNAME/REPO.git
```

### Authentication Issues?
```bash
# Use Personal Access Token instead of password
# Generate at: https://github.com/settings/tokens

# Or set up SSH keys
ssh-keygen -t ed25519 -C "your.email@example.com"
# Then add to GitHub: https://github.com/settings/keys
```

### Merge Conflicts?
```bash
# Open conflicted files, resolve manually
# Look for <<<<<<< HEAD markers
# Then:
git add .
git commit -m "Resolve merge conflicts"
```

## GitHub Repository Settings

### After First Push:

1. **About Section** (Top right of repo page)
   - Add description: "Premium Task Tracker with Streak Analytics"
   - Add website: Your deployed URL (if any)
   - Add topics: `task-tracker`, `habit-tracker`, `javascript`, `streak-tracking`

2. **README Preview**
   - Your README.md will automatically display on the repo page

3. **GitHub Pages** (Optional - Free hosting!)
   - Go to Settings → Pages
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
   - Save
   - Your site will be live at: `https://username.github.io/repo-name`

4. **Star Your Own Repo** ⭐
   - Click the star button to bookmark it!

## Deployment Options

### 1. GitHub Pages (Free)
- Settings → Pages → Enable
- Access at: `username.github.io/repo-name`

### 2. Netlify (Free)
1. Go to https://netlify.com
2. "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Deploy!

### 3. Vercel (Free)
1. Go to https://vercel.com
2. "Import Project"
3. Connect GitHub repo
4. Deploy!

## Quick Reference Card

```bash
# Setup
git init
git add .
git commit -m "Initial commit"
git remote add origin URL
git push -u origin main

# Daily workflow
git status           # Check changes
git add .           # Stage all
git commit -m "msg" # Commit
git push            # Push to GitHub

# See history
git log --oneline --graph --all

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

## Need Help?
- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- Git Cheatsheet: https://education.github.com/git-cheat-sheet-education.pdf

---

Good luck with your first push! 🚀
