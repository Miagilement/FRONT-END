import {Component, OnInit} from '@angular/core';
import {BaseResVO} from '../../interfaces/VO/res/BaseResVO';
import {ActivatedRoute} from '@angular/router';
import {Enterprise} from 'src/app/interfaces/enterprise';
import {EnterpriseService} from 'src/app/services/enterprise.service';

@Component({
  selector: 'app-company-sheet',
  templateUrl: './company-sheet.component.html',
  styleUrls: ['./company-sheet.component.css']
})
export class CompanySheetComponent implements OnInit {

  enterprise: Enterprise[] = [];
  private uid: string;

  constructor(
    private enterpriseService: EnterpriseService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getApiEnterpriseById();
  }

  getApiEnterpriseById(): void {
    this.uid = this.route.snapshot.queryParams['uid'];
    console.log(this.uid);
    this.enterpriseService.getEnterpriseById(this.uid)
      .subscribe((baseResVO: BaseResVO) => {
        console.log(baseResVO.data);
        this.enterprise = <Enterprise[]> baseResVO.data;
      });
  }
}


