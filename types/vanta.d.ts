declare module "vanta/dist/vanta.birds.min" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const BIRDS: (opts: Record<string, any>) => { destroy: () => void };
  export default BIRDS;
}
