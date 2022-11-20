import { Component, OnInit } from '@angular/core';
import { StateService } from './globalsate.service';

@Component({
  selector: 'app-home',
  template: `
<div class="header-advance-area">
    <div class="header-top-area">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="header-top-wraper">
                        <div class="row">
                            <div class="col-lg-1 col-md-0 col-sm-1 col-xs-12">
                                <div class="menu-switcher-pro">
                                    <button type="button" id="sidebarCollapse" class="btn bar-button-pro header-drl-controller-btn btn-info navbar-btn">
                                            <i class="icon nalika-menu-task"></i>
                                        </button>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-7 col-sm-6 col-xs-12">
                                <div class="header-top-menu tabl-d-n">
                                    <div class="breadcome-heading fs-1 fw-bolder text-warning text-shadow">
                                        Stay on track to hit your goals with clear timelines
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 fs-2 text-light m-auto ">
                              <p class="text-end">Welcome {{name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Mobile Menu start -->
    
    <!-- Mobile Menu end -->
    <div class="breadcome-area">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="breadcome-list">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                <div class="breadcomb-wp">
                                    <div class="breadcomb-icon">
                                        <i class="icon nalika-home"></i>
                                    </div>
                                    <div class="breadcomb-ctn">
                                        <h2>Dashboard</h2>
                                        <p>Welcome to Online Goal Tracker  <span class="bread-ntd">website</span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                <div class="breadcomb-report">
                                    <button data-toggle="tooltip" data-placement="left" title="Download Report" class="btn"><i class="icon nalika-download"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="section-admin container-fluid res-mg-t-15">
    <div class="row admin text-center">
        <div class="col-md-12">
           
        </div>
    </div>
</div>
<div class="product-sales-area mg-tb-30">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="product-sales-chart">
                    <div class="portlet-title">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="caption pro-sl-hd">
                                    <span class="caption-subject text-uppercase"><b></b></span>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="actions graph-rp">
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                       
                    </div>


                    <div class="wrapper">
<div class="first">
<h1>A Personal Planner for
the Go-getters</h1>
</div>
<div class="second"><h3>Week Plan helps you claim back time and focus on what's important for yourself, family and work.</h3></div>
  </div>
     
                </div>
            </div>
        </div>
    </div>
</div>

  `,
  styles: [`
  .wrapper{
    padding:150px;
    color:white;
    width:70%;
    margin:auto;
   
  }

  .first{
    max-width:500px !important;
    margin:auto
  }

  .first h1{
    font-weight: 900;
    font-size: 5.7rem;
    line-height: 1;
    letter-spacing: -1.7px;
    text-align:center
  }

  .second{
    margin:auto
  }

  h3{
    font-size: 2rem;
    line-height: 1;
    font-weight:none !important;
    text-align:center
  }
  `]
})
export class HomeComponent  {

    name!:string
    constructor(
      private globalstate: StateService 
    ) {
      globalstate.state.subscribe((state) => {
        this.name = state.fullname
      });
    }
}
