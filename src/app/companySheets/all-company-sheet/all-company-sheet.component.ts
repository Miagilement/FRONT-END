import { Component, OnInit } from '@angular/core';
import {Enterprise} from "../../interfaces/Enterprise";
import { EnterpriseService } from 'src/app/services/enterprise.service';
import {FormBuilder} from "@angular/forms";
import {BaseResVO} from "../../interfaces/VO/res/BaseResVO";

@Component({
  selector: 'app-all-company-sheet',
  templateUrl: './all-company-sheet.component.html',
  styleUrls: ['./all-company-sheet.component.css']
})
export class AllCompanySheetComponent implements OnInit {

  entreprises : Enterprise[]=[];

  constructor(
    private fb : FormBuilder,
    private entrepriseService : EnterpriseService
  ) { }

  ngOnInit(): void {
    this.getApiEntreprise();
  }

  getApiEntreprise():void{
    this.entrepriseService.getEntreprise()
      .subscribe((baseResVO : BaseResVO)=>{
        console.log(baseResVO.data);
        this.entreprises = <Enterprise[]>baseResVO.data;
      });
  }

}
