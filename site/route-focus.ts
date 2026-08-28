export function focusRouteHeading(): void {
  const heading = document.querySelector<HTMLHeadingElement>('main h1');
  if (!heading) return;
  heading.tabIndex = -1;

  const announcement = document.createElement('p');
  announcement.className = 'visually-hidden';
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  document.body.append(announcement);

  requestAnimationFrame(() => {
    heading.focus({ preventScroll: true });
    announcement.textContent = heading.textContent?.trim() ?? document.title;
  });
}
