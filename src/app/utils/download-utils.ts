export function download(base64: string, name: string): void {
  const a = document.createElement('a');
  a.href = base64;
  a.download = name;

  a.click();
}
