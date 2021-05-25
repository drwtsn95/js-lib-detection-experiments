


jQuery(document).ready(function($) {

function positioningFunction( position, feedback ) {
$( this ).css( position );
$( "<div>" )
    .addClass( "arrow" )
    .addClass( feedback.vertical )
    .addClass( feedback.horizontal )
    .appendTo( this );
    }
    
   $(".price_Tooltip").parents('.filter').children('.item').each(function(){
             
                var label = $(this).children('label');                
                var input = $(this).children('input');
                if(label.length > 0)
                {                    
                    var label_contents = label.html();
                    var last_paren_index=label_contents.lastIndexOf("(");
                    var count = label_contents.substring(label_contents.lastIndexOf("(")).replace("(","").replace(")","");

                    tooltipName = "";
                    switch(input.val())
                    {
                    case "Price not available": 
                    tooltipName = "price_na";
                    label.html(
                            label_contents.substring(0,last_paren_index-1) + 
                            '<a href=\"#\" class=\"' + tooltipName + '_Tooltip\" title=\"\"><img src=\"'+ GetRootPath($) +'image/info.png'+'\" alt=\"Field details\"></a>' + 
                            label_contents.substring(last_paren_index)
                    ); 
                    break; 
                    }

                }
 });
    
 $('.price_Tooltip').tooltip({ content:"The online price represent a sample of prices from different parts of the country. Discounts particular to your zip code may appear once a product is selected. All price and location information is updated at least once per day.", position: {
                my: "center bottom-20",
                at: "center top",
                using: positioningFunction}
                ,hide: {duration: 250}
                });
                
$('.price_na_Tooltip').tooltip({ content:"Price information is currently limited to products available at a select number of retailers.", position: {
                my: "center bottom-20",
                at: "center top",
                using: positioningFunction}
                ,hide: {duration: 250}
                });
                
                
                $('.model_number_wildcards_Tooltip').tooltip({ content:"A distinguishing, alphanumeric identifier, assigned to a product by the manufacturer or private labeler. The model number may include a wildcard that can be replaced by any letter or digit and still accurately capture what is covered by the model's ENERGY STAR certification; an asterisk symbol (*) represents a letter, and a number symbol (#) represents a digit.", position: {
                my: "center bottom-20",
                at: "center top",
                using: positioningFunction}
                ,hide: {duration: 250}
                });
                
                
                
                
                
                 
                
    


        
            
            


                



                 
                    $('.estimated_energy_test_cycle_time_min_Tooltip').tooltip({ content:("The estimated energy test cycle time is the time taken to complete the test cycle necessary for ENERGY STAR certification. Products must complete the energy test cycle in less than 80 minutes in order to be certified as ENERGY STAR. The estimated test cycle time does not reflect actual consumer cycle times which vary as a result of load size, dampness, and composition.\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.depth_inches_Tooltip').tooltip({ content:("The depth of the clothes dryer.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.additional_model_information_Tooltip').tooltip({ content:("This column includes for the qualified model or family, family members, additional model names, model numbers and other identifying information associated with a product or family\/series of products for sales and marketing purposes. Other identifying information includes, but is not limited to, SKUs, UPC codes, retail numbers, and\/or descriptions of models included\/not included in the reported Model Family.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.height_inches_Tooltip').tooltip({ content:("The height of the clothes dryer.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.paired_energy_star_clothes_washer_available_Tooltip').tooltip({ content:("Indicates if the clothes dryer is being marketed as a matched pair with an ENERGY STAR Clothes Washer.\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.brand_name_Tooltip').tooltip({ content:("An identifier assigned by the manufacturer or private labeler to a product or family\/series of products for sales and marketing purposes.\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.date_available_on_market_Tooltip').tooltip({ content:("The date that the model is available for purchase.\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.date_qualified_Tooltip').tooltip({ content:("The date on which the product was confirmed to meet the ENERGY STAR specification.\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.type_Tooltip').tooltip({ content:("This field is used to indicate the fuel type used to heat the air necessary to dry the clothes, either electric or gas.\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.heat_pump_technology_Tooltip').tooltip({ content:("Highly energy efficient heat pump technology typically heats, dehumidifies and circulates air in the dryer drum, so no vent is required. A Heat Pump model solely uses heat pump technology to dry clothes, while a Hybrid Heat Pump model uses a combination of heat pump technology and traditional electric resistance heating technology.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.paired_energy_star_clothes_washer_energy_star_model_identifier_Tooltip').tooltip({ content:("Paired clothes washer ENERGY STAR Model Identifier .\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.connected_Tooltip').tooltip({ content:("Indicates whether the model offers advanced controls and increased functionality such as sending notifications when the dryer is done or allowing for a service center to remotely diagnose problems. Clothes dryers with connected functionality are smart grid ready; if linked with your energy provider or an energy management system these products can dynamically adjust their energy use, potentially lowering your electric bill.\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.energy_star_model_identifier_Tooltip').tooltip({ content:("A unique string of characters assigned by certification bodies (CBs) to identify a model or set of models with the same performance characteristics. This identifier should remain the same for a model even if it is recertified to a new version of an ENERGY STAR specification. This string of characters is determined by CBs and is not the ENERGY STAR Unique ID assigned by EPA.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.markets_Tooltip').tooltip({ content:("Includes products sold in the U.S. and\/or Canada and other ENERGY STAR partner countries.\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.model_name_Tooltip').tooltip({ content:("An identifier assigned by the manufacturer or private labeler to a product or family\/series of products for sales and marketing purposes.\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.additional_dryer_features_Tooltip').tooltip({ content:("Features applicable to the clothes dryer may include drum light, wrinkle prevention option, steam cycle, sanitization cycle, filter cleaning indicator, energy monitor\/indicator, time remaining display, and supplementary drying system.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.width_inches_Tooltip').tooltip({ content:("The width of the clothes dryer.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.combined_energy_factor_cef_Tooltip').tooltip({ content:("CEF is the energy performance metric for ENERGY STAR clothes dryers; the higher the CEF the more efficient the clothes dryer. The metric has units lbs\/kWh and is calculated by dividing the weight of the test load by the sum of the per cycle standby and off mode energy consumption and either the total per-cycle electricity dryer energy consumption or the total per-cycle gas dryer energy consumption expressed in kilowatt hours (kWh).\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.vented_or_ventless_Tooltip').tooltip({ content:("Venting Configuration refers to how the clothes dryer exhausts heated air. Vented clothes dryers exhaust the evaporated moisture from the clothes dryer cabinet using a vent which typically leads to a building\u2019s exterior. Ventless clothes dryers use a closed loop system with an internal condenser to remove the evaporated moisture from the heated air. Moisture is discharged from the cabinet and instead collected in a reservoir or drained through a tube.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.model_number_Tooltip').tooltip({ content:("A distinguishing, alphanumeric identifier, assigned to a product by the manufacturer or private labeler. The model number may include a wildcard that can be replaced by any letter or digit and still accurately capture what is covered by the model\u2019s ENERGY STAR certification; an asterisk symbol (*) represents a letter, and a number symbol (#) a digit.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                
                    $('.energystarcertified_Tooltip').remove();
                



                
            
        
    


        
            
            


                



                 
                    $('.drum_capacity_cu_ft_Tooltip').tooltip({ content:("This is the drum capacity of the clothes dryers in cubic feet as measured by the U.S. Department of Energy test procedure, Code of Federal Regulations, Title 10, Section 430, Subpart B, Appendix D2. Products with a drum capacity less than 4.4 cubic feet are considered compact.\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.estimated_annual_energy_use_kwh_yr_Tooltip').tooltip({ content:("The estimated annual energy use is based on the Combined Energy Factor and an annual usage of 283 cycles per year, as referenced by the U.S. Department of Energy test procedure, Code of Federal Regulations, Title 10, Section 430, Subpart B, Appendix D2. Actual energy consumption will vary on your usage patterns, including how often your run the dryer, what cycle you select, and load size. NOTE: For gas dryers the estimated annual energy use is expressed in kilowatt hours to allow for comparison, and represents the equivalent multi-source energy use of the product (e.g., natural gas or propane typically expressed in British thermal units (Btu)).\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.pd_id_Tooltip').tooltip({ content:("The ENERGY STAR Unique ID (ESUID) is a string of seven numbers EPA assigns to an ENERGY STAR model or set of models with unique performance characteristics. This ESUID is unique to both the model and product specification version and is assigned by EPA upon receipt of certification information from the certification body. Each row within the product list will have a unique ESUID. Developers may wish to use this ESUID to track information on certified models in their information systems.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    

    
    });