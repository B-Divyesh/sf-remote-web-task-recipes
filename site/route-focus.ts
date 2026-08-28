export function focusRouteHeading(): void {
  const heading = document.querySelector<HTMLHeadingElement>('main h1');
  if (!heading) return;
  heading.tabIndex = -1;
  const realStartTarget = location.hash === '#support'
    ? document.querySelector<HTMLElement>('#download-extension')
    : null;
  const target = realStartTarget ?? heading;

  const announcement = document.createElement('p');
  announcement.className = 'visually-hidden';
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  document.body.append(announcement);

  requestAnimationFrame(() => {
    target.focus({ preventScroll: true });
    announcement.textContent = target.textContent?.trim() ?? document.title;
  });
}
