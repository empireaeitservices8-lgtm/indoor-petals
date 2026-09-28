'use client';

import React, { useState } from 'react';
import { Sun, Droplet, Sprout, Bug, CheckCircle2 } from 'lucide-react';

export const PlantCareGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'light' | 'watering' | 'soil' | 'doctor'>('light');

  const guideTabs = [
    { id: 'light', label: 'Light Guide', icon: Sun },
    { id: 'watering', label: 'Watering Rules', icon: Droplet },
    { id: 'soil', label: 'Potting & Nutrients', icon: Sprout },
    { id: 'doctor', label: 'Plant Doctor FAQ', icon: Bug },
  ];

  return (
    <section className="w-full py-16 bg-white border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Horticulture Wisdom
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-emerald-950 mt-3">
            Plant Care &amp; Gardening Guide
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Every plant from INDOOR PETALS arrives with personalized care support. Here are master gardener secrets to help your indoor jungle thrive.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-stone-100 border border-stone-200/80">
            {guideTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-stone-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200/80">
          {activeTab === 'light' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3">
                  ☀️
                </div>
                <h3 className="text-base font-bold text-stone-900">Direct Full Sun</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  6+ hours of unfiltered rays. Ideal for Bougainvillea, outdoor shrubs, cacti, and desert succulents placed on south-facing balconies.
                </p>
                <div className="mt-3 pt-3 border-t border-stone-100 text-[11px] font-semibold text-emerald-800">
                  Best for: Bougainvillea, Barrel Cactus, Jade
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3">
                  ⛅
                </div>
                <h3 className="text-base font-bold text-stone-900">Bright Indirect Light</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Sunlight filtered through sheer curtains or 3-5 feet away from bright windows. Foliage stays vibrant without sunburn.
                </p>
                <div className="mt-3 pt-3 border-t border-stone-100 text-[11px] font-semibold text-emerald-800">
                  Best for: Monstera Deliciosa, Fiddle Leaf Fig, Palms
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold mb-3">
                  💡
                </div>
                <h3 className="text-base font-bold text-stone-900">Low to Moderate Light</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Adaptable to shaded corners, hallways, and fluorescent office lighting. Requires less frequent watering.
                </p>
                <div className="mt-3 pt-3 border-t border-stone-100 text-[11px] font-semibold text-emerald-800">
                  Best for: ZZ Plant, Snake Plant, Peace Lily, Bamboo
                </div>
              </div>
            </div>
          )}

          {activeTab === 'watering' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <div className="bg-white p-6 rounded-2xl border border-stone-200">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-sky-500" />
                  The 2-Inch Soil Finger Test
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Never water on a rigid calendar. Stick your index finger 2 inches deep into the potting mix. If it comes out completely dry, give it a thorough soak.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Ensure Drainage Holes
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Always allow excess water to drain completely from the bottom pot holes. Standing stagnant water deprives roots of oxygen and triggers root rot.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-teal-600" />
                  Morning Watering Magic
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Water during morning hours so the root zone can absorb hydration through peak photosynthesis hours and foliage stays fungal-free.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'soil' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <div className="bg-white p-6 rounded-2xl border border-stone-200">
                <h3 className="text-sm font-bold text-stone-900">The Golden Tropical Potting Ratio</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  For thriving indoor foliage: 40% Cocopeat / Organic Compost + 30% Red Soil + 20% Perlite / Clay Hydroton Balls + 10% Neem Cake. This provides moisture retention with high aeration.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200">
                <h3 className="text-sm font-bold text-stone-900">Slow-Release Feeding</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Feed active houseplants during growing seasons (spring and monsoons) using BioGreens Seaweed Tonic or slow-release NutriSpikes once every 30-45 days.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'doctor' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <div className="bg-white p-6 rounded-2xl border border-stone-200">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Symptom</span>
                <h3 className="text-sm font-bold text-stone-900 mt-2">Yellowing Lower Leaves</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  <strong>Cause:</strong> Most commonly over-watering or poor soil drainage. Allow soil to dry out and reduce watering frequency.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200">
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">Symptom</span>
                <h3 className="text-sm font-bold text-stone-900 mt-2">Crispy Brown Leaf Tips</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  <strong>Cause:</strong> Low ambient air humidity or tap water chlorine buildup. Mist regularly or group plants together.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Symptom</span>
                <h3 className="text-sm font-bold text-stone-900 mt-2">Drooping Limp Stems</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  <strong>Cause:</strong> Severe thirst or root-bound pot. Give a deep bottom watering soak and inspect if repotting is due.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlantCareGuide;
