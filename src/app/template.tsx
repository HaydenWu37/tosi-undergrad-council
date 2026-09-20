/** A template re-mounts on every navigation, giving a gentle page-in transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
