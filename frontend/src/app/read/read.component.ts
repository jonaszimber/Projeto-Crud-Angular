import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service'

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {


  constructor(private service:ApiService) {}

  readData:any;
  successmsg:any;
      
      
  ngOnInit(): void {
    this.getAllData();

  }


  //getdeleteid
  deleteID(id:any)
  {
    console.log(id,'deleted==>');
    this.service.deleteData(id).subscribe((res)=>{
      console.log(res,'deleteres==>');
      this.successmsg = res.message
      this.getAllData();

    });
  }

  //GetData
  getAllData()
  {
    this.service.getAllData().subscribe((res)=>{
      console.log(res,"res==>");
       this.readData = res.data;
    });
  }


}

