# toolkit
ToolKit 是一款功能强大的 Chrome 扩展工具包，为开发者提供了一站式的开发辅助功能，包括 HTTP 客户端、JSON 处理、编码解码、时间转换等多种实用工具。

## 为什么选择 ToolKit？

- 🎯 简洁高效 ：界面简洁直观，操作流程顺畅
- ⚡ 功能丰富 ：集成多种开发常用工具
- 🔒 安全可靠 ：本地处理数据，保护隐私
- 📦 轻量便捷 ：作为 Chrome 扩展，随时可用
## ✨ 核心功能
### 🌐 HTTP Client
- 支持 GET、POST、PUT、DELETE 等多种 HTTP 方法
- 自动解析 URL 查询参数
- 支持 JSON、Form Data、Plain Text 请求体
- 实时显示响应状态、时间和内容
- 支持 curl 命令导入/导出
- 一键美化 JSON 响应
### 📝 JSON 工具
- JSON 美化与压缩
- 交互式树形结构展示
- 支持 JSON 节点编辑
- 语法高亮显示
- 一键复制结果
### 🔄 编码解码工具
- Base64 ：编码/解码
- URL ：编码/解码
- MD5 ：哈希生成
- 未来支持更多
### ⏰ 时间工具
- 实时显示当前时间（支持毫秒级精度）
- Unix 时间戳转换（自动识别秒/毫秒）
- 日期时间与时间戳互转
- 支持多种时间格式
- 支持时区转换
## 📥 安装方法
### 从 Chrome 网上应用店安装
（未来上线后）

### 本地开发安装
1. 克隆本仓库：
   ```
   git clone https://github.com/xugf703/toolkit.git
   ```
2. 打开 Chrome 浏览器，进入 chrome://extensions/
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"，选择本项目文件夹
5. 扩展图标将出现在 Chrome 工具栏中
## 🖥️ 使用指南
### HTTP Client 使用
1. 在 URL 输入框中输入目标地址
2. 选择 HTTP 方法（GET、POST 等）
3. 在 Headers 选项卡中设置请求头
4. 在 Params 选项卡中设置查询参数（或自动从 URL 解析）
5. 在 Body 选项卡中设置请求体（支持 JSON、Form Data）
6. 点击"Send Request"发送请求
7. 查看响应结果（支持美化 JSON）
### JSON 工具使用
1. 在 JSON 输入框中粘贴 JSON 数据
2. 点击"Beautify"美化 JSON
3. 点击"Minify"压缩 JSON
4. 查看树形结构展示，支持展开/折叠
5. 双击节点可编辑值
6. 点击"Copy"复制结果
### 编码解码工具使用
1. 选择对应的工具标签（Base64、URL、MD5）
2. 输入要处理的文本
3. 点击对应的操作按钮（Encode/Decode/Generate）
4. 查看结果并复制
### 时间工具使用
1. 查看自动显示的当前时间
2. 输入 Unix 时间戳，点击"Convert to Date"转换为日期
3. 输入日期时间，点击"Convert to Timestamp"转换为时间戳
4. 点击"Refresh"更新当前时间
5. 查看结果并复制