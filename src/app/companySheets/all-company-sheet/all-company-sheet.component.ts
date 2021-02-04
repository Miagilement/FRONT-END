import {Component, OnInit, NgModule} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {BaseResVO} from '../../interfaces/VO/res/BaseResVO';
import {Enterprise} from 'src/app/interfaces/Enterprise';
import {EnterpriseService} from 'src/app/services/enterprise.service';
import {Region} from '../../interfaces/Region';
import {BrowserModule} from '@angular/platform-browser';


@Component({
  selector: 'app-all-company-sheet',
  templateUrl: './all-company-sheet.component.html',
  styleUrls: ['./all-company-sheet.component.css']
})

export class AllCompanySheetComponent implements OnInit {

  enterprises: Enterprise[] = [];
  listRegion: Region = new Region();
  enterpriseForm = this.fb.group({
    region: [''],
    sector: [''],
  });

  constructor(
    private fb: FormBuilder,
    private enterpriseService: EnterpriseService
  ) {
  }

  ngOnInit(): void {
    this.getApiEnterprise();
  }

  getApiEnterprise(): void {
    this.enterpriseService.getEnterprise()
      .subscribe((baseResVO: BaseResVO) => {
        console.log(baseResVO.data);
        this.enterprises = (baseResVO.data as Enterprise[]);
      });
  }

  getApiEntreprisesByAttributes(): void {
    this.enterprises = [];
    let sector: string = this.enterpriseForm.controls['sector'].value;
    let region: string = this.enterpriseForm.controls['region'].value;
    if (sector === '') {
      sector = 'any';
    }
    if (region === '') {
      region = 'any';
    }
    this.enterpriseService.getEntrepriseByAttributes(region, sector)
      .subscribe((baseResVO: BaseResVO) => {
        console.log(baseResVO.data);
        this.enterprises = (baseResVO.data as Enterprise[]);
      });
  }

}
