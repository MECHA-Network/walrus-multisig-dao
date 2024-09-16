// vite.config.ts
import react from "file:///Users/tahliltahlil/Desktop/GRLA_DAO/walrusDAO/chrome-extension-sidepanel-template/node_modules/.pnpm/@vitejs+plugin-react-swc@3.3.2_vite@4.4.3_@types+node@18.16.19_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve as resolve3 } from "path";
import { defineConfig } from "file:///Users/tahliltahlil/Desktop/GRLA_DAO/walrusDAO/chrome-extension-sidepanel-template/node_modules/.pnpm/vite@4.4.3_@types+node@18.16.19/node_modules/vite/dist/node/index.js";

// utils/plugins/make-manifest.ts
import * as fs from "fs";
import * as path from "path";

// utils/log.ts
function colorLog(message, type) {
  let color = type || COLORS.FgBlack;
  switch (type) {
    case "success":
      color = COLORS.FgGreen;
      break;
    case "info":
      color = COLORS.FgBlue;
      break;
    case "error":
      color = COLORS.FgRed;
      break;
    case "warning":
      color = COLORS.FgYellow;
      break;
  }
  console.log(color, message);
}
var COLORS = {
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};

// package.json
var package_default = {
  name: "vite-web-extension",
  displayName: "Walrus Multisig DAO",
  version: "1.1.0",
  description: "A simple chrome extension template with Vite, React, TypeScript and Tailwind CSS.",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/QizhengMo/chrome-extension-sidepanel-template"
  },
  scripts: {
    build: "vite build",
    dev: "nodemon",
    webdev: "vite --port 3000 --open"
  },
  type: "module",
  dependencies: {
    "@metamask/browser-passworder": "^5.0.1",
    "@mysten/sui": "^1.9.0",
    "argon2-wasm-esm": "^1.0.3",
    buffer: "^6.0.3",
    classnames: "^2.5.1",
    "crypto-random-string": "^5.0.0",
    react: "^18.2.0",
    "react-copy-to-clipboard": "^5.1.0",
    "react-dom": "^18.2.0",
    "react-icons": "^5.3.0",
    "react-toastify": "^10.0.5",
    "vite-plugin-css-injected-by-js": "^3.1.1",
    "vite-plugin-top-level-await": "^1.4.4",
    "webextension-polyfill": "^0.10.0"
  },
  devDependencies: {
    "@types/chrome": "^0.0.241",
    "@types/node": "^18.11.18",
    "@types/react": "^18.0.27",
    "@types/react-copy-to-clipboard": "^5.0.7",
    "@types/react-dom": "^18.0.10",
    "@types/webextension-polyfill": "^0.10.0",
    "@vitejs/plugin-react-swc": "^3.0.1",
    autoprefixer: "^10.4.13",
    "fs-extra": "^11.1.0",
    nodemon: "^2.0.20",
    postcss: "^8.4.21",
    prettier: "^3.0.0",
    tailwindcss: "^3.2.4",
    "ts-node": "^10.9.1",
    typescript: "^4.9.4",
    vite: "^4.0.4",
    "vite-plugin-wasm": "^3.3.0"
  }
};

// src/manifest.ts
var manifest = {
  manifest_version: 3,
  name: package_default.displayName,
  version: package_default.version,
  description: package_default.description,
  options_ui: {
    page: "src/pages/options/index.html"
  },
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module"
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-34.png"
  },
  // rewrite newtab content to custom page
  // chrome_url_overrides: {
  //   newtab: 'src/pages/newtab/index.html',
  // },
  devtools_page: "src/pages/devtools/index.html",
  // @ts-ignore
  side_panel: {
    default_path: "src/pages/panel/index.html"
  },
  icons: {
    "128": "icon-128.png"
  },
  permissions: ["storage", "activeTab", "sidePanel"],
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["contentStyle.css"]
    }
  ],
  web_accessible_resources: [
    {
      resources: ["contentStyle.css", "icon-128.png", "icon-34.png", "*.svg"],
      matches: []
    }
  ]
};
var manifest_default = manifest;

// utils/plugins/make-manifest.ts
var __vite_injected_original_dirname = "/Users/tahliltahlil/Desktop/GRLA_DAO/walrusDAO/chrome-extension-sidepanel-template/utils/plugins";
var { resolve } = path;
var outDir = resolve(__vite_injected_original_dirname, "..", "..", "public");
function makeManifest() {
  return {
    name: "make-manifest",
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      const manifestPath = resolve(outDir, "manifest.json");
      fs.writeFileSync(manifestPath, JSON.stringify(manifest_default, null, 2));
      colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
    }
  };
}

// utils/plugins/build-content-script.ts
import { build } from "file:///Users/tahliltahlil/Desktop/GRLA_DAO/walrusDAO/chrome-extension-sidepanel-template/node_modules/.pnpm/vite@4.4.3_@types+node@18.16.19/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";

// utils/constants.ts
var outputFolderName = "dist";

// utils/plugins/build-content-script.ts
import cssInjectedByJsPlugin from "file:///Users/tahliltahlil/Desktop/GRLA_DAO/walrusDAO/chrome-extension-sidepanel-template/node_modules/.pnpm/vite-plugin-css-injected-by-js@3.2.0_vite@4.4.3_@types+node@18.16.19_/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
var __vite_injected_original_dirname2 = "/Users/tahliltahlil/Desktop/GRLA_DAO/walrusDAO/chrome-extension-sidepanel-template/utils/plugins";
var packages = [
  {
    content: resolve2(__vite_injected_original_dirname2, "../../", "src/pages/content/index.tsx")
  }
];
var outDir2 = resolve2(__vite_injected_original_dirname2, "../../", outputFolderName);
function buildContentScript() {
  return {
    name: "build-content",
    async buildEnd() {
      for (const _package of packages) {
        await build({
          publicDir: false,
          plugins: [cssInjectedByJsPlugin()],
          build: {
            outDir: outDir2,
            sourcemap: process.env.__DEV__ === "true",
            emptyOutDir: false,
            rollupOptions: {
              input: _package,
              output: {
                entryFileNames: (chunk) => {
                  return `src/pages/${chunk.name}/index.js`;
                }
              }
            }
          },
          configFile: false
        });
      }
      colorLog("Content code build sucessfully", "success");
    }
  };
}

// vite.config.ts
import wasm from "file:///Users/tahliltahlil/Desktop/GRLA_DAO/walrusDAO/chrome-extension-sidepanel-template/node_modules/.pnpm/vite-plugin-wasm@3.3.0_vite@4.4.3_@types+node@18.16.19_/node_modules/vite-plugin-wasm/exports/import.mjs";
import topLevelAwait from "file:///Users/tahliltahlil/Desktop/GRLA_DAO/walrusDAO/chrome-extension-sidepanel-template/node_modules/.pnpm/vite-plugin-top-level-await@1.4.4_rollup@3.26.2_vite@4.4.3_@types+node@18.16.19_/node_modules/vite-plugin-top-level-await/exports/import.mjs";
var __vite_injected_original_dirname3 = "/Users/tahliltahlil/Desktop/GRLA_DAO/walrusDAO/chrome-extension-sidepanel-template";
var root = resolve3(__vite_injected_original_dirname3, "src");
var pagesDir = resolve3(root, "pages");
var assetsDir = resolve3(root, "assets");
var outDir3 = resolve3(__vite_injected_original_dirname3, outputFolderName);
var publicDir = resolve3(__vite_injected_original_dirname3, "public");
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir,
      buffer: "buffer"
    }
  },
  plugins: [react(), makeManifest(), buildContentScript(), wasm(), topLevelAwait()],
  publicDir,
  build: {
    outDir: outDir3,
    sourcemap: process.env.__DEV__ === "true",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        devtools: resolve3(pagesDir, "devtools", "index.html"),
        panel: resolve3(pagesDir, "panel", "index.html"),
        background: resolve3(pagesDir, "background", "index.ts"),
        popup: resolve3(pagesDir, "popup", "index.html"),
        newtab: resolve3(pagesDir, "newtab", "index.html"),
        options: resolve3(pagesDir, "options", "index.html")
      },
      output: {
        entryFileNames: (chunk) => `src/pages/${chunk.name}/index.js`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJwYWNrYWdlLmpzb24iLCAic3JjL21hbmlmZXN0LnRzIiwgInV0aWxzL3BsdWdpbnMvYnVpbGQtY29udGVudC1zY3JpcHQudHMiLCAidXRpbHMvY29uc3RhbnRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBtYWtlTWFuaWZlc3QgZnJvbSAnLi91dGlscy9wbHVnaW5zL21ha2UtbWFuaWZlc3QnO1xuaW1wb3J0IGJ1aWxkQ29udGVudFNjcmlwdCBmcm9tICcuL3V0aWxzL3BsdWdpbnMvYnVpbGQtY29udGVudC1zY3JpcHQnO1xuaW1wb3J0IHsgb3V0cHV0Rm9sZGVyTmFtZSB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnRzJztcbmltcG9ydCB3YXNtIGZyb20gJ3ZpdGUtcGx1Z2luLXdhc20nO1xuaW1wb3J0IHRvcExldmVsQXdhaXQgZnJvbSAndml0ZS1wbHVnaW4tdG9wLWxldmVsLWF3YWl0JztcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ2J1ZmZlcic7XG5cbmNvbnN0IHJvb3QgPSByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpO1xuY29uc3QgcGFnZXNEaXIgPSByZXNvbHZlKHJvb3QsICdwYWdlcycpO1xuY29uc3QgYXNzZXRzRGlyID0gcmVzb2x2ZShyb290LCAnYXNzZXRzJyk7XG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgb3V0cHV0Rm9sZGVyTmFtZSk7XG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYycpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAc3JjJzogcm9vdCxcbiAgICAgICdAYXNzZXRzJzogYXNzZXRzRGlyLFxuICAgICAgJ0BwYWdlcyc6IHBhZ2VzRGlyLFxuICAgICAgIGJ1ZmZlcjogJ2J1ZmZlcicsXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIG1ha2VNYW5pZmVzdCgpLCBidWlsZENvbnRlbnRTY3JpcHQoKSwgd2FzbSgpLCB0b3BMZXZlbEF3YWl0KCldLFxuICBwdWJsaWNEaXIsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyLFxuICAgIHNvdXJjZW1hcDogcHJvY2Vzcy5lbnYuX19ERVZfXyA9PT0gJ3RydWUnLFxuICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICBkZXZ0b29sczogcmVzb2x2ZShwYWdlc0RpciwgJ2RldnRvb2xzJywgJ2luZGV4Lmh0bWwnKSxcbiAgICAgICAgcGFuZWw6IHJlc29sdmUocGFnZXNEaXIsICdwYW5lbCcsICdpbmRleC5odG1sJyksXG4gICAgICAgIGJhY2tncm91bmQ6IHJlc29sdmUocGFnZXNEaXIsICdiYWNrZ3JvdW5kJywgJ2luZGV4LnRzJyksXG4gICAgICAgIHBvcHVwOiByZXNvbHZlKHBhZ2VzRGlyLCAncG9wdXAnLCAnaW5kZXguaHRtbCcpLFxuICAgICAgICBuZXd0YWI6IHJlc29sdmUocGFnZXNEaXIsICduZXd0YWInLCAnaW5kZXguaHRtbCcpLFxuICAgICAgICBvcHRpb25zOiByZXNvbHZlKHBhZ2VzRGlyLCAnb3B0aW9ucycsICdpbmRleC5odG1sJyksXG4gICAgICB9LFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAoY2h1bmspID0+IGBzcmMvcGFnZXMvJHtjaHVuay5uYW1lfS9pbmRleC5qc2AsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZS91dGlscy9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC50c1wiO2ltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY29sb3JMb2cgZnJvbSAnLi4vbG9nJztcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuLi8uLi9zcmMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSc7XG5cbmNvbnN0IHsgcmVzb2x2ZSB9ID0gcGF0aDtcblxuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICdwdWJsaWMnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZU1hbmlmZXN0KCk6IFBsdWdpbk9wdGlvbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ21ha2UtbWFuaWZlc3QnLFxuICAgIGJ1aWxkRW5kKCkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKG91dERpcikpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKG91dERpcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hbmlmZXN0UGF0aCA9IHJlc29sdmUob3V0RGlyLCAnbWFuaWZlc3QuanNvbicpO1xuXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKG1hbmlmZXN0UGF0aCwgSlNPTi5zdHJpbmdpZnkobWFuaWZlc3QsIG51bGwsIDIpKTtcblxuICAgICAgY29sb3JMb2coYE1hbmlmZXN0IGZpbGUgY29weSBjb21wbGV0ZTogJHttYW5pZmVzdFBhdGh9YCwgJ3N1Y2Nlc3MnKTtcbiAgICB9LFxuICB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3V0aWxzL2xvZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3V0aWxzL2xvZy50c1wiO3R5cGUgQ29sb3JUeXBlID0gJ3N1Y2Nlc3MnIHwgJ2luZm8nIHwgJ2Vycm9yJyB8ICd3YXJuaW5nJyB8IGtleW9mIHR5cGVvZiBDT0xPUlM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yTG9nKG1lc3NhZ2U6IHN0cmluZywgdHlwZT86IENvbG9yVHlwZSkge1xuICBsZXQgY29sb3I6IHN0cmluZyA9IHR5cGUgfHwgQ09MT1JTLkZnQmxhY2s7XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0dyZWVuO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaW5mbyc6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0JsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdlcnJvcic6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1JlZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdZZWxsb3c7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGNvbG9yLCBtZXNzYWdlKTtcbn1cblxuY29uc3QgQ09MT1JTID0ge1xuICBSZXNldDogJ1xceDFiWzBtJyxcbiAgQnJpZ2h0OiAnXFx4MWJbMW0nLFxuICBEaW06ICdcXHgxYlsybScsXG4gIFVuZGVyc2NvcmU6ICdcXHgxYls0bScsXG4gIEJsaW5rOiAnXFx4MWJbNW0nLFxuICBSZXZlcnNlOiAnXFx4MWJbN20nLFxuICBIaWRkZW46ICdcXHgxYls4bScsXG4gIEZnQmxhY2s6ICdcXHgxYlszMG0nLFxuICBGZ1JlZDogJ1xceDFiWzMxbScsXG4gIEZnR3JlZW46ICdcXHgxYlszMm0nLFxuICBGZ1llbGxvdzogJ1xceDFiWzMzbScsXG4gIEZnQmx1ZTogJ1xceDFiWzM0bScsXG4gIEZnTWFnZW50YTogJ1xceDFiWzM1bScsXG4gIEZnQ3lhbjogJ1xceDFiWzM2bScsXG4gIEZnV2hpdGU6ICdcXHgxYlszN20nLFxuICBCZ0JsYWNrOiAnXFx4MWJbNDBtJyxcbiAgQmdSZWQ6ICdcXHgxYls0MW0nLFxuICBCZ0dyZWVuOiAnXFx4MWJbNDJtJyxcbiAgQmdZZWxsb3c6ICdcXHgxYls0M20nLFxuICBCZ0JsdWU6ICdcXHgxYls0NG0nLFxuICBCZ01hZ2VudGE6ICdcXHgxYls0NW0nLFxuICBCZ0N5YW46ICdcXHgxYls0Nm0nLFxuICBCZ1doaXRlOiAnXFx4MWJbNDdtJyxcbn0gYXMgY29uc3Q7XG4iLCAie1xuICBcIm5hbWVcIjogXCJ2aXRlLXdlYi1leHRlbnNpb25cIixcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIldhbHJ1cyBNdWx0aXNpZyBEQU9cIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4xLjBcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkEgc2ltcGxlIGNocm9tZSBleHRlbnNpb24gdGVtcGxhdGUgd2l0aCBWaXRlLCBSZWFjdCwgVHlwZVNjcmlwdCBhbmQgVGFpbHdpbmQgQ1NTLlwiLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9RaXpoZW5nTW8vY2hyb21lLWV4dGVuc2lvbi1zaWRlcGFuZWwtdGVtcGxhdGVcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJkZXZcIjogXCJub2RlbW9uXCIsXG4gICAgXCJ3ZWJkZXZcIjogXCJ2aXRlIC0tcG9ydCAzMDAwIC0tb3BlblwiXG4gIH0sXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAbWV0YW1hc2svYnJvd3Nlci1wYXNzd29yZGVyXCI6IFwiXjUuMC4xXCIsXG4gICAgXCJAbXlzdGVuL3N1aVwiOiBcIl4xLjkuMFwiLFxuICAgIFwiYXJnb24yLXdhc20tZXNtXCI6IFwiXjEuMC4zXCIsXG4gICAgXCJidWZmZXJcIjogXCJeNi4wLjNcIixcbiAgICBcImNsYXNzbmFtZXNcIjogXCJeMi41LjFcIixcbiAgICBcImNyeXB0by1yYW5kb20tc3RyaW5nXCI6IFwiXjUuMC4wXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWNvcHktdG8tY2xpcGJvYXJkXCI6IFwiXjUuMS4wXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1pY29uc1wiOiBcIl41LjMuMFwiLFxuICAgIFwicmVhY3QtdG9hc3RpZnlcIjogXCJeMTAuMC41XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jc3MtaW5qZWN0ZWQtYnktanNcIjogXCJeMy4xLjFcIixcbiAgICBcInZpdGUtcGx1Z2luLXRvcC1sZXZlbC1hd2FpdFwiOiBcIl4xLjQuNFwiLFxuICAgIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTAuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjI0MVwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMTguMTEuMThcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4wLjI3XCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtY29weS10by1jbGlwYm9hcmRcIjogXCJeNS4wLjdcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMC4xMFwiLFxuICAgIFwiQHR5cGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEwLjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOiBcIl4zLjAuMVwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTNcIixcbiAgICBcImZzLWV4dHJhXCI6IFwiXjExLjEuMFwiLFxuICAgIFwibm9kZW1vblwiOiBcIl4yLjAuMjBcIixcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjIxXCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjAuMFwiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy4yLjRcIixcbiAgICBcInRzLW5vZGVcIjogXCJeMTAuOS4xXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjQuOS40XCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuMC40XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi13YXNtXCI6IFwiXjMuMy4wXCJcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3NyY1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZS9zcmMvbWFuaWZlc3QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZS9zcmMvbWFuaWZlc3QudHNcIjtpbXBvcnQgdHlwZSB7IE1hbmlmZXN0IH0gZnJvbSAnd2ViZXh0ZW5zaW9uLXBvbHlmaWxsJztcbmltcG9ydCBwa2cgZnJvbSAnLi4vcGFja2FnZS5qc29uJztcblxuY29uc3QgbWFuaWZlc3Q6IE1hbmlmZXN0LldlYkV4dGVuc2lvbk1hbmlmZXN0ID0ge1xuICBtYW5pZmVzdF92ZXJzaW9uOiAzLFxuICBuYW1lOiBwa2cuZGlzcGxheU5hbWUsXG4gIHZlcnNpb246IHBrZy52ZXJzaW9uLFxuICBkZXNjcmlwdGlvbjogcGtnLmRlc2NyaXB0aW9uLFxuICBvcHRpb25zX3VpOiB7XG4gICAgcGFnZTogJ3NyYy9wYWdlcy9vcHRpb25zL2luZGV4Lmh0bWwnLFxuICB9LFxuICBiYWNrZ3JvdW5kOiB7XG4gICAgc2VydmljZV93b3JrZXI6ICdzcmMvcGFnZXMvYmFja2dyb3VuZC9pbmRleC5qcycsXG4gICAgdHlwZTogJ21vZHVsZScsXG4gIH0sXG4gIGFjdGlvbjoge1xuICAgIGRlZmF1bHRfcG9wdXA6ICdzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbCcsXG4gICAgZGVmYXVsdF9pY29uOiAnaWNvbi0zNC5wbmcnLFxuICB9LFxuICAvLyByZXdyaXRlIG5ld3RhYiBjb250ZW50IHRvIGN1c3RvbSBwYWdlXG4gIC8vIGNocm9tZV91cmxfb3ZlcnJpZGVzOiB7XG4gIC8vICAgbmV3dGFiOiAnc3JjL3BhZ2VzL25ld3RhYi9pbmRleC5odG1sJyxcbiAgLy8gfSxcbiAgZGV2dG9vbHNfcGFnZTogJ3NyYy9wYWdlcy9kZXZ0b29scy9pbmRleC5odG1sJyxcbiAgLy8gQHRzLWlnbm9yZVxuICBzaWRlX3BhbmVsOiB7XG4gICAgZGVmYXVsdF9wYXRoOiBcInNyYy9wYWdlcy9wYW5lbC9pbmRleC5odG1sXCIsXG4gIH0sXG4gIGljb25zOiB7XG4gICAgJzEyOCc6ICdpY29uLTEyOC5wbmcnLFxuICB9LFxuICBwZXJtaXNzaW9uczogW1wic3RvcmFnZVwiLCBcImFjdGl2ZVRhYlwiLCBcInNpZGVQYW5lbFwiXSxcbiAgY29udGVudF9zY3JpcHRzOiBbXG4gICAge1xuICAgICAgbWF0Y2hlczogWydodHRwOi8vKi8qJywgJ2h0dHBzOi8vKi8qJywgJzxhbGxfdXJscz4nXSxcbiAgICAgIGpzOiBbJ3NyYy9wYWdlcy9jb250ZW50L2luZGV4LmpzJ10sXG4gICAgICBjc3M6IFsnY29udGVudFN0eWxlLmNzcyddLFxuICAgIH0sXG4gIF0sXG4gIHdlYl9hY2Nlc3NpYmxlX3Jlc291cmNlczogW1xuICAgIHtcbiAgICAgIHJlc291cmNlczogWydjb250ZW50U3R5bGUuY3NzJywgJ2ljb24tMTI4LnBuZycsICdpY29uLTM0LnBuZycsIFwiKi5zdmdcIl0sXG4gICAgICBtYXRjaGVzOiBbXSxcbiAgICB9LFxuICBdLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWFuaWZlc3Q7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy90YWhsaWx0YWhsaWwvRGVza3RvcC9HUkxBX0RBTy93YWxydXNEQU8vY2hyb21lLWV4dGVuc2lvbi1zaWRlcGFuZWwtdGVtcGxhdGUvdXRpbHMvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZS91dGlscy9wbHVnaW5zL2J1aWxkLWNvbnRlbnQtc2NyaXB0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy90YWhsaWx0YWhsaWwvRGVza3RvcC9HUkxBX0RBTy93YWxydXNEQU8vY2hyb21lLWV4dGVuc2lvbi1zaWRlcGFuZWwtdGVtcGxhdGUvdXRpbHMvcGx1Z2lucy9idWlsZC1jb250ZW50LXNjcmlwdC50c1wiO2ltcG9ydCBjb2xvckxvZyBmcm9tICcuLi9sb2cnO1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uLCBidWlsZCB9IGZyb20gJ3ZpdGUnOyBcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IG91dHB1dEZvbGRlck5hbWUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IGNzc0luamVjdGVkQnlKc1BsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1jc3MtaW5qZWN0ZWQtYnktanMnXG5cbmNvbnN0IHBhY2thZ2VzID0gW1xuICB7XG4gICAgY29udGVudDogIHJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vJywgJ3NyYy9wYWdlcy9jb250ZW50L2luZGV4LnRzeCcpXG4gIH0sXG5dO1xuXG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLycsICBvdXRwdXRGb2xkZXJOYW1lKTsgXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkQ29udGVudFNjcmlwdCgpOiBQbHVnaW5PcHRpb24ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdidWlsZC1jb250ZW50JyxcbiAgICBhc3luYyBidWlsZEVuZCgpIHtcbiAgICAgIGZvciAoY29uc3QgX3BhY2thZ2Ugb2YgcGFja2FnZXMpIHtcbiAgICAgICAgYXdhaXQgYnVpbGQoe1xuICAgICAgICAgIHB1YmxpY0RpcjogZmFsc2UsXG4gICAgICAgICAgcGx1Z2luczogWyBjc3NJbmplY3RlZEJ5SnNQbHVnaW4oKSBdLFxuICAgICAgICAgIGJ1aWxkOiB7XG4gICAgICAgICAgICBvdXREaXIsXG4gICAgICAgICAgICBzb3VyY2VtYXA6IHByb2Nlc3MuZW52Ll9fREVWX18gPT09ICd0cnVlJyxcbiAgICAgICAgICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcbiAgICAgICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgaW5wdXQ6IF9wYWNrYWdlLFxuICAgICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogKGNodW5rKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYHNyYy9wYWdlcy8ke2NodW5rLm5hbWV9L2luZGV4LmpzYDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbmZpZ0ZpbGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbG9yTG9nKCdDb250ZW50IGNvZGUgYnVpbGQgc3VjZXNzZnVsbHknLCAnc3VjY2VzcycpO1xuICAgIH0sXG4gIH07XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy90YWhsaWx0YWhsaWwvRGVza3RvcC9HUkxBX0RBTy93YWxydXNEQU8vY2hyb21lLWV4dGVuc2lvbi1zaWRlcGFuZWwtdGVtcGxhdGUvdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy90YWhsaWx0YWhsaWwvRGVza3RvcC9HUkxBX0RBTy93YWxydXNEQU8vY2hyb21lLWV4dGVuc2lvbi1zaWRlcGFuZWwtdGVtcGxhdGUvdXRpbHMvY29uc3RhbnRzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy90YWhsaWx0YWhsaWwvRGVza3RvcC9HUkxBX0RBTy93YWxydXNEQU8vY2hyb21lLWV4dGVuc2lvbi1zaWRlcGFuZWwtdGVtcGxhdGUvdXRpbHMvY29uc3RhbnRzLnRzXCI7ZXhwb3J0IGNvbnN0IG91dHB1dEZvbGRlck5hbWUgPSAnZGlzdCc7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdhLE9BQU8sV0FBVztBQUMxYixTQUFTLFdBQUFBLGdCQUFlO0FBQ3hCLFNBQVMsb0JBQW9COzs7QUNGeWIsWUFBWSxRQUFRO0FBQzFlLFlBQVksVUFBVTs7O0FDQ1AsU0FBUixTQUEwQixTQUFpQixNQUFrQjtBQUNsRSxNQUFJLFFBQWdCLFFBQVEsT0FBTztBQUVuQyxVQUFR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QUNiLE9BQU87QUFBQSxRQUNMLFVBQVVGLFNBQVEsVUFBVSxZQUFZLFlBQVk7QUFBQSxRQUNwRCxPQUFPQSxTQUFRLFVBQVUsU0FBUyxZQUFZO0FBQUEsUUFDOUMsWUFBWUEsU0FBUSxVQUFVLGNBQWMsVUFBVTtBQUFBLFFBQ3RELE9BQU9BLFNBQVEsVUFBVSxTQUFTLFlBQVk7QUFBQSxRQUM5QyxRQUFRQSxTQUFRLFVBQVUsVUFBVSxZQUFZO0FBQUEsUUFDaEQsU0FBU0EsU0FBUSxVQUFVLFdBQVcsWUFBWTtBQUFBLE1BQ3BEO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0IsQ0FBQyxVQUFVLGFBQWEsTUFBTSxJQUFJO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInJlc29sdmUiLCAicmVzb2x2ZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJyZXNvbHZlIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIm91dERpciIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJyZXNvbHZlIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIm91dERpciJdCn0K
