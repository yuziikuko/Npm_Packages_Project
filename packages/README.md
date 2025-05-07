# 包工程

## 一、本地测试

1. 有任何改动需要先打包 `npm run build` 确保本地生成 `dist` 目录；
2. 运行 `npm link`；
3. 主工程链接 `npm link table-auto-scroll`；

## 二、发布到NPM

1. CMD进入要发布的NPM包工程目录；
2. 运行 `npm login` 登录到远端NPM账号；
3. 运行 `npm publish` 发布NPM包；

> 每次发布需要确保 `package.json` 中的 `version` 语义化迭代。
