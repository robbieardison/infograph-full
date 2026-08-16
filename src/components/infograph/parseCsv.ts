import Papa from "papaparse";
import { LIMITS, type CsvRow } from "./types";

export type ParseProgress = {
  rowsKept: number;
  bytesRead: number;
  totalBytes: number;
  truncated: boolean;
};

export type ParseResult = {
  rows: CsvRow[];
  fileName: string;
  truncated: boolean;
  totalSeen: number;
};

export function validateFile(file: File): string | null {
  if (file.size > LIMITS.maxFileBytes) {
    return `File is ${(file.size / (1024 * 1024)).toFixed(1)} MB. Soft limit is ${LIMITS.maxFileBytes / (1024 * 1024)} MB.`;
  }
  const nameOk = /\.csv$/i.test(file.name) || /csv|text\/plain|text\/csv/i.test(file.type || "");
  if (!nameOk && file.type && !/octet-stream/i.test(file.type)) {
    return "Please upload a .csv file.";
  }
  return null;
}

export function parseFile(
  file: File,
  onProgress: (p: ParseProgress) => void
): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    const kept: CsvRow[] = [];
    let truncated = false;
    let totalSeen = 0;
    let lastProgress = 0;

    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      worker: true,
      chunkSize: 1024 * 64,
      chunk: (results: Papa.ParseResult<CsvRow>, parser: Papa.Parser) => {
        const chunk = results.data || [];
        for (let i = 0; i < chunk.length; i++) {
          totalSeen += 1;
          if (kept.length < LIMITS.maxRows) kept.push(chunk[i]);
          else truncated = true;
        }
        const now = performance.now();
        if (now - lastProgress > 80) {
          lastProgress = now;
          onProgress({
            rowsKept: kept.length,
            bytesRead: results.meta?.cursor || 0,
            totalBytes: file.size,
            truncated,
          });
        }
        if (truncated) parser.abort();
      },
      complete: () => {
        if (!kept.length) {
          reject(new Error("Could not parse CSV — no usable rows."));
          return;
        }
        resolve({ rows: kept, fileName: file.name, truncated, totalSeen });
      },
      error: (err: Error) => reject(new Error(err?.message || "Parse error")),
    });
  });
}

export function parseText(
  text: string,
  fileName: string,
  onProgress: (p: ParseProgress) => void
): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    const approxBytes = new Blob([text]).size;
    if (approxBytes > LIMITS.maxFileBytes) {
      reject(new Error(`Text is over the ${LIMITS.maxFileBytes / (1024 * 1024)} MB soft limit.`));
      return;
    }

    const kept: CsvRow[] = [];
    let truncated = false;
    let totalSeen = 0;

    Papa.parse<CsvRow>(text, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      chunk: (results: Papa.ParseResult<CsvRow>, parser: Papa.Parser) => {
        const chunk = results.data || [];
        for (let i = 0; i < chunk.length; i++) {
          totalSeen += 1;
          if (kept.length < LIMITS.maxRows) kept.push(chunk[i]);
          else truncated = true;
        }
        onProgress({
          rowsKept: kept.length,
          bytesRead: results.meta?.cursor || 0,
          totalBytes: approxBytes,
          truncated,
        });
        if (truncated) parser.abort();
      },
      complete: () => {
        if (!kept.length) {
          reject(new Error("Could not parse CSV — no usable rows."));
          return;
        }
        resolve({ rows: kept, fileName, truncated, totalSeen });
      },
      error: (err: Error) => reject(new Error(err?.message || "Parse error")),
    });
  });
}

export async function loadSampleCsv(
  onProgress: (p: ParseProgress) => void
): Promise<ParseResult> {
  const res = await fetch("/samples/sample-data.csv");
  if (!res.ok) throw new Error(res.statusText);
  const text = await res.text();
  return parseText(text, "sample-data.csv", onProgress);
}
