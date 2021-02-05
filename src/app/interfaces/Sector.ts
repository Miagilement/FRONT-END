export class Sector {
  public listSector: string[];

  //Liste des secteurs d'activités - utilisée dans le formulaire d'inscription entreprise
  //+ pour le filtrage des entreprises en fonction du secteur
  constructor() {
    this.listSector = [
      'ERPs',
      'conseils',
      'BI',
      'Réseaux informatiques'
    ];
  }
}


