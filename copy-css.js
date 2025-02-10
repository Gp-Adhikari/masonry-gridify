import { readdirSync, copyFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const srcDir = "src";
const distDir = "dist";

function copyCSSFiles(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  readdirSync(src, { withFileTypes: true }).forEach((entry) => {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyCSSFiles(srcPath, destPath);
    } else if (entry.name.endsWith(".css")) {
      copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  });
}

copyCSSFiles(srcDir, distDir);
