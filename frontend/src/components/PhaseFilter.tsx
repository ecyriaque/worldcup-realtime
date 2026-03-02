import type { PhaseType } from "../types/match";
import { PHASE_LABELS, PHASE_ORDER } from "../types/match";
import "./PhaseFilter.css";

interface PhaseFilterProps {
  activePhase: PhaseType | "ALL";
  onChange: (phase: PhaseType | "ALL") => void;
  availablePhases: PhaseType[];
}

const PhaseFilter = ({
  activePhase,
  onChange,
  availablePhases,
}: PhaseFilterProps) => {
  const orderedPhases = PHASE_ORDER.filter((p) => availablePhases.includes(p));

  return (
    <div className="phase-filter" role="tablist" aria-label="Filtrer par phase">
      <button
        role="tab"
        aria-selected={activePhase === "ALL"}
        className={`phase-tab ${activePhase === "ALL" ? "active" : ""}`}
        onClick={() => onChange("ALL")}
      >
        Tous les matchs
      </button>

      {orderedPhases.map((phase) => (
        <button
          key={phase}
          role="tab"
          aria-selected={activePhase === phase}
          className={`phase-tab ${activePhase === phase ? "active" : ""}`}
          onClick={() => onChange(phase)}
        >
          {PHASE_LABELS[phase]}
        </button>
      ))}
    </div>
  );
};

export default PhaseFilter;
