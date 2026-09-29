import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const inputDir = path.resolve("originals");
const outputDir = path.resolve("public/photos");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff"]);
const widths = [800, 2000];

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

const inputFiles = (await readdir(inputDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name);

if (inputFiles.length === 0) {
  throw new Error(`No supported photos found in ${inputDir}`);
}

for (const filename of inputFiles) {
  const inputPath = path.join(inputDir, filename);
  const basename = path.basename(filename, path.extname(filename));
  const inputBytes = (await stat(inputPath)).size;
  const outputs = [];

  for (const width of widths) {
    for (const format of ["webp", "jpeg"]) {
      const extension = format === "jpeg" ? "jpg" : "webp";
      const outputPath = path.join(outputDir, `${basename}-${width}.${extension}`);
      const pipeline = sharp(inputPath).rotate().resize({ width, withoutEnlargement: true });

      if (format === "webp") {
        await pipeline.webp({ quality: 80 }).toFile(outputPath);
      } else {
        await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(outputPath);
      }

      const outputStats = await stat(outputPath);
      outputs.push({ path: outputPath, bytes: outputStats.size });
    }
  }

  console.log(`${filename}: original ${formatBytes(inputBytes)}`);
  for (const output of outputs) {
    console.log(`  ${path.basename(output.path)}: ${formatBytes(output.bytes)}`);
  }
}