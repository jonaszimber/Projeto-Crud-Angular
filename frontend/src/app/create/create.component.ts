import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiService, private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    //console.log(this.router.snapshot.paramMap.get('id'),'getid');
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid)
    {
      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.patchValue({
          fullname:res.data[0].fullname,
          email:res.data[0].email,
          mobile:res.data[0].mobile,
          databorn:res.data[0].databorn,
          adress:res.data[0].adress,
          city:res.data[0].city,
          state:res.data[0].state,
          cep:res.data[0].cep,
          marital:res.data[0].marital,
          car:res.data[0].car

  
        });
  
      });
    }
   

  }

  userForm = new FormGroup({
    'fullname':new FormControl('',Validators.required),
    'email':new FormControl('',Validators.required),
    'mobile':new FormControl('',Validators.required),
    'databorn':new FormControl('',Validators.required),
    'adress':new FormControl('',Validators.required),
    'city':new FormControl('',Validators.required),
    'cep':new FormControl('',Validators.required),
    'state':new FormControl('',Validators.required),
    'marital':new FormControl('',Validators.required),
    'car':new FormControl('',Validators.required)
  });
  //createnewuser
  userSubimit()
  {
    if(this.userForm.valid)
    {
      console.log(this.userForm.value);
      this.service.createData(this.userForm.value).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.reset();
        this.successmsg = res.message;
      });
    }
    else
    {
      this.errormsg = 'Todos Os Campos São Necessários!';
    }
  }
  //updatedata
  userUpdate(){
    console.log(this.userForm.value,'updateform')

    if(this.userForm.valid)
    {
      this.service.updateData(this.userForm.value,this.getparamid).subscribe((res)=>{
        console.log(res,'resupdated');
        this.successmsg = res.message;

      });
    }else
    {
        this.errormsg = 'Todos Os Campos São Necessários!';
    }
  }



}
