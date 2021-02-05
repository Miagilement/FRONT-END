export class Region {
  public listRegion: string[];

  //Liste des regions - utilisée dans le formulaire d'inscription entreprise
  //+ pour le filtrage des entreprises en fonction de la région
  constructor() {
    this.listRegion = [
      'Auvergne-Rhône-Alpes',
      'Bourgogne-Franche-Comté',
      'Bretagne',
      'Centre-Val de Loire',
      'Corse',
      'Grand Est',
      'Hauts-de-France',
      'Île-de-France',
      'Nouvelle-Aquitaine',
      'Occitanie',
      'Pays de la Loire',
      'Provence-Alpes-Côte d\'Azur'
    ];
  }

}


