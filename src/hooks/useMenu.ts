import { useEffect, useState } from 'react';
import type { Plato } from '../types';

const SHEET_ID = '1a2G9qY9HQ3KChRzzEeLtE3QxPjPgRdCqCN49nERXT6s';
const HOJA_MENU='rafita_menu';
const HOJA_ATENCION='atencion';
const URL_MENU = `https://opensheet.elk.sh/${SHEET_ID}/${HOJA_MENU}`;
const URL_ATENCION = `https://opensheet.elk.sh/${SHEET_ID}/${HOJA_ATENCION}`;

export const useMenu = () => {
  const [menu, setMenu] = useState<Plato[]>([]);
  const [atencion, setAtencion] = useState(true);
  const [motivo, setMotivo] = useState('');

  useEffect(() => {
    // 1. Consultar la hoja de atención
    fetch(URL_ATENCION)
      .then((res) => res.json())
      .then((data) => {
        const control = data[0];
        const activa = control?.atencion?.toUpperCase() === 'SI';
        setAtencion(activa);
        setMotivo(control?.motivo || '');

        // 2. Si hay atención, cargar el menú
        if (activa) {
          fetch(URL_MENU)
            .then((res) => res.json())
            .then((menuData: Plato[]) => {
              const filtrados = menuData
                .filter((p) => p.estado?.toUpperCase() === 'SI')
                .sort((a, b) => {
                  const precioA = parseFloat(a.precio?.replace(/[^\d.]/g, '') || '0');
                  const precioB = parseFloat(b.precio?.replace(/[^\d.]/g, '') || '0');
                  return precioB - precioA;
                });
              setMenu(filtrados);
            });
        }
      })
      .catch((error) => console.error('Error al cargar datos:', error));
  }, []);

  return { menu, atencion, motivo };
};
