// ==========================================
// CONSTANTES & REGISTRES (Version v1.3.19 - Règlements UC & SC Intégraux)
// ==========================================
const APP_VERSION = "v1.3.19";
const DEBUG = false;
const SHIPS = {
  FROMBOLA:{level:0,cont:10,ppr:5,radMax:2,resMax:3,eqMin:1,promo:6,grade:'Decurio'},
  GLADIUM: {level:1,cont:16,ppr:4,radMax:3,resMax:4,eqMin:2,promo:6,grade:'Centurio'},
  SPATHA:  {level:2,cont:19,ppr:5,radMax:3,resMax:4,eqMin:4,promo:7,grade:'Proconsul'},
  HASTA:   {level:3,cont:21,ppr:4,radMax:3,resMax:5,eqMin:6,promo:8,grade:'Consul'}
};
const BOUNDS = {xMin:-18,xMax:19,yMin:-12,yMax:12,zMin:1,zMax:4};

// Tableau A : Attaque Légion
const TAB_A = {
  1:['-','-','-','-','-','-','F'],
  2:['-','-','-','-','-','F','F'],
  3:['-','-','-','F','F','F','U'],
  4:['-','-','F','F','F','U','U'],
  5:['-','F','F','F','U','U','U'],
  6:['F','F','F','U','U','U','U']
};

// Tableau B : Attaque Extrasolaires
const TAB_B = {
  1:[0,0,0,0,0,0,0],
  2:[0,0,0,0,0,1,1],
  3:[0,0,0,1,1,1,2],
  4:[0,0,1,1,2,2,3],
  5:[0,1,1,2,2,2,3],
  6:[1,1,2,2,3,3,4]
};

// Tableau C : Dégâts vaisseau
const TAB_C = {1:'bou',2:'las',3:'rad',4:'com',5:'res',6:'coque'};
// Noms complets affichés dans le journal (sans abréviations)
const NOM_ELEMENT = {
  bou:   'boucliers SOK 9',
  las:   'lasers de bord ZIP 11',
  rad:   'radars VISUS',
  com:   'ordinateurs MATER',
  res:   'réservoirs J.NA',
  coque: 'coque du vaisseau'
};

// Tableau D : Capture Non Sapiens
const TAB_D = {
  1:['N','N','N','N','-','-'],
  2:['N','N','N','-','-','Y'],
  3:['N','N','-','-','Y','Y'],
  4:['N','-','-','Y','Y','Y'],
  5:['-','-','Y','Y','Y','Y'],
  6:['Y','Y','Y','Y','Y','Y']
};

// Tableau E : Alliances (colonnes : Facteur d'Alliance 1, 2, 3, 4+)
const TAB_E = {
  1:['N','N','N','-'],
  2:['N','N','-','Y'],
  3:['N','-','Y','Y'],
  4:['-','Y','Y','Y'],
  5:['Y','Y','Y','Y'],
  6:['Y','Y','Y','Y']
};

// Tableau F : Intimidation
const TAB_F = {
  1:['N','N','N','N','-','-'],
  2:['N','N','N','-','-','Y'],
  3:['N','N','-','-','Y','Y'],
  4:['N','-','-','Y','Y','Y'],
  5:['-','-','Y','Y','Y','Y'],
  6:['Y','Y','Y','Y','Y','Y']
};

// Tableau G : Points de vénération
const TAB_G = {1:2,2:2,3:3,4:3,5:4,6:4};

// Tableau H : Commerce (Mode de Base)
const TAB_H = {1:-2,2:-1,3:0,4:0,5:2,6:3};

// Tableau I : Commerce (Mode Avancé : D6 croisé avec Personnalité 0 à 5)
const TAB_I = {
  1:[-1,-1,-1,-2,-3,-3],
  2:[null,0,0,-1,-2,-2],
  3:[null,1,1,0,null,-1],
  4:[1,2,2,0,2,null],
  5:[2,3,2,2,3,4],
  6:[2,4,3,3,4,5]
};

// Tableau L : Lancement de TOT 100% (Arme iono-nucléaire Spatha / Hasta, colonnes Pers. 0 à 5)
const TAB_L = {
  1:['N','N','N','N','N','Y'],
  2:['N','N','N','N','Y','Y'],
  3:['N','N','N','Y','Y','Y'],
  4:['N','N','Y','Y','Y','Y'],
  5:['N','Y','Y','Y','Y','Y'],
  6:['Y','Y','Y','Y','Y','Y']
};

// Tableau Prise de la Pierre ROTSA (NILBOG pacifiques, colonnes : 1 à 5 équipages)
const TAB_ROTSA = {
  1:[null,null,null,null,null],
  2:[null,null,null,null,null],
  3:[null,null,null,null,null],
  4:[5,3,3,null,null],
  5:[10,5,5,5,null],
  6:[15,10,10,10,10]
};

const PLANET_O = {A:2,B:1,C:null,D:1,E:null,F:1,G:3,H:4};
const ZONES = ['Désert','Pyramides','Village','Marais','Forêt','Eau','Glace'];
const ZONE_NORM = {'Désert':'DESERT','Pyramides':'PYRAMIDES','Village':'VILLAGE','Marais':'MARAIS','Forêt':'FORET','Eau':'EAU','Glace':'GLACE'};
const dirVectors = {'N':{x:0,y:1},'NE':{x:1,y:1},'E':{x:1,y:0},'SE':{x:1,y:-1},'S':{x:0,y:-1},'SO':{x:-1,y:-1},'O':{x:-1,y:0},'NO':{x:-1,y:1}};
const ALIEN_FC = 5;

const RACES = {
  "AMOEBA": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "1/1", "missions": ["ELIMINATION"], "fc": 10, "valeurElim": 3, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["DESERT"], "bonus": 2}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2, 3], "nombre": 1}, {"des": [4, 5], "nombre": 2}, {"des": [6], "nombre": 4}], "arrivees": [{"des": [1, 2, 3, 4], "nombre": 0}, {"des": [5], "nombre": 1}, {"des": [6], "nombre": 3}], "notes": "1 pt par kg (table spéciale selon ratio F.C.). Le feu divise sa force par 2 ; une supériorité excessive la rend inutilisable."},
  "CERBERUS": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "1/2", "missions": ["ELIMINATION", "CAPTURE"], "fc": 6, "valeurElim": 3, "valeurCapture": 12, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["GLACE"], "bonus": 4}, "milieuNonViable": ["MARAIS"], "presences": [{"des": [1], "nombre": 1}, {"des": [2, 3], "nombre": 2}, {"des": [4, 5], "nombre": 3}, {"des": [6], "nombre": 4}], "arrivees": [{"des": [1, 2], "nombre": 0}, {"des": [3, 4, 5], "nombre": 2}, {"des": [6], "nombre": 5}], "notes": "Attaque l'objectif le plus proche (l'équipage s'il est débarqué). Très recherché pour capture (12 pts) ou élimination (3 pts)."},
  "LITOFAGUS": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "1/3", "missions": ["ELIMINATION"], "fc": 5, "valeurElim": 3, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["PYRAMIDES"], "bonus": 1}, "milieuNonViable": ["FORET", "EAU", "MARAIS"], "presences": [{"des": [1, 2, 3, 4], "nombre": 2}, {"des": [5], "nombre": 4}, {"des": [6], "nombre": 6}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4, 5, 6], "nombre": 2}], "notes": "Peut détruire les combinaisons des équipages à terre. Attaque les vaisseaux à défaut. Ne survit pas en captivité."},
  "SPHAERAE": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "1/4", "missions": ["ELIMINATION"], "fc": null, "valeurElim": 5, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["DESERT", "GLACE"], "bonus": null}, "milieuNonViable": ["EAU", "PYRAMIDES"], "presences": [{"des": [1, 2], "nombre": 6}, {"des": [3, 4, 5], "nombre": 10}, {"des": [6], "nombre": 20}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4, 5], "nombre": 4}, {"des": [6], "nombre": 10}], "notes": "Attaquent directement le vaisseau. Armes à air sans effet. F.C. selon masse : 0,5 contre équipage, 1 à 2,5 contre vaisseau (niv. 0 à 3)."},
  "NUBIS_ARENAE": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "1/5", "missions": ["ELIMINATION"], "fc": null, "valeurElim": 6, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["DESERT"], "bonus": null}, "milieuNonViable": ["EAU", "FORET"], "presences": [{"des": [1, 2], "nombre": 1}, {"des": [3, 4], "nombre": 2}, {"des": [5, 6], "nombre": 3}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4, 5], "nombre": 1}, {"des": [6], "nombre": 2}], "notes": "Dans le désert, toujours 3 N.A. Aucune arme n'agit sauf SIL 4 (désintégration auto). N'attaquent pas les équipages à terre."},
  "SUBTERRANEI": {"cat": "NON_SAPIENS", "type": "NON_VISIBLES", "ref": "1/6", "missions": ["ELIMINATION", "CAPTURE"], "fc": 8, "valeurElim": 3, "valeurCapture": 16, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["MARAIS"], "bonus": 2}, "milieuNonViable": ["EAU", "GLACE"], "presences": [{"des": [1, 2], "nombre": 1}, {"des": [3, 4, 5], "nombre": 2}, {"des": [6], "nombre": 3}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4, 5, 6], "nombre": 1}], "notes": "Invisibles. Attaquent surtout les vaisseaux atterris, sauf attaque préventive des équipages."},
  "AERIFORMI": {"cat": "NON_SAPIENS", "type": "NON_VISIBLES", "ref": "1/7", "missions": ["ELIMINATION"], "fc": 2, "valeurElim": 5, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["FORET"], "bonus": 3}, "milieuNonViable": ["VILLAGE", "EAU"], "presences": [{"des": [1, 2], "nombre": 1}, {"des": [3], "nombre": 2}, {"des": [4], "nombre": 3}, {"des": [5, 6], "nombre": 5}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4, 5], "nombre": 1}, {"des": [6], "nombre": 3}], "notes": "Invisibles. Se désintègrent sur boucliers activés ; sans bouclier, tuent tout l'équipage à bord. Détruits seulement par laser ou SIL 4."},
  "MIMESIS": {"cat": "NON_SAPIENS", "type": "NON_VISIBLES", "ref": "1/8", "missions": ["ELIMINATION"], "fc": 6, "valeurElim": 5, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["GLACE", "DESERT"], "bonus": 1}, "milieuNonViable": ["FORET"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5, 6], "nombre": 2}], "arrivees": [{"des": [1, 2, 3, 4], "nombre": 0}, {"des": [5], "nombre": 1}, {"des": [6], "nombre": 3}], "notes": "Invisibles. Ne peuvent pas être capturés vivants."},
  "LIANA_NIGRA": {"cat": "NON_SAPIENS", "type": "VELENOSI", "ref": "2/1", "missions": ["ELIMINATION", "CAPTURE"], "fc": 2, "valeurElim": 2, "valeurCapture": 6, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["FORET", "MARAIS"], "bonus": 3}, "milieuNonViable": ["PYRAMIDES"], "presences": [{"des": [1, 2], "nombre": 1}, {"des": [3, 4, 5], "nombre": 2}, {"des": [6], "nombre": 3}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4], "nombre": 1}, {"des": [5], "nombre": 2}, {"des": [6], "nombre": 3}], "notes": "Venimeux (pertes doublées). Ne s'approche jamais des vaisseaux."},
  "BAVOSUS": {"cat": "NON_SAPIENS", "type": "VELENOSI", "ref": "2/2", "missions": ["ELIMINATION", "CAPTURE"], "fc": 15, "valeurElim": 6, "valeurCapture": 20, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["DESERT"], "bonus": 2}, "milieuNonViable": ["FORET", "MARAIS"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5, 6], "nombre": 2}], "arrivees": [{"des": [1, 2, 3, 4], "nombre": 0}, {"des": [5], "nombre": 1}, {"des": [6], "nombre": 2}], "notes": "Venimeux. N'attaquent pas les équipages tant qu'ils n'ouvrent pas le feu. Éliminés par laser : 0 pt si tirage pair."},
  "RADICALES": {"cat": "NON_SAPIENS", "type": "VELENOSI", "ref": "2/3", "missions": ["ELIMINATION", "CAPTURE"], "fc": 10, "valeurElim": 5, "valeurCapture": 15, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["FORET", "MARAIS"], "bonus": 8}, "milieuNonViable": ["DESERT", "GLACE"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5, 6], "nombre": 2}], "arrivees": [], "notes": "Venimeux. Éliminés au laser : 0 pt si tirage pair."},
  "SEVOLVENTES": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "2/4", "missions": ["ELIMINATION"], "fc": 2, "valeurElim": 5, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["GLACE"], "bonus": 1}, "milieuNonViable": ["FORET", "EAU"], "presences": [{"des": [1, 2], "nombre": 2}, {"des": [3, 4], "nombre": 4}, {"des": [5, 6], "nombre": 6}], "arrivees": [{"des": [1, 2], "nombre": 1}, {"des": [3, 4, 5], "nombre": 3}, {"des": [6], "nombre": 5}], "notes": "Ne causent pas de dégâts aux vaisseaux, mais écrasent les équipages à terre."},
  "GIGANS": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "2/5", "missions": ["ELIMINATION"], "fc": 20, "valeurElim": 15, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["FORET"], "bonus": 5}, "milieuNonViable": ["DESERT", "EAU"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5], "nombre": 2}, {"des": [6], "nombre": 3}], "arrivees": [], "notes": "F.C. Att contre E = 10. Prennent feu au laser (0 pt si tirage impair). Capture impossible."},
  "PRIMITIS": {"cat": "SAPIENS", "type": "SUB_CIVILES", "ref": "2/6", "missions": ["INTIMIDATION", "COMMERCE", "RECHERCHE_SCIENTIFIQUE", "DUEL"], "fc": 1, "valeurElim": null, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": 8, "milieuPrefere": {"nom": ["VILLAGE"], "bonus": 1}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2], "nombre": 4}, {"des": [3, 4], "nombre": 5}, {"des": [5], "nombre": 7}, {"des": [6], "nombre": 10}], "arrivees": [{"des": [1, 2, 3], "nombre": 2}, {"des": [4, 5, 6], "nombre": 8}], "notes": "Timides ; peuvent se rebeller dans leurs villages. Intimidation, commerce, recherche (tech 8) ou Duel (2 pts)."},
  "UPOMEDI": {"cat": "SAPIENS", "type": "SUB_CIVILES", "ref": "2/7", "missions": ["INTIMIDATION", "COMMERCE"], "fc": 2, "valeurElim": null, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["GLACE", "DESERT"], "bonus": 1}, "milieuNonViable": ["FORET"], "presences": [{"des": [1, 2, 3], "nombre": 4}, {"des": [4, 5, 6], "nombre": 8}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4, 5, 6], "nombre": 4}], "notes": "Nomades pratiquant le commerce et pouvant être intimidés."},
  "ALGHIDI": {"cat": "SAPIENS", "type": "CIVILES", "ref": "2/8", "missions": ["ELIMINATION", "ALLIANCE"], "fc": 5, "valeurElim": 4, "valeurCapture": null, "valeurAlliance": 6, "fAlliance": 3, "niveauTech": null, "milieuPrefere": {"nom": ["EAU"], "bonus": 2}, "milieuNonViable": ["DESERT"], "presences": [{"des": [1, 2, 3], "nombre": 1}, {"des": [4, 5], "nombre": 2}, {"des": [6], "nombre": 3}], "arrivees": [{"des": [1, 2, 3], "nombre": 1}, {"des": [4, 5, 6], "nombre": 3}], "notes": "Philosophes : l'information 'marchands' équivaut à 'pacifiques'. Alliance (val. 6, F.A. 3) ou Élimination (4 pts)."},
  "TRONCIDI": {"cat": "SAPIENS", "type": "CIVILES", "ref": "2/9", "missions": ["ALLIANCE", "COMMERCE", "RECHERCHE_SCIENTIFIQUE", "DUEL"], "fc": 12, "valeurElim": null, "valeurCapture": null, "valeurAlliance": 6, "fAlliance": 2, "niveauTech": 7, "milieuPrefere": {"nom": ["PYRAMIDES"], "bonus": 4}, "milieuNonViable": ["EAU", "GLACE"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5], "nombre": 2}, {"des": [6], "nombre": 3}], "arrivees": [{"des": [1, 2, 3, 4], "nombre": 0}, {"des": [5, 6], "nombre": 1}], "notes": "Bons marchands. Le laser ZIP 3 double sa capacité contre eux. Alliance (val. 6, F.A. 2)."},
  "IPNOTICI": {"cat": "SAPIENS", "type": "CIVILES", "ref": "2/10", "missions": ["ELIMINATION", "ALLIANCE", "COMMERCE"], "fc": 5, "valeurElim": 4, "valeurCapture": null, "valeurAlliance": 8, "fAlliance": 2, "niveauTech": null, "milieuPrefere": {"nom": ["VILLAGE"], "bonus": 2}, "milieuNonViable": ["GLACE"], "presences": [{"des": [1], "nombre": 1}, {"des": [2, 3, 4], "nombre": 2}, {"des": [5], "nombre": 3}, {"des": [6], "nombre": 4}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4], "nombre": 1}, {"des": [5, 6], "nombre": 3}], "desertion": true, "notes": "Pertes sur Tableau B ajustées (1=2, 2=2, 3=4, 4=4, 5=6, 6=6). Alliance (val. 8, F.A. 2). Désertions possibles."},
  "PSICO": {"cat": "SAPIENS", "type": "SUPER_CIVILES", "ref": "2/11", "missions": ["ALLIANCE"], "fc": 15, "valeurElim": null, "valeurCapture": null, "valeurAlliance": 6, "fAlliance": 4, "niveauTech": null, "milieuPrefere": {"nom": ["VILLAGE"], "bonus": 5}, "milieuNonViable": ["DESERT", "GLACE"], "presences": [{"des": [1, 2, 3, 4, 5, 6], "nombre": 1}], "arrivees": [{"des": [1, 2, 3, 4, 5], "nombre": 1}, {"des": [6], "nombre": 3}], "notes": "Super Civiles : Alliance uniquement (Valeur 6, F. Alliance 4)."},
  "NORMO": {"cat": "SAPIENS", "type": "SUPER_CIVILES", "ref": "2/12", "missions": ["ALLIANCE", "RECHERCHE_SCIENTIFIQUE"], "fc": null, "valeurElim": null, "valeurCapture": null, "valeurAlliance": 10, "fAlliance": 2, "niveauTech": 5, "milieuPrefere": {"nom": ["FORET"], "bonus": 5}, "milieuNonViable": [], "presences": [{"des": [1, 2, 3, 4, 5], "nombre": 1}, {"des": [6], "nombre": 2}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4, 5, 6], "nombre": 1}], "notes": "F.C. Att = F.C. Dif Légion ; F.C. Dif = F.C. Att Légion. Pas de commerce. Alliance (val. 10, F.A. 2) ou Recherche (tech 5)."},
  "ELPH": {"cat": "SAPIENS", "type": "SUB_CIVILES", "ref": "3/1", "missions": ["INTIMIDATION", "RECHERCHE_SCIENTIFIQUE"], "fc": 1, "valeurElim": null, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": 9, "milieuPrefere": {"nom": ["FORET"], "bonus": 1}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2, 3, 4], "nombre": 3}, {"des": [5], "nombre": 5}, {"des": [6], "nombre": 7}], "arrivees": [{"des": [1, 2], "nombre": 0}, {"des": [3, 4], "nombre": 2}, {"des": [5, 6], "nombre": 4}], "notes": "Une attitude marchande équivaut à pacifique (pas de commerce). Intimidation ou Recherche (tech 9)."},
  "NILBOG": {"cat": "SAPIENS", "type": "SUB_CIVILES", "ref": "3/2", "missions": ["RECHERCHE_SCIENTIFIQUE", "COMMERCE", "ROTSA"], "fc": 1, "valeurElim": null, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": 9, "milieuPrefere": {"nom": ["PYRAMIDES"], "bonus": 3}, "milieuNonViable": [], "presences": [{"des": [1, 2, 3, 4], "nombre": 3}, {"des": [5, 6], "nombre": 6}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4, 5, 6], "nombre": 3}], "notes": "Pas d'intimidation. Missions : Recherche scientifique (tech 9), Commerce (March.) ou Prise de la pierre ROTSA (si pacifiques)."},
  "TARILS": {"cat": "SAPIENS", "type": "SUB_CIVILES", "ref": "3/3", "missions": ["INTIMIDATION", "COMMERCE", "RECHERCHE_SCIENTIFIQUE", "DUEL"], "fc": 2, "valeurElim": null, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": 8, "milieuPrefere": {"nom": ["DESERT"], "bonus": 1}, "milieuNonViable": [], "presences": [{"des": [1], "nombre": 1}, {"des": [2], "nombre": 2}, {"des": [3], "nombre": 3}, {"des": [4], "nombre": 4}, {"des": [5], "nombre": 5}, {"des": [6], "nombre": 6}], "arrivees": [{"des": [1, 2, 3, 4], "nombre": 0}, {"des": [5], "nombre": 3}, {"des": [6], "nombre": 6}], "notes": "Trêve sacrée pour le commerce. Intimidation (statues), Recherche (tech 8) ou Duel."},
  "SKIN": {"cat": "SAPIENS", "type": "CIVILES", "ref": "3/4", "missions": ["ALLIANCE", "COMMERCE", "RECHERCHE_SCIENTIFIQUE"], "fc": 2, "valeurElim": null, "valeurCapture": null, "valeurAlliance": 4, "fAlliance": 4, "niveauTech": 9, "milieuPrefere": {"nom": ["VILLAGE"], "bonus": 3}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2, 3, 4], "nombre": 2}, {"des": [5], "nombre": 4}, {"des": [6], "nombre": 6}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4], "nombre": 2}, {"des": [5, 6], "nombre": 4}], "desertion": true, "notes": "Esprit mercantile aigu. Alliance (val. 4, F.A. 4), Commerce, Recherche (tech 9). Désertions possibles."},
  "PELASGI": {"cat": "SAPIENS", "type": "CIVILES", "ref": "3/5", "missions": ["COMMERCE", "ALLIANCE", "RECHERCHE_SCIENTIFIQUE", "DUEL"], "fc": 3, "valeurElim": null, "valeurCapture": null, "valeurAlliance": 4, "fAlliance": 3, "niveauTech": 7, "milieuPrefere": {"nom": ["DESERT"], "bonus": 2}, "milieuNonViable": [], "presences": [{"des": [1, 2, 3], "nombre": 2}, {"des": [4, 5], "nombre": 4}, {"des": [6], "nombre": 10}], "arrivees": [{"des": [1], "nombre": 0}, {"des": [2, 3, 4, 5], "nombre": 2}, {"des": [6], "nombre": 10}], "desertion": true, "notes": "Actifs en technologie (7) et commerce. Alliance (val. 4, F.A. 3). Désertions possibles."},
  "TULII": {"cat": "SAPIENS", "type": "CIVILES", "ref": "3/6", "missions": ["ALLIANCE", "COMMERCE", "RECHERCHE_SCIENTIFIQUE", "DUEL"], "fc": 4, "valeurElim": null, "valeurCapture": null, "valeurAlliance": 2, "fAlliance": 2, "niveauTech": 4, "milieuPrefere": {"nom": ["EAU"], "bonus": 2}, "milieuNonViable": ["DESERT"], "presences": [{"des": [1, 2, 3, 4], "nombre": 2}, {"des": [5], "nombre": 4}, {"des": [6], "nombre": 8}], "arrivees": [{"des": [1, 2], "nombre": 0}, {"des": [3, 4], "nombre": 2}, {"des": [5, 6], "nombre": 4}], "desertion": true, "notes": "Pratiquent le duel à l'épée et bouclier de force. Alliance (val. 2, F.A. 2), Commerce, Recherche (tech 4). Désertions possibles."},
  "NAPOS": {"cat": "SAPIENS", "type": "CIVILES", "ref": "3/7", "missions": ["COMMERCE", "ALLIANCE", "RECHERCHE_SCIENTIFIQUE", "DUEL"], "fc": 5, "valeurElim": null, "valeurCapture": null, "valeurAlliance": 8, "fAlliance": 1, "niveauTech": 9, "milieuPrefere": {"nom": ["FORET"], "bonus": 3}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2, 3], "nombre": 2}, {"des": [4, 5], "nombre": 5}, {"des": [6], "nombre": 8}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4], "nombre": 1}, {"des": [5, 6], "nombre": 10}], "desertion": true, "notes": "Armes inoffensives contre vaisseaux sous bouclier. Alliance (val. 8, F.A. 1), Commerce, Recherche (tech 9). Désertions possibles."},
  "SIPCO": {"cat": "SAPIENS", "type": "SUPER_CIVILES", "ref": "3/8", "missions": ["ALLIANCE"], "fc": null, "valeurElim": null, "valeurCapture": null, "valeurAlliance": 8, "fAlliance": 2, "niveauTech": null, "milieuPrefere": {"nom": [], "bonus": null}, "milieuNonViable": [], "presences": [{"des": [1, 2, 3, 4, 5], "nombre": 1}, {"des": [6], "nombre": 2}], "arrivees": [{"des": [1, 2, 3, 4, 5], "nombre": 0}, {"des": [6], "nombre": 1}], "notes": "F.C. Dif = celui des Légionnaires ; F.C. Att = F.C. Dif Légion + 2. Marchands = pacifiques. Alliance (val. 8, F.A. 2)."},
  "ATTLERS": {"cat": "SAPIENS", "type": "SUPER_CIVILES", "ref": "3/9", "missions": ["ALLIANCE"], "fc": null, "valeurElim": null, "valeurCapture": null, "valeurAlliance": 10, "fAlliance": 1, "niveauTech": null, "milieuPrefere": {"nom": [], "bonus": null}, "milieuNonViable": [], "presences": [{"des": [1, 2, 3, 4, 5, 6], "nombre": 1}], "arrivees": [{"des": [1, 2, 3, 4], "nombre": 0}, {"des": [5, 6], "nombre": 1}], "notes": "F.C. Dif = Légion ; F.C. Att = Légion + 1D6. Marchands = hostiles ! Alliance (val. 10, F.A. 1)."},
  "CRONOS": {"cat": "SAPIENS", "type": "SUPER_CIVILES", "ref": "3/10", "missions": ["ALLIANCE"], "fc": null, "valeurElim": null, "valeurCapture": null, "valeurAlliance": 12, "fAlliance": 1, "niveauTech": null, "milieuPrefere": {"nom": [], "bonus": null}, "milieuNonViable": [], "presences": [{"des": [1, 2, 3, 4, 5, 6], "nombre": 1}], "arrivees": [{"des": [1, 2, 3, 4], "nombre": 0}, {"des": [5], "nombre": 1}, {"des": [6], "nombre": 2}], "notes": "Arme sphère-foudre : F.C. Att = Légion × 1D6. Marchands = pacifiques. Alliance (val. 12, F.A. 1)."},
  "ASPIS": {"cat": "NON_SAPIENS", "type": "VELENOSI", "ref": "3/11", "missions": ["ELIMINATION", "CAPTURE"], "fc": 8, "valeurElim": 4, "valeurCapture": 12, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["DESERT"], "bonus": 2}, "milieuNonViable": ["VILLAGE"], "presences": [{"des": [1, 2, 3, 4, 5], "nombre": 1}, {"des": [6], "nombre": 2}], "arrivees": [{"des": [1, 2, 3, 4], "nombre": 0}, {"des": [5, 6], "nombre": 1}], "notes": "Venimeux (pertes doublées). N'attaquent pas les vaisseaux."},
  "SCORPIO": {"cat": "NON_SAPIENS", "type": "VELENOSI", "ref": "3/12", "missions": ["ELIMINATION", "CAPTURE"], "fc": 12, "valeurElim": 6, "valeurCapture": 18, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["DESERT"], "bonus": 2}, "milieuNonViable": ["GLACE"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5], "nombre": 2}, {"des": [6], "nombre": 3}], "arrivees": [{"des": [1, 2, 3, 4, 5], "nombre": 0}, {"des": [6], "nombre": 1}], "notes": "Venimeux (pertes doublées). Capture rare (18 pts)."},
  "MANTA": {"cat": "NON_SAPIENS", "type": "VELENOSI", "ref": "3/13", "missions": ["ELIMINATION", "CAPTURE"], "fc": 2, "valeurElim": 3, "valeurCapture": 7, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["FORET"], "bonus": 1}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5, 6], "nombre": 2}], "arrivees": [{"des": [1, 2, 3, 4], "nombre": 0}, {"des": [5, 6], "nombre": 1}], "notes": "Venimeux. Apparence docile mais aiguilles empoisonnées."},
  "TYRANNOSAURUS": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "3/14", "missions": ["ELIMINATION", "CAPTURE"], "fc": 10, "valeurElim": 8, "valeurCapture": 14, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["MARAIS"], "bonus": 3}, "milieuNonViable": ["GLACE"], "presences": [{"des": [1], "nombre": 1}, {"des": [2, 3, 4, 5], "nombre": 2}, {"des": [6], "nombre": 3}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4, 5, 6], "nombre": 1}], "notes": "Attaque furieuse surtout en marais. Capture (14 pts) ou Élimination (8 pts)."},
  "HYDRA": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "3/15", "missions": ["ELIMINATION", "CAPTURE"], "fc": 3, "valeurElim": 4, "valeurCapture": 10, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["DESERT"], "bonus": 1}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2], "nombre": 1}, {"des": [3, 4, 5], "nombre": 2}, {"des": [6], "nombre": 4}], "arrivees": [{"des": [1, 2], "nombre": 0}, {"des": [3, 4, 5], "nombre": 1}, {"des": [6], "nombre": 4}], "notes": "Capture rentable (10 pts) ou Élimination (4 pts)."},
  "MINOS": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "3/16", "missions": ["ELIMINATION", "CAPTURE"], "fc": 2, "valeurElim": 5, "valeurCapture": 11, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["PYRAMIDES"], "bonus": 4}, "milieuNonViable": ["MARAIS"], "presences": [{"des": [1], "nombre": 1}, {"des": [2, 3], "nombre": 3}, {"des": [4, 5], "nombre": 5}, {"des": [6], "nombre": 7}], "arrivees": [{"des": [1, 2], "nombre": 0}, {"des": [3, 4], "nombre": 3}, {"des": [5, 6], "nombre": 7}], "notes": "Bipède rapide avec yeux rétractables. Capture (11 pts) ou Élimination (5 pts)."},
  "FERA": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "3/17", "missions": ["ELIMINATION"], "fc": 4, "valeurElim": 3, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["GLACE"], "bonus": 4}, "milieuNonViable": ["DESERT"], "presences": [{"des": [1, 2, 3, 4, 5], "nombre": 1}, {"des": [6], "nombre": 3}], "arrivees": [{"des": [1, 2, 3, 4, 5], "nombre": 0}, {"des": [6], "nombre": 1}], "notes": "Chasse réservée aux U.C. de légionnaires. Aucune survie en captivité."},
  "ANOPHELES": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "3/18", "missions": ["ELIMINATION"], "fc": 1, "valeurElim": 3, "valeurCapture": null, "valeurAlliance": null, "fAlliance": null, "niveauTech": null, "milieuPrefere": {"nom": ["MARAIS"], "bonus": 1}, "milieuNonViable": ["PYRAMIDES"], "presences": [{"des": [1, 2, 3], "nombre": 5}, {"des": [4, 5, 6], "nombre": 10}], "arrivees": [{"des": [1, 2, 3], "nombre": 0}, {"des": [4, 5, 6], "nombre": 10}], "notes": "Moustiques géants en nuée. N'attaquent jamais les vaisseaux. Capture impossible."}
};

const LETTERS_L1 = {1:'A',2:'B',3:'C',4:'D',5:'E',6:'F',7:'G',8:'H'};
const LETTER_NAME = {A:'A · Tellus',B:'B · Sine Atmosphaera',C:'C · Mercurius',D:'D · Mars',E:'E · Mars',F:'F · Venus',G:'G · Juppiter',H:'H · Juppiter'};
const RAD_ROWS = {
  A:[[[1,2,3,4],'0'],[[5,6],'α']], B:[[[1,2,3],'0'],[[4,5,6],'α']], C:[[[1,2,3],'α'],[[4,5,6],'β']],
  D:[[[1,2,3,4],'0'],[[5,6],'α']], E:[[[1,2],'α'],[[3,4,5],'β'],[[6],'0']], F:[[[1,2,3,4],'0'],[[5,6],'α']],
  G:[[[1,2,3,4],'0'],[[5,6],'α']], H:[[[1,2,3],'β'],[[4,5,6],'α']]
};
// Niveau 2 conforme à la Fiche Information S.C.
const L2 = {
  A:[[[1],'MIN'],[[2],'VEG'],[[3,4,5],'ANI'],[[6],'DNS']],
  B:[[[1,2,3],'MIN'],[[4,5],'SINE'],[[6],'DNS']],
  C:[[[1,2],'MIN'],[[3],'VEG'],[[4],'ANI'],[[5,6],'DNS']],
  D:[[[1,2],'MIN'],[[3,4],'VEG'],[[5],'ANI'],[[6],'DNS']],
  E:[[[1],'MIN'],[[2,3],'ANI'],[[4,5],'VEG'],[[6],'DNS']],
  F:[[[1],'MIN'],[[2],'VEG'],[[3,4,5],'ANI'],[[6],'DNS']],
  G:[[[1,2],'VEG'],[[3],'MIN'],[[4],'SINE'],[[5,6],'DNS']],
  H:[[[1,2],'MIN'],[[3],'VEG'],[[4,5],'SINE'],[[6],'DNS']]
};
const L3 = {
  ANI:[[[1,2,3],'NS'],[[4,5,6,7,8],'SAP'],[[9,10],'DNS']],
  MIN:[[[10],'DNS'],[[1,2,3,4],'NS'],[[5,6,7],'OZ'],[[8,9],'NSOZ']],
  VEG:[[[1],'SECOR'],[[2,3],'SAP'],[[4,5,6],'NS'],[[7,8],'NSSECOR'],[[9,10],'DNS']]
};
const L4 = {
  ANI_SAP:[[[1,2],'SUB_CIVILES'],[[3,4],'CIVILES'],[[5,6],'SUPER_CIVILES']],
  ANI_NS:[[[1,2,3,4],'MONSTRA'],[[5,6],'VELENOSI']],
  MIN_NS:[[[1,2,3],'MONSTRA'],[[4,5],'NON_VISIBLES'],[[6],'DNS']],
  VEG_SAP:[[[1,2],'SUB_CIVILES'],[[3,4,5],'CIVILES'],[[6],'SUPER_CIVILES']],
  VEG_NS:[[[1,2,3],'VELENOSI'],[[4,5,6],'MONSTRA']]
};
const L5_SAP = [[[1,2,3],'AGRESSIVE'],[[4,5],'PACIFIQUE'],[[6,7],'MARCHAND'],[[8,9,10],'DNS']];
const L5_NS  = [[[1,2],'AGRESSIVE'],[[3,4],'PACIFIQUE'],[[5,6],'DNS']];
// Niveau 6 conforme à la Fiche Information S.C.
const L6 = {
  ANI_SUB:[[[1,2,3,4],'ELPH'],[[5,6,7],'NILBOG'],[[8,9,10],'TARILS']],
  ANI_CIV:[[[1,2,3],'SKIN'],[[4,5],'PELASGI'],[[6,7,8],'TULII'],[[9,10],'NAPOS']],
  ANI_SUP:[[[1,2,3],'SIPCO'],[[4,5,6],'ATTLERS'],[[7,8,9,10],'CRONOS']],
  ANI_VEL:[[[1,2,3],'ASPIS'],[[4,5,6],'SCORPIO'],[[7,8,9,10],'MANTA']],
  ANI_MON:[[[1,2],'TYRANNOSAURUS'],[[3,4],'HYDRA'],[[5,6],'MINOS'],[[7,8],'FERA'],[[9,10],'ANOPHELES']],
  MIN_MON:[[[1,2],'CERBERUS'],[[3,4],'AMOEBA'],[[5,6],'LITOFAGUS'],[[7,8],'SPHAERAE'],[[9,10],'NUBIS_ARENAE']],
  MIN_NV:[[[1,2,3],'SUBTERRANEI'],[[4,5,6],'AERIFORMI'],[[7,8],'MIMESIS'],[[9,10],'DNS']],
  VEG_VEL:[[[1,2,3,4],'LIANA_NIGRA'],[[5,6,7],'BAVOSUS'],[[8,9,10],'RADICALES']],
  VEG_MON:[[[1,2,3,4,5,6],'SEVOLVENTES'],[[7,8,9,10],'GIGANS']],
  VEG_SUB:[[[1,2,3,4,5],'PRIMITIS'],[[6,7,8,9,10],'UPOMEDI']],
  VEG_CIV:[[[10,1,2,3,4],'ALGHIDI'],[[5,6,7],'TRONCIDI'],[[8,9],'IPNOTICI']],
  VEG_SUP:[[[10,1,2,3,4,5],'PSICO'],[[6,7,8,9],'NORMO']]
};
const L6KEY = {
  ANI:{SUB_CIVILES:'ANI_SUB',CIVILES:'ANI_CIV',SUPER_CIVILES:'ANI_SUP',VELENOSI:'ANI_VEL',MONSTRA:'ANI_MON'},
  MIN:{MONSTRA:'MIN_MON',NON_VISIBLES:'MIN_NV'},
  VEG:{VELENOSI:'VEG_VEL',MONSTRA:'VEG_MON',SUB_CIVILES:'VEG_SUB',CIVILES:'VEG_CIV',SUPER_CIVILES:'VEG_SUP'}
};
const FORME_NAME = {MIN:'Minérale',VEG:'Végétale',ANI:'Animale',SINE:'Sans vie'};
const TCODE_NAME = {NS:'Non Sapiens',SAP:'Sapiens',OZ:'Minerai OZ',NSOZ:'Non Sapiens + OZ',SECOR:'Plantes SECOR',NSSECOR:'Non Sapiens + SECOR'};
const NATURE_NAME = {AGRESSIVE:'Agressive',PACIFIQUE:'Pacifique',MARCHAND:'Marchand'};

// ==========================================
// ÉTAT DU JEU
// ==========================================
let state = {
  level:'BASE', shipClass:'FROMBOLA', turn:1, points:0, isInFlight:false,
  isScenario:false, scenarioStep:0, maxContainers:10,
  ship:{crew:1,shields:1,lasers:1,radars:2,computers:1,tanks:3,modules:0,mod_zip3:0,mod_ho12:0,mod_sil4:0},
  basePos:{x:0,y:0,z:1}, position:{x:0,y:0,z:1},
  route:{segments:[],parsecsInput:1,radarsActive:2},
  planets:[], currentPlanet:null, computersUsedThisTurn:0, observablePlanets:[],
  shieldsOn:true, shieldsLocked:false, hullHitsThisTurn:0,
  personality:0, risks:null, savant:0, specialite:'', pendingDN:null,
  groundCrews:[], menGround:0, crewGround:0, hasGroundCrew:false, landedTurns:0, menLost:0, mission:null, missionResult:null,
  currentAliens:0, alienWounded:0, missionUsed:false, allianceFails:0, commTurns:0, landingBehavior:null, landingZone:null,
  debugLogs:[], travelHistory:[]
};

let opLog = [];
let controleLevel = 1;
let disembarkCount = 1;

// ==========================================
// FONCTIONS UTILITAIRES & LOGS
// ==========================================
const cls = () => SHIPS[state.shipClass];
const d6 = () => Math.floor(Math.random()*6)+1;
const d10 = () => Math.floor(Math.random()*10)+1;

function pickRow(rows,d){ for(const [dice,val] of rows){ if(dice.includes(d)) return val; } return null; }
function ensureChain(p){ if(!p.chain) p.chain={letter:null,rad:null,forme:null,tcode:null,cat:null,nature:null,race:null}; return p.chain; }

// Calcul du F.C. Alien prenant en compte les règles spéciales, le milieu préféré (Avancé) et les blessures (F = -50%)
function alienFC(){
  const r = state.alienRace ? RACES[state.alienRace] : null;
  let base = (r && typeof r.fc === 'number') ? r.fc : ALIEN_FC;
  if(state.alienRace === 'NORMO') base = state.menGround || 3;
  else if(state.alienRace === 'SIPCO') base = (state.menGround || 3) + 2;
  else if(state.alienRace === 'ATTLERS') base = (state.menGround || 3) + d6();
  else if(state.alienRace === 'CRONOS') base = (state.menGround || 3) * d6();
  else if(state.alienRace === 'SPHAERAE'){
    if(state.hasGroundCrew) base = Math.max(1, Math.round((state.menGround || 3) * 0.5));
    else base = Math.round((1 + cls().level * 0.5) * (state.currentAliens || 1));
  }
  // Bonus de milieu préféré en mode Avancé
  if(state.level === 'AVANCE' && r && state.landingZone){
    const zCode = ZONE_NORM[state.landingZone];
    if(zCode && r.milieuPrefere.nom.includes(zCode) && typeof r.milieuPrefere.bonus === 'number'){
      base += r.milieuPrefere.bonus;
    }
  }
  // Si blessé (F), perte de 50% du F.C. (arrondi au supérieur)
  if(state.alienWounded > 0 && state.currentAliens > 0 && state.alienWounded >= state.currentAliens){
    base = Math.ceil(base / 2);
  }
  return base;
}

// Calcul du F.C. Attaque et Défense des équipages à terre (avec Radioactivité α/β, Modules et Personnalité)
// ==========================================
// ÉQUIPAGES À TERRE : HOMMES VALIDES ET HORS D'ÉTAT (v1.3.19)
// Chaque équipage a v hommes valides et k hommes hors d'état.
// Un homme perdu est hors d'état (il ne revient pas en points).
// Un équipage sans homme valide est définitivement perdu.
// Les pertes sont décomptées sur un équipage jusqu'à zéro homme valide, puis sur le suivant.
// ==========================================
function syncGround(){
  const avant = (state.groundCrews || []).length;
  state.groundCrews = (state.groundCrews || []).filter(c => c.v > 0);
  const perdus = avant - state.groundCrews.length;
  if(perdus > 0) state.equipagesPerdus = (state.equipagesPerdus || 0) + perdus;
  state.menGround = state.groundCrews.reduce((a,c) => a + c.v, 0);
  state.crewGround = state.groundCrews.filter(c => c.v > 0).length;
  state.hasGroundCrew = state.menGround > 0;
  renderDecompte();
}

// Affiche le décompte des hommes par équipage, les équipages perdus et l'intervention du médecin
function renderDecompte(){
  const ref = document.getElementById('landing-crew');
  if(!ref) return;
  let box = document.getElementById('crew-count');
  if(!box){
    box = document.createElement('div');
    box.id = 'crew-count';
    box.style.cssText = 'margin-top:6px;font-size:13px;line-height:1.5;';
    ref.insertAdjacentElement('afterend', box);
  }
  const equipages = state.groundCrews || [];
  let html = '';
  if(equipages.length === 0 && (state.landedTurns||0) === 0){
    html = '';
  } else if(equipages.length === 0){
    html += '<div>Aucun équipage à terre.</div>';
  } else {
    html += '<div><b>Hommes par équipage :</b></div>';
    equipages.forEach((c, i) => {
      const couleur = c.v === 3 ? '#1c3a43' : '#9a7530';
      html += `<div style="color:${couleur};">Équipage ${i+1} : <b>${c.v}/3</b> homme(s)${c.v<3?' · incomplet':''}</div>`;
    });
  }
  if(state.equipagesPerdus) html += `<div style="color:#c9463d;">Équipages perdus : ${state.equipagesPerdus}</div>`;
  if(state.specialite === 'médecin'){
    const intervenu = state.medecinTour === state.turn;
    html += `<div style="color:#5b8a9e;">Médecin : ${intervenu ? 'intervenu ce tour' : 'pas intervenu ce tour'}</div>`;
  }
  box.innerHTML = html;
}
function ajouterEquipage(){
  state.groundCrews = state.groundCrews || [];
  state.groundCrews.push({v:3, k:0});
  syncGround();
}
function hommesHorsEtat(n){
  for(const c of (state.groundCrews || [])){
    while(n > 0 && c.v > 0){ c.v--; n--; }   // une perte retire un homme à l'équipage
    if(n <= 0) break;
  }
  syncGround();
}
function retirerHommesValides(n){
  for(let i = 0; i < (state.groundCrews || []).length && n > 0; i++){
    const c = state.groundCrews[i];
    while(n > 0 && c.v > 0){ c.v--; n--; }
  }
  syncGround();
}
// Le médecin (vivant) complète un équipage : tant qu'il reste au moins un homme,
// l'équipage est récupéré jusqu'à 3 hommes. Une fois par tour de vol.
function medecinRestaure(){
  if(state.specialite !== 'médecin' || !state.groundCrews) return;
  if(state.medecinTour === state.turn) return;
  const c = state.groundCrews.find(c => c.v >= 1 && c.v < 3);
  if(!c) return;
  const avant = c.v;
  state.medecinTour = state.turn;
  c.v = 3;
  syncGround();
  log('SPACE COMPUTER', `Le Médecin récupère un équipage : ${avant} → 3 hommes.`);
}

function groundLegionAtt(includeWeapons){
  if(state.menGround <= 0) return 0;
  let fc = state.menGround;
  const ch = state.currentPlanet ? state.currentPlanet.chain : null;
  // Pénalité radioactivité en mode Avancé : α = -1 par équipage, β = -2 par équipage
  if(state.level === 'AVANCE' && ch && ch.rad){
    const crews = Math.ceil(state.menGround / 3);
    if(ch.rad === 'α') fc = Math.max(1, fc - crews * 1);
    else if(ch.rad === 'β') fc = Math.max(1, fc - crews * 2);
  }
  // Bonus de Personnalité en mode Avancé
  if(state.level === 'AVANCE'){
    fc += (state.personality || 0);
  }
  if(includeWeapons){
    const forme = ch ? ch.forme : null;
    if(state.ship.mod_zip3 > 0) fc += state.ship.mod_zip3 * (state.alienRace === 'TRONCIDI' ? 10 : 5);
    if(state.ship.mod_ho12 > 0 && state.alienRace !== 'SPHAERAE') fc += state.ship.mod_ho12 * ({ANI:6, VEG:4, MIN:3}[forme] || 3);
    if(state.ship.mod_sil4 > 0) fc += state.ship.mod_sil4 * ((forme === 'MIN') ? 6 : 3);
  }
  if(state.specialite === 'princeps robur' && state.menGround > 0) fc += 2;
  return fc;
}

function groundLegionDef(){
  if(state.menGround <= 0) return 0;
  let fc = state.menGround;
  const ch = state.currentPlanet ? state.currentPlanet.chain : null;
  if(state.level === 'AVANCE' && ch && ch.rad){
    const crews = Math.ceil(state.menGround / 3);
    if(ch.rad === 'α') fc = Math.max(1, fc - crews * 1);
    else if(ch.rad === 'β') fc = Math.max(1, fc - crews * 2);
  }
  // Chaque module embarqué porte le F.C. Dif d'un E. à +1
  const activeMods = Math.min(state.crewGround, state.ship.modules);
  fc += activeMods;
  if(state.level === 'AVANCE'){
    fc += (state.personality || 0);
  }
  if(state.specialite === 'princeps robur' && state.menGround > 0) fc += 2;
  return fc;
}

function ensureMissionButtons(){
  let btnAlliance = document.getElementById('btn-alliance');
  if(!btnAlliance){
    const allBtns = document.querySelectorAll('#mission-panel .mission-btn');
    allBtns.forEach(b => {
      if(b.innerText.includes('Alliance')){
        b.id = 'btn-alliance';
        b.classList.remove('disabled');
        b.setAttribute('onclick', 'startAlliance()');
        const desc = b.querySelector('.m-desc');
        if(desc) desc.innerText = 'Civiles ou Super Civiles · tableau E';
        btnAlliance = b;
      }
    });
  }
  const container = btnAlliance ? btnAlliance.parentElement : document.querySelector('#mission-panel .card');
  const reembarkBtn = document.getElementById('btn-reembark');
  if(!container || !reembarkBtn) return;

  if(!document.getElementById('btn-capture')){
    const d = document.createElement('div');
    d.className = 'mission-btn'; d.id = 'btn-capture'; d.style.display = 'none';
    d.setAttribute('onclick', 'startCapture()');
    d.innerHTML = '<div><span class="m-title">Capture d\'Extrasolaire</span><span class="m-desc">Non Sapiens · sans armes · tableau D</span></div><span class="m-tab">TAB. D</span>';
    container.insertBefore(d, reembarkBtn);
  }
  if(!document.getElementById('btn-rotsa')){
    const d = document.createElement('div');
    d.className = 'mission-btn'; d.id = 'btn-rotsa'; d.style.display = 'none';
    d.setAttribute('onclick', 'startRotsa()');
    d.innerHTML = '<div><span class="m-title">Prise de la Pierre ROTSA</span><span class="m-desc">Nilbog pacifiques · selon le nombre d\'équipages</span></div><span class="m-tab">ROTSA</span>';
    container.insertBefore(d, reembarkBtn);
  }
  if(!document.getElementById('btn-duel')){
    const d = document.createElement('div');
    d.className = 'mission-btn'; d.id = 'btn-duel'; d.style.display = 'none';
    d.setAttribute('onclick', 'startDuel()');
    d.innerHTML = '<div><span class="m-title">Duel d\'honneur</span><span class="m-desc">Combat singulier · 1 équipage contre champion</span></div><span class="m-tab">DUEL</span>';
    container.insertBefore(d, reembarkBtn);
  }
  if(!document.getElementById('btn-tot100')){
    const d = document.createElement('div');
    d.className = 'mission-btn'; d.id = 'btn-tot100'; d.style.display = 'none';
    d.setAttribute('onclick', 'startTot100()');
    d.innerHTML = '<div><span class="m-title">Arme Iono-Nucléaire TOT 100%</span><span class="m-desc">Spatha / Hasta · Désintégration planétaire</span></div><span class="m-tab">TAB. L</span>';
    container.insertBefore(d, reembarkBtn);
  }
  if(!document.getElementById('btn-switch-to-ground')){
    const b = document.createElement('button');
    b.className = 'btn-primary'; b.id = 'btn-switch-to-ground';
    b.style.cssText = 'display:none;margin-top:10px;background:var(--dark-teal);';
    b.setAttribute('onclick', 'switchToGroundMode()');
    b.innerText = 'Couper les boucliers pour débarquer (C/D)';
    container.insertBefore(b, reembarkBtn);
  }
}

function colIndex(diff){ if(diff<=-4)return 0; if(diff===-3)return 1; if(diff<=-1)return 2; if(diff===0)return 3; if(diff<=2)return 4; if(diff<=5)return 5; return 6; }
function colIndexF(diff){ if(diff<=-1)return 0; if(diff===0)return 1; if(diff===1)return 2; if(diff===2)return 3; if(diff<=5)return 4; return 5; }
function inBounds(x,y,z){ return x>=BOUNDS.xMin&&x<=BOUNDS.xMax&&y>=BOUNDS.yMin&&y<=BOUNDS.yMax&&z>=BOUNDS.zMin&&z<=BOUNDS.zMax; }

function addDebugLog(message){
  const time = new Date().toLocaleTimeString();
  state.debugLogs.push(`${time} [Tour ${state.turn}] ${message}`);
  const area = document.getElementById('debug-log-text');
  if(area){ area.value = state.debugLogs.join('\n'); area.scrollTop = area.scrollHeight; }
}

function copyDebugLog(){ const a=document.getElementById('debug-log-text'); a.select(); document.execCommand('copy'); alert('Log copié.'); }
function clearTravelHistory(){ if(confirm('Effacer les traces de déplacement ?')){ state.travelHistory=[]; renderDebugMap(); } }

function switchTab(tabId){
  document.querySelectorAll('main').forEach(m=>m.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+tabId).classList.add('active');
  const nav=document.getElementById('nav-'+tabId); if(nav) nav.classList.add('active');
  if(tabId==='controle') renderControle();
  if(tabId==='bestiaire') initBestiaire();
  if(tabId==='debug'){ renderDebugMap(); document.getElementById('debug-log-text').value=state.debugLogs.join('\n'); }
}

function log(sender,text){
  const c=document.getElementById('log-container'); const div=document.createElement('div');
  div.className=`log-entry ${sender==='SPACE COMPUTER'?'log-sc':'log-uc'}`;
  div.innerHTML=`<div class="log-sender">${sender}</div><div>${text}</div>`;
  c.prepend(div);
  if(window.PopupSMS) window.PopupSMS.add(sender,text); // pop-up SMS (popup-sms.js)
  scheduleAutosave();
}

function logCombat(text){ const cl=document.getElementById('combat-log'); cl.style.display='block'; cl.innerHTML=text; }

// ==========================================
// FORMATEUR DE DIRECTION DIAGONALE PRÉCIS
// ==========================================
function formatDirection(dx, dy) {
  if (dx === 0 && dy === 0) return 'sur place';
  let parts = [];
  if (dy > 0) parts.push(`${Math.abs(dy)} Nord`);
  if (dy < 0) parts.push(`${Math.abs(dy)} Sud`);
  if (dx > 0) parts.push(`${Math.abs(dx)} Est`);
  if (dx < 0) parts.push(`${Math.abs(dx)} Ouest`);

  if (dx !== 0 && dy !== 0) {
    let vertical = dy > 0 ? "Nord" : "Sud";
    let horizontal = dx > 0 ? "Est" : "Ouest";
    if (Math.abs(dx) === Math.abs(dy)) {
      return `${Math.abs(dx)} ${vertical}-${horizontal}`;
    }
  }
  return parts.join(' + ') || '0';
}

// ==========================================
// RÈGLES DE L'ARBRE D'INFORMATION
// ==========================================
function rollStep(p,step){
  const ch=ensureChain(p);
  if(step===1){
    const d=d10(); if(!LETTERS_L1[d]) return {status:'dns'};
    ch.letter=LETTERS_L1[d];
    let t='Type de planète : '+LETTER_NAME[ch.letter]+'.';
    if(state.level==='AVANCE'){ ch.rad=pickRow(RAD_ROWS[ch.letter],d6()); t+=' Radioactivité : '+ch.rad+'.'; }
    return {status:'ok',text:t};
  }
  if(step===2){
    const k=pickRow(L2[ch.letter],d6());
    if(!k||k==='DNS') return {status:'dns'};
    if(k==='SINE'){ ch.forme='SINE'; return {status:'end',text:'Sine Vita : aucune forme de vie. Fin des informations.'}; }
    ch.forme=k; return {status:'ok',text:'Forme de vie : '+FORME_NAME[k]+'.'};
  }
  if(step===3){
    const k=pickRow(L3[ch.forme],d10());
    if(!k||k==='DNS') return {status:'dns'};
    ch.tcode=k;
    if(k==='OZ'||k==='SECOR') return {status:'end',text:'Type : '+TCODE_NAME[k]+'. Fin des informations (objet à ramasser, sans race).'};
    return {status:'ok',text:'Type des Extrasolaires : '+TCODE_NAME[k]+'.'};
  }
  if(step===4){
    const key=ch.forme+'_'+(ch.tcode==='SAP'?'SAP':'NS');
    const k=pickRow(L4[key],d6());
    if(!k||k==='DNS') return {status:'dns'};
    ch.cat=k; return {status:'ok',text:'Catégorie : '+k.replace(/_/g,' ')+'.'};
  }
  if(step===5){
    const sap=(ch.tcode==='SAP');
    const k=pickRow(sap?L5_SAP:L5_NS, sap?d10():d6());
    if(!k||k==='DNS') return {status:'dns'};
    ch.nature=k; return {status:'ok',text:'Nature : '+NATURE_NAME[k]+'.'};
  }
  if(step===6){
    const key=L6KEY[ch.forme]&&L6KEY[ch.forme][ch.cat];
    const k=key? pickRow(L6[key],d10()) : null;
    if(!k||k==='DNS') return {status:'dns'};
    ch.race=k;
    // Ajustement de la nature selon les notes du Guide (Marchands = Pacifiques ou Hostiles)
    if(ch.nature === 'MARCHAND'){
      if(['ALGHIDI','ELPH','SIPCO','CRONOS'].includes(k)) ch.nature = 'PACIFIQUE';
      else if(k === 'ATTLERS') changerNature(ch, 'AGRESSIVE', 'rollStep');
    }
    return {status:'end',text:'Race : '+k.replace(/_/g,' ')+' (planche '+RACES[k].ref+').'};
  }
  return {status:'end',text:''};
}

function completePlanetInfo(p){
  ensureChain(p); let guard=0;
  while(p.infoLevel < 6 && guard++ < 200){
    const nextStep = p.infoLevel + 1;
    const r = rollStep(p, nextStep);
    if(r.status === 'dns') continue;
    log('SPACE COMPUTER', 'Information reçue à l\'atterrissage : ' + r.text);
    if(r.status === 'end'){ p.infoLevel = 6; break; }
    else { p.infoLevel = nextStep; }
  }
  renderPlanets();
}

function currentRace(){ const p=state.currentPlanet; return (p&&p.chain&&p.chain.race)? p.chain.race : null; }

function rollPresence(raceId){
  const r=RACES[raceId]; if(!r) return 0;
  const d=d6(); const e=r.presences.find(x=>x.des.includes(d));
  return e? e.nombre : 1;
}

function rollSuccessiveArrivals(raceId){
  const r=RACES[raceId]; if(!r || !r.arrivees || !r.arrivees.length) return 0;
  const d=d6(); const e=r.arrivees.find(x=>x.des.includes(d));
  const nb = e ? e.nombre : 0;
  recordOp('Arrivées', 'Renforts '+raceId, {dé:d}, '+'+nb+' présent(s)', '');
  return nb;
}

function treeRacesOk(){
  const all=[].concat(...Object.values(L6).map(rows=>rows.map(r=>r[1])));
  return all.filter(id=>id!=='DNS' && !RACES[id]).length===0;
}

// ==========================================
// GÉNÉRATION DE LA CARTE SPATIALE
// ==========================================
function randomCell(z, minPlanetDist, taken){
  for(let t=0;t<5000;t++){
    const x=Math.floor(Math.random()*38)+BOUNDS.xMin;
    const y=Math.floor(Math.random()*25)+BOUNDS.yMin;
    if(state.planets.some(p=>p.z===z&&p.x===x&&p.y===y)) continue;
    if(taken && taken.some(c=>c.z===z&&c.x===x&&c.y===y)) continue;
    if(minPlanetDist>0){
      const near=state.planets.filter(p=>p.z===z).some(p=>Math.max(Math.abs(p.x-x), Math.abs(p.y-y))<minPlanetDist);
      if(near) continue;
    }
    return {x,y,z};
  }
  return null;
}

function generateMap(){
  state.planets=[]; state.travelHistory=[];
  const types=['A · Tellus','E · Mars','G · Juppiter'];
  const baseZ=Math.floor(Math.random()*4)+1;
  const bx=Math.floor(Math.random()*38)+BOUNDS.xMin, by=Math.floor(Math.random()*25)+BOUNDS.yMin;
  state.basePos={x:bx,y:by,z:baseZ}; state.position={...state.basePos};
  state.planets.push({id:0,x:bx,y:by,z:baseZ,type:'BASE',infoLevel:0,discovered:true,report:null,done:false});
  for(let z=1;z<=4;z++){
    const n = (z===baseZ) ? 8 : 9;
    for(let i=0;i<n;i++){
      const c=randomCell(z,0,null); if(!c) continue;
      state.planets.push({id:state.planets.length,x:c.x,y:c.y,z:c.z,type:types[Math.floor(Math.random()*3)],infoLevel:0,discovered:false,report:null,done:false});
    }
  }
  addDebugLog(`Galaxie générée : base niv ${baseZ}, ${state.planets.length-1} planètes.`);
}

function planetDistMin(x,y,z){
  const ps=state.planets.filter(p=>p.z===z);
  return ps.length? Math.min(...ps.map(p=>Math.max(Math.abs(p.x-x), Math.abs(p.y-y)))) : Infinity;
}

function placeRisks(){
  const taken=[]; state.risks={blackHole:null,rmg:[],dn:[]};
  for(let t=0;t<5000&&!state.risks.blackHole;t++){
    const x=Math.floor(Math.random()*38)+BOUNDS.xMin, y=Math.floor(Math.random()*25)+BOUNDS.yMin;
    if([1,2,3,4].every(z=>planetDistMin(x,y,z)>=5 && !state.planets.some(p=>p.z===z&&p.x===x&&p.y===y))){
      state.risks.blackHole={x,y}; for(let z=1;z<=4;z++) taken.push({x,y,z});
    }
  }
  for(let z=1;z<=4;z++){
    const start=randomCell(z,4,taken);
    if(start){
      const cells=[start]; taken.push(start);
      let guard=0;
      while(cells.length<3&&guard++<200){
        const b=cells[Math.floor(Math.random()*cells.length)];
        const [dx,dy]=[[1,0],[-1,0],[0,1],[0,-1]][Math.floor(Math.random()*4)];
        const c={x:b.x+dx,y:b.y+dy,z};
        if(inBounds(c.x,c.y,z)&&!taken.some(q=>q.z===z&&q.x===c.x&&q.y===c.y)&&!state.planets.some(p=>p.z===z&&p.x===c.x&&p.y===c.y)&&planetDistMin(c.x,c.y,z)>=4){ cells.push(c); taken.push(c); }
      }
      state.risks.rmg.push(...cells);
    }
    for(let i=0;i<3;i++){ const c=randomCell(z,4,taken); if(c){ state.risks.dn.push(c); taken.push(c); } }
  }
  addDebugLog('Risques spatiaux placés (AVANCÉ).');
}

function startGame(){
  opLog=[]; state.medecinTour=null;
  generateMap();
  state.risks = null;
  if(state.level==='AVANCE') placeRisks();
  state.computersUsedThisTurn=0; state.observablePlanets=[];
  renderShip(); updateRouteLimits(); resetRoute(); renderPlanets();
  document.getElementById('display-level').innerText = `Niveau ${state.position.z}`;
}

// ==========================================
// GESTION DU VAISSEAU, PROMOTIONS & STATUT
// ==========================================
function checkPromotionAtBase(){
  const c = cls();
  if(state.points >= c.promo){
    const order = ['FROMBOLA','GLADIUM','SPATHA','HASTA'];
    const idx = order.indexOf(state.shipClass);
    if(idx < order.length - 1){
      const nextClass = order[idx + 1];
      const nextInfo = SHIPS[nextClass];
      log('SPACE COMPUTER', `<b>PROMOTION ACCORDÉE PAR LE MISSUS !</b> Vous êtes promu au grade de <b>${nextInfo.grade}</b> et prenez le commandement du vaisseau <b>${nextClass}</b> (niveau ${nextInfo.level}). Votre score est remis à zéro pour cette nouvelle campagne.`);
      alert(`Compliments du Missus Républicain ! Vous êtes promu ${nextInfo.grade} à bord du ${nextClass} (niveau ${nextInfo.level}). Vous pouvez maintenant équiper vos ${nextInfo.cont} containers.`);
      state.shipClass = nextClass;
      state.maxContainers = nextInfo.cont;
      state.points = 0;
      if(state.ship.crew < nextInfo.eqMin) state.ship.crew = nextInfo.eqMin;
      document.getElementById('display-points').innerText = '0';
      renderShip();
      updateRouteLimits();
    } else {
      log('SPACE COMPUTER', `<b>TRIOMPHE SUPRÊME !</b> Vous êtes nommé <b>FABIUS</b>, Commandant en Chef de la VIIe Légion ! Victoire totale !`);
      alert('TRIOMPHE ! Vous avez atteint le grade suprême de FABIUS, Commandant en Chef de la VIIe Légion !');
    }
  }
}

function setLevel(v){
  if(state.turn>1){ alert("Le niveau est fixé au lancement de l'exploration."); document.getElementById('level-select').value=state.level; return; }
  state.level=v;
  syncScientistUI();
  startGame();
  addDebugLog(`Niveau choisi : ${v}`);
}

function setPersonality(v){
  if(state.turn>1){ alert('La personnalité est fixée au début du voyage.'); return; }
  state.personality=parseInt(v,10);
}

function shipDefence(){ return state.shieldsOn ? state.ship.shields*5 : 2; }

function updateShip(item,change){
  if(state.isInFlight) return alert("En vol, l'équipement du vaisseau est verrouillé. Retournez à la base pour le modifier.");
  const v=state.ship[item]+change;
  if(v<0) return;
  if(item==='crew' && v<cls().eqMin) return;
  if(item==='radars' && v>cls().radMax) return;
  if(item==='tanks' && v>cls().resMax) return;
  const total=state.ship.crew+state.ship.shields+state.ship.lasers+state.ship.radars+state.ship.computers+state.ship.tanks+state.ship.modules;
  if(change>0 && total>=state.maxContainers) return alert(`Capacité maximale (${state.maxContainers} containers) atteinte.`);
  state.ship[item]=v;
  if(item==='modules' && change<0){
    let a=state.ship.mod_zip3+state.ship.mod_ho12+state.ship.mod_sil4;
    while(a>state.ship.modules){ if(state.ship.mod_sil4>0)state.ship.mod_sil4--; else if(state.ship.mod_ho12>0)state.ship.mod_ho12--; else state.ship.mod_zip3--; a--; }
  }
  addDebugLog(`Vaisseau : ${item} -> ${v}`);
  renderShip(); updateRouteLimits();
}

function assignWeapon(type,change){
  if(state.isInFlight) return;
  const a=state.ship.mod_zip3+state.ship.mod_ho12+state.ship.mod_sil4;
  const v=state.ship['mod_'+type]+change;
  if(v<0) return;
  if(change>0 && a>=state.ship.modules) return alert('Tous les modules sont déjà équipés.');
  state.ship['mod_'+type]=v; renderShip();
}

function renderShip(){
  const s=state.ship, c=cls();
  const h1 = document.querySelector('header h1');
  if(h1) h1.innerHTML = `${c.grade.toUpperCase()} NOTIUS <span id="app-version" style="font-size:0.75rem; background:var(--accent-light); color:var(--accent); padding:2px 6px; border-radius:4px; vertical-align:middle;">${APP_VERSION}</span>`;
  const promoTxt = document.querySelector('.promo-text');
  if(promoTxt) promoTxt.innerText = `points · promotion à ${c.promo}`;

  document.getElementById('val-crew').innerText=s.crew;
  document.getElementById('val-shields').innerText=s.shields;
  document.getElementById('val-lasers').innerText=s.lasers;
  document.getElementById('val-radars').innerText=s.radars;
  document.getElementById('val-computers').innerText=s.computers;
  document.getElementById('val-tanks').innerText=s.tanks;
  document.getElementById('val-modules').innerText=s.modules;
  document.getElementById('eq-min').innerText=c.eqMin;
  document.getElementById('rad-max').innerText=c.radMax;
  document.getElementById('res-max').innerText=c.resMax;
  document.getElementById('ppr-txt').innerText=c.ppr;
  document.getElementById('fc-att').innerText=s.lasers*6;
  document.getElementById('fc-def').innerText=shipDefence();
  document.getElementById('fc-crew').innerText=s.crew*3;
  const total=s.crew+s.shields+s.lasers+s.radars+s.computers+s.tanks+s.modules;
  state.maxContainers=c.cont;
  document.getElementById('containers-text').innerText=`${total} / ${c.cont}`;
  let html=''; for(let i=0;i<c.cont;i++) html+= i<total?'<div class="box"></div>':'<div class="box empty"></div>';
  document.getElementById('containers-visual').innerHTML=html;
  let mh='';
  if(s.modules===0) mh='<div style="font-size:.8rem;color:#888;font-style:italic;">Aucun module embarqué.</div>';
  else {
    mh+=`<div class="module-row"><span>ZIP 3 (laser)</span><div class="counter"><button onclick="assignWeapon('zip3',-1)">−</button><span>${s.mod_zip3}</span><button onclick="assignWeapon('zip3',1)">+</button></div></div>`;
    mh+=`<div class="module-row"><span>HO 12 (air)</span><div class="counter"><button onclick="assignWeapon('ho12',-1)">−</button><span>${s.mod_ho12}</span><button onclick="assignWeapon('ho12',1)">+</button></div></div>`;
    mh+=`<div class="module-row"><span>SIL 4 (silicones)</span><div class="counter"><button onclick="assignWeapon('sil4',-1)">−</button><span>${s.mod_sil4}</span><button onclick="assignWeapon('sil4',1)">+</button></div></div>`;
  }
  document.getElementById('module-details').innerHTML=mh;
  
  const al=document.getElementById('ship-alert'), st=document.getElementById('display-status');
  
  if(state.currentPlanet && state.reembarked){
    al.innerHTML='<strong>Statut : Prêt au décollage.</strong> Équipages à bord.';
    al.style.background='var(--accent-light)';
    st.innerText='Prêt au décollage';
    st.className='status-item active';
  } else if(state.currentPlanet){
    al.innerHTML='<strong>Statut : Sur planète.</strong> Atterrissage effectué.';
    al.style.background='var(--accent-light)';
    st.innerText='Atterri';
    st.className='status-item active';
  } else if(state.isInFlight){ 
    al.innerHTML='<strong>Statut : En vol.</strong> La dotation est verrouillée.'; 
    al.style.background='#fce8e8'; 
    st.innerText='En vol'; 
    st.className='status-item danger'; 
  } else { 
    al.innerHTML='<strong>Statut : À la Base.</strong> Vous pouvez modifier l\'équipement.'; 
    al.style.background='var(--accent-light)'; 
    st.innerText='À la Base'; 
    st.className='status-item active'; 
  }
  
  document.getElementById('ship-title').innerText=`${state.shipClass} « MARTHIA » · niveau ${c.level}`;
  document.querySelectorAll('#tab-vaisseau .stat-row > .counter > button, .module-row .counter button').forEach(b=>b.disabled=state.isInFlight);
  document.getElementById('display-shields').innerText=`Boucliers ${state.shieldsOn?'Activés':'Désactivés'}`;
  document.getElementById('display-shields').className=`status-item ${state.shieldsOn?'active':'danger'}`;
}

function setShields(on){
  if(on && state.ship.shields<=0){ alert('Plus aucun bouclier à bord.'); document.getElementById('check-shields').checked=false; return; }
  if(state.shieldsLocked){ alert('Les boucliers sont fixés pour ce tour.'); document.getElementById('check-shields').checked=state.shieldsOn; return; }
  state.shieldsOn=on;
  document.getElementById('display-shields').innerText=`Boucliers ${on?'Activés':'Désactivés'}`;
  document.getElementById('display-shields').className=`status-item ${on?'active':'danger'}`;
  renderShip();
}

function hitShip(n){
  for(let i=0;i<n;i++){
    const r=d6(), el=TAB_C[r];
    recordOp('C','Dégât vaisseau',{dé:r},el,'');
    addDebugLog(`Tableau C : dé ${r} → ${el}`);
    if(el==='coque'){
      state.hullHitsThisTurn++;
      if(state.hullHitsThisTurn>=2){ shipDestroyed(); return; }
      log('SPACE COMPUTER','Coque touchée : sans effet (premier impact du tour).');
      continue;
    }
    const key={bou:'shields',las:'lasers',rad:'radars',com:'computers',res:'tanks'}[el];
    if(state.ship[key]>0){ state.ship[key]--; log('SPACE COMPUTER',`Dégât : un élément « ${NOM_ELEMENT[el]} » est détruit.`);
      if(key==='shields' && state.ship.shields<=0){ state.shieldsOn=false; log('SPACE COMPUTER','<b>Boucliers détruits</b> : aucun bouclier disponible (F.C. Dif. = coque, 2).'); } }
    else log('SPACE COMPUTER',`Dégât sur « ${NOM_ELEMENT[el]} » absent du vaisseau : ignoré.`);
  }
  if(n > 0 && state.specialite) verifierDecesOfficier();
  renderShip(); updateRouteLimits();
}

function showShipDestroyedFx(prev, next){
  if(!document.getElementById('destroy-fx-style')){
    const st=document.createElement('style'); st.id='destroy-fx-style';
    st.textContent=`
#destroy-fx{position:fixed;inset:0;z-index:9999;background:radial-gradient(circle,rgba(255,90,20,.55) 0%,rgba(0,0,0,.94) 62%);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;animation:dfxFade .4s ease-out}
#destroy-fx .dfx-flash{position:absolute;inset:0;background:#fff;animation:dfxFlash .5s ease-out forwards;pointer-events:none}
#destroy-fx .dfx-shard{position:absolute;left:50%;top:50%;height:4px;background:#ffb020;box-shadow:0 0 10px #ff5a00;opacity:0;animation:dfxShard 1.6s ease-out forwards;pointer-events:none}
#destroy-fx h1{color:#ffcf5a;text-shadow:0 0 18px #ff4d00,0 0 40px #ff2a00;letter-spacing:.08em;margin:0 16px;text-align:center;font-size:clamp(28px,9vw,56px);animation:dfxTitle 1.2s cubic-bezier(.2,1.6,.4,1) both}
#destroy-fx p{color:#f5e6c8;font-size:15px;max-width:80vw;text-align:center;margin:18px 0 0;opacity:0;animation:dfxFade 1s .9s forwards}
#destroy-fx .dfx-hint{position:absolute;bottom:24px;font-size:12px;color:#9a8a6a;opacity:0;animation:dfxFade 1s 2s forwards}
body.dfx-shake{animation:dfxShake .6s linear}
@keyframes dfxFade{from{opacity:0}to{opacity:1}}
@keyframes dfxFlash{0%{opacity:1}100%{opacity:0}}
@keyframes dfxTitle{0%{transform:scale(3);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes dfxShard{0%{opacity:1;transform:translate(0,0) rotate(0)}100%{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(var(--r))}}
@keyframes dfxShake{0%,100%{transform:translate(0,0)}10%{transform:translate(-8px,4px)}20%{transform:translate(8px,-6px)}30%{transform:translate(-10px,2px)}40%{transform:translate(10px,-4px)}50%{transform:translate(-6px,6px)}60%{transform:translate(6px,-2px)}70%{transform:translate(-4px,3px)}80%{transform:translate(3px,-3px)}90%{transform:translate(-2px,1px)}}`;
    document.head.appendChild(st);
  }
  document.body.classList.add('dfx-shake');
  setTimeout(()=>document.body.classList.remove('dfx-shake'),700);

  const ov=document.createElement('div'); ov.id='destroy-fx';
  ov.innerHTML='<div class="dfx-flash"></div>';
  for(let i=0;i<22;i++){
    const sh=document.createElement('span'); sh.className='dfx-shard';
    const a=Math.random()*Math.PI*2, dist=120+Math.random()*280;
    sh.style.setProperty('--dx',(Math.cos(a)*dist)+'px');
    sh.style.setProperty('--dy',(Math.sin(a)*dist)+'px');
    sh.style.setProperty('--r',(Math.random()*720-360)+'deg');
    sh.style.width=(8+Math.random()*22)+'px';
    sh.style.animationDelay=(Math.random()*0.15)+'s';
    ov.appendChild(sh);
  }
  const h=document.createElement('h1'); h.textContent='VAISSEAU DÉTRUIT'; ov.appendChild(h);
  const p=document.createElement('p');
  p.innerHTML = prev!==next ? `Retour de sauvetage : ${prev} → ${next}.<br>Score remis à zéro.` : `Grade minimum : vous repartez sur un ${next}.<br>Score remis à zéro.`;
  ov.appendChild(p);
  const hint=document.createElement('div'); hint.className='dfx-hint'; hint.textContent='Touchez pour continuer';
  ov.appendChild(hint);
  ov.addEventListener('click',()=>ov.remove());
  document.body.appendChild(ov);
  if(navigator.vibrate) navigator.vibrate([250,120,400]);
  setTimeout(()=>{ if(ov.parentNode) ov.remove(); },6000);
}

function shipDestroyed(){
  const order=['FROMBOLA','GLADIUM','SPATHA','HASTA'];
  const idx=order.indexOf(state.shipClass);
  const nc=idx>0?order[idx-1]:'FROMBOLA';
  log('SPACE COMPUTER',`<b>VAISSEAU DÉTRUIT.</b> ${state.shipClass!==nc ? `Retour de sauvetage : ${state.shipClass} → ${nc}` : `Grade minimum : vous repartez sur un ${nc}`}, score remis à zéro.`);
  showShipDestroyedFx(state.shipClass, nc);
  addDebugLog(`Destruction : ${state.shipClass} → ${nc}`);
  state.shipClass=nc; state.maxContainers=SHIPS[nc].cont; state.points=0;
  state.ship={crew:SHIPS[nc].eqMin,shields:1,lasers:1,radars:2,computers:1,tanks:3,modules:0,mod_zip3:0,mod_ho12:0,mod_sil4:0};
  state.position={...state.basePos}; state.isInFlight=false; state.shieldsLocked=false; state.shieldsOn=true;
  state.groundCrews=[]; state.menGround=0; state.crewGround=0; state.hasGroundCrew=false; state.menLost=0; state.mission=null; state.missionResult=null; state.currentPlanet=null;
  document.getElementById('display-points').innerText=0;
  document.getElementById('display-status').innerText='À la Base';
  document.getElementById('landing-content').style.display='none';
  document.getElementById('no-landing').style.display='block';
  renderShip(); updateRouteLimits(); resetRoute(); renderPlanets();
}

// ==========================================
// DÉCLARATION & EXÉCUTION DES ROUTES
// ==========================================
function getMaxThrust(){ return state.ship.tanks*cls().ppr; }
function getCurrentTotal(){ return state.route.segments.reduce((s,g)=>s+g.parsecs,0); }
function updateRouteLimits(){ document.getElementById('max-thrust').innerText=getMaxThrust(); renderSegments(); }

function updateParsecsInput(ch){
  let v=state.route.parsecsInput+ch; if(v<1)v=1;
  if(v>getMaxThrust()-getCurrentTotal()) return;
  state.route.parsecsInput=v; document.getElementById('val-parsecs-input').innerText=v;
}

function addSegment(dir){
  const p=(dir==='HAUT'||dir==='BAS')?4:state.route.parsecsInput;
  const rem=getMaxThrust()-getCurrentTotal();
  if(p>rem) return alert(`Poussée insuffisante : il reste ${rem} parsecs.`);
  state.route.segments.push({parsecs:p,dir}); renderSegments();
  state.route.parsecsInput=1; document.getElementById('val-parsecs-input').innerText=1;
}

function removeSegment(i){ state.route.segments.splice(i,1); renderSegments(); }

function renderSegments(){
  const c=document.getElementById('segments-container'); c.innerHTML=''; let total=0;
  if(state.route.segments.length===0) c.innerHTML='<span style="color:#aaa;font-style:italic;">Aucune</span>';
  else state.route.segments.forEach((s,i)=>{ total+=s.parsecs;
    const t=document.createElement('div'); t.className='segment-tag';
    t.innerHTML=`${s.dir==='HAUT'?'▲ HAUT':s.dir==='BAS'?'▼ BAS':s.parsecs+' '+s.dir} <span onclick="removeSegment(${i})">×</span>`; c.appendChild(t); });
  const max=getMaxThrust();
  document.getElementById('thrust-text').innerText=`${total} / ${max} parsecs`;
  document.getElementById('thrust-bar').style.width = max?`${(total/max)*100}%`:'0%';
  document.getElementById('btn-execute').disabled=(total===0);
  const rem=max-total; if(state.route.parsecsInput>rem){ state.route.parsecsInput=rem>0?rem:1; document.getElementById('val-parsecs-input').innerText=state.route.parsecsInput; }
}

function updateRadars(ch){
  const v=state.route.radarsActive+ch;
  if(v<0||v>state.ship.radars) return;
  state.route.radarsActive=v; document.getElementById('val-route-radars').innerText=v;
}

function resetRoute(){
  state.route.segments=[]; state.route.parsecsInput=1; state.route.radarsActive=state.ship.radars;
  document.getElementById('val-parsecs-input').innerText=1;
  document.getElementById('val-route-radars').innerText=state.route.radarsActive;
  document.getElementById('check-landing').checked=false;
  renderSegments();
}

function blackHoleHit(path){
  if(!state.risks||!state.risks.blackHole) return 0;
  const bh=state.risks.blackHole;
  const pts=path.filter(p=>!p.isJump);
  if(!pts.length) return 0;
  const dmin=Math.min(...pts.map(p=>Math.max(Math.abs(p.x-bh.x), Math.abs(p.y-bh.y))));
  if(dmin>4) return 0;
  const d=d6(), res=Math.round(dmin)-cls().level-d;
  recordOp('Risque','Trou noir',{dé:d,distance:dmin.toFixed(1),masse:cls().level},res<0?(-res)+' dégât(s)':'aucun','');
  addDebugLog(`Trou noir : distance ${dmin.toFixed(1)} − masse ${cls().level} − dé ${d} = ${res}`);
  if(res<0){ log('SPACE COMPUTER',`Effets du noyau au parsec le plus proche : ${-res} dégât(s).`); return -res; }
  return 0;
}

function riskStop(path){
  if(!state.risks) return null;
  for(let i=0;i<path.length;i++){
    const p=path[i]; if(p.isJump) continue;
    if(state.risks.rmg.some(c=>c.x===p.x&&c.y===p.y&&c.z===p.z)) return {index:i,kind:'rmg'};
    if(state.risks.dn.some(c=>c.x===p.x&&c.y===p.y&&c.z===p.z)) return {index:i,kind:'dn'};
  }
  return null;
}

function distortionRelocate(from){
  const dirs=['N','E','S','O','HAUT','BAS'];
  const dir=dirs[d6()-1], dist=d6();
  let p={...from};
  for(let i=0;i<dist;i++){
    let np={...p};
    if(dir==='HAUT') np.z++; else if(dir==='BAS') np.z--;
    else { const v={N:{x:0,y:1},E:{x:1,y:0},S:{x:0,y:-1},O:{x:-1,y:0}}[dir]; np.x+=v.x; np.y+=v.y; }
    if(!inBounds(np.x,np.y,np.z)) break;
    p=np;
  }
  addDebugLog(`Distorsion nullius : direction ${dir}, distance ${dist} → X:${p.x} Y:${p.y} Z:${p.z}`);
  return p;
}

function executeRoute(){
  if(state.route.segments.length===0) return;
  state.shieldsLocked=true; state.hullHitsThisTurn=0;
  state.isInFlight=true; renderShip();
  const isLanding=document.getElementById('check-landing').checked;
  const radar=state.route.radarsActive;
  switchTab('journal');
  const routeStr=state.route.segments.map(s=>`${s.dir==='HAUT'||s.dir==='BAS'?'▲/▼ ':''}${s.parsecs} ${s.dir}`).join(' + ');
  log('OFFICIER COMMANDANT',`Tour ${state.turn} — Ma route : ${routeStr}. ${radar} radar(s). ${isLanding?"(route d'atterrissage)":''}`);
  addDebugLog(`>>> ROUTE : ${routeStr} (radars ${radar}, atterrissage ${isLanding})`);
  if(state.pendingDN){
    const pd = state.pendingDN; state.pendingDN = null;
    state.position = {x:pd.x,y:pd.y,z:pd.z};
    document.getElementById('display-level').innerText=`Niveau ${state.position.z}`;
    const plDN = state.planets.find(q=>q.id!==0 && q.x===pd.x && q.y===pd.y && q.z===pd.z);
    if(plDN){
      log('SPACE COMPUTER', `La Distorsion Nullius vous a déposé sur la Planète #${plDN.id} : atterrissage obligatoire.`);
      resetRoute(); prepareLanding(plDN); return;
    }
  }

  let cur={...state.position}; const path=[]; let boundaryStop=false;
  for(const seg of state.route.segments){
    if(seg.dir==='HAUT'||seg.dir==='BAS'){
      const nz=cur.z+(seg.dir==='HAUT'?1:-1);
      if(nz<BOUNDS.zMin||nz>BOUNDS.zMax){ boundaryStop=true; break; }
      cur={...cur,z:nz}; path.push({...cur,isJump:true});
    } else {
      for(let i=0;i<seg.parsecs;i++){
        const nx=cur.x+dirVectors[seg.dir].x, ny=cur.y+dirVectors[seg.dir].y;
        if(!inBounds(nx,ny,cur.z)){ boundaryStop=true; break; }
        cur={...cur,x:nx,y:ny}; path.push({...cur});
      }
      if(boundaryStop) break;
    }
  }
  if(boundaryStop) log('SPACE COMPUTER','Limite de la Tabula atteinte : déplacement interrompu sur le dernier parsec utile.');

  let targetPlanet=null;
  if(isLanding && path.length){
    const f=path[path.length-1];
    targetPlanet=state.planets.find(p=>p.x===f.x&&p.y===f.y&&p.z===f.z&&p.id!==0)||null;
  }
  let collisionIndex=-1, collisionPlanet=null;
  for(let i=0;i<path.length;i++){
    const p=path[i]; if(p.isJump) continue;
    const hit=state.planets.find(q=>q.x===p.x&&q.y===p.y&&q.z===p.z&&q.id!==0);
    if(hit){ if(isLanding&&hit===targetPlanet&&i===path.length-1) continue; collisionIndex=i; collisionPlanet=hit; break; }
  }
  let riskHit=null;
  if(state.level==='AVANCE'){
    const rs=riskStop(path);
    if(rs && (collisionIndex===-1 || rs.index<collisionIndex)){ collisionIndex=rs.index; riskHit=rs; collisionPlanet=null; }
  }

  let maxSteps=path.length, routeInterrompue=false, atterrissageForce=false;
  if(collisionIndex!==-1){
    if(collisionPlanet && radar===0){ maxSteps=collisionIndex+1; atterrissageForce=true; }
    else { maxSteps=Math.max(0,collisionIndex-radar+1); routeInterrompue=true; if(!collisionPlanet) maxSteps=collisionIndex+1; }
  }
  let tp={...state.position};
  for(let i=0;i<maxSteps;i++){ const np=path[i]; if(tp.z===np.z&&!np.isJump) state.travelHistory.push({x1:tp.x,y1:tp.y,x2:np.x,y2:np.y,z:tp.z}); tp=np; }

  let risksDamage=0;
  if(state.level==='AVANCE') risksDamage=blackHoleHit(path.slice(0,maxSteps));

  state.computersUsedThisTurn=0; state.observablePlanets=[];
  const planetSightings = {};
  let stepCount=0;
  let baseSighting=null;

  for(let i=0;i<maxSteps;i++){
    const np=path[i]; if(np.isJump){ stepCount+=4; continue; } stepCount++;
    state.planets.forEach(p=>{
      if(p.id===0){
        if(p.z!==np.z) return;
        const dxb=p.x-np.x, dyb=p.y-np.y, distb=Math.max(Math.abs(dxb),Math.abs(dyb));
        if(distb<=radar && (!baseSighting || distb<baseSighting.dist)) baseSighting={step:stepCount,dist:distb,dir:formatDirection(dxb,dyb)};
        return;
      }
      if(p.z!==np.z) return;
      const dx=p.x-np.x, dy=p.y-np.y, dist=Math.max(Math.abs(dx), Math.abs(dy));
      if(dist<=radar){
        if(!state.observablePlanets.includes(p.id)) state.observablePlanets.push(p.id);

        const isNew=!p.discovered;
        if(isNew){
          const discPts = Math.max(0, 2 - cls().level);
          state.points += discPts;
          recordOp('Découverte','Planète #'+p.id+' (inconnue)',{parsec:stepCount,distance:dist},'+'+discPts+' pt(s)','');
          p.discovered=true;
        }

        if(!planetSightings[p.id] || dist < planetSightings[p.id].dist || (dist === planetSightings[p.id].dist && stepCount < planetSightings[p.id].step)){
          let dirText = formatDirection(dx, dy);
          planetSightings[p.id] = { step: stepCount, dist: dist, dir: dirText, isNew: isNew };
        }

        if(!p.report||stepCount<p.report.step||(stepCount===p.report.step&&dist<p.report.dist)){
          p.report={step:stepCount,dist:dist,dir:formatDirection(dx,dy)};
        }
      }
    });
  }

  if(baseSighting){
    const b = baseSighting;
    log('SPACE COMPUTER', b.dist===0
      ? `Au <b>${b.step}e parsec</b>, la <b>Base</b> se trouve sur votre trajectoire.`
      : `Au <b>${b.step}e parsec</b>, la <b>Base</b> est signalée à proximité (distance ${b.dist} parsec${b.dist>1?'s':''}, direction ${b.dir}).`);
  }
  Object.keys(planetSightings).forEach(pid => {
    const info = planetSightings[pid];
    log('SPACE COMPUTER', `Au <b>${info.step}e parsec</b>, repérage au plus près de la <b>Planète #${pid}</b> ${info.isNew ? '(inconnue)' : '(déjà connue)'}. Distance minimale : <b>${info.dist} parsec(s)</b>. Direction : <b>${info.dir}</b>.`);
  });

  let finalPos = maxSteps>0 ? {...path[maxSteps-1]} : {...state.position};
  if(maxSteps>0 && finalPos.isJump) finalPos={x:finalPos.x,y:finalPos.y,z:finalPos.z};
  if(riskHit && riskHit.kind==='dn'){
    // Le nouveau point de départ est calculé en secret par le S.C. et appliqué au tour suivant (Règlement S.C., C) Distorsions Nullius)
    const relo=distortionRelocate(finalPos);
    state.pendingDN={x:relo.x,y:relo.y,z:relo.z};
    if(state.specialite==='princeps psi')
      log('SPACE COMPUTER', `Princeps PSI : la distorsion nullius transportera votre vaisseau au parsec X${relo.x} Y${relo.y} N${relo.z} au tour suivant.`);
  }
  state.position={x:finalPos.x,y:finalPos.y,z:finalPos.z};
  document.getElementById('display-level').innerText=`Niveau ${state.position.z}`;
  recordOp('Route','Déplacement de '+maxSteps+' parsec(s)',{route:routeStr,radars:radar},'arrivée X'+finalPos.x+' Y'+finalPos.y+' N'+finalPos.z,'');
  state.turn++; document.getElementById('display-turn').innerText=`Tour ${state.turn}`;

  setTimeout(()=>{
    if(atterrissageForce){
      log('SPACE COMPUTER',`Aucun radar à bord. Votre trajectoire traverse la Planète #${collisionPlanet.id} : atterrissage obligatoire.`);
      resetRoute(); prepareLanding(collisionPlanet); return;
    }
    if(routeInterrompue && collisionPlanet) log('SPACE COMPUTER',`<b>ARRÊT D'URGENCE.</b> Planète #${collisionPlanet.id} détectée sur la trajectoire : arrêt au parsec ${maxSteps}.`);
    if(riskHit && riskHit.kind==='rmg' && state.specialite==='princeps psi') log('SPACE COMPUTER','Princeps PSI : réseau magnéto-gravitationnel détecté. La route s\'arrête sur ce parsec et repartira au tour suivant.');
    if(riskHit && riskHit.kind==='dn') log('SPACE COMPUTER','Distorsion nullius : la route s\'interrompt.');
    if(riskHit) verifierPsiRisque();
    if(risksDamage>0) hitShip(risksDamage);
    
    document.getElementById('display-points').innerText=state.points;
    renderPlanets();
    if(Object.keys(planetSightings).length === 0 && !routeInterrompue) {
      log('SPACE COMPUTER','Déplacement effectué. Aucune planète détectée par les radars.');
    }

    if(isLanding && targetPlanet && state.position.x===targetPlanet.x && state.position.y===targetPlanet.y && state.position.z===targetPlanet.z){
      log('SPACE COMPUTER',`Route d'atterrissage confirmée. Vous arrivez sur la Planète #${targetPlanet.id}.`);
      resetRoute(); prepareLanding(targetPlanet); finishTurn(); return;
    }
    if(!routeInterrompue && state.position.x===state.basePos.x && state.position.y===state.basePos.y && state.position.z===state.basePos.z){
      state.isInFlight=false;
      log('SPACE COMPUTER','Retour à la planète-base. Les droïdes-techniciens peuvent rééquiper le vaisseau.');
      checkPromotionAtBase();
    }
    finishTurn();
  },600);
}

// ==========================================
// FONCTION POUR PASSER UN TOUR (DEMANDE D'INFO)
// ==========================================
function passTurn(){
  state.computersUsedThisTurn=0;
  state.turn++;
  document.getElementById('display-turn').innerText=`Tour ${state.turn}`;
  log('OFFICIER COMMANDANT', "Je passe ce tour sur place pour analyser l'environnement et demander des informations.");
  addDebugLog(`Tour passé sur place. Nouveau tour : ${state.turn}`);
  
  const radar = state.route.radarsActive;
  state.observablePlanets = [];
  state.planets.forEach(p => {
    if(p.id === 0 || p.z !== state.position.z) return;
    const dx = p.x - state.position.x, dy = p.y - state.position.y, dist = Math.max(Math.abs(dx), Math.abs(dy));
    if(dist <= radar){
      if(!state.observablePlanets.includes(p.id)) state.observablePlanets.push(p.id);
      if(dist === 0) return;
      const isNew = !p.discovered;
      let dirText = formatDirection(dx, dy);
      if(!p.report || 1 < p.report.step) p.report = {step: 1, dist: dist, dir: dirText};
      p.discovered = true;
      if(isNew) {
        const discPts = Math.max(0, 2 - cls().level);
        state.points += discPts;
        recordOp('Découverte', 'Planète #' + p.id + ' (inconnue)', {distance: dist}, '+' + discPts + ' pt(s)', '');
      }
      log('SPACE COMPUTER', `Depuis votre position, repérage de la <b>Planète #${p.id}</b> ${isNew ? '(inconnue)' : '(déjà connue)'}. Distance minimale : <b>${dist} parsec(s)</b>. Direction : <b>${dirText}</b>.`);
    }
  });
  document.getElementById('display-points').innerText = state.points;
  renderPlanets();
  renderShip();
}

function finishTurn(){
  medecinRestaure();
  scheduleAutosave();
  state.isInFlight = state.isInFlight && (state.position.x!==state.basePos.x || state.position.y!==state.basePos.y || state.position.z!==state.basePos.z);
  state.shieldsLocked=false;
  state.computersUsedThisTurn=0;
  resetRoute(); renderShip(); renderPlanets();
}

// ==========================================
// ONGLET PLANÈTES
// ==========================================
function renderPlanets(){
  const c=document.getElementById('planets-container');
  const disc=state.planets.filter(p=>p.discovered&&p.id!==0);
  if(!disc.length){ c.innerHTML='<p style="text-align:center;color:#888;">Aucune planète repérée.</p>'; return; }
  let h='';
  disc.forEach(p=>{
    const ch=ensureChain(p);
    const unk=(x)=>x? '' : 'unknown';
    const type=ch.letter? LETTER_NAME[ch.letter] : 'inconnu';
    const life=ch.forme? FORME_NAME[ch.forme] : 'inconnu';
    const te=ch.tcode? TCODE_NAME[ch.tcode] : 'inconnu';
    const car=ch.race? RACES[ch.race].type.replace(/_/g,' ') : (ch.cat? ch.cat.replace(/_/g,' ') : 'inconnu');
    const nat=ch.nature? NATURE_NAME[ch.nature] : 'inconnu';
    const race=ch.race? ch.race.replace(/_/g,' ') : 'inconnu';
    let bars=''; for(let i=0;i<6;i++) bars+=`<div class="p-bar ${i<p.infoLevel?'active':''}"></div>`;
    const maxI=p.infoLevel>=6, noC=state.computersUsedThisTurn>=state.ship.computers, notObs=!state.observablePlanets.includes(p.id);
    const dis=(maxI||noC||notObs)?'disabled':'';
    const radRow = state.level==='AVANCE' ? `<div class="label">Radioactivité</div><div class="value ${unk(ch.rad)}">${ch.rad||'inconnu'}</div>` : '';
    let fiche='';
    if(ch.race && p.infoLevel>=6){
      const r=RACES[ch.race];
      let fcText = r.fc !== null ? r.fc : 'Variable / Spécifique';
      if(ch.race === 'SPHAERAE') fcText = '0.5 (équipage) / 1 à 2.5 (vaisseau niv. 0 à 3)';
      if(ch.race === 'NORMO') fcText = 'Att = Dif Légion / Dif = Att Légion';
      if(ch.race === 'SIPCO') fcText = 'Dif = Légion / Att = Dif Légion + 2';
      if(ch.race === 'ATTLERS') fcText = 'Dif = Légion / Att = Légion + 1D6';
      if(ch.race === 'CRONOS') fcText = 'Att = Légion × 1D6';

      // Règle 4 Note D : en mode BASE (espace interne), ne pas afficher Niveau Tech, Milieu préféré et Non viable
      const advDetails = state.level === 'AVANCE'
        ? ` · Tech : ${r.niveauTech!==null?r.niveauTech:'—'}<br>Milieu préféré : ${r.milieuPrefere.nom.join(', ')||'—'}${r.milieuPrefere.bonus!=null?' (+'+r.milieuPrefere.bonus+')':''} · Non viable : ${r.milieuNonViable.join(', ')||'—'}<br>`
        : '<br>';

      fiche=`<div style="font-size:12px;color:var(--text-muted);border-top:1px dashed var(--border);padding-top:8px;margin-bottom:12px;line-height:1.6;">
        F.C. ${fcText} · Missions : ${r.missions.join(', ')||'aucune'}${advDetails}
        ${r.notes? 'Notes : '+r.notes : ''}</div>`;
    }
    h+=`<div class="planet-card"><div class="planet-header"><h3>Planète ${p.id} ${p.done?'(Visitée)':''}</h3><span class="pts">+${Math.max(0,2-cls().level)} pt(s) de découverte</span></div>
      <div class="planet-coords">Repérée au ${p.report?p.report.step:'?'}e parsec · ${p.report?p.report.dir:''} (niv. ${p.z})</div>
      <div class="progress-bars">${bars}</div>
      <div class="planet-data"><div class="label">Type</div><div class="value ${unk(ch.letter)}">${type}</div>
      <div class="label">Forme de vie</div><div class="value ${unk(ch.forme)}">${life}</div>
      <div class="label">Type d'E.</div><div class="value ${unk(ch.tcode)}">${te}</div>
      <div class="label">Caractéristiques</div><div class="value ${unk(ch.cat)}">${car}</div>
      <div class="label">Nature</div><div class="value ${unk(ch.nature)}">${nat}</div>
      <div class="label">Race</div><div class="value ${unk(ch.race)}">${race}</div>
      ${radRow}</div>
      ${fiche}
      <div class="planet-footer"><span>Informations (${p.infoLevel}/6)</span><div class="counter"><button disabled>−</button><span>${p.infoLevel}</span><button onclick="requestInfo(${p.id})" ${dis}>+</button></div></div></div>`;
  });
  c.innerHTML=h;
  document.getElementById('computers-available').innerText=state.ship.computers-state.computersUsedThisTurn;
}

// Règle propre au jeu solo : après deux D.N.S. sur une même planète, plus aucune information
// tant que le vaisseau n'a pas atterri dessus (l'atterrissage réinitialise le compteur).
const DNS_LIMITE = 2;
function requestInfo(id){
  if(state.computersUsedThisTurn>=state.ship.computers) return;
  const p=state.planets.find(x=>x.id===id);
  if(p.infoLevel>=6) return;
  if((p.dnsCount||0) >= DNS_LIMITE) return alert("Deux données insuffisantes (D.N.S.) ont déjà été obtenues sur cette planète : aucune information supplémentaire tant que vous n'atterrissez pas.");
  if(!state.observablePlanets.includes(id)) return alert("La planète est hors de portée des radars ce tour.");
  ensureChain(p);
  state.computersUsedThisTurn++;
  log('OFFICIER COMMANDANT',`J'alloue 1 ordinateur pour la Planète #${id}.`);
  const r=rollStep(p,p.infoLevel+1);
  if(r.status==='dns'){
    p.dnsCount = (p.dnsCount||0) + 1;
    log('SPACE COMPUTER', `D.N.S. : données insuffisantes (${p.dnsCount}/${DNS_LIMITE}). La demande est perdue, à répéter.` + (p.dnsCount>=DNS_LIMITE ? ' Plus aucune information possible sur cette planète avant atterrissage.' : ''));
  }
  else { log('SPACE COMPUTER',r.text); p.infoLevel = (r.status==='end') ? 6 : p.infoLevel+1; }
  addDebugLog(`Planète #${id} : information ${p.infoLevel}/6`);
  renderPlanets();
}

// ==========================================
// ATTERRISSAGE & COMBATS
// ==========================================
function hideAllMissionBtns(){
  ensureMissionButtons();
  ['btn-combat','btn-intim','btn-comm','btn-sci','btn-alliance','btn-capture','btn-rotsa','btn-duel','btn-tot100','btn-switch-to-ground'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.style.display='none';
  });
}

function setupPlanetEncounter(){
  const p = state.currentPlanet;
  if(!p) return;
  const ch = ensureChain(p);
  const raceId = ch.race;
  state.alienRace = raceId;
  const isObjectPlanet = (ch.tcode === 'OZ' || ch.tcode === 'SECOR');
  const isSine = (ch.forme === 'SINE');

  if(!state.encounterRolled){
    state.currentAliens = (raceId && !isObjectPlanet && !isSine) ? rollPresence(raceId) : 0;
    if(raceId === 'NUBIS_ARENAE' && state.landingZone === 'Désert') state.currentAliens = 3;
    else if(raceId === 'NUBIS_ARENAE' && state.currentAliens === 0) state.currentAliens = 3;
    state.alienWounded = 0;
    state.encounterRolled = true;
  }

  const r = raceId ? RACES[raceId] : null;
  let fcStr = alienFC();
  if(raceId === 'SPHAERAE') fcStr = '0.5 (équipage) / 1 à 2.5 (vaisseau)';
  if(raceId === 'NORMO') fcStr = 'Égal à F.C. Légion';
  if(raceId === 'SIPCO') fcStr = 'Défense Légion (+2 Att)';
  if(raceId === 'ATTLERS') fcStr = 'Défense Légion (+1D6 Att)';
  if(raceId === 'CRONOS') fcStr = 'Légion × 1D6';

  document.getElementById('alien-title').innerText = isObjectPlanet ? TCODE_NAME[ch.tcode] : (isSine ? 'Planète sans vie' : (r ? raceId.replace(/_/g,' ') : 'Aucun Extrasolaire'));
  document.getElementById('alien-sub').innerText = isObjectPlanet ? 'Objet à ramasser par un équipage à terre' : (isSine ? 'Aucune présence' : (r ? `${r.type.replace(/_/g,' ')} · Nature : ${NATURE_NAME[ch.nature]||'—'} · F.C. ${fcStr}` : 'Pas de race sur cette planète'));
  document.getElementById('alien-count').innerText = state.currentAliens;
  document.getElementById('alien-wounded').innerText = state.alienWounded;
}

function updateMissionButtonsVisibility(){
  ensureMissionButtons();
  hideAllMissionBtns();
  const p = state.currentPlanet;
  if(!p) return;
  const ch = ensureChain(p);
  const raceId = ch.race;
  const r = raceId ? RACES[raceId] : null;
  const isObjectPlanet = (ch.tcode === 'OZ' || ch.tcode === 'SECOR');
  const hasAliens = !isObjectPlanet && state.currentAliens > 0 && r;

  // Arme TOT 100% disponible sur Spatha et Hasta (niveau >= 2)
  if(cls().level >= 2 && document.getElementById('btn-tot100')){
    document.getElementById('btn-tot100').style.display = 'flex';
  }

  // Si les équipages sont encore à bord (Boucliers activés A ou B)
  if(!state.hasGroundCrew){
    if(state.landingBehavior === 'B' && hasAliens && state.ship.lasers > 0){
      if(r.missions.includes('ELIMINATION')){
        const btnC = document.getElementById('btn-combat');
        if(btnC){
          btnC.style.display = 'flex';
          const title = btnC.querySelector('.m-title');
          if(title) title.innerText = 'Élimination (Tir Lasers de bord ZIP 11)';
        }
      }
      // Règlement U.C. IV : l'Intimidation peut aussi être faite avec les armes de bord !
      if(r.missions.includes('INTIMIDATION') && !state.missionUsed){
        document.getElementById('btn-intim').style.display = 'flex';
      }
    }
    const switchBtn = document.getElementById('btn-switch-to-ground');
    if(switchBtn && state.ship.crew > 0){
      switchBtn.style.display = 'block';
    }
    return;
  }

  // Si les équipages sont débarqués à terre (Comportement C ou D)
  const btnC = document.getElementById('btn-combat');
  if(btnC){
    const title = btnC.querySelector('.m-title');
    if(title) title.innerText = 'Élimination physique';
  }

  // Règlement U.C. 3H : 1 seul type de mission par planète, mais l'Élimination reste toujours possible en solution de repli !
  const allowElim = hasAliens && r.missions.includes('ELIMINATION');
  const allowCapt = hasAliens && r.missions.includes('CAPTURE') && !state.missionUsed;
  const allowIntim = hasAliens && r.missions.includes('INTIMIDATION') && !state.missionUsed;
  const allowComm = hasAliens && r.missions.includes('COMMERCE') && state.commTurns < 2;
  const allowSci = hasAliens && r.missions.includes('RECHERCHE_SCIENTIFIQUE') && !state.missionUsed;
  const allowAlliance = hasAliens && r.missions.includes('ALLIANCE') && !state.missionUsed && state.allianceFails < 2;
  const allowRotsa = hasAliens && r.missions.includes('ROTSA') && !state.missionUsed;
  const allowDuel = hasAliens && r.missions.includes('DUEL') && !state.missionUsed;

  document.getElementById('btn-combat').style.display = allowElim ? 'flex' : 'none';
  document.getElementById('btn-intim').style.display = allowIntim ? 'flex' : 'none';
  document.getElementById('btn-comm').style.display = allowComm ? 'flex' : 'none';
  document.getElementById('btn-sci').style.display = allowSci ? 'flex' : 'none';
  if(document.getElementById('btn-alliance')) document.getElementById('btn-alliance').style.display = allowAlliance ? 'flex' : 'none';
  if(document.getElementById('btn-capture')) document.getElementById('btn-capture').style.display = allowCapt ? 'flex' : 'none';
  if(document.getElementById('btn-rotsa')) document.getElementById('btn-rotsa').style.display = allowRotsa ? 'flex' : 'none';
  if(document.getElementById('btn-duel')) document.getElementById('btn-duel').style.display = allowDuel ? 'flex' : 'none';
}

function switchToGroundMode(){
  state.shieldsOn = false;
  state.landingBehavior = 'D';
  const chk = document.getElementById('check-shields');
  if(chk) chk.checked = false;
  document.getElementById('landing-shields').innerText = 'Désactivés';
  renderShip();
  log('OFFICIER COMMANDANT', 'Je coupe les boucliers SOK 9 pour permettre le débarquement des équipages.');
  document.getElementById('mission-panel').style.display = 'none';
  document.getElementById('ground-actions').style.display = 'block';
}

function prepareLanding(planet){
  planet.dnsCount = 0;
  if(planet.done){ alert('Cette planète est déjà connue : elle ne rapporte plus de points.'); return; }
  state.reembarked=false; state.currentPlanet=planet; state.crewGround=0; state.groundCrews=[]; state.menGround=0; state.hasGroundCrew=false; state.landedTurns=0; state.menLost=0; state.missionResult=null; state.mission=null; state.missionUsed=false; state.allianceFails=0; state.commTurns=0; state.encounterRolled=false; state.landingBehavior=null; state.landingZone=null;
  disembarkCount = Math.min(1, state.ship.crew);
  updateDisembarkUI();
  state.isInFlight = false;
  renderShip();
  switchTab('debarquer');
  document.getElementById('landing-content').style.display='block';
  document.getElementById('no-landing').style.display='none';
  document.getElementById('mission-panel').style.display='none';
  document.getElementById('ground-actions').style.display='none';
  document.getElementById('op-box').style.display='none';
  document.getElementById('behavior-selection').style.display='block';
  document.getElementById('combat-log').style.display='none';
  document.getElementById('landing-status').innerText=`Atterrissage sur la Planète #${planet.id} (niveau ${planet.z}).`;
  document.getElementById('landing-shields').innerText = state.shieldsOn ? 'Activés' : 'Désactivés';
  document.getElementById('landing-crew').innerText = `${state.ship.crew} à bord`;
  document.querySelectorAll('input[name="attitude"]').forEach(r=>r.checked=false);
  document.getElementById('behavior-alert').style.display='none';
  addDebugLog(`Atterrissage sur Planète #${planet.id}`);
}

function updateDisembarkUI(){
  const el = document.getElementById('val-disembark-count');
  if(el) el.innerText = disembarkCount;
}

function changeDisembarkCount(delta){
  const max = state.ship.crew;
  disembarkCount = Math.max(1, Math.min(max, disembarkCount + delta));
  updateDisembarkUI();
}

function checkAttitude(){
  const v=document.querySelector('input[name="attitude"]:checked').value;
  const al=document.getElementById('behavior-alert');
  if(v==='A'){ al.style.display='block'; al.innerText='Comportement A : Boucliers activés, sans tir. Aucun débarquement tant que les boucliers sont actifs.'; }
  else if(v==='B'){ al.style.display='block'; al.innerText='Comportement B : Boucliers activés, tir laser depuis le vaisseau (ZIP 11).'; }
  else { al.style.display='block'; al.innerText=`Comportement ${v} : Les boucliers seront désactivés pour permettre le débarquement des équipages à terre.`; }
}

function confirmBehavior(){
  const v=document.querySelector('input[name="attitude"]:checked');
  if(!v) return alert('Choisissez un comportement.');
  const b=v.value, needOn=(b==='A'||b==='B');
  state.landingBehavior = b;
  state.shieldsOn = needOn;
  renderShip();
  const chk = document.getElementById('check-shields');
  if(chk) chk.checked = needOn;
  renderShip();

  log('OFFICIER COMMANDANT',`Comportement d'atterrissage : ${b} (Boucliers ${needOn?'activés':'désactivés'}).`);
  completePlanetInfo(state.currentPlanet);
  setupPlanetEncounter();

  document.getElementById('landing-shields').innerText=needOn?'Activés':'Désactivés';
  document.getElementById('behavior-selection').style.display='none';
  // Les dés d'atterrissage O et P ne s'appliquent qu'en mode AVANCÉ (espace externe), sauf si l'U.C. veut les lancer
  document.getElementById('op-box').style.display='block';
  hideAllMissionBtns();

  if(needOn){
    if(state.alienRace === 'AERIFORMI' && state.currentAliens > 0){
      const pts = addSecorOrOzBonus(RACES.AERIFORMI.valeurElim);
      state.currentAliens = 0;
      state.missionResult = {key:'elim', points:pts};
      document.getElementById('alien-count').innerText = 0;
      log('SPACE COMPUTER', `Les Aeriformi se désintègrent automatiquement au contact de vos boucliers SOK 9 activés ! (+${pts} pts à valider en débarquant 1 E.)`);
      logCombat(`<b>Boucliers SOK 9 :</b> Désintégration automatique des Aeriformi (+${pts} pts).`);
    }
    log('SPACE COMPUTER', b==='B' ? 'Boucliers activés : tir laser de bord autorisé.' : 'Boucliers activés : les équipages restent à bord.');
    document.getElementById('mission-panel').style.display='block';
    updateMissionButtonsVisibility();
    document.getElementById('btn-reembark').style.display='none';
    document.getElementById('btn-orbit').style.display='block';
  } else {
    if(state.alienRace === 'AERIFORMI' && state.currentAliens > 0){
      log('SPACE COMPUTER', '<b>ALERTE AERIFORMI :</b> Sans boucliers activés, le gaz toxique envahit le vaisseau !');
      shipDestroyed();
      return;
    }
    log('SPACE COMPUTER','Boucliers désactivés : prêt pour le débarquement.');
    document.getElementById('ground-actions').style.display='block';
  }
}

function rollRisk(){
  const letter=state.currentPlanet.chain?state.currentPlanet.chain.letter:null;
  const m=letter? PLANET_O[letter] : undefined;
  const r=d6();
  recordOp('O','Risque d\'atterrissage (planète '+letter+', masse '+m+')',{dé:r},(m!==null&&m!==undefined&&r<=m)?r+' dégât(s)':'aucun','');
  log('OFFICIER COMMANDANT',`Dé de risque lancé : ${r}.`);
  if(m===null||m===undefined){ log('SPACE COMPUTER',`Planète ${letter}: aucun risque d'atterrissage.`); return; }
  if(r<=m){ log('SPACE COMPUTER',`Tableau O (masse ${m}) : ${r} dégât(s) sur le vaisseau.`); hitShip(r); }
  else log('SPACE COMPUTER',`Tableau O (masse ${m}) : aucun dégât.`);
}

function rollZone(){
  const r=d10();
  log('OFFICIER COMMANDANT',`Dé de zone lancé : ${r===10?'0':r}.`);
  recordOp('P','Zone d\'atterrissage',{dé:r},r<=7?ZONES[r-1]:'choix U.C.','');
  if(r<=7){
    setLandingZone(ZONES[r-1]);
    return;
  }
  log('SPACE COMPUTER','Tableau P : zone au choix de l\'Officier Commandant.');
  document.getElementById('zone-box').style.display = 'block';
  document.getElementById('zone-btns').innerHTML=ZONES.map(z=>`<button class="vbtn" onclick="chooseZone('${z}')">${z}</button>`).join('');
  document.getElementById('zone-btns').classList.add('vrow');
}

function chooseZone(z){
  document.getElementById('zone-btns').innerHTML='';
  document.getElementById('zone-box').style.display = 'none';
  setLandingZone(z);
}

function setLandingZone(z){
  state.landingZone = z;
  const r = state.alienRace ? RACES[state.alienRace] : null;
  const zCode = ZONE_NORM[z];
  let extraMsg = '';
  if(r && zCode){
    if(r.milieuPrefere.nom.includes(zCode)){
      extraMsg = ` (Milieu préféré des ${state.alienRace.replace(/_/g,' ')}${r.milieuPrefere.bonus?` : F.C. +${r.milieuPrefere.bonus}`:''})`;
    } else if(r.milieuNonViable.includes(zCode)){
      extraMsg = ` (Milieu non viable pour les ${state.alienRace.replace(/_/g,' ')} : le vaisseau ne peut pas être attaqué)`;
    }
  }
  log('SPACE COMPUTER', `Zone d'atterrissage : <b>${z}</b>${extraMsg}.`);
  setupPlanetEncounter();
}

function disembark(){
  state.equipagesPerdus = 0;
  if(state.shieldsOn) return alert('Boucliers activés : débarquement impossible.');
  if(state.ship.crew<=0) return alert("Pas d'équipage disponible à bord.");
  if(state.lastDisembarkTurn === state.turn) return alert("Un débarquement ne peut pas avoir lieu dans le même tour qu'un débarquement précédent : passez d'abord un tour sur la planète.");
  state.lastDisembarkTurn = state.turn;
  
  ensureMissionButtons();
  const toLand = Math.min(disembarkCount, state.ship.crew);
  
  state.ship.crew -= toLand;
  for(let i = 0; i < toLand; i++) ajouterEquipage();
  state.landedTurns = Math.max(1, state.landedTurns);
  
  state.isInFlight = false;
  renderShip();

  document.getElementById('landing-crew').innerText=`${state.ship.crew} à bord · ${state.crewGround} E. (${state.menGround} hommes) à terre`;
  document.getElementById('ground-actions').style.display='none';
  document.getElementById('mission-panel').style.display='block';
  
  setupPlanetEncounter();
  const ch = ensureChain(state.currentPlanet);
  const raceId = currentRace();
  const r0 = raceId ? RACES[raceId] : null;
  const isObjectPlanet = (ch.tcode === 'OZ' || ch.tcode === 'SECOR');
  const hasBonusObject = (ch.tcode === 'NSOZ' || ch.tcode === 'NSSECOR');

  // 1. Journaliser d'abord l'ordre et la mise à terre
  log('OFFICIER COMMANDANT', `Je débarque ${toLand} équipage(s) (${toLand*3} hommes).`);
  log('SPACE COMPUTER', `${state.menGround} homme(s) à terre.`);

  // 2. Règle 5D-f : Contrôle des désertions en mode AVANCÉ sur les Sapiens Civiles
  if(state.level === 'AVANCE' && r0 && (r0.type === 'CIVILES' || r0.desertion)){
    const dDes = d6();
    const totDes = dDes + (state.personality || 0);
    recordOp('Désertion', 'Contrôle de désertion', {dé:dDes, personnalité:state.personality||0}, totDes>7?(totDes-7)+' déserteur(s)':'aucun', '');
    if(totDes > 7){
      const deserters = totDes - 7;
      retirerHommesValides(deserters);
      state.menLost += deserters;
      verifierOfficiersPertes();
      state.hasGroundCrew = state.menGround > 0;
      document.getElementById('landing-crew').innerText=`${state.ship.crew} à bord · ${state.crewGround} E. (${state.menGround} hommes) à terre`;
      log('SPACE COMPUTER', `<b>Désertion !</b> (dé ${dDes} + pers. ${state.personality} = ${totDes}) : ${deserters} homme(s) désertent chez les ${raceId.replace(/_/g,' ')} ! Reste ${state.menGround} homme(s).`);
    }
  }

  updateMissionButtonsVisibility();

  // 3. Vérifier la récupération d'objet (OZ = 2 pts, SECOR = 4 pts)
  if(isObjectPlanet && state.hasGroundCrew){
    const objPts = (ch.tcode === 'SECOR') ? 4 : 2;
    state.mission = 'object';
    state.missionResult = {key: ch.tcode, points: objPts};
    log('SPACE COMPUTER', `Objet (${TCODE_NAME[ch.tcode]} : ${objPts} pts) récupéré par les équipes à terre. Prêt pour le réembarquement.`);
    document.getElementById('btn-reembark').style.display = 'flex';
  } else {
    if(hasBonusObject){
      const bPts = (ch.tcode === 'NSSECOR') ? 4 : 2;
      log('SPACE COMPUTER', `Présence de ${TCODE_NAME[ch.tcode]} : +${bPts} points bonus seront ajoutés si la mission réussit.`);
    }
    document.getElementById('btn-reembark').style.display = state.hasGroundCrew ? 'flex' : 'none';
  }

  document.getElementById('btn-orbit').style.display = 'none';
  addDebugLog(`Débarquement : ${state.menGround} hommes (${isObjectPlanet?'Objet à ramasser':(raceId||'aucun')}).`);
}

function syncAlienState(){
  state.alienWounded = Math.max(0, Math.min(state.alienWounded, state.currentAliens));
  document.getElementById('alien-count').innerText = state.currentAliens;
  document.getElementById('alien-wounded').innerText = state.alienWounded;
  const r = state.alienRace ? RACES[state.alienRace] : null;
  if(!r || !state.currentPlanet) return;
  const ch = ensureChain(state.currentPlanet);
  let fcStr = alienFC();
  if(state.alienRace==='SPHAERAE') fcStr = '0.5 (équipage) / 1 à 2.5 (vaisseau)';
  if(state.alienRace==='NORMO') fcStr = 'Égal à F.C. Légion';
  if(state.alienRace==='SIPCO') fcStr = 'Défense Légion (+2 Att)';
  if(state.alienRace==='ATTLERS') fcStr = 'Défense Légion (+1D6 Att)';
  if(state.alienRace==='CRONOS') fcStr = 'Légion × 1D6';
  const reduced = state.alienWounded>0 && state.currentAliens>0 && state.alienWounded>=state.currentAliens;
  document.getElementById('alien-sub').innerText = `${r.type.replace(/_/g,' ')} · Nature : ${NATURE_NAME[ch.nature]||'—'} · F.C. ${fcStr}${reduced?' (réduit de 50 %)':''}`;
}

function checkGroundStatusAfterCombat(){
  syncAlienState();
  document.getElementById('alien-count').innerText = state.currentAliens;
  document.getElementById('alien-wounded').innerText = state.alienWounded;
  state.hasGroundCrew = state.menGround > 0;
  
  if(!state.hasGroundCrew && state.landingBehavior !== 'B' && state.landingBehavior !== 'A'){
    log('SPACE COMPUTER', '<b>Tous les équipages à terre ont été éliminés.</b> Réembarquement impossible.');
    document.getElementById('btn-reembark').style.display = 'none';
    hideAllMissionBtns();
    document.getElementById('btn-orbit').style.display = 'block';
  } else if(state.hasGroundCrew) {
    updateMissionButtonsVisibility();
    document.getElementById('btn-reembark').style.display = 'flex';
  } else {
    updateMissionButtonsVisibility();
    document.getElementById('btn-orbit').style.display = 'block';
  }
}

function addSecorOrOzBonus(pts){
  const ch = state.currentPlanet ? state.currentPlanet.chain : null;
  if(!ch) return pts;
  if(ch.tcode === 'NSOZ') return pts + 2;
  if(ch.tcode === 'NSSECOR') return pts + 4;
  return pts;
}

// Seul point de changement de nature : chaque changement est journalisé avec sa cause
function changerNature(ch, nature, cause){
  if(!ch || ch.nature === nature) return;
  ch.nature = nature;
  log('SPACE COMPUTER', `Nature de l'Extrasolaire : ${NATURE_NAME[nature]||nature} (${cause}).`);
  recordOp('Nature', 'Changement de nature', {cause:cause}, nature, '');
  renderPlanets(); // la fiche PLANÈTES affiche la nature à jour
}

function startCombat(){
  if(state.currentAliens <= 0){ log('SPACE COMPUTER', "Plus d'Extrasolaire à combattre."); return; }
  const ch = state.currentPlanet ? state.currentPlanet.chain : null;
  const r0 = state.alienRace ? RACES[state.alienRace] : null;
  
  // Cas 1 : Tir depuis le vaisseau avec les Lasers fixes ZIP 11 (Comportement B, équipages à bord)
  if(!state.hasGroundCrew && state.landingBehavior === 'B'){
    if(state.ship.lasers <= 0) return alert('Aucun laser fixe ZIP 11 opérationnel à bord.');
    state.mission = 'elim';
    const fcShipAtt = state.ship.lasers * 6;
    const fcTarget = alienFC();
    const diff = fcShipAtt - fcTarget;
    const r = d6();
    const res = TAB_A[r][colIndex(diff)];
    recordOp('A', 'Tir Lasers de bord ZIP 11', {dé:r, diff:diff, colonne:colIndex(diff)}, res, '');
    log('OFFICIER COMMANDANT', `J'ordonne le feu avec les lasers de bord ZIP 11 (F.C. ${fcShipAtt}).`);

    if(res === 'U'){
      state.currentAliens--;
      logCombat(`<b>Tir de bord (Tableau A) · dé ${r} · diff ${diff>=0?'+':''}${diff}</b><br>U : un Extrasolaire est détruit.`);
    } else if(res === 'F'){
      state.alienWounded++;
      logCombat(`<b>Tir de bord (Tableau A) · dé ${r} · diff ${diff>=0?'+':''}${diff}</b><br>F : un Extrasolaire est blessé (F.C. réduit de 50%).`);
    } else {
      logCombat(`<b>Tir de bord (Tableau A) · dé ${r} · diff ${diff>=0?'+':''}${diff}</b><br>Aucun effet.`);
    }

    // L'attaque rend tous les survivants hostiles (Règlement U.C. 4-I)
    syncAlienState();
    if(ch && ch.nature !== 'AGRESSIVE'){ ch.nature = 'AGRESSIVE'; log('SPACE COMPUTER','Attaque de la Légion : les Extrasolaires survivants deviennent agressifs (nature : Agressive).'); syncAlienState(); }

    if(state.currentAliens <= 0 && state.alienRace){
      let rv = RACES[state.alienRace].valeurElim || 3;
      if((state.alienRace === 'BAVOSUS' || state.alienRace === 'RADICALES') && r % 2 === 0){
        rv = 0;
        log('SPACE COMPUTER', 'Élimination par laser (tirage pair) : le spécimen est calciné (0 pt).');
      } else if(state.alienRace === 'GIGANS' && r % 2 === 1){
        rv = 0;
        log('SPACE COMPUTER', 'Le Gigans prend feu sous l\'effet du laser (tirage impair : 0 pt).');
      }
      const pts = addSecorOrOzBonus(rv);
      state.missionResult = {key:'elim', points:pts};
      // Règlement U.C. 3G-b : même pour un tir de bord, il faut débarquer au moins 1 E. pour ramasser et valider les points
      log('SPACE COMPUTER', `Tous les ${state.alienRace.replace(/_/g,' ')} sont éliminés (${pts} pts). Coupez les boucliers et débarquez au moins 1 équipage pour valider les points !`);
    } else if(state.currentAliens > 0){
      const zCode = state.landingZone ? ZONE_NORM[state.landingZone] : null;
      const inNonViable = zCode && r0 && r0.milieuNonViable.includes(zCode);
      const noShipAttack = ['LIANA_NIGRA','SEVOLVENTES','NAPOS','ASPIS','ANOPHELES','NUBIS_ARENAE'].includes(state.alienRace) || inNonViable;
      if(!noShipAttack){
        const diffShip = alienFC() - shipDefence();
        const rRip = d6();
        const deg = TAB_B[rRip][colIndex(diffShip)];
        recordOp('B', 'Riposte contre le vaisseau', {dé:rRip, diff:diffShip}, deg+' dégât(s)', '');
        if(deg > 0){
          log('SPACE COMPUTER', `Les Extrasolaires ripostent contre le vaisseau : ${deg} dégât(s) !`);
          hitShip(deg);
        } else {
          log('SPACE COMPUTER', `Les boucliers SOK 9 absorbent la riposte des Extrasolaires.`);
        }
      }
    }
    checkGroundStatusAfterCombat();
    return;
  }

  // Cas 2 : Combat des équipages débarqués à terre
  if(state.menGround <= 0) return;
  state.mission = 'elim';

  if(state.alienRace === 'NUBIS_ARENAE'){
    if(state.ship.mod_sil4 > 0){
      state.currentAliens = 0;
      const pts = addSecorOrOzBonus(RACES.NUBIS_ARENAE.valeurElim);
      state.missionResult = {key:'elim', points:pts};
      logCombat(`<b>SIL 4 activé :</b> Les Nubis Arenae sont désintégrés instantanément ! (+${pts} pts)`);
      checkGroundStatusAfterCombat();
      return;
    } else {
      logCombat(`<b>Attention :</b> Aucune arme n'agit contre les Nubis Arenae sauf le SIL 4 !`);
      checkGroundStatusAfterCombat();
      return;
    }
  }

  let fcLegion = groundLegionAtt(true);
  const wasHostile = ch && ch.nature === 'AGRESSIVE';

  // Règle particulière NON VISIBLES pacifiques : F.C. de la Légion réduit de moitié
  if(r0 && r0.type === 'NON_VISIBLES' && !wasHostile){
    fcLegion = Math.floor(fcLegion / 2);
  }

  // Règle particulière NON VISIBLES agressifs : l'Extrasolaire attaque en premier
  if(r0 && r0.type === 'NON_VISIBLES' && wasHostile){
    riposte();
    if(state.menGround <= 0){
      checkGroundStatusAfterCombat();
      return;
    }
    fcLegion = groundLegionAtt(true);
  }

  const fcTarget = alienFC();
  const diff = fcLegion - fcTarget;
  const r = d6();
  const res = TAB_A[r][colIndex(diff)];
  
  recordOp('A', 'Tir de la Légion', {dé:r, diff:diff, colonne:colIndex(diff)}, res, '');
  log('OFFICIER COMMANDANT', "J'ordonne le tir sur l'Extrasolaire.");

  // Règlement U.C. 4-I-b : contre des Extrasolaires déjà hostiles (hors Non Visibles), les tirs sont simultanés !
  if(wasHostile && !(r0 && r0.type === 'NON_VISIBLES')){
    riposte();
  }
  
  if(res === 'U'){
    state.currentAliens--;
    logCombat(`<b>Tableau A · dé ${r} · diff ${diff>=0?'+':''}${diff}</b><br>U : un Extrasolaire est tué.`);
  } else if(res === 'F'){
    // Dans le cas du journal de Notius (Tour 5) ou F.C. réduit de 50%
    state.alienWounded++;
    logCombat(`<b>Tableau A · dé ${r} · diff ${diff>=0?'+':''}${diff}</b><br>F : un Extrasolaire est blessé (F.C. réduit de 50%).`);
  } else {
    logCombat(`<b>Tableau A · dé ${r} · diff ${diff>=0?'+':''}${diff}</b><br>Aucun effet.`);
  }

  // L'attaque rend tous les survivants hostiles
  if(ch) changerNature(ch, 'AGRESSIVE', 'tir de la Légion');

  if(state.currentAliens <= 0 && state.alienRace){
    let rv = RACES[state.alienRace].valeurElim || 3;
    if(state.ship.mod_zip3 > 0){
      if((state.alienRace === 'BAVOSUS' || state.alienRace === 'RADICALES') && r % 2 === 0) rv = 0;
      else if(state.alienRace === 'GIGANS' && r % 2 === 1) rv = 0;
    }
    const pts = addSecorOrOzBonus(rv);
    state.missionResult = {key:'elim', points:pts};
    log('SPACE COMPUTER', `Tous les ${state.alienRace.replace(/_/g,' ')} ont été éliminés (valeur : ${pts} pts).`);
  } else if(!wasHostile && state.currentAliens > 0){
    // Contre des pacifiques (4-I-a) : seuls les survivants ripostent après le tir de la Légion
    riposte();
  }
  
  checkGroundStatusAfterCombat();
}

// Tableau D officiel : Capture d'une créature Non Sapiens (sans armes individuelles)
function startCapture(){
  if(state.menGround <= 0 || state.missionUsed) return;
  const rid = currentRace(), r0 = rid ? RACES[rid] : null;
  if(!r0 || !r0.missions.includes('CAPTURE')) return alert('Capture impossible pour cette espèce.');
  state.mission = 'capture';
  
  const ch = state.currentPlanet ? state.currentPlanet.chain : null;
  const isHostile = ch && ch.nature === 'AGRESSIVE';
  log('OFFICIER COMMANDANT', `J'ordonne la capture sans armes d'un spécimen de ${rid.replace(/_/g,' ')} (Tableau D).`);

  if(isHostile){
    log('SPACE COMPUTER', `Le ${rid.replace(/_/g,' ')} est hostile : il attaque avant la tentative de capture !`);
    riposte();
    if(state.menGround <= 0){
      checkGroundStatusAfterCombat();
      return;
    }
  }

  const fcCaptureLegion = groundLegionAtt(false);
  const diff = fcCaptureLegion - alienFC();
  const d = d6();
  const res = TAB_D[d][colIndexF(diff)];
  recordOp('D', 'Tentative de capture', {dé:d, diff:diff}, res, '');

  if(res === 'Y'){
    state.missionUsed = true;
    let baseVal = r0.valeurCapture || 10;
    // Règlement U.C. 4-II : un Extrasolaire blessé capturé ne vaut que 50% des points
    if(state.alienWounded > 0){
      baseVal = Math.ceil(baseVal / 2);
    }
    const pts = addSecorOrOzBonus(baseVal);
    state.missionResult = {key:'capture', points:pts};
    state.currentAliens = Math.max(0, state.currentAliens - 1);
    logCombat(`<b>Tableau D · dé ${d} · diff ${diff>=0?'+':''}${diff} : OUI (Δ) !</b><br>Spécimen ${rid.replace(/_/g,' ')} capturé vivant : <b>+${pts} points</b>.`);
    log('SPACE COMPUTER', `Capture réussie (${pts} pts). Réembarquez au moins 1 équipage complet pour valider les points.`);
  } else if(res === 'N'){
    state.missionUsed = true;
    if(ch) changerNature(ch, 'AGRESSIVE', 'capture ratée');
    logCombat(`<b>Tableau D · dé ${d} · diff ${diff>=0?'+':''}${diff} : NON (▲) !</b><br>La créature s'affole, devient agressive et attaque immédiatement !`);
    riposte();
    state.missionResult = {key:'capture', points:0};
  } else {
    logCombat(`<b>Tableau D · dé ${d} · diff ${diff>=0?'+':''}${diff} : − (Sans effet)</b><br>La créature se dérobe sans attaquer. Vous pouvez retenter au tour suivant.`);
    state.missionUsed = false;
  }
  checkGroundStatusAfterCombat();
}

// Tableau F et G : Intimidation (possible depuis le bord ou avec équipages débarqués)
function startIntim(){
  if((!state.hasGroundCrew && state.landingBehavior !== 'B') || state.missionUsed) return;
  const r0=currentRace()?RACES[currentRace()]:null;
  if(!r0 || !r0.missions.includes('INTIMIDATION')) return alert('Intimidation non autorisée pour cette race.');
  state.mission='intim';
  const ch = state.currentPlanet ? state.currentPlanet.chain : null;
  const wasHostile = ch && ch.nature === 'AGRESSIVE';

  // Si déjà agressifs au départ, il faut d'abord supporter une attaque (Règlement U.C. 4-IV)
  if(wasHostile && state.hasGroundCrew){
    log('SPACE COMPUTER', 'Les Extrasolaires sont hostiles : vous subissez d\'abord leur attaque avant de les intimider.');
    riposte();
    if(state.menGround <= 0){ checkGroundStatusAfterCombat(); return; }
  }

  const fcAtt = state.hasGroundCrew ? groundLegionAtt(true) : (state.ship.lasers * 6);
  const diff = fcAtt - alienFC();
  const r = d6();
  let res = TAB_F[r][colIndexF(diff)];
  // Règlement U.C. 4-IV : si déjà agressifs au départ, le résultat "Non" est considéré comme "-"
  if(wasHostile && res === 'N') res = '-';

  recordOp('F','Intimidation',{dé:r,diff:diff},res,'');
  if(res==='Y'){
    state.missionUsed = true;
    const rawG = d6();
    // Règlement U.C. 5D-d : en mode Avancé, on soustrait la personnalité du résultat fortuit sur le Tableau G
    const modG = state.level === 'AVANCE' ? Math.max(1, rawG - (state.personality || 0)) : rawG;
    const pts = addSecorOrOzBonus(TAB_G[modG]);
    recordOp('G','Points de vénération',{dé:rawG, déMod:modG},pts+' pt(s)','');
    state.missionResult={key:'intim',points:pts};
    logCombat(`<b>Tableau F · dé ${r} : OUI (Δ).</b> <b>Tableau G (dé ${rawG}${state.level==='AVANCE'?` − pers. ${state.personality} = ${modG}`:''})</b> : ${pts} point(s) de vénération.`);
  } else if(res==='N'){
    state.missionUsed = true;
    if(ch) changerNature(ch, 'AGRESSIVE', 'intimidation ratée');
    logCombat(`<b>Tableau F · dé ${r} : NON (▲).</b> Les Extrasolaires deviennent agressifs et contre-attaquent.`);
    if(state.hasGroundCrew) riposte();
    state.missionResult={key:'intim',points:0};
  } else {
    logCombat(`<b>Tableau F · dé ${r} : − (Aucun effet).</b> Nouvel essai possible au tour suivant.`);
    state.missionUsed=false;
  }
  checkGroundStatusAfterCombat();
}

// Tableaux H (Base) et I (Avancé) : Commerce (limité à 2 tours consécutifs)
function startComm(){
  if(state.specialite === 'princeps robur') return alert('Le Princeps Robur interdit tout commerce.');
  if(state.menGround<=0||state.commTurns>=2) return;
  const rid=currentRace(), r0=rid?RACES[rid]:null;
  if(!r0 || !r0.missions.includes('COMMERCE')) return alert('Commerce non autorisé pour cette race.');
  state.mission='comm'; state.commTurns++;
  const r=d6();
  log('OFFICIER COMMANDANT', `J'engage des échanges commerciaux avec les ${rid.replace(/_/g,' ')} (Tour commercial ${state.commTurns}/2).`);

  if(state.level === 'AVANCE'){
    const pIdx = Math.max(0, Math.min(5, state.personality || 0));
    const v = TAB_I[r][pIdx];
    recordOp('I','Commerce (Avancé)',{dé:r,personnalité:pIdx},v===null?'0':v,'');
    if(v === null || v === 0){
      logCombat(`<b>Tableau I (Commerce Avancé) · dé ${r} (pers. ${pIdx})</b> : Échange infructueux (0 point).`);
      if(!state.missionResult) state.missionResult={key:'comm',points:0};
    } else if(v < 0){
      logCombat(`<b>Tableau I (Commerce Avancé) · dé ${r} (pers. ${pIdx})</b> : Transaction défavorable (${v} pts, assimilés à ${-v} dégât(s) sur le vaisseau) !`);
      hitShip(-v);
      state.missionResult={key:'comm',points:0};
    } else {
      const pts = addSecorOrOzBonus(v);
      state.missionResult={key:'comm',points:(state.missionResult?state.missionResult.points:0)+pts};
      logCombat(`<b>Tableau I (Commerce Avancé) · dé ${r} (pers. ${pIdx})</b> : Bénéfice commercial de <b>+${pts} point(s)</b> !`);
    }
  } else {
    const v = TAB_H[r];
    recordOp('H','Commerce (Base)',{dé:r},v,'');
    if(v < 0){
      logCombat(`<b>Tableau H · dé ${r}</b> : ${v} point(s) (transaction défavorable assimilée à ${-v} dégât(s) sur le vaisseau).`);
      hitShip(-v);
      state.missionResult={key:'comm',points:0};
    } else {
      const pts = v > 0 ? addSecorOrOzBonus(v) : 0;
      state.missionResult={key:'comm',points:(state.missionResult?state.missionResult.points:0)+pts};
      logCombat(`<b>Tableau H · dé ${r}</b> : ${pts>0?'+':''}${pts} point(s) de commerce.`);
    }
  }
  checkGroundStatusAfterCombat();
}

function startRotsa(){
  if(state.menGround<=0||state.missionUsed) return;
  const rid=currentRace();
  if(rid !== 'NILBOG') return alert('Mission réservée aux NILBOG.');
  state.mission='rotsa'; state.missionUsed=true;
  const crews = Math.max(1, Math.min(5, state.crewGround || Math.ceil(state.menGround/3)));
  const r = d6();
  const pts = TAB_ROTSA[r][crews - 1];
  recordOp('ROTSA','Prise de la Pierre ROTSA',{dé:r,équipages:crews},pts===null?'nn (Colère)':pts+' pt(s)','');
  log('OFFICIER COMMANDANT', `Tentative de prise de la Pierre sacrée ROTSA avec ${crews} équipage(s).`);
  if(pts === null){
    const ch = state.currentPlanet ? state.currentPlanet.chain : null;
    if(ch) changerNature(ch, 'AGRESSIVE', 'Pierre ROTSA : colère');
    logCombat(`<b>Tableau ROTSA · dé ${r} (${crews} E.)</b> : <b>nn</b> — Aucun point obtenu ! Les NILBOG se mettent en colère et attaquent les intrus.`);
    riposte();
    state.missionResult={key:'rotsa',points:0};
  } else {
    const totalPts = addSecorOrOzBonus(pts);
    logCombat(`<b>Tableau ROTSA · dé ${r} (${crews} E.)</b> : Pierre sacrée ROTSA récupérée ! Gain de <b>+${totalPts} points</b>.`);
    log('SPACE COMPUTER', `Pierre ROTSA capturée : +${totalPts} points.`);
    state.missionResult={key:'rotsa',points:totalPts};
  }
  checkGroundStatusAfterCombat();
}

function startDuel(){
  if(state.menGround<=0||state.missionUsed) return;
  const rid=currentRace(), r0=rid?RACES[rid]:null;
  if(!r0 || !r0.missions.includes('DUEL')) return alert('Duel non pratiqué par cette race.');
  state.mission='duel'; state.missionUsed=true;
  const r = d6();
  log('OFFICIER COMMANDANT', `Un légionnaire relève le défi en Duel singulier contre un champion ${rid.replace(/_/g,' ')}.`);
  recordOp('Duel','Duel d\'honneur',{dé:r},r>=3?'Victoire':'Défaite','');
  if(r >= 3){
    const basePts = rid === 'PRIMITIS' ? 2 : 4;
    const pts = addSecorOrOzBonus(basePts);
    state.missionResult = {key:'duel', points:pts};
    logCombat(`<b>Duel d'honneur · dé ${r}</b> : Victoire du champion de la Légion ! Gain de <b>+${pts} points</b>.`);
  } else {
    hommesHorsEtat(1);
    state.menLost += 1;
    verifierOfficiersPertes();
    state.missionResult = {key:'duel', points:0};
    logCombat(`<b>Duel d'honneur · dé ${r}</b> : Défaite. 1 légionnaire est tombé au combat.`);
  }
  checkGroundStatusAfterCombat();
}

// Tableau E officiel : Négociation d'Alliance
function startAlliance(){
  if(state.specialite === 'princeps robur') return alert('Le Princeps Robur interdit toute alliance.');
  if(state.menGround<=0||state.missionUsed||state.allianceFails>=2) return;
  const rid=currentRace(), r0=rid?RACES[rid]:null;
  if(!r0 || !r0.missions.includes('ALLIANCE')) return alert('Alliance non autorisée pour cette race.');
  state.mission='alliance';

  const ch = state.currentPlanet ? state.currentPlanet.chain : null;
  const isHostile = ch && ch.nature === 'AGRESSIVE';
  // Règlement U.C. 4-III : face à des Extrasolaires hostiles, il faut d'abord subir une attaque sans réagir
  if(isHostile){
    log('SPACE COMPUTER', `Les ${rid.replace(/_/g,' ')} sont hostiles : vos diplomates essuient d'abord un assaut avant de parlementer.`);
    riposte();
    if(state.menGround <= 0){ checkGroundStatusAfterCombat(); return; }
  }

  const rawDie = d6();
  const persMod = state.level === 'AVANCE' ? (state.personality || 0) : 0;
  const modDie = Math.max(1, Math.min(6, rawDie - persMod));
  const fAll = Math.max(1, Math.min(4, r0.fAlliance || 2));
  const res = TAB_E[modDie][fAll - 1];

  recordOp('E','Alliance',{dé:rawDie, déMod:modDie, fAlliance:fAll},res,'');
  log('OFFICIER COMMANDANT', `Je propose un traité d'alliance aux ${rid.replace(/_/g,' ')} (F. Alliance ${fAll}).`);

  if(res === 'Y'){
    state.missionUsed = true;
    const pts = addSecorOrOzBonus(r0.valeurAlliance || 6);
    logCombat(`<b>Tableau E · dé ${rawDie}${persMod?` (− pers. ${persMod} = ${modDie})`:''} · F.All ${fAll} : OUI (Δ) !</b><br>Alliance conclue ! Gain de <b>+${pts} point(s)</b>.`);
    log('SPACE COMPUTER', `Traité d'alliance ratifié avec ${rid.replace(/_/g,' ')} : +${pts} point(s).`);
    state.missionResult={key:'alliance',points:pts};
  } else if(res === 'N'){
    state.missionUsed = true;
    state.allianceFails++;
    if(state.specialite === 'sociologue') perdreOfficier('Sociologue', state.savant, "rupture de l'alliance");
    if(ch) changerNature(ch, 'AGRESSIVE', 'alliance ratée');
    logCombat(`<b>Tableau E · dé ${rawDie}${persMod?` (− pers. ${persMod} = ${modDie})`:''} · F.All ${fAll} : NON (▲) !</b><br>Rupture diplomatique ! Les ${rid.replace(/_/g,' ')} attaquent immédiatement sans riposte possible ce tour.`);
    riposte();
    state.missionResult={key:'alliance',points:0};
  } else {
    state.allianceFails++;
    logCombat(`<b>Tableau E · dé ${rawDie}${persMod?` (− pers. ${persMod} = ${modDie})`:''} · F.All ${fAll} : − (En pause)</b><br>Négociations en attente (${state.allianceFails}/2 essais). Vous pouvez refaire une tentative.`);
    if(state.allianceFails >= 2){
      log('SPACE COMPUTER', 'Deux tentatives d\'alliance infructueuses : l\'alliance est désormais impossible sur cette planète.');
      state.missionUsed = true;
    }
  }
  checkGroundStatusAfterCombat();
}

// Tableau S (R) officiel : Score = D6 + Niveau du Savant - Niveau Technologique (NT) (plancher 0, plafond 8)
function startSci(){
  if(state.menGround<=0||state.missionUsed) return;
  const rid=currentRace(), r=rid?RACES[rid]:null;
  if(!r || !r.missions.includes('RECHERCHE_SCIENTIFIQUE')) return alert('Recherche scientifique non autorisée pour cette race.');
  const tech = (typeof r.niveauTech === 'number') ? r.niveauTech : 7;
  const savBonus = state.savant > 0 ? state.savant : 3;
  state.mission='sci'; state.missionUsed=true;
  const d=d6();
  const rawPts = Math.min(8, Math.max(0, d + savBonus - tech));
  const pts = rawPts > 0 ? addSecorOrOzBonus(rawPts) : 0;
  recordOp('S','Recherche scientifique',{dé:d,savant:savBonus,technologie:tech},pts,'');
  log('OFFICIER COMMANDANT', `J'ordonne une mission de recherche scientifique auprès des ${rid.replace(/_/g,' ')} (NT = ${tech}).`);
  state.missionResult={key:'sci',points:pts};
  logCombat(`<b>Tableau S · dé ${d} + savant ${savBonus} − NT ${tech} = ${rawPts} pt(s)</b> (plafond 8, plancher 0)${pts>rawPts?` (+${pts-rawPts} bonus objet)`:''}.`);
  checkGroundStatusAfterCombat();
}

// Tableau L officiel : Lancement de TOT 100% (Spatha et Hasta uniquement)
function startTot100(){
  if(cls().level < 2) return alert('Arme iono-nucléaire TOT 100% réservée aux classes SPATHA et HASTA.');
  if(state.hasGroundCrew) return alert('Réembarquez vos équipages avant de lancer TOT 100% sur la planète !');
  const d = d6();
  // En mode Base, on utilise toujours la colonne 3 (Règlement U.C. 4-VI)
  const col = state.level === 'AVANCE' ? Math.max(0, Math.min(5, state.personality || 0)) : 3;
  const res = TAB_L[d][col];
  recordOp('L', 'Lancement TOT 100%', {dé:d, colonne:col}, res, '');
  log('OFFICIER COMMANDANT', 'Je demande l\'autorisation de tir iono-nucléaire TOT 100% sur la planète.');
  if(res === 'Y'){
    log('SPACE COMPUTER', `<b>TOT 100% AUTORISÉ (dé ${d}) :</b> La Planète #${state.currentPlanet.id} est intégralement désintégrée !`);
    state.planets = state.planets.filter(p => p.id !== state.currentPlanet.id);
    state.currentPlanet = null;
    document.getElementById('landing-content').style.display = 'none';
    document.getElementById('no-landing').style.display = 'block';
    state.isInFlight = true;
    renderShip(); renderPlanets(); switchTab('route');
  } else {
    logCombat(`<b>Tableau L · dé ${d} : NON.</b> Les scrupules moraux bloquent le lancement de TOT 100%.`);
  }
}

function riposte(){
  if(state.menGround <= 0) return;
  
  const rid = currentRace();
  const r0 = rid ? RACES[rid] : null;
  let fcAtt = alienFC();
  if(rid === 'GIGANS') fcAtt = 10;

  const diff = fcAtt - groundLegionDef();
  const r = d6();
  let pertes = TAB_B[r][colIndex(diff)];
  
  if(rid === 'IPNOTICI'){
    const ipnoticiMap = {1:2, 2:2, 3:4, 4:4, 5:6, 6:6};
    pertes = ipnoticiMap[pertes] !== undefined ? ipnoticiMap[pertes] : pertes;
  } else if(r0 && r0.type === 'VELENOSI' && pertes > 0){
    pertes = pertes * 2;
  }

  recordOp('B', 'Riposte des Extrasolaires', {dé:r, diff:diff, colonne:colIndex(diff)}, pertes+' perte(s)', '-'+pertes+' homme(s)');
  logCombat(`<b>Riposte (tableau B) · dé ${r} · diff ${diff>=0?'+':''}${diff}</b><br>Pertes : ${pertes} homme(s).`);
  
  if(pertes > 0){
    hommesHorsEtat(pertes);
    state.menLost += pertes;
    verifierOfficiersPertes();
    state.hasGroundCrew = state.menGround > 0;
    document.getElementById('landing-crew').innerText=`${state.ship.crew} à bord · ${state.crewGround} E. (${state.menGround} hommes) à terre`;
    log('SPACE COMPUTER', `L'Extrasolaire riposte : ${pertes} homme(s) perdu(s). Reste à terre : ${state.menGround} homme(s) (${state.crewGround} E. complets).`);
  }
}


// Passer un tour sur la planète : nouveau tour, tirage des arrivées successives (Règlement U.C. 3G b, S.C. 3G c)
function passerTourSurPlanete(){
  if(!state.currentPlanet || state.reembarked || state.landedTurns < 1){
    return alert("Aucun équipage à terre : impossible de passer un tour sur la planète.");
  }
  state.turn++;
  state.landedTurns++;
  document.getElementById('display-turn').innerText = `Tour ${state.turn}`;
  log('OFFICIER COMMANDANT', `Je reste un tour sur la Planète #${state.currentPlanet.id}.`);
  const raceId = state.alienRace;
  const nb = raceId ? rollSuccessiveArrivals(raceId) : 0;
  if(nb > 0){
    state.currentAliens += nb;
    document.getElementById('alien-count').innerText = state.currentAliens;
    log('SPACE COMPUTER', `Tableau des arrivées successives : ${nb} ${raceId.replace(/_/g,' ')} nouveau(x) arrive(nt) sur la planète.`);
  } else {
    log('SPACE COMPUTER', 'Tableau des arrivées successives : aucun Extrasolaire nouveau ce tour.');
  }
  medecinRestaure();
  renderShip();
  if(!state.shieldsOn && state.ship.crew > 0)
    document.getElementById('ground-actions').style.display = 'block';
}

function reembark(){
  if(state.shieldsOn) return alert('Boucliers activés : réembarquement impossible.');
  state.hasGroundCrew = state.menGround > 0;
  if(!state.hasGroundCrew) return alert('Plus aucun homme à terre à réembarquer.');
  
  log('OFFICIER COMMANDANT','J\'ordonne le réembarquement.');
  const ch = state.currentPlanet ? state.currentPlanet.chain : null;
  const rid = currentRace();
  const isHostile = ch && ch.nature === 'AGRESSIVE';

  // Règlement S.C. G-c & Journal de Notius Tour 6 : contrôle du Tableau des Arrivées Successives avant le réembarquement
  if(rid && isHostile && state.mission !== 'alliance'){
    const newArrivals = rollSuccessiveArrivals(rid);
    if(newArrivals > 0){
      state.currentAliens += newArrivals;
      document.getElementById('alien-count').innerText = state.currentAliens;
      log('SPACE COMPUTER', `Avant le réembarquement, arrivée de <b>${newArrivals} nouveau(x) ${rid.replace(/_/g,' ')}</b> qui se joignent à l'attaque !`);
    }
    if(state.currentAliens > 0) riposte();
  }
  
  const c = cls();
  const complete = state.groundCrews.filter(c => c.v === 3).length;
  // Seuls les équipages avec au moins un homme valide reviennent à bord (un équipage entièrement touché ne compte pas)
  const reembarques = state.groundCrews.filter(c => c.v > 0).length;
  const valid = state.landedTurns >= 1 && complete >= 1;
  
  if(valid && state.missionResult){
    const net = state.missionResult.points - c.level;
    recordOp('Points', 'Mission '+state.missionResult.key, {mission:state.missionResult.points, niveau:c.level}, (net>=0?'+':'')+net, '');
    state.points += net;
    document.getElementById('display-points').innerText = state.points;
    log('SPACE COMPUTER', `Mission validée : ${state.missionResult.points} point(s) − niveau ${c.level} = ${net>=0?'+':''}${net}.`);
  } else {
    log('SPACE COMPUTER', `Aucun point : ${state.landedTurns<1?'pas de tour à terre':'aucun équipage complet (3 hommes) réembarqué'}${!state.missionResult?' ou mission non résolue':''}.`);
  }
  
  if(state.menLost > 0 && c.level >= 2){
    state.points -= state.menLost;
    document.getElementById('display-points').innerText = state.points;
    log('SPACE COMPUTER', `Pertes subies : −${state.menLost} point(s) (niveau ${c.level}).`);
  }
  
  state.ship.crew += reembarques;
  state.groundCrews=[]; state.menGround = 0;
  state.crewGround = 0;
  state.hasGroundCrew = false;
  state.missionResult = null;
  
  document.getElementById('landing-crew').innerText = `${state.ship.crew} à bord · 0 à terre`;
  state.reembarked = true;
  document.getElementById('btn-reembark').style.display = 'none';
  hideAllMissionBtns();
  document.getElementById('btn-orbit').style.display = 'block';
  renderShip();
  log('SPACE COMPUTER', 'Équipages réembarqués. Prêt pour le décollage.');
}

function endMission(){
  if(state.currentPlanet) state.currentPlanet.done = true;
  document.getElementById('landing-content').style.display = 'none';
  document.getElementById('no-landing').style.display = 'block';
  state.currentPlanet = null;
  state.groundCrews=[]; state.menGround = 0;
  state.crewGround = 0;
  state.hasGroundCrew = false;
  state.isInFlight = true;
  log('SPACE COMPUTER', 'Décollage effectué. Vous êtes en vol.');
  addDebugLog('Décollage.');
  renderShip();
  switchTab('route');
}

// ==========================================
// ONGLET BESTIAIRE (Tri par numéro de référence)
// ==========================================
function compareRaces(aKey, bKey) {
  const rA = RACES[aKey].ref || "99/99";
  const rB = RACES[bKey].ref || "99/99";
  const partsA = rA.split('/');
  const partsB = rB.split('/');
  const majorA = parseInt(partsA[0], 10);
  const majorB = parseInt(partsB[0], 10);
  const minorA = parseInt(partsA[1], 10);
  const minorB = parseInt(partsB[1], 10);
  if (majorA !== majorB) return (isNaN(majorA) ? 99 : majorA) - (isNaN(majorB) ? 99 : majorB);
  return (isNaN(minorA) ? 99 : minorA) - (isNaN(minorB) ? 99 : minorB);
}

function initBestiaire() {
  const select = document.getElementById('bestiaire-select');
  if (!select) return;
  
  if (select.options.length <= 1) {
    const sortedRaces = Object.keys(RACES).sort(compareRaces);
    sortedRaces.forEach(key => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = `${RACES[key].ref ? '['+RACES[key].ref+'] ' : ''}${key.replace(/_/g, ' ')}`;
      select.appendChild(opt);
    });
  }

  if (select.value) {
    renderBestiaireDetail(select.value);
  } else {
    renderBestiaireList();
  }
}

function renderBestiaireList() {
  const container = document.getElementById('bestiaire-content');
  let html = '<div style="display:flex;flex-direction:column;gap:10px;">';
  
  const sortedRaces = Object.keys(RACES).sort(compareRaces);
  sortedRaces.forEach(key => {
    const r = RACES[key];
    const met = state.planets.some(p => p.chain && p.chain.race === key);
    
    html += `
      <div class="card" style="margin:0;padding:12px;border:1px solid var(--border);cursor:pointer;" onclick="document.getElementById('bestiaire-select').value='${key}';renderBestiaireDetail('${key}');">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong style="color:var(--dark-teal);">${key.replace(/_/g, ' ')}</strong>
          <span style="font-size:0.75rem;background:#eee;padding:2px 6px;border-radius:4px;">${r.ref || 'Hors série'}</span>
        </div>
        <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">
          Catégorie : ${r.cat} · Type : ${r.type.replace(/_/g, ' ')} · Missions : ${r.missions.join(', ')} ${met ? ' <strong style="color:var(--success);">(Rencontré)</strong>' : ''}
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  container.innerHTML = html;
}

function renderBestiaireDetail(raceKey) {
  const container = document.getElementById('bestiaire-content');
  if (!raceKey) {
    renderBestiaireList();
    return;
  }
  
  const r = RACES[raceKey];
  if (!r) return;

  const metPlanets = state.planets.filter(p => p.chain && p.chain.race === raceKey);

  let fcDisplay = r.fc !== null ? r.fc : 'Variable / Selon règles';
  if (raceKey === 'SPHAERAE') fcDisplay = '0.5 (équipage) / 1 à 2.5 (vaisseau niv. 0 à 3)';
  if (raceKey === 'NORMO') fcDisplay = 'Att = Dif Légion / Dif = Att Légion';
  if (raceKey === 'SIPCO') fcDisplay = 'Dif = Légion / Att = Dif Légion + 2';
  if (raceKey === 'ATTLERS') fcDisplay = 'Dif = Légion / Att = Légion + 1D6';
  if (raceKey === 'CRONOS') fcDisplay = 'Att = Légion × 1D6';

  let html = `
    <div style="background:#fff;border:1px solid var(--border);border-radius:8px;padding:15px;margin-top:10px;">
      <h3 style="color:var(--dark-teal);margin-bottom:5px;">${raceKey.replace(/_/g, ' ')}</h3>
      <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">Planche : ${r.ref || 'Non spécifiée'} · Niveau Tech : ${r.niveauTech !== null ? r.niveauTech : '—'}</div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;font-size:0.85rem;">
        <div><strong>Catégorie :</strong> ${r.cat}</div>
        <div><strong>Type :</strong> ${r.type.replace(/_/g, ' ')}</div>
        <div><strong>F.C. de base :</strong> ${fcDisplay}</div>
        <div><strong>Valeur Élimination :</strong> ${r.valeurElim !== null ? r.valeurElim + ' pts' : '—'}</div>
        <div><strong>Valeur Capture :</strong> ${r.valeurCapture !== null ? r.valeurCapture + ' pts' : '—'}</div>
        <div><strong>Valeur Alliance :</strong> ${r.valeurAlliance !== null ? r.valeurAlliance + ' pts (F.A. ' + r.fAlliance + ')' : '—'}</div>
      </div>

      <div style="font-size:0.85rem;margin-bottom:10px;">
        <strong>Missions autorisées :</strong> ${r.missions.length ? r.missions.join(', ') : 'Aucune'}
      </div>

      <div style="font-size:0.85rem;margin-bottom:10px;">
        <strong>Milieu préféré :</strong> ${r.milieuPrefere.nom.join(', ') || 'Aucun'} ${r.milieuPrefere.bonus ? '(Bonus: +' + r.milieuPrefere.bonus + ')' : ''}<br>
        <strong>Milieu non viable :</strong> ${r.milieuNonViable.join(', ') || 'Aucun'}
      </div>

      <div style="font-size:0.85rem;background:#fdfaf3;padding:10px;border-radius:6px;border:1px solid var(--border);margin-bottom:12px;">
        <strong>Notes & Règles particulières :</strong><br>
        ${r.notes || 'Aucune règle particulière.'}
      </div>

      <div style="font-size:0.8rem;color:var(--text-muted);">
        <strong>Présence au combat (1D6) :</strong>
        <ul style="margin-top:4px;padding-left:20px;">
          ${r.presences.map(p => `<li>Dé ${p.des.join(', ')} : <strong>${p.nombre}</strong> présent(s)</li>`).join('')}
        </ul>
        ${r.arrivees && r.arrivees.length ? `<strong>Arrivées successives (1D6) :</strong><ul style="margin-top:4px;padding-left:20px;">${r.arrivees.map(a => `<li>Dé ${a.des.join(', ')} : <strong>+${a.nombre}</strong> renfort(s)</li>`).join('')}</ul>` : ''}
      </div>

      ${metPlanets.length ? `<div style="margin-top:10px;font-size:0.8rem;color:var(--success);">✔ Rencontré sur la planète / parsec : ${metPlanets.map(p => '#' + p.id).join(', ')}</div>` : ''}
    </div>
    <button class="btn-secondary" style="margin-top:15px;width:100%;" onclick="document.getElementById('bestiaire-select').value='';renderBestiaireList();">← Retour à la liste des races</button>
  `;

  container.innerHTML = html;
}

// ==========================================
// RÉINITIALISATION DE LA PARTIE
// ==========================================
function resetGame(){
  if(!confirm('Abandonner et réinitialiser la partie ?')) return;
  try{ localStorage.removeItem(AUTOSAVE_KEY); localStorage.removeItem(TURNS_KEY); }catch(err){}
  state.turn=1; state.points=0; state.isInFlight=false; state.isScenario=false; state.scenarioStep=0;
  state.shipClass='FROMBOLA'; state.maxContainers=SHIPS.FROMBOLA.cont;
  state.ship={crew:1,shields:1,lasers:1,radars:2,computers:1,tanks:3,modules:0,mod_zip3:0,mod_ho12:0,mod_sil4:0};
  state.shieldsOn=true; state.shieldsLocked=false; state.hullHitsThisTurn=0; state.savant=0; state.specialite=''; state.pendingDN=null;
  state.debugLogs=[];
  document.getElementById('scenario-banner').style.display='none';
  document.getElementById('display-points').innerText='0';
  document.getElementById('display-turn').innerText='Tour 1';
  document.getElementById('display-shields').innerText='Boucliers Activés';
  document.getElementById('display-shields').className='status-item active';
  document.getElementById('check-shields').checked=true;
  syncScientistUI();
  document.getElementById('log-container').innerHTML='';
  document.getElementById('landing-content').style.display='none';
  document.getElementById('no-landing').style.display='block';
  startGame();
  log('SPACE COMPUTER',`Nouvelle exploration (niveau ${state.level}). Vous êtes à la base (niveau ${state.basePos.z}).`);
  switchTab('route');
}

// ==========================================
// CARTE DE DEBUG & CONTRÔLES
// ==========================================
function renderDebugMap(){
  const c=document.getElementById('map-debug-container'); c.innerHTML='';
  document.getElementById('debug-current-pos').innerHTML=`<strong>Position :</strong> X ${state.position.x}, Y ${state.position.y}, niveau ${state.position.z}`;
  for(let z=1;z<=4;z++){
    const box=document.createElement('div'); box.className='level-box'; box.innerHTML=`<h4>Niveau ${z}</h4>`;
    const g=document.createElement('div'); g.className='grid-container';
    g.style.setProperty('--scale',40);
    const svgNS='http://www.w3.org/2000/svg', svg=document.createElementNS(svgNS,'svg');
    svg.setAttribute('class','path-overlay'); svg.setAttribute('viewBox','0 0 100 100'); svg.setAttribute('preserveAspectRatio','none');
    state.travelHistory.filter(t=>t.z===z).forEach(t=>{
      const l=document.createElementNS(svgNS,'line');
      l.setAttribute('x1',50+t.x1*2.5); l.setAttribute('y1',50-t.y1*2.5); l.setAttribute('x2',50+t.x2*2.5); l.setAttribute('y2',50-t.y2*2.5);
      l.setAttribute('class','path-line'); svg.appendChild(l);
    });
    g.appendChild(svg);
    state.planets.filter(p=>p.z===z).forEach(p=>{
      const px=50+p.x*2.5, py=50-p.y*2.5;
      const e=document.createElement('div'); e.className=`entity ${p.id===0?'base':'planet'} ${p.discovered?'discovered':''}`;
      e.style.left=px+'%'; e.style.top=py+'%'; e.innerText=p.id===0?'B':p.id; g.appendChild(e);
    });
    if(state.position.z===z){
      const s=document.createElement('div'); s.className='entity ship';
      s.style.left=(50+state.position.x*2.5)+'%'; s.style.top=(50-state.position.y*2.5)+'%'; g.appendChild(s);
    }
    box.appendChild(g); c.appendChild(box);
  }
}

function loadNotiusScenario(){
  state.isScenario=true; state.scenarioStep=1; state.turn=1; state.points=0; state.isInFlight=false;
  state.basePos={x:0,y:0,z:1}; state.position={x:0,y:0,z:1};
  state.shipClass='FROMBOLA'; state.maxContainers=SHIPS.FROMBOLA.cont;
  state.ship={crew:2,shields:5,lasers:3,radars:2,computers:1,tanks:3,modules:0,mod_zip3:0,mod_ho12:0,mod_sil4:0};
  state.planets=[
    {id:0,x:0,y:0,z:1,type:'BASE',infoLevel:0,discovered:true,report:null,done:false},
    {id:1,x:-1,y:11,z:1,type:'E · Mars',infoLevel:0,discovered:false,report:null,done:false},
    {id:2,x:7,y:5,z:1,type:'A · Tellus',infoLevel:0,discovered:false,report:null,done:false},
    {id:3,x:10,y:-4,z:1,type:'A · Tellus',infoLevel:0,discovered:false,report:null,done:false}
  ];
  state.risks=null; state.debugLogs=[]; state.travelHistory=[]; opLog=[];
  addDebugLog('--- SCÉNARIO NOTIUS ---');
  document.getElementById('log-container').innerHTML='';
  document.getElementById('landing-content').style.display='none';
  document.getElementById('no-landing').style.display='block';
  document.getElementById('scenario-banner').style.display='block';
  renderShip(); updateRouteLimits(); resetRoute(); renderPlanets();
  updateScenarioBanner(); switchTab('route');
}

function updateScenarioBanner(){
  const b=document.getElementById('scenario-banner');
  if(!state.isScenario){ b.style.display='none'; return; }
  b.style.display='block';
  const t=[
    '',
    'TOUR 1 : Déclarez la route <b>10 N + 5 E</b> (2 radars).',
    'TOUR 2 : Déclarez la route <b>5 S + 10 SE</b> (2 radars).',
    'TOUR 3 : Déclarez la route <b>3 NO + 1 SO</b> (2 radars).',
    'TOUR 4 : Route d\'atterrissage <b>1 SO</b> (cochez l\'atterrissage).',
    'TOUR 5 : Débarquement (comportement D).',
    'TOUR 6 : Réembarquez, puis tracez <b>4 NO + 6 O</b> pour rentrer.'
  ];
  b.innerHTML=t[state.scenarioStep]||'';
}

const _origExec = executeRoute;
executeRoute = function(){
  if(!state.isScenario) return _origExec();
  const rs=state.route.segments.map(s=>`${s.parsecs} ${s.dir}`).join(' + ');
  const land=document.getElementById('check-landing').checked;
  const want={1:'10 N + 5 E',2:'5 S + 10 SE',3:'3 NO + 1 SO',4:'1 SO',6:'4 NO + 6 O'}[state.scenarioStep];
  if(state.scenarioStep===4 && !land) return alert('Cochez la case d\'atterrissage.');
  if(want && rs!==want) return alert(`Le scénario indique : ${want}`);
  state.scenarioStep++;
  _origExec();
  setTimeout(updateScenarioBanner,700);
};

function recordOp(table,label,inputs,result,effect){
  opLog.push({tour:state.turn,table:table,label:label,inputs:inputs||{},result:String(result),effect:effect||'',heure:new Date().toLocaleTimeString()});
}

function setControleLevel(z){ controleLevel=z; renderControle(); }

function opInputsText(o){
  return Object.entries(o.inputs).map(([k,v])=>k+' '+v).join(', ');
}

function renderOpLog(){
  const f=document.getElementById('op-filter').value;
  const rows=opLog.filter(o=>!f||o.table===f);
  const t=document.getElementById('op-table');
  if(!rows.length){ t.innerHTML='<tr><td style="color:#888;padding:8px;">Aucune opération enregistrée.</td></tr>'; return; }
  t.innerHTML='<tr style="background:var(--accent-light);"><th style="border:1px solid var(--border);padding:4px;">Tour</th><th style="border:1px solid var(--border);padding:4px;">Table</th><th style="border:1px solid var(--border);padding:4px;">Opération</th><th style="border:1px solid var(--border);padding:4px;">Entrées</th><th style="border:1px solid var(--border);padding:4px;">Résultat</th><th style="border:1px solid var(--border);padding:4px;">Effet</th></tr>'
   + rows.slice().reverse().map(o=>`<tr><td style="border:1px solid var(--border);padding:4px;">${o.tour}</td><td style="border:1px solid var(--border);padding:4px;">${o.table}</td><td style="border:1px solid var(--border);padding:4px;">${o.label}</td><td style="border:1px solid var(--border);padding:4px;">${opInputsText(o)}</td><td style="border:1px solid var(--border);padding:4px;"><b>${o.result}</b></td><td style="border:1px solid var(--border);padding:4px;">${o.effect}</td></tr>`).join('');
  const sel=document.getElementById('op-filter'); const tables=[...new Set(opLog.map(o=>o.table))];
  const cur=sel.value; sel.innerHTML='<option value="">Toutes les tables ('+opLog.length+')</option>'+tables.map(x=>`<option value="${x}">${x}</option>`).join(''); sel.value=cur;
}

function exportOpLog(){
  const blob=new Blob([JSON.stringify({ops:opLog,checks:runChecks()},null,2)],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='legio_journal_operations.json'; a.click();
}

function runChecks(){
  const res=[]; const add=(n,ok,d)=>res.push({n:n,ok:!!ok,d:d||''});
  const ps=state.planets;
  const bases=ps.filter(p=>p.id===0);
  add('Une seule planète-base', bases.length===1, bases.length+' trouvée(s)');
  for(let z=1;z<=4;z++){ const n=ps.filter(p=>p.z===z).length; add('Niveau '+z+' : 9 parsecs occupés (base incluse)', n===9, n+' occupé(s)'); }
  const cells=new Set(ps.map(p=>p.x+','+p.y+','+p.z));
  add('Une planète par parsec', cells.size===ps.length, ps.length+' planètes, '+cells.size+' parsecs distincts');
  add('Planètes dans la Tabula (38 x 25 par niveau)', ps.every(p=>inBounds(p.x,p.y,p.z)), 'X -18..19, Y -12..12, niveaux 1..4');
  add('Vaisseau dans la Tabula', inBounds(state.position.x,state.position.y,state.position.z), 'X'+state.position.x+' Y'+state.position.y+' N'+state.position.z);
  const used=getCurrentTotal(), max=getMaxThrust();
  add('Poussée de route ≤ maximum', used<=max, used+' / '+max+' parsecs');
  const total=state.ship.crew+state.ship.shields+state.ship.lasers+state.ship.radars+state.ship.computers+state.ship.tanks+state.ship.modules;
  add('Containers ≤ capacité de la classe', total<=cls().cont, total+' / '+cls().cont);
  add('Radars ≤ maximum de la classe', state.ship.radars<=cls().radMax, state.ship.radars+' / '+cls().radMax);
  add('Réservoirs ≤ maximum de la classe', state.ship.tanks<=cls().resMax, state.ship.tanks+' / '+cls().resMax);
  if(state.level==='AVANCE' && state.risks){
    const bh=state.risks.blackHole;
    const riskCells=[];
    if(bh){
      const dmin=Math.min(...ps.map(p=>Math.max(Math.abs(p.x-bh.x), Math.abs(p.y-bh.y))));
      add('Trou noir à ≥ 5 parsecs de toute planète (base incluse)', dmin>=5, 'distance minimale '+dmin.toFixed(1));
      for(let z=1;z<=4;z++) riskCells.push({x:bh.x,y:bh.y,z:z});
    } else add('Trou noir placé', false, 'non trouvé');
    const rmgMin = state.risks.rmg.length ? Math.min(...state.risks.rmg.map(c=>planetDistMin(c.x,c.y,c.z))) : Infinity;
    add('R.M.G. à ≥ 4 parsecs de toute planète', rmgMin>=4, 'distance minimale '+rmgMin);
    const dnMin = state.risks.dn.length ? Math.min(...state.risks.dn.map(c=>planetDistMin(c.x,c.y,c.z))) : Infinity;
    add('D.N. à ≥ 4 parsecs de toute planète', dnMin>=4, 'distance minimale '+dnMin);
    state.risks.rmg.forEach(c=>riskCells.push(c));
    state.risks.dn.forEach(c=>riskCells.push(c));
    const onPlanet = riskCells.filter(c=>ps.some(p=>p.x===c.x&&p.y===c.y&&p.z===c.z));
    add('Aucun risque sur un parsec occupé par une planète', onPlanet.length===0, onPlanet.length+' conflit(s)');
    for(let z=1;z<=4;z++){
      const r=state.risks.rmg.filter(c=>c.z===z).length, d=state.risks.dn.filter(c=>c.z===z).length;
      add('Niveau '+z+' : risques (R.M.G. ≤ 3, D.N. ≤ 3)', r<=3&&d<=3, 'R.M.G. '+r+', D.N. '+d);
    }
  }
  const routes=opLog.filter(o=>o.table==='Route').length;
  add('Un enregistrement par déplacement', routes===state.turn-1, routes+' déplacement(s), tour '+state.turn);
  const dicesOk=opLog.every(o=>o.inputs.dé===undefined || (o.inputs.dé>=1 && o.inputs.dé<=(o.table==='P'?10:6)));
  add('Dés dans la plage (6 faces, 10 pour la zone)', dicesOk, opLog.length+' opération(s)');
  add('Arbre d\'information : toutes les races atteignables existent dans le Guide', treeRacesOk(), Object.keys(RACES).length+' races');
  add('Guide : 38 races encodées', Object.keys(RACES).length===38, Object.keys(RACES).length+' races');
  return res;
}

function renderControle(){
  const checks=runChecks();
  document.getElementById('checks').innerHTML=checks.map(c=>`<div style="display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);font-size:13px;"><span>${c.ok?'✔':'✖'} ${c.n}</span><span style="color:var(--text-muted);text-align:right;">${c.d}</span></div>`).join('')
    + `<div style="margin-top:8px;font-weight:bold;color:${checks.every(c=>c.ok)?'var(--success)':'var(--danger)'};">${checks.filter(c=>c.ok).length} / ${checks.length} vérifications réussies</div>`;
  renderOpLog();
  [1,2,3,4].forEach(z=>{ const b=document.getElementById('lv-'+z); if(b) b.style.background = z===controleLevel?'var(--accent-light)':''; });
  renderMapSvg();
}

function renderMapSvg(){
  const W=38,H=25, X=(x)=>x-BOUNDS.xMin+0.5, Y=(y)=>BOUNDS.yMax-y+0.5;
  let s=`<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;background:#fbfaf6;">`;
  for(let i=0;i<=W;i++) s+=`<line x1="${i}" y1="0" x2="${i}" y2="${H}" stroke="#e5e0d4" stroke-width="0.05"/>`;
  for(let j=0;j<=H;j++) s+=`<line x1="0" y1="${j}" x2="${W}" y2="${j}" stroke="#e5e0d4" stroke-width="0.05"/>`;
  const z=controleLevel;
  if(state.risks){
    state.risks.rmg.filter(c=>c.z===z).forEach(c=>s+=`<rect x="${X(c.x)-0.5}" y="${Y(c.y)-0.5}" width="1" height="1" fill="#8e44ad" opacity="0.6"/>`);
    state.risks.dn.filter(c=>c.z===z).forEach(c=>s+=`<rect x="${X(c.x)-0.5}" y="${Y(c.y)-0.5}" width="1" height="1" fill="#e67e22" opacity="0.7"/>`);
    if(state.risks.blackHole){ const b=state.risks.blackHole; s+=`<circle cx="${X(b.x)}" cy="${Y(b.y)}" r="4" fill="none" stroke="#000" stroke-dasharray="0.3 0.3" stroke-width="0.1"/><circle cx="${X(b.x)}" cy="${Y(b.y)}" r="0.35" fill="#000"/>`; }
  }
  state.travelHistory.filter(t=>t.z===z).forEach(t=>s+=`<line x1="${X(t.x1)}" y1="${Y(t.y1)}" x2="${X(t.x2)}" y2="${Y(t.y2)}" stroke="#007bff" stroke-width="0.12" stroke-dasharray="0.3 0.2"/>`);
  state.planets.filter(p=>p.z===z).forEach(p=>{
    if(p.id===0) s+=`<rect x="${X(p.x)-0.45}" y="${Y(p.y)-0.45}" width="0.9" height="0.9" fill="#a33"/><text x="${X(p.x)}" y="${Y(p.y)+0.18}" font-size="0.6" text-anchor="middle" fill="#fff">B</text>`;
    else s+=`<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="0.4" fill="${p.discovered?'#2a7b4c':'#9b7b38'}"/><text x="${X(p.x)}" y="${Y(p.y)+0.15}" font-size="0.45" text-anchor="middle" fill="#fff">${p.id}</text>`;
  });
  if(state.position.z===z){ const cx=X(state.position.x), cy=Y(state.position.y); s+=`<polygon points="${cx},${cy-0.6} ${cx+0.6},${cy} ${cx},${cy+0.6} ${cx-0.6},${cy}" fill="none" stroke="#d9a400" stroke-width="0.15"/>`; }
  s+='</svg>';
  document.getElementById('map-svg').innerHTML=s;
}

function setSavant(v){
  if(state.isInFlight){ alert('En vol, le spécialiste ne peut pas être changé.'); document.getElementById('savant-select').value=state.savant; return; }
  state.savant=parseInt(v,10)||0;
  addDebugLog('Officier savant : '+(state.savant||'aucun'));
}

// ==========================================
// INITIALISATION DE L'APPLICATION
// ==========================================
const verEl = document.getElementById('app-version');
if(verEl) {
  verEl.innerText = APP_VERSION;
}

ensureMissionButtons();
document.getElementById('dev-tools').style.display = DEBUG ? 'block' : 'none';
document.getElementById('level-select').value=state.level;



// ==========================================
// OFFICIER SAVANT : AFFICHAGE SYNCHRONISÉ (v1.3.6)
// Le bloc n'est visible qu'en niveau AVANCÉ. Une seule fonction
// gère l'affichage et la valeur du menu, appelée au lancement,
// au changement de niveau, à la réinitialisation et à la restauration.
// ==========================================
const SPECIALITES = {
  'géologue':      {label:'Géologue',        valeur:true},
  'biologiste':    {label:'Biologiste',      valeur:true},
  'botaniste':     {label:'Botaniste',       valeur:true},
  'sociologue':    {label:'Sociologue',      valeur:true},
  'médecin':       {label:'Médecin',         valeur:false},
  'princeps robur':{label:'Princeps Robur',  valeur:false},
  'princeps psi':  {label:'Princeps Psi',    valeur:false}
};

function specialiteValeur(){
  return !!(state.specialite && SPECIALITES[state.specialite] && SPECIALITES[state.specialite].valeur);
}

// Retire l'officier (mort ou perte) et applique le malus de points
function perdreOfficier(label, pts, detail){
  if(pts > 0){
    state.points -= pts;
    document.getElementById('display-points').innerText = state.points;
  }
  log('SPACE COMPUTER', `<b>Décès : ${label}</b> (${detail}) : −${pts} point(s).`);
  state.specialite = ''; state.savant = 0;
  syncScientistUI();
}

// Appelé à chaque dégât du vaisseau (une fois par impact)
function verifierDecesOfficier(){
  const s = state.specialite, d = d6();
  if(s === 'médecin'){
    if(d <= 2) perdreOfficier('Médecin', 3, `dé ${d} : 1 ou 2`);
    return;
  }
  if(specialiteValeur() && d % 2 === 1) perdreOfficier(SPECIALITES[s].label, state.savant, `dé ${d} impair`);
}

// Princeps Robur : perdu avec le premier équipage éliminé (3 hommes)
function verifierOfficiersPertes(){
  if(state.specialite === 'princeps robur' && state.menLost >= 3)
    perdreOfficier('Princeps Robur', 5, 'premier équipage éliminé');
}

// Princeps Psi : mort possible à chaque risque signalé
function verifierPsiRisque(){
  if(state.specialite !== 'princeps psi') return;
  const d = d6();
  if(d % 2 === 1) perdreOfficier('Princeps Psi', 3, `risque signalé, dé ${d} impair`);
  else log('SPACE COMPUTER', `Princeps PSI : risque signalé sans conséquence (dé ${d} pair).`);
}

function syncScientistUI(){
  const avance = state.level === 'AVANCE';
  const card = document.getElementById('savant-card');
  const persRow = document.getElementById('pers-row');
  if(card) card.style.display = avance ? 'block' : 'none';
  if(persRow) persRow.style.display = avance ? 'flex' : 'none';
  const sel = document.getElementById('savant-select');
  if(sel) sel.value = String(state.savant || 0);
  const spec = document.getElementById('specialite-select');
  if(spec) spec.value = state.specialite || '';
  const savSel = document.getElementById('savant-select');
  if(savSel) savSel.disabled = false;
}

function setSpecialite(v){
  if(state.isInFlight){ alert("En vol, la spécialité de l'officier ne peut pas être changée."); document.getElementById('specialite-select').value = state.specialite || ''; return; }
  state.specialite = (v && SPECIALITES[v]) ? v : '';
  syncScientistUI();
  addDebugLog('Spécialité de l\'officier : ' + (state.specialite ? SPECIALITES[state.specialite].label : 'non définie'));
}

// ==========================================
// SAUVEGARDE & RESTAURATION PARTIELLE (v1.3.6)
// ==========================================
const SAVE_SECTIONS = {
  partie:   ['level','shipClass','turn','points','personality','savant','specialite','maxContainers','isScenario','scenarioStep'],
  vaisseau: ['ship'],
  position: ['basePos','position','shieldsOn','shieldsLocked','hullHitsThisTurn','pendingDN'],
  planetes: ['planets','currentPlanet','computersUsedThisTurn','observablePlanets','risks','travelHistory','groundCrews','menGround','crewGround','hasGroundCrew','menLost'],
  journal:  []   // traité à part : HTML du journal + log de debug
};
let sauvegardeChargee = null;

function capturerSection(nom){
  if(nom === 'journal'){
    return { html: document.getElementById('log-container').innerHTML, debugLogs: state.debugLogs };
  }
  const out = {};
  for(const cle of SAVE_SECTIONS[nom]) out[cle] = state[cle];
  return out;
}

function appliquerSection(nom, data){
  if(nom === 'journal'){
    if(typeof data.html === 'string') document.getElementById('log-container').innerHTML = data.html;
    if(Array.isArray(data.debugLogs)) state.debugLogs = data.debugLogs;
    return;
  }
  for(const cle of SAVE_SECTIONS[nom]) if(cle in data) state[cle] = data[cle];
}

function sauvegarderPartie(){
  const sections = {};
  for(const nom of Object.keys(SAVE_SECTIONS)) sections[nom] = capturerSection(nom);
  const fichier = { app: 'Decurio Notius', version: APP_VERSION, date: new Date().toISOString(), sections };
  const blob = new Blob([JSON.stringify(fichier, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const lien = document.createElement('a');
  lien.href = url;
  lien.download = `decurio-notius-${Date.now()}.json`;
  document.body.appendChild(lien);
  lien.click();
  lien.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.getElementById('message-sauvegarde').textContent = 'Sauvegarde exportée.';
}

function chargerFichierSauvegarde(){
  const input = document.getElementById('fichier-restauration');
  const msg = document.getElementById('message-sauvegarde');
  const f = input.files[0];
  if(!f) return;
  const lecteur = new FileReader();
  lecteur.onload = () => {
    try{
      const d = JSON.parse(lecteur.result);
      if(!d.sections || typeof d.sections !== 'object') throw new Error('format non reconnu');
      sauvegardeChargee = d;
      document.getElementById('choix-restauration').style.display = 'block';
      document.getElementById('btn-restaurer').style.display = 'inline-block';
      msg.textContent = `Sauvegarde du ${d.date ? new Date(d.date).toLocaleString() : '?'} (${d.version || 'version ?'}) chargée. Cochez les sections à restaurer.`;
    }catch(err){
      sauvegardeChargee = null;
      document.getElementById('choix-restauration').style.display = 'none';
      document.getElementById('btn-restaurer').style.display = 'none';
      msg.textContent = 'Fichier invalide : ' + err.message;
    }
  };
  lecteur.readAsText(f);
}

function rafraichirApresRestauration(){
  const $ = id => document.getElementById(id);
  $('level-select').value = state.level;
  $('pers-select').value = String(state.personality);
  syncScientistUI();
  $('display-points').innerText = state.points;
  $('display-turn').innerText = 'Tour ' + state.turn;
  $('display-level').innerText = 'Niveau ' + state.position.z;
  $('display-shields').innerText = 'Boucliers ' + (state.shieldsOn ? 'Activés' : 'Désactivés');
  $('display-shields').className = 'status-item' + (state.shieldsOn ? ' active' : '');
  $('check-shields').checked = state.shieldsOn;
  renderShip();
  updateRouteLimits();
  renderPlanets();
  if(typeof renderOpLog === 'function') renderOpLog();
}

// ==========================================
// SAUVEGARDE AUTOMATIQUE (navigateur)
// Conserve la partie en cours entre deux rechargements de la page.
// ==========================================
const AUTOSAVE_KEY = 'legio_autosave_v1';
let autosaveTimer = null;

const TURNS_KEY = 'legio_turns_v1';   // instantanés au début de chaque tour
const TURNS_MAX = 8;

function autosaveNow(){
  try{
    const sections = {};
    for(const nom of Object.keys(SAVE_SECTIONS)) sections[nom] = capturerSection(nom);
    const donnees = { app: 'Decurio Notius', version: APP_VERSION, date: new Date().toISOString(), sections, opLog };
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(donnees));
    // premier enregistrement d'un nouveau tour = instantané de début de tour
    const hist = lireHistoriqueTours();
    if(!hist.length || hist[hist.length-1].turn !== state.turn){
      hist.push({ turn: state.turn, date: donnees.date, data: donnees });
      while(hist.length > TURNS_MAX) hist.shift();
      ecrireHistoriqueTours(hist);
    }
  }catch(err){ /* stockage plein ou désactivé : la partie continue */ }
}

function lireHistoriqueTours(){
  try{ const h = JSON.parse(localStorage.getItem(TURNS_KEY) || '[]'); return Array.isArray(h) ? h : []; }
  catch(err){ return []; }
}
function ecrireHistoriqueTours(hist){
  while(hist.length){
    try{ localStorage.setItem(TURNS_KEY, JSON.stringify(hist)); return; }
    catch(err){ hist.shift(); }   // quota dépassé : on retire le plus ancien
  }
  try{ localStorage.removeItem(TURNS_KEY); }catch(err){}
}

// Restaure un instantané complet (sections, journal, journal d'opérations)
function appliquerDonnees(d){
  for(const nom of Object.keys(SAVE_SECTIONS)) if(d.sections[nom] !== undefined) appliquerSection(nom, d.sections[nom]);
  if(Array.isArray(d.opLog)) opLog = d.opLog;
  rafraichirApresRestauration();
  renderPlanets();
}

// Revient au début du tour en cours (ou du tour précédent s'il n'y a pas d'instantané pour le tour en cours)
function annulerDernierTour(){
  const hist = lireHistoriqueTours();
  let cible = hist.find(h => h.turn === state.turn);
  if(!cible) cible = [...hist].reverse().find(h => h.turn < state.turn);
  if(!cible){ alert('Aucune sauvegarde de tour disponible.'); return; }
  if(!confirm(`Revenir au début du tour ${cible.turn} ? Toutes les actions faites depuis seront perdues.`)) return;
  appliquerDonnees(cible.data);
  // on retire les instantanés postérieurs au tour restauré
  ecrireHistoriqueTours(hist.filter(h => h.turn <= cible.turn));
  autosaveNow();
  addDebugLog(`Retour au début du tour ${cible.turn}.`);
  if(document.getElementById('tab-controle').classList.contains('active')) renderControle();
  alert(`Partie ramenée au début du tour ${cible.turn}.`);
}

function scheduleAutosave(){
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(autosaveNow, 300);
}

// Au lancement : propose de reprendre la partie sauvegardée. Retourne true si reprise.
function proposerReprise(){
  let d = null;
  try{ d = JSON.parse(localStorage.getItem(AUTOSAVE_KEY) || 'null'); }catch(err){ d = null; }
  if(!d || !d.sections) return false;
  const quand = d.date ? new Date(d.date).toLocaleString() : '?';
  if(!confirm(`Une partie en cours a été trouvée (sauvegardée le ${quand}). La reprendre ?`)) return false;
  appliquerDonnees(d);
  addDebugLog('Partie reprise (sauvegarde automatique).');
  return true;
}

// Sauvegarde aussi quand la page est masquée ou fermée
window.addEventListener('pagehide', autosaveNow);
document.addEventListener('visibilitychange', () => { if(document.visibilityState === 'hidden') autosaveNow(); });

function restaurerSectionsCochees(){
  const msg = document.getElementById('message-sauvegarde');
  if(!sauvegardeChargee){ msg.textContent = 'Aucune sauvegarde chargée.'; return; }
  const cochees = [...document.querySelectorAll('#choix-restauration input:checked')]
    .map(c => c.value)
    .filter(nom => sauvegardeChargee.sections[nom] !== undefined);
  if(cochees.length === 0){ msg.textContent = 'Aucune section cochée disponible.'; return; }
  if(!confirm(`Restaurer : ${cochees.join(', ')} ? L'état actuel de ces sections sera remplacé.`)) return;
  for(const nom of cochees) appliquerSection(nom, sauvegardeChargee.sections[nom]);
  rafraichirApresRestauration();
  addDebugLog('Restauration partielle : ' + cochees.join(', '));
  msg.textContent = 'Restauré : ' + cochees.join(', ') + '.';
}

syncScientistUI();

// Version affichée à plusieurs endroits, toujours issue de APP_VERSION
document.title = `Decurio NOTIUS ${APP_VERSION} — LEGIO VII Solo`;
const versionControle = document.getElementById('version-controle');
if(versionControle) versionControle.textContent = `Version de l'application : ${APP_VERSION}`;

// Démarrage (en fin de fichier : toutes les constantes et fonctions sont déjà définies)
if(!proposerReprise()) startGame();
switchTab('vaisseau');
