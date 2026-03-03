import { useState, useEffect } from "react";
import { fetchGroups } from "../api/api";
import type { Group } from "../types/match";
import GroupStandings from "../components/GroupStandings";
import "./groups.css";

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        setLoading(true);
        const data = await fetchGroups();
        // Trier les groupes par nom pour un affichage cohérent
        const sortedGroups = data.sort((a, b) => a.name.localeCompare(b.name));
        setGroups(sortedGroups);
      } catch (err) {
        setError("Impossible de charger les groupes");
        console.error("Error loading groups:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, []);

  if (loading) {
    return (
      <div className="groups-page">
        <div className="container groups-page__state">
          <div className="spinner" />
          <p>Chargement des groupes…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="groups-page">
        <div className="container groups-page__state groups-page__state--error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="groups-page">
        <div className="container groups-page__state">
          <p>Aucun groupe disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="groups-page">
      <div className="container">
        {/* Page header */}
        <div className="groups-page__header">
          <h1 className="groups-page__title">Phase de groupes</h1>
          <p className="groups-page__subtitle">
            Classements et statistiques de tous les groupes de la compétition
          </p>
        </div>

        {/* Groups grid */}
        <div className="groups-grid">
          {groups.map((group) => (
            <GroupStandings
              key={group.groupId}
              groupId={group.groupId}
              groupName={group.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groups;
