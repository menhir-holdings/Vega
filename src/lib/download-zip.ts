import JSZip from "jszip";

type ZipEntry = { url: string; filename: string };

export async function downloadImagesAsZip(
  entries: ZipEntry[],
  zipName: string,
  onProgress?: (done: number, total: number) => void,
): Promise<void> {
  const zip = new JSZip();

  for (let i = 0; i < entries.length; i++) {
    const { url, filename } = entries[i];
    const res = await fetch(url);
    if (!res.ok) continue;
    const blob = await res.blob();
    zip.file(filename, blob);
    onProgress?.(i + 1, entries.length);
  }

  const content = await zip.generateAsync({ type: "blob" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(content);
  a.download = zipName;
  a.click();
  URL.revokeObjectURL(a.href);
}
