'use client';

import React, { useState } from 'react';
import { MdSearch, MdLocationOn, MdAccessTime, MdPhone, MdLocalAtm, MdAccountBalance } from 'react-icons/md';
import styles from './page.module.scss';

const locationsData = [
  {
    id: 1,
    type: 'branch',
    name: 'Центральный офис',
    address: 'г. Самарканд, ул. Абу Рейхан Беруни, 15',
    hours: 'Пн-Пт: 09:00 - 18:00, Сб: 10:00 - 15:00',
    phone: '+998 33 433-44-04',
    features: ['Обмен валют', 'Кредитование', 'VIP-обслуживание']
  },
  {
    id: 2,
    type: 'atm',
    name: 'Банкомат 24/7',
    address: 'г. Самарканд, Университетский бульвар, 1',
    hours: 'Круглосуточно',
    features: ['Прием наличных', 'Выдача валюты']
  },
  {
    id: 3,
    type: 'branch',
    name: 'Филиал "Сиаб"',
    address: 'г. Самарканд, ул. Шахи-Зинда, 42',
    hours: 'Пн-Пт: 09:00 - 17:00',
    phone: '+998 33 433-44-05',
    features: ['Денежные переводы', 'Обслуживание карт']
  },
  {
    id: 4,
    type: 'atm',
    name: 'Банкомат ТЦ "Самарканд"',
    address: 'г. Самарканд, ул. Мирзо Улугбека, 10',
    hours: '09:00 - 22:00',
    features: ['Выдача наличных']
  }
];

const LocationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, branch, atm

  const filteredLocations = locationsData.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         loc.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || loc.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Отделения и банкоматы</h1>
        <p>Найдите ближайшее к вам отделение SafePoint Bank</p>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <MdSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Поиск по адресу или названию..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filters}>
          <button 
            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            Все
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'branch' ? styles.active : ''}`}
            onClick={() => setFilter('branch')}
          >
            Отделения
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'atm' ? styles.active : ''}`}
            onClick={() => setFilter('atm')}
          >
            Банкоматы
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredLocations.length > 0 ? (
          filteredLocations.map(loc => (
            <div key={loc.id} className={styles.card}>
              <div className={styles.cardHeader}>
                {loc.type === 'branch' ? <MdAccountBalance className={styles.typeIcon} /> : <MdLocalAtm className={styles.typeIcon} />}
                <h3>{loc.name}</h3>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.infoItem}>
                  <MdLocationOn />
                  <span>{loc.address}</span>
                </div>
                <div className={styles.infoItem}>
                  <MdAccessTime />
                  <span>{loc.hours}</span>
                </div>
                {loc.phone && (
                  <div className={styles.infoItem}>
                    <MdPhone />
                    <span>{loc.phone}</span>
                  </div>
                )}
              </div>
              <div className={styles.features}>
                {loc.features.map((f, i) => (
                  <span key={i} className={styles.tag}>{f}</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            По вашему запросу ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationsPage;
