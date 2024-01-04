export type HTMLElementEvent<T extends HTMLElement> = Event & {
  readonly target: T;
};
