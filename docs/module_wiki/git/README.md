---
sidebar: false
---

# Git

```sh
# config
git config --global user.name "gdut-yy"
git config --global user.email "gdut_yy@163.com"

# 大小写敏感
git config --global core.ignorecase false

# 使用 SSH
ssh-keygen -t rsa -b 4096 -C "gdut_yy@163.com"
git config --global http.sslVerify false
# 验证
ssh -T git@github.com
ssh -T git@gitee.com

# 远端删除分支，本地同步
git remote prune origin

# 本地删除分支，远端同步删除
git push origin --delete 远程分支名称

# 本地新建分支，推送到远端
git checkout -b develop
git push origin develop

# 本地拉取远端新分支
git fetch origin branchname:branchname
```
