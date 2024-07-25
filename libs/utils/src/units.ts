export function em2px(em: number) {
  return (
    Number(em) *
    Number(
      window
        ?.getComputedStyle(document.body)
        .getPropertyValue('font-size')
        .match(/\d+/)?.[0] ?? 16,
    )
  );
}
