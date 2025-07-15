import { useEffect, useState } from 'react';
import type { Plato } from '../types';

const SHEET_ID = '1a2G9qY9HQ3KChRzzEeLtE3QxPjPgRdCqCN49nERXT6s';
const MENU_SHEET = 'rafita_menu';
const INFO_SHEET = 'atencion';

const useMenu = () => {
  const [menu, setMenu] = useState<Plato[]>([]);
  const [atencion, setAtencion] = useState(true);
  const [motivo, setMotivo] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [nota, setNota] = useState('');
  const [nombreContacto, setNombreContacto] = useState('');
  const [direccionLocal, setdireccionLocal] = useState('');


  useEffect(() => {
    // Cargar menú
    fetch(`https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(MENU_SHEET)}`)
      .then(res => res.json())
      .then((data: Plato[]) => {
        const activos = data
          .filter(p => p.estado?.toUpperCase() === 'SI')
          .sort((a, b) => parseFloat(b.precio.replace(/[^0-9.]/g, '')) - parseFloat(a.precio.replace(/[^0-9.]/g, '')));
        setMenu(activos);
      });

    // Cargar info de atención
    fetch(`https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(INFO_SHEET)}`)
      .then(res => res.json())
      .then(data => {
        const info = data[0];
        setAtencion(info.atencion?.toUpperCase() === 'SI');
        setMotivo(info.motivo || '');
        setWhatsapp(info.whatsapp || '');
        setHoraInicio(info.hora_inicio || '');
        setHoraFin(info.hora_fin || '');
        setNota(info.nota || '');
        setNombreContacto(info.nombre_contacto || '');
        setdireccionLocal(info.direccion_local || '');
      });
  }, []);

  return { menu, atencion, motivo, whatsapp, horaInicio, horaFin, nota,nombreContacto, direccionLocal};
};

export { useMenu };
