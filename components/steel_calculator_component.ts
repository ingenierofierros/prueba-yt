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
  const [totalCost, setTotalCost] = useState(0);
  const [steelPrice, setSteelPrice] = useState(28);

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
      '25x25x3': 1.12,
      '38x38x5': 2.77,
      '51x51x6': 4.47,
      '64x64x6': 7.09,
      '76x76x8': 11.40,
      '102x102x10': 19.30,
      '127x127x13': 30.60
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
      profileType: 'IPR',
      size: '100x50',
      length: 1,
      quantity: 1,
      weight: 9.65,
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
    setTotalCost(total * steelPrice);
  }, [elements, steelPrice]);

  const generateReport = () => {
    let report = "REPORTE ESTRUCTURA METÁLICA\n\n";
    
    elements.forEach((element, index) => {
      report += `${index + 1}. ${element.profileType} ${element.size} - ${element.length}m x${element.quantity} = ${element.weight.toFixed(1)}kg\n`;
    });
    
    report += `\nTOTAL: ${totalWeight.toFixed(1)} kg\n`;
    report += `COSTO: $${totalCost.toLocaleString('es-MX')}\n`;
    
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
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Precio/kg:</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={steelPrice}
                onChange={(e) => setSteelPrice(parseFloat(e.target.value) || 0)}
                className="w-20 pl-6 pr-3 py-2 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                step="0.1"
              />
            </div>
          </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-6">
              <div>
                <div className="text-3xl font-bold mb-1">{elements.length}</div>
                <div className="text-gray-400">elementos</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">{totalWeight.toFixed(1)}</div>
                <div className="text-gray-400">kg total</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1 text-green-400">
                  ${totalCost.toLocaleString('es-MX')}
                </div>
                <div className="text-gray-400">costo estimado</div>
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