"use client";

export function ExportButton({
  disabled,
  exporting,
  onExport,
}: {
  disabled?: boolean;
  exporting?: boolean;
  onExport: () => void;
}) {
  return (
    <button
      type="button"
      className="btn btn-ghost"
      disabled={disabled || exporting}
      onClick={onExport}
    >
      {exporting ? "Exporting…" : "Export PNG"}
    </button>
  );
}
