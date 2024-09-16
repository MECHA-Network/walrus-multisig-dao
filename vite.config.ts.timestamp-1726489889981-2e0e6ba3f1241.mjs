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
    "@mysten/bcs": "^1.0.4",
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
    tweetnacl: "^1.0.3",
    "tweetnacl-util": "^0.15.1",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJwYWNrYWdlLmpzb24iLCAic3JjL21hbmlmZXN0LnRzIiwgInV0aWxzL3BsdWdpbnMvYnVpbGQtY29udGVudC1zY3JpcHQudHMiLCAidXRpbHMvY29uc3RhbnRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBtYWtlTWFuaWZlc3QgZnJvbSAnLi91dGlscy9wbHVnaW5zL21ha2UtbWFuaWZlc3QnO1xuaW1wb3J0IGJ1aWxkQ29udGVudFNjcmlwdCBmcm9tICcuL3V0aWxzL3BsdWdpbnMvYnVpbGQtY29udGVudC1zY3JpcHQnO1xuaW1wb3J0IHsgb3V0cHV0Rm9sZGVyTmFtZSB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnRzJztcbmltcG9ydCB3YXNtIGZyb20gJ3ZpdGUtcGx1Z2luLXdhc20nO1xuaW1wb3J0IHRvcExldmVsQXdhaXQgZnJvbSAndml0ZS1wbHVnaW4tdG9wLWxldmVsLWF3YWl0JztcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ2J1ZmZlcic7XG5cbmNvbnN0IHJvb3QgPSByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpO1xuY29uc3QgcGFnZXNEaXIgPSByZXNvbHZlKHJvb3QsICdwYWdlcycpO1xuY29uc3QgYXNzZXRzRGlyID0gcmVzb2x2ZShyb290LCAnYXNzZXRzJyk7XG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgb3V0cHV0Rm9sZGVyTmFtZSk7XG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYycpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAc3JjJzogcm9vdCxcbiAgICAgICdAYXNzZXRzJzogYXNzZXRzRGlyLFxuICAgICAgJ0BwYWdlcyc6IHBhZ2VzRGlyLFxuICAgICAgIGJ1ZmZlcjogJ2J1ZmZlcicsXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIG1ha2VNYW5pZmVzdCgpLCBidWlsZENvbnRlbnRTY3JpcHQoKSwgd2FzbSgpLCB0b3BMZXZlbEF3YWl0KCldLFxuICBwdWJsaWNEaXIsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyLFxuICAgIHNvdXJjZW1hcDogcHJvY2Vzcy5lbnYuX19ERVZfXyA9PT0gJ3RydWUnLFxuICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICBkZXZ0b29sczogcmVzb2x2ZShwYWdlc0RpciwgJ2RldnRvb2xzJywgJ2luZGV4Lmh0bWwnKSxcbiAgICAgICAgcGFuZWw6IHJlc29sdmUocGFnZXNEaXIsICdwYW5lbCcsICdpbmRleC5odG1sJyksXG4gICAgICAgIGJhY2tncm91bmQ6IHJlc29sdmUocGFnZXNEaXIsICdiYWNrZ3JvdW5kJywgJ2luZGV4LnRzJyksXG4gICAgICAgIHBvcHVwOiByZXNvbHZlKHBhZ2VzRGlyLCAncG9wdXAnLCAnaW5kZXguaHRtbCcpLFxuICAgICAgICBuZXd0YWI6IHJlc29sdmUocGFnZXNEaXIsICduZXd0YWInLCAnaW5kZXguaHRtbCcpLFxuICAgICAgICBvcHRpb25zOiByZXNvbHZlKHBhZ2VzRGlyLCAnb3B0aW9ucycsICdpbmRleC5odG1sJyksXG4gICAgICB9LFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAoY2h1bmspID0+IGBzcmMvcGFnZXMvJHtjaHVuay5uYW1lfS9pbmRleC5qc2AsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZS91dGlscy9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC50c1wiO2ltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY29sb3JMb2cgZnJvbSAnLi4vbG9nJztcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuLi8uLi9zcmMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSc7XG5cbmNvbnN0IHsgcmVzb2x2ZSB9ID0gcGF0aDtcblxuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICdwdWJsaWMnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZU1hbmlmZXN0KCk6IFBsdWdpbk9wdGlvbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ21ha2UtbWFuaWZlc3QnLFxuICAgIGJ1aWxkRW5kKCkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKG91dERpcikpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKG91dERpcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hbmlmZXN0UGF0aCA9IHJlc29sdmUob3V0RGlyLCAnbWFuaWZlc3QuanNvbicpO1xuXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKG1hbmlmZXN0UGF0aCwgSlNPTi5zdHJpbmdpZnkobWFuaWZlc3QsIG51bGwsIDIpKTtcblxuICAgICAgY29sb3JMb2coYE1hbmlmZXN0IGZpbGUgY29weSBjb21wbGV0ZTogJHttYW5pZmVzdFBhdGh9YCwgJ3N1Y2Nlc3MnKTtcbiAgICB9LFxuICB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3V0aWxzL2xvZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3V0aWxzL2xvZy50c1wiO3R5cGUgQ29sb3JUeXBlID0gJ3N1Y2Nlc3MnIHwgJ2luZm8nIHwgJ2Vycm9yJyB8ICd3YXJuaW5nJyB8IGtleW9mIHR5cGVvZiBDT0xPUlM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yTG9nKG1lc3NhZ2U6IHN0cmluZywgdHlwZT86IENvbG9yVHlwZSkge1xuICBsZXQgY29sb3I6IHN0cmluZyA9IHR5cGUgfHwgQ09MT1JTLkZnQmxhY2s7XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0dyZWVuO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaW5mbyc6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0JsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdlcnJvcic6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1JlZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdZZWxsb3c7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGNvbG9yLCBtZXNzYWdlKTtcbn1cblxuY29uc3QgQ09MT1JTID0ge1xuICBSZXNldDogJ1xceDFiWzBtJyxcbiAgQnJpZ2h0OiAnXFx4MWJbMW0nLFxuICBEaW06ICdcXHgxYlsybScsXG4gIFVuZGVyc2NvcmU6ICdcXHgxYls0bScsXG4gIEJsaW5rOiAnXFx4MWJbNW0nLFxuICBSZXZlcnNlOiAnXFx4MWJbN20nLFxuICBIaWRkZW46ICdcXHgxYls4bScsXG4gIEZnQmxhY2s6ICdcXHgxYlszMG0nLFxuICBGZ1JlZDogJ1xceDFiWzMxbScsXG4gIEZnR3JlZW46ICdcXHgxYlszMm0nLFxuICBGZ1llbGxvdzogJ1xceDFiWzMzbScsXG4gIEZnQmx1ZTogJ1xceDFiWzM0bScsXG4gIEZnTWFnZW50YTogJ1xceDFiWzM1bScsXG4gIEZnQ3lhbjogJ1xceDFiWzM2bScsXG4gIEZnV2hpdGU6ICdcXHgxYlszN20nLFxuICBCZ0JsYWNrOiAnXFx4MWJbNDBtJyxcbiAgQmdSZWQ6ICdcXHgxYls0MW0nLFxuICBCZ0dyZWVuOiAnXFx4MWJbNDJtJyxcbiAgQmdZZWxsb3c6ICdcXHgxYls0M20nLFxuICBCZ0JsdWU6ICdcXHgxYls0NG0nLFxuICBCZ01hZ2VudGE6ICdcXHgxYls0NW0nLFxuICBCZ0N5YW46ICdcXHgxYls0Nm0nLFxuICBCZ1doaXRlOiAnXFx4MWJbNDdtJyxcbn0gYXMgY29uc3Q7XG4iLCAie1xuICBcIm5hbWVcIjogXCJ2aXRlLXdlYi1leHRlbnNpb25cIixcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIldhbHJ1cyBNdWx0aXNpZyBEQU9cIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4xLjBcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkEgc2ltcGxlIGNocm9tZSBleHRlbnNpb24gdGVtcGxhdGUgd2l0aCBWaXRlLCBSZWFjdCwgVHlwZVNjcmlwdCBhbmQgVGFpbHdpbmQgQ1NTLlwiLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9RaXpoZW5nTW8vY2hyb21lLWV4dGVuc2lvbi1zaWRlcGFuZWwtdGVtcGxhdGVcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJkZXZcIjogXCJub2RlbW9uXCIsXG4gICAgXCJ3ZWJkZXZcIjogXCJ2aXRlIC0tcG9ydCAzMDAwIC0tb3BlblwiXG4gIH0sXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAbWV0YW1hc2svYnJvd3Nlci1wYXNzd29yZGVyXCI6IFwiXjUuMC4xXCIsXG4gICAgXCJAbXlzdGVuL2Jjc1wiOiBcIl4xLjAuNFwiLFxuICAgIFwiQG15c3Rlbi9zdWlcIjogXCJeMS45LjBcIixcbiAgICBcImFyZ29uMi13YXNtLWVzbVwiOiBcIl4xLjAuM1wiLFxuICAgIFwiYnVmZmVyXCI6IFwiXjYuMC4zXCIsXG4gICAgXCJjbGFzc25hbWVzXCI6IFwiXjIuNS4xXCIsXG4gICAgXCJjcnlwdG8tcmFuZG9tLXN0cmluZ1wiOiBcIl41LjAuMFwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1jb3B5LXRvLWNsaXBib2FyZFwiOiBcIl41LjEuMFwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjIuMFwiLFxuICAgIFwicmVhY3QtaWNvbnNcIjogXCJeNS4zLjBcIixcbiAgICBcInJlYWN0LXRvYXN0aWZ5XCI6IFwiXjEwLjAuNVwiLFxuICAgIFwidHdlZXRuYWNsXCI6IFwiXjEuMC4zXCIsXG4gICAgXCJ0d2VldG5hY2wtdXRpbFwiOiBcIl4wLjE1LjFcIixcbiAgICBcInZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qc1wiOiBcIl4zLjEuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tdG9wLWxldmVsLWF3YWl0XCI6IFwiXjEuNC40XCIsXG4gICAgXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIjogXCJeMC4xMC4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHR5cGVzL2Nocm9tZVwiOiBcIl4wLjAuMjQxXCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4xOC4xMS4xOFwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjAuMjdcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1jb3B5LXRvLWNsaXBib2FyZFwiOiBcIl41LjAuN1wiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4wLjEwXCIsXG4gICAgXCJAdHlwZXMvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTAuMFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI6IFwiXjMuMC4xXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xM1wiLFxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMS4wXCIsXG4gICAgXCJub2RlbW9uXCI6IFwiXjIuMC4yMFwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMjFcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMC4wXCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjIuNFwiLFxuICAgIFwidHMtbm9kZVwiOiBcIl4xMC45LjFcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNC45LjRcIixcbiAgICBcInZpdGVcIjogXCJeNC4wLjRcIixcbiAgICBcInZpdGUtcGx1Z2luLXdhc21cIjogXCJeMy4zLjBcIlxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy90YWhsaWx0YWhsaWwvRGVza3RvcC9HUkxBX0RBTy93YWxydXNEQU8vY2hyb21lLWV4dGVuc2lvbi1zaWRlcGFuZWwtdGVtcGxhdGUvc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3NyYy9tYW5pZmVzdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3NyYy9tYW5pZmVzdC50c1wiO2ltcG9ydCB0eXBlIHsgTWFuaWZlc3QgfSBmcm9tICd3ZWJleHRlbnNpb24tcG9seWZpbGwnO1xuaW1wb3J0IHBrZyBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuXG5jb25zdCBtYW5pZmVzdDogTWFuaWZlc3QuV2ViRXh0ZW5zaW9uTWFuaWZlc3QgPSB7XG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIG5hbWU6IHBrZy5kaXNwbGF5TmFtZSxcbiAgdmVyc2lvbjogcGtnLnZlcnNpb24sXG4gIGRlc2NyaXB0aW9uOiBwa2cuZGVzY3JpcHRpb24sXG4gIG9wdGlvbnNfdWk6IHtcbiAgICBwYWdlOiAnc3JjL3BhZ2VzL29wdGlvbnMvaW5kZXguaHRtbCcsXG4gIH0sXG4gIGJhY2tncm91bmQ6IHtcbiAgICBzZXJ2aWNlX3dvcmtlcjogJ3NyYy9wYWdlcy9iYWNrZ3JvdW5kL2luZGV4LmpzJyxcbiAgICB0eXBlOiAnbW9kdWxlJyxcbiAgfSxcbiAgYWN0aW9uOiB7XG4gICAgZGVmYXVsdF9wb3B1cDogJ3NyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sJyxcbiAgICBkZWZhdWx0X2ljb246ICdpY29uLTM0LnBuZycsXG4gIH0sXG4gIC8vIHJld3JpdGUgbmV3dGFiIGNvbnRlbnQgdG8gY3VzdG9tIHBhZ2VcbiAgLy8gY2hyb21lX3VybF9vdmVycmlkZXM6IHtcbiAgLy8gICBuZXd0YWI6ICdzcmMvcGFnZXMvbmV3dGFiL2luZGV4Lmh0bWwnLFxuICAvLyB9LFxuICBkZXZ0b29sc19wYWdlOiAnc3JjL3BhZ2VzL2RldnRvb2xzL2luZGV4Lmh0bWwnLFxuICAvLyBAdHMtaWdub3JlXG4gIHNpZGVfcGFuZWw6IHtcbiAgICBkZWZhdWx0X3BhdGg6IFwic3JjL3BhZ2VzL3BhbmVsL2luZGV4Lmh0bWxcIixcbiAgfSxcbiAgaWNvbnM6IHtcbiAgICAnMTI4JzogJ2ljb24tMTI4LnBuZycsXG4gIH0sXG4gIHBlcm1pc3Npb25zOiBbXCJzdG9yYWdlXCIsIFwiYWN0aXZlVGFiXCIsIFwic2lkZVBhbmVsXCJdLFxuICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbJ2h0dHA6Ly8qLyonLCAnaHR0cHM6Ly8qLyonLCAnPGFsbF91cmxzPiddLFxuICAgICAganM6IFsnc3JjL3BhZ2VzL2NvbnRlbnQvaW5kZXguanMnXSxcbiAgICAgIGNzczogWydjb250ZW50U3R5bGUuY3NzJ10sXG4gICAgfSxcbiAgXSxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgcmVzb3VyY2VzOiBbJ2NvbnRlbnRTdHlsZS5jc3MnLCAnaWNvbi0xMjgucG5nJywgJ2ljb24tMzQucG5nJywgXCIqLnN2Z1wiXSxcbiAgICAgIG1hdGNoZXM6IFtdLFxuICAgIH0sXG4gIF0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBtYW5pZmVzdDtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZS91dGlscy9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGFobGlsdGFobGlsL0Rlc2t0b3AvR1JMQV9EQU8vd2FscnVzREFPL2Nocm9tZS1leHRlbnNpb24tc2lkZXBhbmVsLXRlbXBsYXRlL3V0aWxzL3BsdWdpbnMvYnVpbGQtY29udGVudC1zY3JpcHQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZS91dGlscy9wbHVnaW5zL2J1aWxkLWNvbnRlbnQtc2NyaXB0LnRzXCI7aW1wb3J0IGNvbG9yTG9nIGZyb20gJy4uL2xvZyc7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb24sIGJ1aWxkIH0gZnJvbSAndml0ZSc7IFxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgb3V0cHV0Rm9sZGVyTmFtZSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qcydcblxuY29uc3QgcGFja2FnZXMgPSBbXG4gIHtcbiAgICBjb250ZW50OiAgcmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi8nLCAnc3JjL3BhZ2VzL2NvbnRlbnQvaW5kZXgudHN4JylcbiAgfSxcbl07XG5cbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vJywgIG91dHB1dEZvbGRlck5hbWUpOyBcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRDb250ZW50U2NyaXB0KCk6IFBsdWdpbk9wdGlvbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2J1aWxkLWNvbnRlbnQnLFxuICAgIGFzeW5jIGJ1aWxkRW5kKCkge1xuICAgICAgZm9yIChjb25zdCBfcGFja2FnZSBvZiBwYWNrYWdlcykge1xuICAgICAgICBhd2FpdCBidWlsZCh7XG4gICAgICAgICAgcHVibGljRGlyOiBmYWxzZSxcbiAgICAgICAgICBwbHVnaW5zOiBbIGNzc0luamVjdGVkQnlKc1BsdWdpbigpIF0sXG4gICAgICAgICAgYnVpbGQ6IHtcbiAgICAgICAgICAgIG91dERpcixcbiAgICAgICAgICAgIHNvdXJjZW1hcDogcHJvY2Vzcy5lbnYuX19ERVZfXyA9PT0gJ3RydWUnLFxuICAgICAgICAgICAgZW1wdHlPdXREaXI6IGZhbHNlLFxuICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgICBpbnB1dDogX3BhY2thZ2UsXG4gICAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAoY2h1bmspID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBgc3JjL3BhZ2VzLyR7Y2h1bmsubmFtZX0vaW5kZXguanNgO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29uZmlnRmlsZTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29sb3JMb2coJ0NvbnRlbnQgY29kZSBidWlsZCBzdWNlc3NmdWxseScsICdzdWNjZXNzJyk7XG4gICAgfSxcbiAgfTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZS91dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZS91dGlscy9jb25zdGFudHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3RhaGxpbHRhaGxpbC9EZXNrdG9wL0dSTEFfREFPL3dhbHJ1c0RBTy9jaHJvbWUtZXh0ZW5zaW9uLXNpZGVwYW5lbC10ZW1wbGF0ZS91dGlscy9jb25zdGFudHMudHNcIjtleHBvcnQgY29uc3Qgb3V0cHV0Rm9sZGVyTmFtZSA9ICdkaXN0JztcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd2EsT0FBTyxXQUFXO0FBQzFiLFNBQVMsV0FBQUEsZ0JBQWU7QUFDeEIsU0FBUyxvQkFB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LGFBQWEsR0FBRyxtQkFBbUIsR0FBRyxLQUFLLEdBQUcsY0FBYyxDQUFDO0FBQUEsRUFDaEY7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQUFDO0FBQUEsSUFDQSxXQUFXLFFBQVEsSUFBSSxZQUFZO0FBQUEsSUFDbkMsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsVUFBVUYsU0FBUSxVQUFVLFlBQVksWUFBWTtBQUFBLFFBQ3BELE9BQU9BLFNBQVEsVUFBVSxTQUFTLFlBQVk7QUFBQSxRQUM5QyxZQUFZQSxTQUFRLFVBQVUsY0FBYyxVQUFVO0FBQUEsUUFDdEQsT0FBT0EsU0FBUSxVQUFVLFNBQVMsWUFBWTtBQUFBLFFBQzlDLFFBQVFBLFNBQVEsVUFBVSxVQUFVLFlBQVk7QUFBQSxRQUNoRCxTQUFTQSxTQUFRLFVBQVUsV0FBVyxZQUFZO0FBQUEsTUFDcEQ7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLFVBQVUsYUFBYSxNQUFNLElBQUk7QUFBQSxNQUNwRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicmVzb2x2ZSIsICJyZXNvbHZlIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInJlc29sdmUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAib3V0RGlyIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInJlc29sdmUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAib3V0RGlyIl0KfQo=
