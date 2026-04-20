export function health() {
  return { status: "ok", stack: "typescript" };
}

console.log(health());
