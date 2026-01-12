import React, { useState } from 'react';
import { Settings, Home, Clock, User, Eye, Save, RefreshCw, ChevronRight } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSettingsTab, setCurrentSettingsTab] = useState(null);
  
  // Config JSON (premier fichier)
  const [config, setConfig] = useState({
    calendar_id: "pointage.automatec@gmail.com,gian.automatec@gmail.com",
    employees: "Louis,Esteban,Yvan,Gian",
    time_window_days_detect: 14,
    max_results: 5
  });
  
  // Data JSON (deuxième fichier)
  const [data, setData] = useState({
    heures_planifiees: 40,
    heures_realisees: 35,
    derniere_maj: new Date().toLocaleString('fr-FR')
  });

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleDataChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleRefresh = () => {
    setData(prev => ({ 
      ...prev, 
      derniere_maj: new Date().toLocaleString('fr-FR') 
    }));
  };

  const saveSettings = async () => {
  try {
    const res = await fetch("http://localhost:3001/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ config, data }),
    });

    const json = await res.json();
    if (!json.ok) throw new Error(json.error || "Erreur inconnue");

    alert("✅ Fichiers JSON mis à jour !");
  } catch (err) {
    alert("❌ Impossible d'enregistrer : " + err.message);
  }
  };

  // Page d'accueil
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Home className="w-8 h-8 text-indigo-600" />
                <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  Rafraîchir
                </button>
                <button
                  onClick={() => setCurrentPage('settings')}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  Paramètres
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center h-96 text-gray-400">
              <div className="text-center">
                <Home className="w-24 h-24 mx-auto mb-4 opacity-20" />
                <p className="text-xl">Contenu à venir...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Page des paramètres
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Paramètres</h1>
            </div>
            <button
              onClick={() => {
                setCurrentPage('home');
                setCurrentSettingsTab(null);
              }}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Retour
            </button>
          </div>

          <div className="flex">
            {/* Menu latéral */}
            <div className="w-64 bg-gray-50 p-4 border-r border-gray-200">
              <nav className="space-y-2">
                <button
                  onClick={() => setCurrentSettingsTab('heures')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentSettingsTab === 'heures' 
                      ? 'bg-indigo-600 text-white' 
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Heures</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </button>
                
                <button
                  onClick={() => setCurrentSettingsTab('identifiants')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentSettingsTab === 'identifiants' 
                      ? 'bg-indigo-600 text-white' 
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Identifiants</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </button>
                
                <button
                  onClick={() => setCurrentSettingsTab('affichage')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentSettingsTab === 'affichage' 
                      ? 'bg-indigo-600 text-white' 
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Eye className="w-5 h-5" />
                  <span className="font-medium">Affichage</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </button>
              </nav>
            </div>

            {/* Contenu des paramètres */}
            <div className="flex-1 p-6">
              {!currentSettingsTab && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Settings className="w-16 h-16 mb-4" />
                  <p className="text-lg">Sélectionnez une catégorie de paramètres</p>
                </div>
              )}

              {currentSettingsTab === 'heures' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Gestion des Heures</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heures Planifiées
                      </label>
                      <input
                        type="number"
                        value={data.heures_planifiees}
                        onChange={(e) => handleDataChange('heures_planifiees', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heures Réalisées
                      </label>
                      <input
                        type="number"
                        value={data.heures_realisees}
                        onChange={(e) => handleDataChange('heures_realisees', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fenêtre de détection (jours)
                      </label>
                      <input
                        type="number"
                        value={config.time_window_days_detect}
                        onChange={(e) => handleConfigChange('time_window_days_detect', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">Nombre de jours pour la détection automatique</p>
                    </div>
                  </div>
                </div>
              )}

              {currentSettingsTab === 'identifiants' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Identifiants et Calendriers</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ID Calendriers (séparés par des virgules)
                      </label>
                      <textarea
                        value={config.calendar_id}
                        onChange={(e) => handleConfigChange('calendar_id', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employés (séparés par des virgules)
                      </label>
                      <input
                        type="text"
                        value={config.employees}
                        onChange={(e) => handleConfigChange('employees', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {config.employees.split(',').map((emp, idx) => (
                          <span key={idx} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                            {emp.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentSettingsTab === 'affichage' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Paramètres d'Affichage</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre maximum de résultats
                      </label>
                      <input
                        type="number"
                        value={config.max_results}
                        onChange={(e) => handleConfigChange('max_results', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">Limite d'affichage des résultats</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-2">Aperçu des données</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>• {config.employees.split(',').length} employés configurés</p>
                        <p>• {config.calendar_id.split(',').length} calendriers liés</p>
                        <p>• Fenêtre de {config.time_window_days_detect} jours</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentSettingsTab && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={saveSettings}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    Enregistrer les modifications
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}