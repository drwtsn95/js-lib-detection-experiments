'use strict';
angular.module('app.routes')
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider.
                    state('doctor_detail', {
                        url: '/doctor/:speciality_name/:doctor_name/:doctor_id',
                        templateUrl: 'sections/patient/doctor/doctor.detail.html',
                        controller: 'DoctorController',
                        controllerAs: 'doctorCtrl',
                        resolve: {
                            "type": function ($stateParams, patientDataService) {
                                return "detail";
                            },
                            "shows": function ($stateParams, patientDataService) {
                                console.log("doctor_id", $stateParams.doctor_id)
                                return patientDataService.viewDrProfile($stateParams.doctor_id);
                            }
                        }
                    }).
                    state('doctor_list', {
                        url: '/speciality/:speciality_name/:speciality_id',
                        templateUrl: 'sections/patient/doctor/doctor.list.html',
                        controller: 'DoctorController',
                        controllerAs: 'doctorCtrl',
                        resolve: {
                            "type": function ($stateParams, patientDataService) {
                                return "speciality";
                            },
                            "shows": function ($stateParams, patientDataService) {
                                return patientDataService.drListSpeciality($stateParams.speciality_id);
                            }
                        }
                    })
                    .state('campaign', {
                        url: '/campaign/:campaign_id',
                        templateUrl: 'sections/patient/doctor/doctor.list.html',
                        controller: 'DoctorController',
                        controllerAs: 'doctorCtrl',
                        resolve: {
                            "type": function ($stateParams, patientDataService) {
                                return "campaign";
                            },
                            "shows": function ($stateParams, patientDataService) {
                                return patientDataService.drListCampaign($stateParams.campaign_id);
                            }
                        }
                    })
                    .state('hospital', {
                        url: '/hospital/:hospital_id',
                        templateUrl: 'sections/patient/doctor/doctor.list.html',
                        controller: 'DoctorController',
                        controllerAs: 'doctorCtrl',
                        resolve: {
                            "type": function ($stateParams, patientDataService) {
                                return "hospital";
                            },
                            "shows": function ($stateParams, patientDataService) {
                                return patientDataService.drListHospital($stateParams.hospital_id);
                            }
                        }
                    })
                    .state('ihealthPage', {
                        url: '/ihealth',
                        templateUrl: 'components/ihealth/ihealth.info.html',
                        controller: 'ihealthController',
                        controllerAs: 'ihealthCtrl',
                    })
                    .state('videoPage', {
                        url: '/video',
                        templateUrl: 'components/video_consultation/video.info.html',
                        controller: 'videoConsultationController',
                        controllerAs: 'videoCtrl',
                    })
                    .state('telePage', {
                        url: '/tele',
                        templateUrl: 'components/video_consultation/tele.info.html',
                        controller: 'videoConsultationController',
                        controllerAs: 'videoCtrl',
                    });
        });
angular
        .module('app.core')
        .controller('DoctorController', function ($rootScope, type, $location, $localStorage, patientDataService, PageValues, shows, $state, $stateParams, metaDataService,$window,$uibModal,$scope) {
            //Set page title and description
//        PageValues.title = "SEARCH";
//        PageValues.description = "Search for your favorite TV shows.";
            //Setup view model object
            var vm = this;       
            

      
            vm.type = type;
            vm.shows = shows[0];
            vm.about_read_all = false;
        
           $window.localStorage.removeItem('dr_available');
            
            if(type == 'speciality')
                var meta_ob = { 'title':
                                ((vm.shows.speciality_meta_title && vm.shows.speciality_meta_title!=''? vm.shows.speciality_meta_title : vm.shows.speciality_name)) , 
                                'description': 
                                ((vm.shows.speciality_meta_desc && vm.shows.speciality_meta_desc!=''? vm.shows.speciality_meta_desc : vm.shows.speciality_name))
                              };
            else if(type == 'campaign')
                var meta_ob = {'title':vm.shows.campaign_name,  'description': vm.shows.campaign_name };
            else if(type == 'hospital')
                var meta_ob = {'title':"Hospital", 'description': "Hospital" };
            else if(type == 'detail')
                var meta_ob = {'title':
                                 ((vm.shows.doctor_meta_title && vm.shows.doctor_meta_title!=''? vm.shows.doctor_meta_title : vm.shows.dr_name)), 
                                'description':  
                                    ((vm.shows.doctor_meta_desc && vm.shows.doctor_meta_desc!=''? vm.shows.doctor_meta_desc : vm.shows.dr_name))
                               };
            
            if(meta_ob)
                 metaDataService.setMetaDataOb(meta_ob);
            
            //console.log(type,shows)
//        vm.ratings = [{
//            current: shows[0].dr_review_count,
//            max: 5
//        }];
            vm.page = 1;
            vm.consultNow = function (doctor_id, consult_type) {
                $localStorage.consult_now_status = false;
                $localStorage.consult_doctor_id = doctor_id;
                $localStorage.consult_type = consult_type;
                var dr_avail = vm.shows.dr_available || 1; 
                $localStorage.dr_available = dr_avail;
                if ($localStorage.patient_id) {
                    $location.path("/patient/question/" + $localStorage.patient_id + "/" + $localStorage.consult_doctor_id+"/"+dr_avail)
                } else {
                    $localStorage.consult_now_status = true;
                    
                    $rootScope.$emit('userLogin', {});
                }
            }
            $rootScope.$on("callDoctorCtrlConsultNow", function(){
               vm.consultNow(vm.doctorId, 'video');
            });
            vm.loadMore = function (type) {
                console.log('--------------' + type);
                if (type == 'speciality') {
                    patientDataService.drListSpeciality($stateParams.speciality_id, ++vm.page).then(function (response) {
                        vm.shows.doctor.push.apply(vm.shows.doctor, response[0].doctor);
                        vm.shows.canLoad = response[0].canLoad;
                    });
                } else if (type == 'hospital') {
                    patientDataService.drListHospital($stateParams.hospital_id, ++vm.page).then(function (response) {
                        vm.shows.doctor.push.apply(vm.shows.doctor, response[0].doctor);
                        vm.shows.canLoad = response[0].canLoad;
                    });
                } else if (type == 'campaign') {
                    patientDataService.drListCampaign($stateParams.campaign_id, ++vm.page).then(function (response) {
                        vm.shows.doctor.push.apply(vm.shows.doctor, response[0].doctor);
                        vm.shows.canLoad = response[0].canLoad;
                    });
                }
            }
            vm.showAllAbout = function()
            {
   
               vm.about_read_all =true; 
            }
            vm.videoConsultationConfirmation = function(doctor_id) {
                vm.doctorId = doctor_id;
                modalInstance = $uibModal.open({
                    templateUrl: 'components/video_consultation/videoConsultation.popup.html',
                    controller: 'videoConsultationController',
                    openedClass:"videoConsultationCl",
                });
            };
        });
