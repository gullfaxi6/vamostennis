export const EVENTS = [
  {
    id: '1',
    title: 'SUNSET TENNIS SOCIAL',
    subtitle: 'Soirée tennis & échanges',
    date: '24 MAI',
    dateShort: '24',
    month: 'MAI',
    dayLabel: 'SAM. 24 MAI · 18H00',
    location: 'TENNIS CLUB DES PALMIERS',
    backgroundColor: '#2C3E2D',
    featured: true,
    description: 'Une soirée exceptionnelle mêlant tennis et networking dans un cadre enchanteur.',
  },
  {
    id: '2',
    title: 'TOURNOI VAMOS ÉLITE',
    subtitle: 'Compétition privée membres',
    date: '15 JUN',
    dateShort: '15',
    month: 'JUN',
    dayLabel: 'DIM. 15 JUIN · 10H00',
    location: 'STADE ROLAND GARROS',
    backgroundColor: '#1C2E3D',
    featured: false,
    description: 'Tournoi exclusif réservé aux membres Vamos Society. Niveau intermédiaire à expert.',
  },
];

export const MEMBERS = [
  {
    id: '1',
    name: 'Camille D.',
    initials: 'CD',
    memberSince: 2023,
    city: 'Paris',
    premium: true,
  },
  {
    id: '2',
    name: 'Alexandre L.',
    initials: 'AL',
    memberSince: 2022,
    city: 'Lyon',
    premium: true,
  },
  {
    id: '3',
    name: 'Sophie M.',
    initials: 'SM',
    memberSince: 2023,
    city: 'Marseille',
    premium: false,
  },
  {
    id: '4',
    name: 'Lucas R.',
    initials: 'LR',
    memberSince: 2024,
    city: 'Bordeaux',
    premium: false,
  },
];

export const USER = {
  id: 'user_1',
  firstName: 'Marie',
  lastName: 'Dupont',
  fullName: 'Marie Dupont',
  initials: 'MD',
  memberSince: 'Mai 2023',
  memberType: 'Premium',
  city: 'Paris',
  level: 'Intermédiaire',
};

export const PRIVILEGES = [
  {
    id: '1',
    icon: 'heart',
    label: 'Passion',
  },
  {
    id: '2',
    icon: 'people',
    label: 'Rencontres',
  },
  {
    id: '3',
    icon: 'tennisball',
    label: 'Tennis',
  },
  {
    id: '4',
    icon: 'ribbon',
    label: 'Excellence',
  },
  {
    id: '5',
    icon: 'sparkles',
    label: 'Élégance',
  },
];

export default { EVENTS, MEMBERS, USER, PRIVILEGES };
