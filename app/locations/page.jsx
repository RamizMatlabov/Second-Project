'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdSearch, MdLocationOn, MdAccessTime, MdPhone, MdLocalAtm, MdAccountBalance, MdMap, MdList } from 'react-icons/md';
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
  },
  {
    id: 5,
    type: 'branch',
    name: 'Офис "Афросиаб"',
    address: 'г. Самарканд, ул. Дагбитская, 12',
    hours: 'Пн-Пт: 09:00 - 18:00',
    phone: '+998 33 433-44-06',
    features: ['Ипотека', 'Сейфовые ячейки']
  },
  {
    id: 6,
    type: 'atm',
    name: 'Банкомат "Регистан"',
    address: 'г. Самарканд, ул. Регистанская, 5',
    hours: '24/7',
    features: ['Прием наличных', 'NFC']
  }
];

const LocationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, branch, atm
  const [viewMode, setViewMode] = useState('list'); // list, map

  const filteredLocations = locationsData.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         loc.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || loc.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Отделения и банкоматы
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Найдите ближайшее к вам отделение SafePoint Bank в Самарканде
        </motion.p>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchSection}>
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
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
            >
              <MdList /> Список
            </button>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'map' ? styles.active : ''}`}
              onClick={() => setViewMode('map')}
            >
              <MdMap /> Карта
            </button>
          </div>
        </div>

        <div className={styles.filtersWrapper}>
          <div className={styles.filters}>
            <button 
              className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              Все объекты
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
          <div className={styles.resultsCount}>
            Найдено: {filteredLocations.length}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div 
            key="list"
            className={styles.grid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc, idx) => (
                <motion.div 
                  key={loc.id} 
                  className={styles.card}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={styles.cardHeader}>
                    <div className={`${styles.iconBox} ${styles[loc.type]}`}>
                      {loc.type === 'branch' ? <MdAccountBalance /> : <MdLocalAtm />}
                    </div>
                    <div className={styles.titleBox}>
                      <h3>{loc.name}</h3>
                      <span className={styles.typeLabel}>
                        {loc.type === 'branch' ? 'Отделение' : 'Банкомат'}
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.infoItem}>
                      <MdLocationOn className={styles.infoIcon} />
                      <div className={styles.infoText}>
                        <label>Адрес</label>
                        <span>{loc.address}</span>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <MdAccessTime className={styles.infoIcon} />
                      <div className={styles.infoText}>
                        <label>Режим работы</label>
                        <span>{loc.hours}</span>
                      </div>
                    </div>
                    {loc.phone && (
                      <div className={styles.infoItem}>
                        <MdPhone className={styles.infoIcon} />
                        <div className={styles.infoText}>
                          <label>Телефон</label>
                          <span>{loc.phone}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.cardFooter}>
                    <div className={styles.tags}>
                      {loc.features.map((f, i) => (
                        <span key={i} className={styles.tag}>{f}</span>
                      ))}
                    </div>
                    <button className={styles.routeBtn}>Маршрут</button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}><MdSearch /></div>
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить параметры поиска или фильтры</p>
                <button onClick={() => {setSearchTerm(''); setFilter('all');}} className={styles.resetBtn}>Сбросить все</button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="map"
            className={styles.mapPlaceholder}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className={styles.mapInner}>
              <MdMap className={styles.mapIcon} />
              <h3>Интерактивная карта Самарканда</h3>
              <p>Карта временно недоступна. Пожалуйста, используйте список для поиска отделений.</p>
              <button onClick={() => setViewMode('list')} className={styles.resetBtn}>Вернуться к списку</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationsPage;
