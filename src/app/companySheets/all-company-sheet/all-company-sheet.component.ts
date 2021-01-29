import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BaseResVO} from '../../interfaces/VO/res/BaseResVO';
import {Enterprise} from 'src/app/interfaces/Enterprise';
import {EnterpriseService} from 'src/app/services/enterprise.service';
import {Region} from '../../interfaces/Region';

@Component({
  selector: 'app-all-company-sheet',
  templateUrl: './all-company-sheet.component.html',
  styleUrls: ['./all-company-sheet.component.css']
})
export class AllCompanySheetComponent implements OnInit {

  enterprises: Enterprise[] = [];
  listRegion: Region = new Region();

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

}
