'use client'

import React, { useState, useEffect } from 'react';
import { Plus, X, Download, Calculator } from 'lucide-react';

interface Element {
  id: number;
  profileType: string;
  size: string;
  length: number;
  quantity: number;
  weight: number;
  brand: string;
}

const SteelWeightCalculator = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [totalWeight, setTotalWeight] = useState(0);

  // Base de datos de perfiles estándar mexicanos (kg/m)
  const profiles: Record<string, Record<string, number>> = {
    'IPR': {
      '100x50': 9.65,
      '120x64': 13.10,
      '150x75': 17.90,
      '200x100': 25.30,
      '250x125': 37.20,
      '300x150': 46.10,
      '350x175': 57.00,
      '400x200': 66.30
    },
    'IPS': {
      '76x76': 8.50,
      '102x102': 15.40,
      '127x127': 23.80,
      '152x152': 34.20,
      '203x203': 60.00,
      '254x254': 88.90,
      '305x305': 137.00
    },
    'Ángulo': {
      '3/4 x 1/8 (19x3mm)': 0.88,
      '3/4 x 3/16 (19x5mm)': 1.25,
      '1 x 1/8 (25x3mm)': 1.19,
      '1 x 3/16 (25x6mm)': 1.73,
      '1 x 1/4 (25x6mm)': 2.32,
      '1 1/4 x 1/8 (32x3mm)': 1.5,
      '1 1/4 x 3/16 (32x5mm)': 2.2,
      '1 1/4 x 1/4 (32x6mm)': 2.86,
      '1 1/2 x 1/8 (38x3mm)': 1.83,
      '1 1/2 x 3/16 (38x5mm)': 2.68,
      '1 1/2 x 1/4 (38x6mm)': 3.48,
      '1 1/2 x 5/16 (38x8mm)': 4.26,
      '1 1/2 x 3/8 (38x10mm)': 4.99,
      '1 3/4 x 1/8 (44x3mm)': 2.14,
      '1 3/4 x 3/16 (44x5mm)': 3.15,
      '1 3/4 x 1/4 (44x6mm)': 4.12,
      '1 3/4 x 5/16 (44x8mm)': 5.04,
      '2 x 1/8 (51x3mm)': 2.46,
      '2 x 3/16 (51x5mm)': 3.63,
      '2 x 1/4 (51x6mm)': 4.75,
      '2 x 5/16 (51x8mm)': 5.83,
      '2 x 3/8 (51x10mm)': 7.0,
      '2 1/2 x 3/16 (64x5mm)': 4.57,
      '2 1/2 x 1/4 (64x6mm)': 6.1,
      '2 1/2 x 5/16 (64x8mm)': 7.44,
      '2 1/2 x 3/8 (64x10mm)': 8.78,
      '2 1/2 x 1/2 (64x13mm)': 11.46,
      '3 x 3/16 (76x5mm)': 5.52,
      '3 x 1/4 (76x6mm)': 7.3,
      '3 x 5/16 (76x8mm)': 9.08,
      '3 x 3/8 (76x10mm)': 10.72,
      '3 x 7/16 (76x11mm)': 12.35,
      '3 x 1/2 (76x13mm)': 13.99,
      '3 1/2 x 1/4 (89x6mm)': 8.63,
      '3 1/2 x 5/16 (89x8mm)': 10.72,
      '3 1/2 x 3/8 (89x10mm)': 12.65,
      '3 1/2 x 7/16 (89x11mm)': 14.59,
      '3 1/2 x 1/2 (89x13mm)': 16.52,
      '4 x 1/4 (102x6mm)': 9.82,
      '4 x 5/16 (102x8mm)': 12.2,
      '4 x 3/8 (102x10mm)': 14.59,
      '4 x 7/16 (102x11mm)': 16.82,
      '4 x 1/2 (102x13mm)': 19.05,
      '4 x 5/8 (102x16mm)': 23.37,
      '4 x 3/4 (102x19mm)': 27.54,
      '5 x 5/16 (127x8mm)': 15.33,
      '5 x 3/8 (127x10mm)': 18.31,
      '5 x 7/16 (127x11mm)': 21.29,
      '5 x 1/2 (127x13mm)': 24.11,
      '5 x 5/8 (127x16mm)': 29.77,
      '5 x 3/4 (127x19mm)': 35.13,
      '5 x 7/8 (127x22mm)': 40.49,
      '6 x 5/16 (152x8mm)': 18.46,
      '6 x 3/8 (152x10mm)': 22.18,
      '6 x 7/16 (152x11mm)': 25.6,
      '6 x 1/2 (152x13mm)': 29.17,
      '6 x 9/16 (152x14mm)': 32.6,
      '6 x 5/8 (152x16mm)': 36.02,
      '6 x 3/4 (152x19mm)': 42.72,
      '6 x 7/8 (152x22mm)': 49.27,
      '6 x 1 (152x25mm)': 55.67,
      '8 x 1/2 (203x13mm)': 39.3,
      '8 x 9/16 (203x14mm)': 44.06,
      '8 x 5/8 (203x16mm)': 48.67,
      '8 x 3/4 (203x19mm)': 57.9,
      '8 x 7/8 (203x22mm)': 66.98,
      '8 x 1 (203x25mm)': 75.91,
      '8 x 1 1/8 (203x29mm)': 84.7
    },
    'Canal': {
      '76x38': 5.90,
      '102x51': 10.40,
      '127x64': 14.90,
      '152x76': 19.30,
      '203x89': 29.80,
      '254x102': 41.70,
      '305x102': 55.70
    },
    'Tubo Rectangular': {
      '40x20x2': 1.84,
      '50x25x2': 2.42,
      '60x40x3': 4.32,
      '80x40x3': 5.49,
      '100x50x4': 8.77,
      '120x60x4': 10.90,
      '150x100x5': 18.20
    },
    'Tubo Circular': {
      '25x2': 1.21,
      '32x2': 1.59,
      '51x3': 3.58,
      '76x3': 5.59,
      '102x4': 9.56,
      '152x5': 18.20,
      '203x6': 29.40
    }
  };

  const addElement = () => {
    const newElement: Element = {
      id: Date.now(),
      profileType: 'Ángulo',
      size: '3/4 x 1/8 (19x3mm)',
      length: 1,
      quantity: 1,
      weight: 0.88,
      brand: ''
    };
    setElements([...elements, newElement]);
  };

  const updateElement = (id: number, field: keyof Element, value: any) => {
    setElements(elements.map(element => {
      if (element.id === id) {
        const updated = { ...element, [field]: value };
        const profileWeight = profiles[updated.profileType][updated.size] || 0;
        updated.weight = profileWeight * updated.length * updated.quantity;
        return updated;
      }
      return element;
    }));
  };

  const removeElement = (id: number) => {
    setElements(elements.filter(element => element.id !== id));
  };

  useEffect(() => {
    const total = elements.reduce((sum, element) => sum + element.weight, 0);
    setTotalWeight(total);
  }, [elements]);

  const generateReport = () => {
    let report = "REPORTE ESTRUCTURA METÁLICA\n\n";
    
    elements.forEach((element, index) => {
      report += `${index + 1}. ${element.profileType} ${element.size} - ${element.length}m x${element.quantity} = ${element.weight.toFixed(1)}kg\n`;
    });
    
    report += `\nTOTAL: ${totalWeight.toFixed(1)} kg\n`;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estructura_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        
        {/* Header ultra minimalista */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">StructCalc</h1>
          <p className="text-gray-500">Calculadora de peso para estructuras metálicas</p>
        </div>

        {/* Controles principales */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={addElement}
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Agregar elemento
          </button>
        </div>

        {/* Lista de elementos */}
        <div className="space-y-4 mb-8">
          {elements.map((element) => (
            <div key={element.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                
                <div className="col-span-2 md:col-span-1">
                  <select
                    value={element.profileType}
                    onChange={(e) => {
                      const newType = e.target.value;
                      const firstSize = Object.keys(profiles[newType])[0];
                      updateElement(element.id, 'profileType', newType);
                      updateElement(element.id, 'size', firstSize);
                    }}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    {Object.keys(profiles).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <select
                    value={element.size}
                    onChange={(e) => updateElement(element.id, 'size', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    {Object.keys(profiles[element.profileType]).map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <input
                    type="text"
                    value={element.brand}
                    onChange={(e) => updateElement(element.id, 'brand', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Marca"
                  />
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="number"
                      value={element.length}
                      onChange={(e) => updateElement(element.id, 'length', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 pr-8 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      step="0.1"
                      min="0"
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">m</span>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="number"
                      value={element.quantity}
                      onChange={(e) => updateElement(element.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 pr-8 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      min="1"
                      placeholder="1"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">pz</span>
                  </div>
                </div>

                <div>
                  <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-center font-medium text-gray-900">
                    {element.weight.toFixed(1)} kg
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => removeElement(element.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resultados */}
        {elements.length > 0 && (
          <div className="bg-gray-900 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center mb-6">
              <div>
                <div className="text-3xl font-bold mb-1">{elements.length}</div>
                <div className="text-gray-400">elementos</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">{totalWeight.toFixed(1)}</div>
                <div className="text-gray-400">kg total</div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={generateReport}
                className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-medium"
              >
                <Download className="w-5 h-5 mr-2" />
                Descargar reporte
              </button>
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {elements.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Calculator className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Comienza tu cálculo</h3>
            <p className="text-gray-500 mb-6">Agrega elementos metálicos para calcular el peso total</p>
            <button 
              onClick={addElement}
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Agregar primer elemento
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default SteelWeightCalculator;
