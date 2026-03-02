import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg-blur" />
        <div className="container hero__content">
          <div className="hero__badge">
            <span className="badge badge-live">
              <span className="pulse-dot" />
              Temps réel
            </span>
          </div>

          <h1 className="hero__title">
            Coupe du Monde
            <span className="hero__year"> 2026</span>
          </h1>

          <p className="hero__subtitle">
            Suivez tous les matchs, scores et phases de compétition en direct.
          </p>

          <div className="hero__actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/matches")}
            >
              Voir les matchs →
            </button>
          </div>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className="container home__cards">
        <div className="info-card">
          <span className="info-card__icon">🏆</span>
          <h3>7 Phases</h3>
          <p>Groupes, Huitièmes, Quarts, Demi-finales, Finale…</p>
        </div>
        <div className="info-card">
          <span className="info-card__icon">⚡</span>
          <h3>Temps réel</h3>
          <p>Scores mis à jour instantanément via WebSocket</p>
        </div>
        <div className="info-card">
          <span className="info-card__icon">🌍</span>
          <h3>48 équipes</h3>
          <p>La plus grande édition de l'histoire de la Coupe du Monde</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
