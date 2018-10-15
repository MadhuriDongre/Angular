
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ArticleService } from '../article.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;   

    constructor(private articleService: ArticleService) {}
    
    displayedColumns: string[] = ['id', 'title', 'category', 'writer'];
    dataSource:any;
    loadTable: boolean = true;
    file: File;
    arrayBuffer:any;
  
    onClick(){
        this.loadTable = false;
    }

    ngOnInit() {
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
    }  
    
    incomingfile(event) 
    {
    this.file= event.target.files[0]; 
    }

    Upload() {
        let fileReader = new FileReader();
        let output;
          fileReader.onload = (e) => {
              this.arrayBuffer = fileReader.result;
              var data = new Uint8Array(this.arrayBuffer);
              var arr = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");
              var workbook = XLSX.read(bstr, {type:"binary"});
              var first_sheet_name = workbook.SheetNames[0];
              var worksheet = workbook.Sheets[first_sheet_name];
              output = XLSX.utils.sheet_to_json(worksheet,{raw:true});
              this.dataSource = new MatTableDataSource(output);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.loadTable = false; 
              console.log(output);
          }
        fileReader.readAsArrayBuffer(this.file);
    }
}
