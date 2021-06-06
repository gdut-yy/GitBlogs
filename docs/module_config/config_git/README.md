---
sidebar: false
---

# Git 配置

**原文链接: [https://gdut-yy.github.io/doc-gitblogs/module_config/config_git/](https://gdut-yy.github.io/doc-gitblogs/module_config/config_git/)**

## 1 配置 SSH 公私钥

```sh
# 生成新 ssh 密钥
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" # e.g. ssh-keygen -t rsa -b 4096 -C "gdut_yy@163.com"

# 配置公钥 & 验证（Github/Gitee/其他 Git 平台）
ssh -T git@github.com
ssh -T git@gitee.com
```

多个 ssh 配置（假设两个 github 账号，一个 gitee 账号）`~/.ssh/config`

```sh
# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/d5d56a7b46_id_rsa

# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/yy_id_rsa

# github2
Host github2.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/RxGirlz_id_rsa
```

## 2 其他配置（相对低频/易忘）

```sh
# 配置 Git 用户名 & 邮箱
git config --global user.name "your_name" # e.g. git config --global user.name "gdut-yy"
git config --global user.email "your_email@example.com" # e.g. git config --global user.email "gdut_yy@163.com"

# 设置大小写敏感（Git 默认对文件名大小写不敏感）
git config --global core.ignorecase false

# 忽略 ssl 证书错误
git config --global http.sslVerify false

# 配置 git 代理（常见于公司内网）
git config --global http.proxy http://username:password@proxy.huawei.com:8080

# 注：如果密码中含有 @ 等特殊字符，会出错。建议直接修改 ~/.gitconfig 文件
[http]
	proxy = http://username:password@proxy.huawei.com:8080
```

## 3 同步操作

```sh
# 远端删除分支，本地同步
git remote prune origin

# git 仓迁移
git clone --bare oldRepo.git
cd oldRepo.git/
git push --mirror newRepo.git
```

（全文完）
