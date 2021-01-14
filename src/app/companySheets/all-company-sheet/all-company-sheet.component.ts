import { Component, OnInit } from '@angular/core';
import {Entreprise} from "../../interfaces/entreprise";
import { EntrepriseService } from 'src/app/services/entreprise.service';
import {FormBuilder} from "@angular/forms";
import {BaseResVO} from "../../interfaces/VO/res/BaseResVO";

@Component({
  selector: 'app-all-company-sheet',
  templateUrl: './all-company-sheet.component.html',
  styleUrls: ['./all-company-sheet.component.css']
})
export class AllCompanySheetComponent implements OnInit {

  entreprises : Entreprise[]=[];

  constructor(
    private fb : FormBuilder,
    private entrepriseService : EntrepriseService
  ) { }

  ngOnInit(): void {
    this.getApiEntreprise();
  }

  getApiEntreprise():void{
    this.entrepriseService.getEntreprise()
      .subscribe((baseResVO : BaseResVO)=>{
        console.log(baseResVO.data);
        this.entreprises = <Entreprise[]>baseResVO.data;
      });
  }

}
