const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");
const source = path.join(repoRoot, "EDOPro.exe");
const output = path.join(repoRoot, "Ignis-Redux-11.exe");
const brandName = "Ignis-Redux-11";

function terminatedUtf16(value) {
  return Buffer.from(`${value}\0`, "utf16le");
}

function replaceExactTerminatedUtf16(binary, original, replacement) {
  const find = terminatedUtf16(original);
  const replace = terminatedUtf16(replacement);
  if (replace.length > find.length) {
    throw new Error(`Replacement is too long for executable string: ${original}`);
  }

  let count = 0;
  let from = 0;
  while (true) {
    const offset = binary.indexOf(find, from);
    if (offset === -1) {
      break;
    }

    binary.fill(0, offset, offset + find.length);
    replace.copy(binary, offset);
    count += 1;
    from = offset + find.length;
  }

  if (count === 0) {
    throw new Error(`Could not find executable string: ${original}`);
  }

  return count;
}

function replaceTerminatedUtf16WithPrefix(binary, prefix, replacement) {
  const find = Buffer.from(prefix, "utf16le");
  const offset = binary.indexOf(find);
  if (offset === -1) {
    throw new Error(`Could not find executable string beginning with: ${prefix}`);
  }

  let end = offset;
  while (end + 1 < binary.length && (binary[end] !== 0 || binary[end + 1] !== 0)) {
    end += 2;
  }
  if (end + 1 >= binary.length) {
    throw new Error(`Could not find terminator for executable string: ${prefix}`);
  }

  const originalLength = end + 2 - offset;
  const replace = terminatedUtf16(replacement);
  if (replace.length > originalLength) {
    throw new Error(`Replacement is too long for executable string: ${prefix}`);
  }

  binary.fill(0, offset, offset + originalLength);
  replace.copy(binary, offset);
}

if (!fs.existsSync(source)) {
  throw new Error(
    "Expected an upstream EDOPro.exe in the repository root. Add the new portable executable before applying branding.",
  );
}

const binary = fs.readFileSync(source);
replaceTerminatedUtf16WithPrefix(binary, "Project Ignis: EDOPro | ", brandName);
replaceExactTerminatedUtf16(binary, "Project Ignis: EDOPro", brandName);
replaceExactTerminatedUtf16(
  binary,
  "Project Ignis: EDOPro, the bleeding-edge automatic duel simulator",
  brandName,
);

fs.writeFileSync(output, binary);
fs.unlinkSync(source);

console.log(`Branded portable client as ${path.basename(output)}`);
