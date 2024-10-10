export function array(length: number): undefined[] {
  return Array(length).fill(undefined);
}

export function splitIntoChunks<T>(bigArray: T[], chunkSize = 100): T[][] {
  return array(Math.ceil(bigArray.length / chunkSize))
    .map((_, i) => i * chunkSize)
    .map((start) => bigArray.slice(start, start + chunkSize));
}

export function processChunks<T>(
  chunks: T[][],
  processFn: (value: T, index: number, array: T[]) => void,
  completeFn?: Function,
  waitMs = 100
): void {
  let i = 0;

  const processChunk = () => {
    chunks[i].forEach(processFn);
    i++;

    if (i < chunks.length) {
      setTimeout(processChunk, waitMs);
    } else {
      completeFn?.call(undefined);
    }
  };

  processChunk();
}
