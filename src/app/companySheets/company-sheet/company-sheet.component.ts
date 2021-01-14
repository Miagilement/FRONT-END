import { Component, OnInit } from '@angular/core';
import { BaseResVO } from "../../interfaces/VO/res/BaseResVO";
import { Entreprise } from "../../interfaces/entreprise";
import { EntrepriseService } from "../../services/entreprise.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-company-sheet',
  templateUrl: './company-sheet.component.html',
  styleUrls: ['./company-sheet.component.css']
})
export class CompanySheetComponent implements OnInit {

  private uid: string;
  entreprises: Entreprise[] = [];

  constructor(private entrepriseService: EntrepriseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getApiEntrepriseById();
  }

  getApiEntrepriseById(): void {
    this.uid = this.route.snapshot.queryParams['uid'];
    console.log(this.uid);
    this.entrepriseService.getEntrepriseById(this.uid)
      .subscribe((baseResVO: BaseResVO) => {
        console.log(baseResVO.data);
        this.entreprises = <Entreprise[]>baseResVO.data;
      });
  }
}


