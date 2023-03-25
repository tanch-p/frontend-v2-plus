# 明日方舟一图流 网站前端

明日方舟一图流网站：<https://yituliu.site>

欢迎加入开发群（QQ）交流讨论：938710832

---

此项目从前端的 [v2 版本](https://github.com/Arknights-yituliu/frontend-v2) 发展而来，保留大部分原有代码时，升级了工具链。在 v2-plus 中，主要用到了以下的库或工具：

- 工具链：[Vite](https://cn.vitejs.dev/)，开发服务器启动快，修改反馈及时。
- 框架：[Vue 3](https://cn.vuejs.org/)，尽管 Vue 2.7 加入了 Vue 3 的一些新功能，但是仍有[一些限制](https://v2.cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)，不如 Vue 3 使用方便。
- 服务端渲染：[vite-plugin-ssr](https://cn.vite-plugin-ssr.com/)，v2 虽然使用了 Nuxt 2，却没有充分利用 SSR 特性，只将页面中的固定部分在服务端渲染，数据仍然在浏览器中渲染。v2-plus 没有使用 Nuxt 3，转向更为轻量的 vite-plugin-ssr，避免了 Nuxt 的包装与抽象，以降低学习成本、更直观地控制打包过程。
- 组件库：[Element Plus](https://element-plus.org/zh-CN/)，v2 使用 element-ui，v2-plus 使用 element-plus，减少对原来代码的修改。
- 图表：[Apache ECharts](https://echarts.apache.org/zh/index.html)，在攒抽、公招统计页面画图。
- Polyfill：[Polyfill.io](https://polyfill.io/v3/)，兼容旧版本的浏览器。

## 运行项目

首先[安装 Node.js](https://nodejs.org/zh-cn/download)，推荐的版本是 18。

```bash
git clone https://github.com/Arknights-yituliu/frontend-v2-plus.git
cd frontend-v2-plus
npm install
```

如果网络环境不佳，可以换用国内的镜像源：

```bash
npm config set registry https://registry.npm.taobao.org
```

### 开发

```bash
npm run dev
```

然后在浏览器中打开 <http://localhost:3000>。

### 部署

#### 直接运行

```bash
npm run prod
```

默认运行在 `3000` 端口上。如果要改变端口，可以添加 `PORT` 环境变量：

```bash
PORT=10000 npm run prod  # 在 10000 端口上运行
```

#### 使用容器运行

直接运行打包好的镜像：

```bash
docker run -d --rm --name v2plus -p 3000:3000  zhaozuohong/yituliu-frontend-v2-plus:latest
```

或者从本地构建镜像：

```bash
docker build . -t v2-plus
docker run -d --rm --name v2plus -p 3000:3000  v2-plus:latest
```

## 哪些页面用了 SSR？

- 首页（`/`）：打开网页后，屏幕空间几乎全被蓝材料占据，因此只对蓝材料部分采用服务端渲染，就能得到不错的效果。目前只在服务端渲染了蓝材料部分的数据。页面中余下部分的交互性较低，在服务端渲染，还是在客户端请求数据后渲染，哪种方案消耗的流量更多，有待进一步研究。
- 攒抽（`/gachaCal`）：虽然页面的交互性很强，在下载 js 前无法使用，但使用服务端渲染能更早看到页面，显得加载速度更快。
- 基建排班（`/riicCal`）：在浏览器中渲染。因为这个页面的加载速度实在是太慢了，如果用服务端渲染，页面到达之后有很长时间不能交互，看起来像坏了一样。所以还是在浏览器中渲染，至少页面显示出来的时候就是可交互的。
- 礼包性价比（`/pack`）：在服务端渲染。
- 公招数据（`maarecruitdata`）：由于是半公开页面，访问较少，因此暂时在浏览器中渲染。关于 ECharts 如何在服务端渲染，或改写代码、只在客户端运行 ECharts，有待进一步研究。
