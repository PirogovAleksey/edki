import type { Question } from '../types';

export function renderQuestion(
  question: Question,
  index: number,
  total: number,
  selectedAnswer: number | null,
  showFeedback: boolean
): string {
  const options = question.options.map((opt, i) => {
    let cls = 'option';
    if (selectedAnswer === i) cls += ' option--selected';
    if (showFeedback && i === question.answer) cls += ' option--correct';
    if (showFeedback && selectedAnswer === i && i !== question.answer) cls += ' option--incorrect';
    const disabled = showFeedback ? 'disabled' : '';
    return `<button class="${cls}" data-option="${i}" ${disabled}>${opt}</button>`;
  }).join('');

  const explanation = showFeedback
    ? `<div class="explanation">${question.explanation}</div>`
    : '';

  return `
    <div class="question">
      <div class="question__number">Питання ${index + 1} з ${total}</div>
      <div class="question__text">${question.text}</div>
      ${options}
      ${explanation}
    </div>
  `;
}
