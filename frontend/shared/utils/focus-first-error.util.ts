const ErrorSelector = '[aria-invalid="true"], [data-slot="field-error"]';

export function focusFirstError() {
  requestAnimationFrame(() => {
    const element = document.querySelector<HTMLElement>(ErrorSelector);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element?.focus({ preventScroll: true });
  });
}
