export function GeodeBanner({ title, children }) {
  return (
    <section className="geode-banner">
      {title ? <h1 className="text-geode-h4 font-geode font-geode-heading text-geode-text">{title}</h1> : null}
      {children}
    </section>
  )
}
