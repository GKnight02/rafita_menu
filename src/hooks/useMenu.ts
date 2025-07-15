import { useEffect, useState } from 'react';
import type { Plato } from '../types';

const SHEET_ID = '1a2G9qY9HQ3KChRzzEeLtE3QxPjPgRdCqCN49nERXT6s';
const SHEET_NAME = 'rafita_menu';


const URL = `https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(SHEET_NAME)}`;

export const useMenu = () => {
  const [menu, setMenu] = useState<Plato[]>([]);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data: Plato[]) => {
        const activos = data.filter((p) => p.estado?.toUpperCase() === 'SI');
        setMenu(activos);
      })
      .catch((error) => console.error('Error al cargar el menú:', error));
  }, []);

  return menu;
};
