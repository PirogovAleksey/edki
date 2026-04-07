export function renderProgressBar(current: number, total: number): string {
  const percent = Math.round((current / total) * 100);
  return `
    <div class="progress-bar">
      <div class="progress-bar__fill" style="width: ${percent}%"></div>
    </div>
  `;
}
