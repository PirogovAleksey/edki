import type { Question, QuestionSet } from '../types';
import { loadQuestions } from '../content';
import { renderQuestion } from '../components/question';
import { renderProgressBar } from '../components/progress-bar';

interface TestState {
  questions: Question[];
  topicName: string;
  mode: 'training' | 'exam';
  currentIndex: number;
  answers: (number | null)[];
  showFeedback: boolean;
  timeLimit: number;
  timeRemaining: number;
  timerId: number | null;
}

let state: TestState | null = null;

function cleanup(): void {
  if (state?.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
  state = null;
}

function getPageContent(): HTMLElement {
  return document.getElementById('page-content')!;
}

function render(): void {
  if (!state) return;
  const app = getPageContent();
  const q = state.questions[state.currentIndex];

  const timerHtml = state.mode === 'exam' ? renderTimer(state.timeRemaining) : '';
  const questionMapHtml = state.mode === 'exam' ? renderQuestionMap() : '';

  app.innerHTML = `
    <div class="page">
      <div class="container">
        <h1 class="page__title">${state.topicName} — ${state.mode === 'training' ? 'Тренування' : 'Екзамен'}</h1>
        ${timerHtml}
        ${renderProgressBar(state.currentIndex + 1, state.questions.length)}
        ${questionMapHtml}
        ${renderQuestion(
          q,
          state.currentIndex,
          state.questions.length,
          state.answers[state.currentIndex],
          state.showFeedback && state.mode === 'training'
        )}
        <div class="test-nav">
          ${state.currentIndex > 0 ? '<button class="btn btn--outline" id="prev-btn">← Назад</button>' : '<span></span>'}
          ${getNextButtonHtml()}
        </div>
      </div>
    </div>
  `;

  bindTestEvents();
}

function getNextButtonHtml(): string {
  if (!state) return '';
  const isLast = state.currentIndex === state.questions.length - 1;

  if (state.mode === 'training') {
    if (state.answers[state.currentIndex] === null) return '';
    if (!state.showFeedback) return '';
    return isLast
      ? '<button class="btn btn--primary" id="finish-btn">Результати</button>'
      : '<button class="btn btn--primary" id="next-btn">Далі →</button>';
  }

  // exam mode
  return isLast
    ? '<button class="btn btn--primary" id="finish-btn">Завершити</button>'
    : '<button class="btn btn--primary" id="next-btn">Далі →</button>';
}

function renderTimer(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const timeStr = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  let cls = 'timer';
  if (seconds < 60) cls += ' timer--danger';
  else if (seconds < 300) cls += ' timer--warning';
  return `<div class="${cls}">${timeStr}</div>`;
}

function renderQuestionMap(): string {
  if (!state) return '';
  const items = state.questions.map((_, i) => {
    let cls = 'question-map__item';
    if (state!.answers[i] !== null) cls += ' question-map__item--answered';
    if (i === state!.currentIndex) cls += ' question-map__item--current';
    return `<button class="${cls}" data-goto="${i}">${i + 1}</button>`;
  }).join('');
  return `<div class="question-map">${items}</div>`;
}

function bindTestEvents(): void {
  if (!state) return;

  // Option click
  document.querySelectorAll('.option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state!.mode === 'training' && state!.showFeedback) return;
      const optionIndex = parseInt((btn as HTMLElement).dataset.option!);
      state!.answers[state!.currentIndex] = optionIndex;

      if (state!.mode === 'training') {
        state!.showFeedback = true;
      }

      render();
    });
  });

  // Navigation
  document.getElementById('next-btn')?.addEventListener('click', () => {
    state!.currentIndex++;
    state!.showFeedback = false;
    render();
  });

  document.getElementById('prev-btn')?.addEventListener('click', () => {
    state!.currentIndex--;
    state!.showFeedback = state!.mode === 'training' && state!.answers[state!.currentIndex] !== null;
    render();
  });

  document.getElementById('finish-btn')?.addEventListener('click', () => {
    finishTest();
  });

  // Question map (exam mode)
  document.querySelectorAll('.question-map__item').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt((btn as HTMLElement).dataset.goto!);
      state!.currentIndex = idx;
      state!.showFeedback = state!.mode === 'training' && state!.answers[idx] !== null;
      render();
    });
  });
}

function finishTest(): void {
  if (!state) return;
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }

  const correct = state.answers.reduce<number>((acc, ans, i) => {
    return acc + (ans === state!.questions[i].answer ? 1 : 0);
  }, 0);

  const total = state.questions.length;
  const percent = Math.round((correct / total) * 100);
  const passed = percent >= 60;

  const review = state.questions.map((q, i) => {
    const userAnswer = state!.answers[i];
    const isCorrect = userAnswer === q.answer;
    return `
      <div class="question" style="margin-bottom: 1.5rem;">
        <div class="question__number">Питання ${i + 1}</div>
        <div class="question__text">${q.text}</div>
        <div style="margin: 0.5rem 0; color: ${isCorrect ? 'var(--success)' : 'var(--error)'};">
          Ваша відповідь: ${userAnswer !== null ? q.options[userAnswer] : 'Без відповіді'}
        </div>
        ${!isCorrect ? `<div style="color: var(--success);">Правильна відповідь: ${q.options[q.answer]}</div>` : ''}
        <div class="explanation">${q.explanation}</div>
      </div>
    `;
  }).join('');

  const app = getPageContent();
  app.innerHTML = `
    <div class="page">
      <div class="container">
        <h1 class="page__title">${state.topicName} — Результати</h1>
        <div class="result-score ${passed ? 'result-score--pass' : 'result-score--fail'}">
          ${correct}/${total} (${percent}%)
        </div>
        <p style="text-align: center; color: var(--text-secondary); margin-bottom: 2rem;">
          ${passed ? 'Тест складено!' : 'Тест не складено. Спробуйте ще раз.'}
        </p>
        <div style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 2rem;">
          <a href="#/tests" class="btn btn--outline">До тестів</a>
          <a href="#/topics" class="btn btn--outline">До тем</a>
        </div>
        <h2 style="margin-bottom: 1rem;">Розбір відповідей</h2>
        ${review}
      </div>
    </div>
  `;

  cleanup();
}

export async function startTest(topicId: string, mode: 'training' | 'exam'): Promise<void> {
  cleanup();

  const data: QuestionSet = await loadQuestions(topicId);

  state = {
    questions: data.questions,
    topicName: data.topic,
    mode,
    currentIndex: 0,
    answers: new Array(data.questions.length).fill(null),
    showFeedback: false,
    timeLimit: (data.timeLimit || 60) * 60,
    timeRemaining: (data.timeLimit || 60) * 60,
    timerId: null,
  };

  if (mode === 'exam') {
    state.timerId = window.setInterval(() => {
      if (!state) return;
      state.timeRemaining--;
      if (state.timeRemaining <= 0) {
        finishTest();
        return;
      }
      const timerEl = document.querySelector('.timer');
      if (timerEl) {
        timerEl.outerHTML = renderTimer(state.timeRemaining);
      }
    }, 1000);
  }

  render();
}

export function cleanupTest(): void {
  cleanup();
}
