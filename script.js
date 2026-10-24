// ==========================================
// CONSTANTES & REGISTRES (Version v1.2.7)
// ==========================================
const APP_VERSION = "v1.2.7";
const DEBUG = false;
const SHIPS = {
  FROMBOLA:{level:0,cont:10,ppr:5,radMax:2,resMax:3,eqMin:1,promo:6,grade:'Decurio'},
  GLADIUM: {level:1,cont:16,ppr:4,radMax:3,resMax:4,eqMin:2,promo:6,grade:'Centurio'},
  SPATHA:  {level:2,cont:19,ppr:5,radMax:3,resMax:4,eqMin:4,promo:7,grade:'Proconsul'},
  HASTA:   {level:3,cont:21,ppr:4,radMax:3,resMax:5,eqMin:6,promo:8,grade:'Consul'}
};
const BOUNDS = {xMin:-18,xMax:19,yMin:-12,yMax:12,zMin:1,zMax:4};
const TAB_A = {1:['-','-','-','-','-','-','F'],2:['-','-','-','-','-','F','F'],3:['-','-','-','F','F','F','U'],4:['-','-','F','F','F','U','U'],5:['-','F','F','F','U','U','U'],6:['F','F','F','U','U','U','U']};
const TAB_B = {1:[0,0,0,0,0,0,0],2:[0,0,0,0,0,1,1],3:[0,0,0,1,1,1,2],4:[0,0,1,1,2,2,3],5:[0,1,1,2,2,2,3],6:[1,1,2,2,3,3,4]};
const TAB_C = {1:'bou',2:'las',3:'rad',4:'com',5:'res',6:'coque'};
const TAB_F = {1:['N','N','N','N','-','-'],2:['N','N','N','-','-','Y'],3:['N','N','-','-','Y','Y'],4:['N','-','-','Y','Y','Y'],5:['-','-','Y','Y','Y','Y'],6:['Y','Y','Y','Y','Y','Y']};
const TAB_G = {1:2,2:2,3:3,4:3,5:4,6:4};
const TAB_H = {1:-2,2:-1,3:0,4:0,5:2,6:3};
const TAB_I = {1:[-1,-1,-1,-2,-3,-3],2:[null,0,0,-1,-2,-2],3:[null,1,1,0,null,-1],4:[1,2,2,0,2,null],5:[2,3,2,2,3,4],6:[2,4,3,3,4,5]};
const PLANET_O = {A:2,B:1,C:null,D:1,E:null,F:1,G:3,H:4};
const ZONES = ['Désert','Pyramides','Village','Marais','Forêt','Eau','Glace'];
const dirVectors = {'N':{x:0,y:1},'NE':{x:1,y:1},'E':{x:1,y:0},'SE':{x:1,y:-1},'S':{x:0,y:-1},'SO':{x:-1,y:-1},'O':{x:-1,y:0},'NO':{x:-1,y:1}};
const ALIEN_FC = 5;

const RACES = {"AMOEBA": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "1/1", "missions": ["ELIMINATION"], "fc": 10, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["DESERT"], "bonus": 2}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2, 3], "nombre": 1}, {"des": [4, 5], "nombre": 2}, {"des": [6], "nombre": 4}], "notes": "Le feu peut diviser sa force par 2 ou la priver de son principe vital ; une élimination excessive la rend inutilisable."}, "CERBERUS": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "1/2", "missions": ["ELIMINATION", "CAPTURE"], "fc": 6, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["GLACE"], "bonus": 4}, "milieuNonViable": ["MARAIS"], "presences": [{"des": [1], "nombre": 1}, {"des": [2, 3], "nombre": 2}, {"des": [4, 5], "nombre": 3}, {"des": [6], "nombre": 4}], "notes": "Attaque en principe l'objectif le plus proche (l'équipage s'il est débarqué). Très recherché : capture de grande valeur."}, "SPHAERAE": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "1/4", "missions": ["ELIMINATION"], "fc": null, "valeurElim": 5, "valeurCapture": null, "milieuPrefere": {"nom": ["DESERT", "GLACE"], "bonus": null}, "milieuNonViable": ["EAU", "PYRAMIDES"], "presences": [{"des": [1, 2], "nombre": 6}, {"des": [3, 4, 5], "nombre": 10}, {"des": [6], "nombre": 20}], "notes": "Attaquent directement le vaisseau (sauf en zone non viable). Si le vaisseau est absent, attaquent les équipages avec F.C. réduit. Les armes à air n'ont aucun effet. F.C. selon la masse de l'objectif : 0,5 contre équipage, 1 contre vaisseau niveau 0, 1,5 contre niveau 1, 2 contre niveau 2, 2,5 contre niveau 3."}, "LITOFAGUS": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "1/3", "missions": ["ELIMINATION"], "fc": 5, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["PYRAMIDES"], "bonus": 1}, "milieuNonViable": ["FORET", "EAU", "MARAIS"], "presences": [{"des": [1, 2, 3, 4], "nombre": 2}, {"des": [5], "nombre": 4}, {"des": [6], "nombre": 6}], "notes": "Peut détruire les combinaisons des équipages à terre. Attaque les vaisseaux à défaut. Ne survit pas en captivité."}, "NUBIS_ARENAE": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "1/5", "missions": ["ELIMINATION"], "fc": null, "valeurElim": 6, "valeurCapture": null, "milieuPrefere": {"nom": ["DESERT"], "bonus": null}, "milieuNonViable": ["EAU", "FORET"], "presences": [{"des": [1, 2], "nombre": 1}, {"des": [3, 4], "nombre": 2}, {"des": [5, 6], "nombre": 3}], "notes": "Invisibles au radar. Dans le désert, 3 N.A. présents. Aucune arme n'agit sauf SIL 4. N'attaquent pas les équipages à terre ; repoussés par les boucliers dans 50 % des cas."}, "SUBTERRANEI": {"cat": "NON_SAPIENS", "type": "NON_VISIBLE", "ref": "1/6", "missions": ["ELIMINATION", "CAPTURE"], "fc": 8, "valeurElim": 3, "valeurCapture": 16, "milieuPrefere": {"nom": ["MARAIS"], "bonus": 2}, "milieuNonViable": ["EAU", "GLACE"], "presences": [{"des": [1, 2], "nombre": 1}, {"des": [3, 4, 5], "nombre": 2}, {"des": [6], "nombre": 3}], "notes": "Invisibles. Attaquent surtout les vaisseaux atterris, sauf attaque préventive des équipages."}, "AERIFORMI": {"cat": "NON_SAPIENS", "type": "NON_VISIBLE", "ref": "1/7", "missions": ["ELIMINATION"], "fc": 2, "valeurElim": 5, "valeurCapture": null, "milieuPrefere": {"nom": ["FORET"], "bonus": 3}, "milieuNonViable": ["VILLAGE", "EAU"], "presences": [{"des": [1, 2], "nombre": 1}, {"des": [3], "nombre": 2}, {"des": [4], "nombre": 3}, {"des": [5, 6], "nombre": 5}], "notes": "Très dangereux : se désintègrent au contact des boucliers activés ; sans bouclier, tuent tout l'équipage à bord. Détruits seulement par laser ou silicones."}, "MIMESIS": {"cat": "NON_SAPIENS", "type": "NON_VISIBLE", "ref": "1/8", "missions": ["ELIMINATION"], "fc": 6, "valeurElim": 5, "valeurCapture": null, "milieuPrefere": {"nom": ["GLACE", "DESERT"], "bonus": 1}, "milieuNonViable": ["FORET"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5, 6], "nombre": 2}], "notes": "Invisibles. Ne peuvent pas être capturés vivants."}, "LIANA_NIGRA": {"cat": "NON_SAPIENS", "type": "VELENOSI", "ref": "2/1", "missions": ["ELIMINATION", "CAPTURE"], "fc": 2, "valeurElim": 2, "valeurCapture": 6, "milieuPrefere": {"nom": ["FORET", "MARAIS"], "bonus": 3}, "milieuNonViable": ["PYRAMIDES"], "presences": [{"des": [1, 2], "nombre": 1}, {"des": [3, 4, 5], "nombre": 2}, {"des": [6], "nombre": 3}], "notes": "Venimeux. Ne s'approche jamais des vaisseaux."}, "BAVOSUS": {"cat": "NON_SAPIENS", "type": "VELENOSI", "ref": "2/2", "missions": ["ELIMINATION", "CAPTURE"], "fc": 15, "valeurElim": 6, "valeurCapture": 20, "milieuPrefere": {"nom": ["DESERT"], "bonus": 2}, "milieuNonViable": ["FORET", "MARAIS"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5, 6], "nombre": 2}], "notes": "Ne considèrent pas les équipages débarqués comme dangereux tant qu'ils n'ouvrent pas le feu. Corrosion des vaisseaux. Venimeux."}, "RADICALES": {"cat": "NON_SAPIENS", "type": "VELENOSI", "ref": "2/3", "missions": ["ELIMINATION", "CAPTURE"], "fc": 10, "valeurElim": 5, "valeurCapture": 15, "milieuPrefere": {"nom": ["FORET", "MARAIS"], "bonus": 8}, "milieuNonViable": ["DESERT", "GLACE"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5, 6], "nombre": 2}], "notes": "Risque élevé pour équipages et vaisseaux à terre. Éliminées au laser : 0 pt si tirage pair. Venimeux."}, "SEVOLVENTES": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "2/4", "missions": ["ELIMINATION"], "fc": 2, "valeurElim": 5, "valeurCapture": null, "milieuPrefere": {"nom": ["GLACE"], "bonus": 1}, "milieuNonViable": ["FORET", "EAU"], "presences": [{"des": [1, 2], "nombre": 2}, {"des": [3, 4], "nombre": 4}, {"des": [5, 6], "nombre": 6}], "notes": "Le noyau récupéré rapporte d'excellents points."}, "GIGANS": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "2/5", "missions": ["ELIMINATION"], "fc": 20, "valeurElim": 15, "valeurCapture": null, "milieuPrefere": {"nom": ["FORET"], "bonus": 5}, "milieuNonViable": ["DESERT", "EAU"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5], "nombre": 2}, {"des": [6], "nombre": 3}], "notes": "Capture impossible. Équipages débarqués : demi-mouvement. Prennent feu au laser."}, "PRIMITIS": {"cat": "SAPIENS", "type": "SUB_CIVILES", "ref": "2/6", "missions": ["INTIMIDATION", "COMMERCE", "RECHERCHE_SCIENTIFIQUE"], "fc": 1, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["VILLAGE"], "bonus": 1}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2], "nombre": 4}, {"des": [3, 4], "nombre": 5}, {"des": [5], "nombre": 7}, {"des": [6], "nombre": 10}], "notes": "Timides ; peuvent se rebeller contre des équipages entrant dans leurs villages. Intimidation : vénération."}, "UPOMEDI": {"cat": "SAPIENS", "type": "SUB_CIVILES", "ref": "2/7", "missions": ["INTIMIDATION", "COMMERCE"], "fc": 2, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["GLACE", "DESERT"], "bonus": 1}, "milieuNonViable": ["FORET"], "presences": [{"des": [1, 2, 3], "nombre": 4}, {"des": [4, 5, 6], "nombre": 8}], "notes": ""}, "ALGHIDI": {"cat": "SAPIENS", "type": "CIVILES", "ref": "2/8", "missions": ["ELIMINATION", "ALLIANCE"], "fc": 5, "valeurElim": 4, "valeurCapture": null, "milieuPrefere": {"nom": ["EAU"], "bonus": 2}, "milieuNonViable": ["DESERT"], "presences": [{"des": [1, 2, 3], "nombre": 1}, {"des": [4, 5], "nombre": 2}, {"des": [6], "nombre": 3}], "notes": "Marchands = pacifiques. Algues psychoréceptrices récupérables."}, "TRONCIDI": {"cat": "SAPIENS", "type": "CIVILES", "ref": "2/9", "missions": ["ALLIANCE", "COMMERCE", "RECHERCHE_SCIENTIFIQUE"], "fc": 12, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["PYRAMIDES"], "bonus": 4}, "milieuNonViable": ["EAU", "GLACE"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5], "nombre": 2}, {"des": [6], "nombre": 3}], "notes": "Bons marchands."}, "IPNOTICI": {"cat": "SAPIENS", "type": "CIVILES", "ref": "2/10", "missions": ["ELIMINATION", "ALLIANCE", "COMMERCE"], "fc": 5, "valeurElim": 4, "valeurCapture": null, "milieuPrefere": {"nom": ["VILLAGE"], "bonus": 2}, "milieuNonViable": ["GLACE"], "presences": [{"des": [1], "nombre": 1}, {"des": [2, 3, 4], "nombre": 2}, {"des": [5], "nombre": 3}, {"des": [6], "nombre": 4}], "notes": "Règle spéciale Ipnotici : Les pertes infligées sur le Tableau B sont doublées / ajustées (1=2, 2=2, 3=4, 4=4, 5=6, 6=6)."}, "PSICO": {"cat": "SAPIENS", "type": "SUPER_CIVILES", "ref": "2/11", "missions": ["ALLIANCE"], "fc": 15, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["VILLAGE"], "bonus": 5}, "milieuNonViable": ["DESERT", "GLACE"], "presences": [{"des": [1, 2, 3, 4, 5, 6], "nombre": 1}], "notes": ""}, "NORMO": {"cat": "SAPIENS", "type": "SUPER_CIVILES", "ref": "2/12", "missions": ["ALLIANCE", "RECHERCHE_SCIENTIFIQUE"], "fc": null, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["FORET"], "bonus": 5}, "milieuNonViable": [], "presences": [{"des": [1, 2, 3, 4, 5], "nombre": 1}, {"des": [6], "nombre": 2}], "notes": "Pas de commerce possible. Recherche bio-botanique possible."}, "ELPH": {"cat": "SAPIENS", "type": "SUB_CIVILES", "ref": "3/1", "missions": ["INTIMIDATION", "RECHERCHE_SCIENTIFIQUE"], "fc": 1, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["FORET"], "bonus": 1}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2, 3, 4], "nombre": 3}, {"des": [5], "nombre": 5}, {"des": [6], "nombre": 7}], "notes": "Pas de commerce. Peuvent être intimidés."}, "NILBOG": {"cat": "SAPIENS", "type": "SUB_CIVILES", "ref": "3/2", "missions": ["RECHERCHE_SCIENTIFIQUE", "COMMERCE"], "fc": 1, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["PYRAMIDES"], "bonus": 3}, "milieuNonViable": [], "presences": [{"des": [1, 2, 3, 4], "nombre": 3}, {"des": [5, 6], "nombre": 6}], "notes": "Pas d'intimidation."}, "TARILS": {"cat": "SAPIENS", "type": "SUB_CIVILES", "ref": "3/3", "missions": ["INTIMIDATION", "RECHERCHE_SCIENTIFIQUE"], "fc": 2, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["DESERT"], "bonus": 1}, "milieuNonViable": [], "presences": [{"des": [1], "nombre": 1}, {"des": [2], "nombre": 2}, {"des": [3], "nombre": 3}, {"des": [4], "nombre": 4}, {"des": [5], "nombre": 5}, {"des": [6], "nombre": 6}], "notes": "Intimidation réussie : statues de vénération."}, "SKIN": {"cat": "SAPIENS", "type": "CIVILES", "ref": "3/4", "missions": ["ALLIANCE", "COMMERCE", "RECHERCHE_SCIENTIFIQUE"], "fc": 2, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["VILLAGE"], "bonus": 3}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2, 3, 4], "nombre": 2}, {"des": [5], "nombre": 4}, {"des": [6], "nombre": 6}], "notes": "Esprit mercantile : nombreux points possibles."}, "PELASGI": {"cat": "SAPIENS", "type": "CIVILES", "ref": "3/5", "missions": ["COMMERCE", "ALLIANCE", "RECHERCHE_SCIENTIFIQUE"], "fc": 3, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["DESERT"], "bonus": 2}, "milieuNonViable": [], "presences": [{"des": [1, 2, 3], "nombre": 2}, {"des": [4, 5], "nombre": 4}, {"des": [6], "nombre": 10}], "notes": ""}, "TULII": {"cat": "SAPIENS", "type": "CIVILES", "ref": "3/6", "missions": ["ALLIANCE", "COMMERCE", "RECHERCHE_SCIENTIFIQUE"], "fc": 4, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["EAU"], "bonus": 2}, "milieuNonViable": ["DESERT"], "presences": [{"des": [1, 2, 3, 4], "nombre": 2}, {"des": [5], "nombre": 4}, {"des": [6], "nombre": 8}], "notes": ""}, "NAPOS": {"cat": "SAPIENS", "type": "CIVILES", "ref": "3/7", "missions": ["COMMERCE", "ALLIANCE", "RECHERCHE_SCIENTIFIQUE"], "fc": 5, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": ["FORET"], "bonus": 3}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2, 3], "nombre": 2}, {"des": [4, 5], "nombre": 5}, {"des": [6], "nombre": 8}], "notes": "Armes inoffensives contre vaisseaux sous bouclier."}, "SIPCO": {"cat": "SAPIENS", "type": "SUPER_CIVILES", "ref": "3/8", "missions": ["ALLIANCE"], "fc": null, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": [], "bonus": null}, "milieuNonViable": [], "presences": [{"des": [1, 2, 3, 4, 5], "nombre": 1}, {"des": [6], "nombre": 2}], "notes": ""}, "ATTLERS": {"cat": "SAPIENS", "type": "SUPER_CIVILES", "ref": "3/9", "missions": ["ALLIANCE"], "fc": null, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": [], "bonus": null}, "milieuNonViable": [], "presences": [{"des": [1, 2, 3, 4, 5, 6], "nombre": 1}], "notes": "Marchands = hostiles."}, "CRONOS": {"cat": "SAPIENS", "type": "SUPER_CIVILES", "ref": "3/10", "missions": ["ALLIANCE"], "fc": null, "valeurElim": null, "valeurCapture": null, "milieuPrefere": {"nom": [], "bonus": null}, "milieuNonViable": [], "presences": [{"des": [1, 2, 3, 4, 5, 6], "nombre": 1}], "notes": "Arme sphère-foudre."}, "ASPIS": {"cat": "NON_SAPIENS", "type": "VELENOSI", "ref": "3/11", "missions": ["ELIMINATION", "CAPTURE"], "fc": 8, "valeurElim": 4, "valeurCapture": 12, "milieuPrefere": {"nom": ["DESERT"], "bonus": 2}, "milieuNonViable": ["VILLAGE"], "presences": [{"des": [1, 2, 3, 4, 5], "nombre": 1}, {"des": [6], "nombre": 2}], "notes": "Venimeux."}, "SCORPIO": {"cat": "NON_SAPIENS", "type": "VELENOSI", "ref": "3/12", "missions": ["ELIMINATION", "CAPTURE"], "fc": 12, "valeurElim": 6, "valeurCapture": 18, "milieuPrefere": {"nom": ["DESERT"], "bonus": 2}, "milieuNonViable": ["GLACE"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5], "nombre": 2}, {"des": [6], "nombre": 3}], "notes": "Venimeux. Capture rare : promotions immédiates."}, "MANTA": {"cat": "NON_SAPIENS", "type": "VELENOSI", "ref": "3/13", "missions": ["ELIMINATION", "CAPTURE"], "fc": 2, "valeurElim": 3, "valeurCapture": 7, "milieuPrefere": {"nom": ["FORET"], "bonus": 1}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2, 3, 4], "nombre": 1}, {"des": [5, 6], "nombre": 2}], "notes": "Venimeux. Aiguilles empoisonnées."}, "HYDRA": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "3/14", "missions": ["ELIMINATION", "CAPTURE"], "fc": 3, "valeurElim": 4, "valeurCapture": 10, "milieuPrefere": {"nom": ["DESERT"], "bonus": 1}, "milieuNonViable": ["EAU"], "presences": [{"des": [1, 2], "nombre": 1}, {"des": [3, 4, 5], "nombre": 2}, {"des": [6], "nombre": 4}], "notes": ""}, "TYRANNOSAURUS": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": "3/15", "missions": ["ELIMINATION", "CAPTURE"], "fc": 10, "valeurElim": 8, "valeurCapture": 14, "milieuPrefere": {"nom": ["MARAIS"], "bonus": 3}, "milieuNonViable": ["GLACE"], "presences": [{"des": [1], "nombre": 1}, {"des": [2, 3, 4, 5], "nombre": 2}, {"des": [6], "nombre": 3}], "notes": "Attaque furieuse surtout en marais."}, "ANOPHELES": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": null, "missions": ["ELIMINATION"], "fc": 1, "valeurElim": 3, "valeurCapture": null, "milieuPrefere": {"nom": ["MARAIS"], "bonus": 1}, "milieuNonViable": ["PYRAMIDES"], "presences": [{"des": [1, 2, 3], "nombre": 5}, {"des": [4, 5, 6], "nombre": 10}], "notes": "Moustiques géants en nuée mortelle."}, "FERA": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": null, "missions": ["ELIMINATION"], "fc": 4, "valeurElim": 3, "valeurCapture": null, "milieuPrefere": {"nom": ["GLACE"], "bonus": 4}, "milieuNonViable": ["DESERT"], "presences": [{"des": [1, 2, 3, 4, 5], "nombre": 1}, {"des": [6], "nombre": 3}], "notes": "Chasse réservée aux U.C. de légionnaires."}, "MINOS": {"cat": "NON_SAPIENS", "type": "MONSTRA", "ref": null, "missions": ["ELIMINATION", "CAPTURE"], "fc": 2, "valeurElim": 5, "valeurCapture": 11, "milieuPrefere": {"nom": ["PYRAMIDES"], "bonus": 4}, "milieuNonViable": ["MARAIS"], "presences": [{"des": [1], "nombre": 1}, {"des": [2, 3], "nombre": 3}, {"des": [4, 5], "nombre": 5}, {"des": [6], "nombre": 7}], "notes": "Bipède rapide avec yeux rétractables."}};

const NIVEAU_TECH = {"AMOEBA": null, "CERBERUS": null, "SPHAERAE": null, "LITOFAGUS": null, "NUBIS_ARENAE": null, "SUBTERRANEI": null, "AERIFORMI": null, "MIMESIS": null, "LIANA_NIGRA": null, "BAVOSUS": null, "RADICALES": null, "SEVOLVENTES": null, "GIGANS": null, "PRIMITIS": 8, "UPOMEDI": null, "ALGHIDI": null, "TRONCIDI": 7, "IPNOTICI": null, "PSICO": null, "NORMO": 5, "ELPH": 9, "NILBOG": 9, "TARILS": 8, "SKIN": 9, "PELASGI": null, "TULII": 4, "NAPOS": 9, "SIPCO": 8, "ATTLERS": 10, "CRONOS": 12, "ASPIS": null, "SCORPIO": null, "MANTA": null, "HYDRA": null, "TYRANNOSAURUS": null, "ANOPHELES": null, "FERA": null, "MINOS": null};
for(const k in RACES) RACES[k].niveauTech = NIVEAU_TECH[k];

const LETTERS_L1 = {1:'A',2:'B',3:'C',4:'D',5:'E',6:'F',7:'G',8:'H'};
const LETTER_NAME = {A:'A · Tellus',B:'B · Sans atmosphère',C:'C · Mercure',D:'D · Mars',E:'E · Mars',F:'F · Vénus',G:'G · Jupiter',H:'H · Jupiter'};
const RAD_ROWS = {
  A:[[[1,2,3,4],'0'],[[5,6],'α']], B:[[[1,2,3],'0'],[[4,5,6],'α']], C:[[[1,2,3],'α'],[[4,5,6],'β']],
  D:[[[1,2,3,4],'0'],[[5,6],'α']], E:[[[1,2],'α'],[[3,4,5],'β'],[[6],'0']], F:[[[1,2,3,4],'0'],[[5,6],'α']],
  G:[[[1,2,3,4],'0'],[[5,6],'α']], H:[[[1,2,3],'β'],[[4,5,6],'α']]
};
const L2 = {
  A:[[[1],'MIN'],[[2],'VEG'],[[3,4,5],'ANI'],[[6],'DNS']],
  B:[[[1,2,3],'MIN'],[[4],'SINE'],[[5,6],'DNS']],
  C:[[[1,2],'MIN'],[[3],'VEG'],[[4],'ANI'],[[5],'SINE'],[[6],'DNS']],
  D:[[[1,2],'MIN'],[[3,4],'VEG'],[[5],'ANI'],[[6],'DNS']],
  E:[[[1],'MIN'],[[4,5],'VEG'],[[2,3],'ANI'],[[6],'DNS']],
  F:[[[1],'MIN'],[[2],'VEG'],[[3,4,5],'ANI'],[[6],'DNS']],
  G:[[[3,4],'MIN'],[[1,2],'VEG'],[[5,6],'DNS']],
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
const L6 = {
  ANI_SUB:[[[1,2,3,4],'ELPH'],[[5,6,7],'NILBOG'],[[8,9,10],'TARILS']],
  ANI_CIV:[[[1,2,3],'SKIN'],[[4,5],'PELASGI'],[[6,7,8],'TULII'],[[9,10],'NAPOS']],
  ANI_SUP:[[[1,2,3],'SIPCO'],[[4,5,6],'ATTLERS'],[[7,8,9,10],'CRONOS']],
  ANI_VEL:[[[1,2,3],'ASPIS'],[[4,5,6],'SCORPIO'],[[7,8,9,10],'MANTA']],
  ANI_MON:[[[1,2],'TYRANNOSAURUS'],[[3,4],'HYDRA'],[[5,6],'MINOS'],[[7,8],'FERA'],[[9,10],'ANOPHELES']],
  MIN_MON:[[[1,2],'AMOEBA'],[[3,4],'CERBERUS'],[[5,6],'LITOFAGUS'],[[7,8],'SPHAERAE'],[[9,10],'NUBIS_ARENAE']],
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
  VEG:{VELENOSI:'VEG_VEL',MONSTRA:'MONSTRA',SUB_CIVILES:'VEG_SUB',CIVILES:'VEG_CIV',SUPER_CIVILES:'VEG_SUP'}
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
  personality:0, risks:null, savant:0,
  menGround:0, crewGround:0, landedTurns:0, menLost:0, mission:null, missionResult:null,
  currentAliens:0, alienWounded:0, missionUsed:false,
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
function alienFC(){
  const r=state.alienRace? RACES[state.alienRace] : null;
  return (r && typeof r.fc==='number') ? r.fc : ALIEN_FC;
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
}

function logCombat(text){ const cl=document.getElementById('combat-log'); cl.style.display='block'; cl.innerHTML=text; }

// ==========================================
// FORMATEUR DE DIRECTION DIAGONALE PRÉCIS
// ==========================================
function formatDirection(dx, dy) {
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
    if(k==='SINE'){ ch.forme='SINE'; return {status:'end',text:'Sans vie : aucune forme de vie. Fin des informations.'}; }
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
  opLog=[];
  generateMap();
  state.risks = null;
  if(state.level==='AVANCE') placeRisks();
  state.computersUsedThisTurn=0; state.observablePlanets=[];
  renderShip(); updateRouteLimits(); resetRoute(); renderPlanets();
  document.getElementById('display-level').innerText = `Niveau ${state.position.z}`;
}

// ==========================================
// GESTION DU VAISSEAU & STATUT DYNAMIQUE
// ==========================================
function setLevel(v){
  if(state.turn>1){ alert("Le niveau est fixé au lancement de l'exploration."); document.getElementById('level-select').value=state.level; return; }
  state.level=v;
  document.getElementById('pers-row').style.display = v==='AVANCE' ? 'flex' : 'none';
  document.getElementById('savant-card').style.display = v==='AVANCE' ? 'block' : 'none';
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
  
  if(state.currentPlanet){
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
  document.getElementById('display-shields').innerText=`Boucliers : ${state.shieldsOn?'Activés':'Désactivés'}`;
}

function setShields(on){
  if(state.shieldsLocked){ alert('Les boucliers sont fixés pour ce tour.'); document.getElementById('check-shields').checked=state.shieldsOn; return; }
  state.shieldsOn=on;
  document.getElementById('display-shields').innerText=`Boucliers : ${on?'Activés':'Désactivés'}`;
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
    if(state.ship[key]>0){ state.ship[key]--; log('SPACE COMPUTER',`Dégât : un élément « ${el} » est détruit.`); }
    else log('SPACE COMPUTER',`Dégât sur « ${el} » absent du vaisseau : ignoré.`);
  }
  renderShip(); updateRouteLimits();
}

function shipDestroyed(){
  const order=['FROMBOLA','GLADIUM','SPATHA','HASTA'];
  const idx=order.indexOf(state.shipClass);
  const nc=idx>0?order[idx-1]:'FROMBOLA';
  log('SPACE COMPUTER',`<b>VAISSEAU DÉTRUIT.</b> Retour de sauvetage : ${state.shipClass} → ${nc}, score remis à zéro.`);
  addDebugLog(`Destruction : ${state.shipClass} → ${nc}`);
  state.shipClass=nc; state.maxContainers=SHIPS[nc].cont; state.points=0;
  state.ship={crew:SHIPS[nc].eqMin,shields:1,lasers:1,radars:2,computers:1,tanks:3,modules:0,mod_zip3:0,mod_ho12:0,mod_sil4:0};
  state.position={...state.basePos}; state.isInFlight=false; state.shieldsLocked=false; state.shieldsOn=true;
  state.menGround=0; state.crewGround=0; state.menLost=0; state.mission=null; state.missionResult=null; state.currentPlanet=null;
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

  for(let i=0;i<maxSteps;i++){
    const np=path[i]; if(np.isJump){ stepCount+=4; continue; } stepCount++;
    state.planets.forEach(p=>{
      if(p.id===0||p.z!==np.z) return;
      const dx=p.x-np.x, dy=p.y-np.y, dist=Math.max(Math.abs(dx), Math.abs(dy));
      if(dist<=radar){
        if(!state.observablePlanets.includes(p.id)) state.observablePlanets.push(p.id);

        const isNew=!p.discovered;
        if(isNew){
          state.points += (2 - cls().level);
          recordOp('Découverte','Planète #'+p.id+' (inconnue)',{parsec:stepCount,distance:dist},'+'+(2-cls().level)+' pt(s)','');
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

  Object.keys(planetSightings).forEach(pid => {
    const info = planetSightings[pid];
    log('SPACE COMPUTER', `Au <b>${info.step}e parsec</b>, repérage au plus près de la <b>Planète #${pid}</b> ${info.isNew ? '(inconnue)' : '(déjà connue)'}. Distance minimale : <b>${info.dist} parsec(s)</b>. Direction : <b>${info.dir}</b>.`);
  });

  let finalPos = maxSteps>0 ? {...path[maxSteps-1]} : {...state.position};
  if(maxSteps>0 && finalPos.isJump) finalPos={x:finalPos.x,y:finalPos.y,z:finalPos.z};
  if(riskHit && riskHit.kind==='dn'){
    const relo=distortionRelocate(finalPos);
    finalPos={x:relo.x,y:relo.y,z:relo.z};
    log('SPACE COMPUTER','Distorsion nullius : votre vaisseau est transporté vers un autre point de sa route.');
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
    if(riskHit && riskHit.kind==='rmg') log('SPACE COMPUTER','Réseau magnéto-gravitationnel : la route s\'arrête sans information (sauf Princeps PSI).');
    if(riskHit && riskHit.kind==='dn') log('SPACE COMPUTER','Distorsion nullius : la route s\'interrompt.');
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
      state.isInFlight=false; log('SPACE COMPUTER','Retour à la planète-base. Les droïdes-techniciens peuvent rééquiper le vaisseau.');
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
      const isNew = !p.discovered;
      let dirText = formatDirection(dx, dy);
      if(!p.report || 1 < p.report.step) p.report = {step: 1, dist: dist, dir: dirText};
      p.discovered = true;
      if(isNew) {
        state.points += (2 - cls().level);
        recordOp('Découverte', 'Planète #' + p.id + ' (inconnue)', {distance: dist}, '+' + (2 - cls().level) + ' pt(s)', '');
      }
      log('SPACE COMPUTER', `Depuis votre position, repérage de la <b>Planète #${p.id}</b> ${isNew ? '(inconnue)' : '(déjà connue)'}. Distance minimale : <b>${dist} parsec(s)</b>. Direction : <b>${dirText}</b>.`);
    }
  });
  document.getElementById('display-points').innerText = state.points;
  renderPlanets();
  renderShip();
}

function finishTurn(){
  state.isInFlight = state.isInFlight && state.position.x!==state.basePos.x;
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
      if(ch.race === 'SIPCO') fcText = 'Égal à la défense de la Légion, Att. = Défense + 2';
      if(ch.race === 'ATTLERS') fcText = 'Égal à la défense, Att. = Défense + dé (6)';
      if(ch.race === 'CRONOS') fcText = 'Égal à l\'attaque/défense rencontrée × dé (6)';

      fiche=`<div style="font-size:12px;color:var(--text-muted);border-top:1px dashed var(--border);padding-top:8px;margin-bottom:12px;line-height:1.6;">
        F.C. ${fcText} · Missions : ${r.missions.join(', ')||'aucune'}<br>
        Milieu préféré : ${r.milieuPrefere.nom.join(', ')||'—'}${r.milieuPrefere.bonus!=null?' (+'+r.milieuPrefere.bonus+')':''} · Non viable : ${r.milieuNonViable.join(', ')||'—'}<br>
        ${r.notes? 'Notes : '+r.notes : ''}</div>`;
    }
    h+=`<div class="planet-card"><div class="planet-header"><h3>Planète ${p.id}</h3><span class="pts">+${2-cls().level} pt(s) de découverte</span></div>
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

function requestInfo(id){
  if(state.computersUsedThisTurn>=state.ship.computers) return;
  const p=state.planets.find(x=>x.id===id);
  if(p.infoLevel>=6) return;
  if(!state.observablePlanets.includes(id)) return alert("La planète est hors de portée des radars ce tour.");
  ensureChain(p);
  state.computersUsedThisTurn++;
  log('OFFICIER COMMANDANT',`J'alloue 1 ordinateur pour la Planète #${id}.`);
  const r=rollStep(p,p.infoLevel+1);
  if(r.status==='dns'){ log('SPACE COMPUTER','D.N.S. : données insuffisantes. La demande est perdue, à répéter.'); }
  else { log('SPACE COMPUTER',r.text); p.infoLevel = (r.status==='end') ? 6 : p.infoLevel+1; }
  addDebugLog(`Planète #${id} : information ${p.infoLevel}/6`);
  renderPlanets();
}

// ==========================================
// ATTERRISSAGE & COMBATS
// ==========================================
function prepareLanding(planet){
  if(planet.done){ alert('Cette planète est déjà connue : elle ne rapporte plus de points.'); return; }
  state.currentPlanet=planet; state.crewGround=0; state.menGround=0; state.landedTurns=0; state.menLost=0; state.missionResult=null; state.mission=null; state.missionUsed=false;
  disembarkCount = Math.min(1, state.ship.crew);
  updateDisembarkUI();
  state.isInFlight = false;
  renderShip();
  switchTab('debarquer');
  document.getElementById('landing-content').style.display='block';
  document.getElementById('no-landing').style.display='block';
  document.getElementById('mission-panel').style.display='none';
  document.getElementById('ground-actions').style.display='none';
  document.getElementById('op-box').style.display='none';
  document.getElementById('behavior-selection').style.display='block';
  document.getElementById('combat-log').style.display='none';
  document.getElementById('landing-status').innerText=`Atterrissage sur la Planète #${planet.id} (niveau ${planet.z}).`;
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
  if(v==='A'||v==='B'){ al.style.display='block'; al.innerText='Boucliers activés : aucun débarquement possible. Le comportement A ou B n\'autorise pas les équipages à terre.'; }
  else if(!state.shieldsOn){ al.style.display='block'; al.innerText='Les boucliers sont désactivés pour ce tour, comme exigé par C ou D.'; }
  else { al.style.display='block'; al.innerText='Les comportements C et D exigent des boucliers éteints : décochez-les sur l\'onglet Route (fixation au début du tour).'; }
}

function confirmBehavior(){
  const v=document.querySelector('input[name="attitude"]:checked');
  if(!v) return alert('Choisissez un comportement.');
  const b=v.value, needOn=(b==='A'||b==='B');
  if(needOn!==state.shieldsOn){ return alert(needOn?'Le comportement A ou B exige des boucliers activés pour ce tour.':'Le comportement C ou D exige des boucliers éteints pour ce tour.'); }
  log('OFFICIER COMMANDANT',`Comportement d'atterrissage : ${b}.`);
  completePlanetInfo(state.currentPlanet);
  document.getElementById('landing-shields').innerText=needOn?'Activés':'Désactivés';
  document.getElementById('behavior-selection').style.display='none';
  document.getElementById('op-box').style.display='block';
  if(needOn){
    log('SPACE COMPUTER','Boucliers activés : débarquement interdit, les équipages restent à bord.');
    document.getElementById('mission-panel').style.display='block';
    document.getElementById('btn-combat').style.display='none';
    document.getElementById('btn-intim').style.display='none';
    document.getElementById('btn-comm').style.display='none';
    document.getElementById('btn-sci').style.display='none';
    document.getElementById('btn-reembark').style.display='none';
    document.getElementById('btn-orbit').style.display='block';
  } else {
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
  if(r<=7){ log('SPACE COMPUTER',`Tableau P : zone ${ZONES[r-1]}.`); return; }
  log('SPACE COMPUTER','Tableau P : zone au choix de l\'Officier Commandant.');
  document.getElementById('zone-btns').innerHTML=ZONES.map(z=>`<button class="vbtn" onclick="chooseZone('${z}')">${z}</button>`).join('');
  document.getElementById('zone-btns').classList.add('vrow');
}

function chooseZone(z){ log('OFFICIER COMMANDANT',`Zone choisie : ${z}.`); document.getElementById('zone-btns').innerHTML=''; }

function disembark(){
  if(state.shieldsOn) return alert('Boucliers activés : débarquement impossible.');
  if(state.ship.crew<=0) return alert("Pas d'équipage disponible à bord.");
  
  const toLand = Math.min(disembarkCount, state.ship.crew);
  const raceId = currentRace();
  state.alienRace = raceId;
  
  state.ship.crew -= toLand;
  state.crewGround += toLand;
  state.menGround += toLand * 3;
  state.landedTurns = 1;
  
  state.isInFlight = false;
  renderShip();

  document.getElementById('landing-crew').innerText=`${state.ship.crew} à bord · ${state.crewGround} E. (${state.menGround} hommes) à terre`;
  document.getElementById('ground-actions').style.display='none';
  document.getElementById('mission-panel').style.display='block';
  
  const ch = ensureChain(state.currentPlanet);
  const isObjectPlanet = (ch.tcode === 'OZ' || ch.tcode === 'SECOR');

  state.currentAliens = (raceId && !isObjectPlanet) ? rollPresence(raceId) : 0;
  state.alienWounded = 0;
  
  const r = raceId ? RACES[raceId] : null;
  let fcStr = alienFC();
  if(raceId === 'SPHAERAE') fcStr = 'Variable (masse)';
  if(raceId === 'SIPCO') fcStr = 'Défense Légion';
  if(raceId === 'ATTLERS') fcStr = 'Défense Légion';
  if(raceId === 'CRONOS') fcStr = 'Att./Déf. variable';

  document.getElementById('alien-title').innerText = isObjectPlanet ? TCODE_NAME[ch.tcode] : (r ? raceId.replace(/_/g,' ') : 'Aucun Extrasolaire');
  document.getElementById('alien-sub').innerText = isObjectPlanet ? 'Objet à ramasser (sans race)' : (r ? `${r.type.replace(/_/g,' ')} · F.C. ${fcStr}` : 'Pas de race sur cette planète');
  document.getElementById('alien-count').innerText = state.currentAliens;
  document.getElementById('alien-wounded').innerText = 0;
  
  const allowElim = r ? r.missions.includes('ELIMINATION') : true;
  document.getElementById('btn-combat').style.display = (!isObjectPlanet && state.currentAliens > 0 && allowElim) ? 'flex' : 'none';
  document.getElementById('btn-intim').style.display = (!isObjectPlanet && r && r.cat==='SAPIENS') ? 'flex' : 'none';
  document.getElementById('btn-comm').style.display = (!isObjectPlanet && r && r.cat==='SAPIENS' && ch.nature==='MARCHAND') ? 'flex' : 'none';
  document.getElementById('btn-sci').style.display = (state.level==='AVANCE' && state.savant>0 && !isObjectPlanet) ? 'flex' : 'none';

  if(isObjectPlanet){
    state.mission = 'object';
    state.missionResult = {key: ch.tcode, points: 2};
    log('SPACE COMPUTER', `Objet (${TCODE_NAME[ch.tcode]}) récupéré par les équipes à terre. Prêt pour le réembarquement.`);
    document.getElementById('btn-reembark').style.display = 'flex';
  } else {
    document.getElementById('btn-reembark').style.display = 'none';
  }

  document.getElementById('btn-orbit').style.display = 'none';
  
  const forme = ch.forme;
  let fcModules = 0;
  if(state.ship.mod_zip3 > 0) fcModules += state.ship.mod_zip3 * 5;
  if(state.ship.mod_ho12 > 0) fcModules += state.ship.mod_ho12 * ({ANI:6, VEG:4, MIN:3}[forme] || 3);
  if(state.ship.mod_sil4 > 0) fcModules += state.ship.mod_sil4 * ((forme==='MIN') ? 6 : 3);
  
  log('OFFICIER COMMANDANT', `Je débarque ${toLand} équipage(s) (${toLand*3} hommes).`);
  log('SPACE COMPUTER', `${state.menGround} homme(s) à terre.`);
  addDebugLog(`Débarquement : ${state.menGround} hommes (${isObjectPlanet?'Objet à ramasser':(raceId||'aucun')}).`);
}

function checkGroundStatusAfterCombat(){
  document.getElementById('alien-count').innerText = state.currentAliens;
  document.getElementById('alien-wounded').innerText = state.alienWounded;
  
  const ch = ensureChain(state.currentPlanet);
  const isObjectPlanet = (ch.tcode === 'OZ' || ch.tcode === 'SECOR');

  if(state.menGround <= 0){
    log('SPACE COMPUTER', '<b>Tous les équipages à terre ont été éliminés.</b> Réembarquement impossible.');
    document.getElementById('btn-reembark').style.display = 'none';
    document.getElementById('btn-combat').style.display = 'none';
    document.getElementById('btn-intim').style.display = 'none';
    document.getElementById('btn-comm').style.display = 'none';
    document.getElementById('btn-sci').style.display = 'none';
    document.getElementById('btn-orbit').style.display = 'block';
  } else {
    document.getElementById('btn-reembark').style.display = 'flex';
  }
}

function startCombat(){
  if(state.menGround <= 0) return;
  if(state.currentAliens <= 0){ log('SPACE COMPUTER', "Plus d'Extrasolaire à combattre."); return; }
  
  state.mission = 'elim';
  
  const forme = state.currentPlanet.chain ? state.currentPlanet.chain.forme : null;
  let fcModules = 0;
  if(state.ship.mod_zip3 > 0) fcModules += state.ship.mod_zip3 * 5;
  if(state.ship.mod_ho12 > 0) fcModules += state.ship.mod_ho12 * ({ANI:6, VEG:4, MIN:3}[forme] || 3);
  if(state.ship.mod_sil4 > 0) fcModules += state.ship.mod_sil4 * ((forme === 'MIN') ? 6 : 3);

  const fcLegion = state.menGround + fcModules;
  const fcTarget = alienFC();
  const diff = fcLegion - fcTarget;
  
  const r = d6();
  const res = TAB_A[r][colIndex(diff)];
  
  recordOp('A', 'Tir de la Légion', {dé:r, diff:diff, colonne:colIndex(diff)}, res, '');
  log('OFFICIER COMMANDANT', "J'ordonne le tir sur l'Extrasolaire.");
  
  if(res === 'U'){
    state.currentAliens--;
    logCombat(`<b>Tableau A · dé ${r} · diff ${diff>=0?'+':''}${diff}</b><br>U : un Extrasolaire est tué.`);
  } else if(res === 'F'){
    state.alienWounded++;
    logCombat(`<b>Tableau A · dé ${r} · diff ${diff>=0?'+':''}${diff}</b><br>F : un Extrasolaire est blessé.`);
  } else {
    logCombat(`<b>Tableau A · dé ${r} · diff ${diff>=0?'+':''}${diff}</b><br>Aucun effet.`);
  }

  if(state.currentAliens <= 0 && state.alienRace){
    const rv = RACES[state.alienRace].valeurElim;
    if(typeof rv === 'number') state.missionResult = {key:'elim', points:rv};
  }
  
  if(state.currentAliens > 0){
    riposte();
  }
  
  checkGroundStatusAfterCombat();
}

function startIntim(){
  if(state.menGround<=0||state.missionUsed) return;
  const r0=currentRace()?RACES[currentRace()]:null;
  if(!r0 || r0.cat!=='SAPIENS' || (r0.type!=='SUB_CIVILES' && r0.type!=='CIVILES')) return alert('Intimidation réservée aux Sapiens Sub Civiles ou Civiles.');
  state.mission='intim'; state.missionUsed=true;
  const diff=(state.menGround) - alienFC();
  const r=d6(), res=TAB_F[r][colIndexF(diff)];
  recordOp('F','Intimidation',{dé:r,diff:diff},res,'');
  if(res==='Y'){ const g=d6(); recordOp('G','Points de vénération',{dé:g},TAB_G[g]+' pt(s)','');
    state.missionResult={key:'intim',points:TAB_G[g]}; logCombat(`<b>Tableau F · dé ${r}</b> : oui. <b>Tableau G</b> (S.C.) : ${TAB_G[g]} point(s) de vénération.`); }
  else if(res==='N'){ logCombat(`<b>Tableau F · dé ${r}</b> : non. Les Extrasolaires deviennent agressifs et contre-attaquent.`); riposte(); state.missionResult={key:'intim',points:0}; }
  else { logCombat(`<b>Tableau F · dé ${r}</b> : aucun effet. Nouvel essai au tour suivant.`); state.missionUsed=false; }
  document.getElementById('btn-intim').style.display='none';
  checkGroundStatusAfterCombat();
}

function startComm(){
  if(state.menGround<=0||state.missionUsed) return;
  const r0=currentRace()?RACES[currentRace()]:null;
  const marchand = state.currentPlanet.chain && state.currentPlanet.chain.nature==='MARCHAND';
  if(!r0 || !marchand || r0.cat!=='SAPIENS' || (r0.type!=='SUB_CIVILES' && r0.type!=='CIVILES')) return alert('Commerce réservé aux Sapiens Sub Civiles ou Civiles marchands.');
  state.mission='comm'; state.missionUsed=true;
  const r=d6(), v=TAB_H[r];
  recordOp('H','Commerce',{dé:r},v,'');
  state.missionResult={key:'comm',points:v};
  logCombat(`<b>Tableau H · dé ${r}</b> : ${v>0?'+':''}${v} point(s)${v<0?' (pertes assimilées à des dégâts)':''}.`);
  if(v<0) hitShip(-v);
  document.getElementById('btn-comm').style.display='none';
  checkGroundStatusAfterCombat();
}

function riposte(){
  if(state.menGround <= 0) return;
  
  const diff = alienFC() - state.menGround;
  const r = d6();
  let pertes = TAB_B[r][colIndex(diff)];
  
  if(currentRace() === 'IPNOTICI'){
    const ipnoticiMap = {1:2, 2:2, 3:4, 4:4, 5:6, 6:6};
    pertes = ipnoticiMap[pertes] !== undefined ? ipnoticiMap[pertes] : pertes;
  }

  recordOp('B', 'Riposte des Extrasolaires', {dé:r, diff:diff, colonne:colIndex(diff)}, pertes+' perte(s)', '-'+pertes+' homme(s)');
  logCombat(`<b>Riposte (tableau B) · dé ${r} · diff ${diff>=0?'+':''}${diff}</b><br>Pertes : ${pertes} homme(s).`);
  
  if(pertes > 0){
    state.menGround = Math.max(0, state.menGround - pertes);
    state.menLost += pertes;
    state.crewGround = Math.floor(state.menGround / 3);
    log('SPACE COMPUTER', `L'Extrasolaire riposte : ${pertes} homme(s) perdu(s). Reste à terre : ${state.menGround} homme(s) (${state.crewGround} E. complets).`);
  }
}

function reembark(){
  if(state.shieldsOn) return alert('Boucliers activés : réembarquement impossible.');
  if(state.menGround <= 0) return alert('Plus aucun homme à terre à réembarquer.');
  
  log('OFFICIER COMMANDANT','J\'ordonne le réembarquement.');
  if(state.currentAliens > 0) riposte();
  
  const c = cls();
  const complete = Math.floor(state.menGround / 3);
  const valid = state.landedTurns >= 1 && complete >= 1;
  
  if(valid && state.missionResult){
    const net = state.missionResult.points - c.level;
    recordOp('Points', 'Mission '+state.missionResult.key, {mission:state.missionResult.points, niveau:c.level}, (net>=0?'+':'')+net, '');
    state.points += net;
    document.getElementById('display-points').innerText = state.points;
    log('SPACE COMPUTER', `Mission validée : ${state.missionResult.points} point(s) − niveau ${c.level} = ${net>=0?'+':''}${net}.`);
  } else {
    log('SPACE COMPUTER', `Aucun point : ${state.landedTurns<1?'pas de tour à terre':'aucun équipage complet réembarqué'}${!state.missionResult?' ou mission non résolue':''}.`);
  }
  
  if(state.menLost > 0 && c.level >= 2){
    state.points -= state.menLost;
    document.getElementById('display-points').innerText = state.points;
    log('SPACE COMPUTER', `Pertes subies : −${state.menLost} point(s) (niveau ${c.level}).`);
  }
  
  state.ship.crew += complete;
  state.menGround = 0;
  state.crewGround = 0;
  state.missionResult = null;
  
  document.getElementById('landing-crew').innerText = `${state.ship.crew} à bord · 0 à terre`;
  document.getElementById('btn-reembark').style.display = 'none';
  document.getElementById('btn-orbit').style.display = 'block';
  log('SPACE COMPUTER', 'Équipages réembarqués. Prêt pour le décollage.');
}

function endMission(){
  if(state.currentPlanet) state.currentPlanet.done = true;
  document.getElementById('landing-content').style.display = 'none';
  document.getElementById('no-landing').style.display = 'block';
  state.currentPlanet = null;
  state.menGround = 0;
  state.crewGround = 0;
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
          Catégorie : ${r.cat} · Type : ${r.type.replace(/_/g, ' ')} ${met ? ' <strong style="color:var(--success);">(Rencontré)</strong>' : ''}
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
  if (raceKey === 'SIPCO') fcDisplay = 'Égal à la défense de la Légion, Att. = Défense + 2';
  if (raceKey === 'ATTLERS') fcDisplay = 'Égal à la défense, Att. = Défense + dé (6)';
  if (raceKey === 'CRONOS') fcDisplay = 'Égal à l\'attaque/défense rencontrée × dé (6)';

  let html = `
    <div style="background:#fff;border:1px solid var(--border);border-radius:8px;padding:15px;margin-top:10px;">
      <h3 style="color:var(--dark-teal);margin-bottom:5px;">${raceKey.replace(/_/g, ' ')}</h3>
      <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">Planche : ${r.ref || 'Non spécifiée'} · Niveau Tech : ${r.niveauTech !== null ? r.niveauTech : 'Aucun'}</div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;font-size:0.85rem;">
        <div><strong>Catégorie :</strong> ${r.cat}</div>
        <div><strong>Type :</strong> ${r.type.replace(/_/g, ' ')}</div>
        <div><strong>F.C. de base :</strong> ${fcDisplay}</div>
        <div><strong>Valeur Élimination :</strong> ${r.valeurElim !== null ? r.valeurElim + ' pts' : '—'}</div>
        <div><strong>Valeur Capture :</strong> ${r.valeurCapture !== null ? r.valeurCapture + ' pts' : '—'}</div>
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
        <strong>Présence au combat selon le lancer de dé (1D6) :</strong>
        <ul style="margin-top:4px;padding-left:20px;">
          ${r.presences.map(p => `<li>Dé ${p.des.join(', ')} : <strong>${p.nombre}</strong> présent(s)</li>`).join('')}
        </ul>
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
  state.turn=1; state.points=0; state.isInFlight=false; state.isScenario=false; state.scenarioStep=0;
  state.shipClass='FROMBOLA'; state.maxContainers=SHIPS.FROMBOLA.cont;
  state.ship={crew:1,shields:1,lasers:1,radars:2,computers:1,tanks:3,modules:0,mod_zip3:0,mod_ho12:0,mod_sil4:0};
  state.shieldsOn=true; state.shieldsLocked=false; state.hullHitsThisTurn=0; state.savant=0;
  state.debugLogs=[];
  document.getElementById('scenario-banner').style.display='none';
  document.getElementById('display-points').innerText='0';
  document.getElementById('display-turn').innerText='Tour 1';
  document.getElementById('display-shields').innerText='Boucliers : Activés';
  document.getElementById('display-shields').className='status-item active';
  document.getElementById('check-shields').checked=true;
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
  state.shipClass='GLADIUM'; state.maxContainers=SHIPS.GLADIUM.cont;
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

function startSci(){
  if(state.menGround<=0||state.missionUsed) return;
  if(state.level!=='AVANCE') return;
  if(!state.savant) return alert('Aucun officier savant embarqué.');
  const rid=currentRace(), r=rid?RACES[rid]:null;
  if(!r || r.cat!=='SAPIENS' || (r.type!=='SUB_CIVILES' && r.type!=='CIVILES')) return alert('Recherche scientifique : formes de vie Sub Civiles ou Civiles uniquement.');
  if(typeof r.niveauTech!=='number') return alert('Niveau technologique non renseigné dans le Guide pour cette race : recherche impossible.');
  state.mission='sci'; state.missionUsed=true;
  const d=d6(), pts=Math.max(0, d+state.savant-r.niveauTech);
  recordOp('S','Recherche scientifique',{dé:d,savant:state.savant,technologie:r.niveauTech},pts,'');
  state.missionResult={key:'sci',points:pts};
  logCombat(`<b>Tableau S · dé ${d}</b> : ${d} + savant ${state.savant} − technologie ${r.niveauTech} = <b>${pts} point(s)</b> (plancher 0).`);
  document.getElementById('btn-sci').style.display='none';
  checkGroundStatusAfterCombat();
}

// ==========================================
// INITIALISATION DE L'APPLICATION
// ==========================================
const verEl = document.getElementById('app-version');
if(verEl) {
  verEl.innerText = APP_VERSION;
}

document.getElementById('dev-tools').style.display = DEBUG ? 'block' : 'none';
document.getElementById('level-select').value=state.level;
startGame();
switchTab('vaisseau');
