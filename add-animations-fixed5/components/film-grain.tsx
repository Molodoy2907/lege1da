/**
 * Voile cinématographique : grain animé + vignette douce, façon shader.se.
 * Purement décoratif, non interactif, très léger (pas de JS).
 */
export function FilmGrain() {
  return (
    <div aria-hidden="true" className="film-overlay" data-film-grain>
      <div className="film-vignette" />
      <div className="film-grain" />
    </div>
  )
}
