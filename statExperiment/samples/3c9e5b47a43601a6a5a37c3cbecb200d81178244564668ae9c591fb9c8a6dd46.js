


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
                
                
                
                
                
                 
                
    


        
            
            


                



                 
                    $('.idle_state_power_consumption_watts_Tooltip').tooltip({ content:("A state within On Mode in which a product is not performing a Primary Function and no content is actively being delivered to the end-user.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.additional_model_information_Tooltip').tooltip({ content:("This column includes for the qualified model or family, family members, additional model names, model numbers and other identifying information associated with a  product or family\/series of products for sales and marketing purposes. Other identifying information includes, but is not limited to, SKUs, UPC codes, retail numbers, and\/or descriptions of models included\/not included in the reported Model Family.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.amplifier_channels_Tooltip').tooltip({ content:("The number of channels supported by the amplifier, with the number of full-bandwidth channels appearing before the decimal point, followed by the number of limited-bandwidth or subwoofer channels. For example, \"5.1\" would indicate five full-bandwidth channels and one subwoofer channel.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.connected_technology_Tooltip').tooltip({ content:("The available networking\/control or Wi-Fi and Gigabit Ethernet protocols.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.brand_name_Tooltip').tooltip({ content:("An identifier assigned by the manufacturer or private labeler to a product or family\/series of products for sales and marketing purposes.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.tuner_included_Tooltip').tooltip({ content:("Indicates whether the model includes an over the air tuner.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.date_available_on_market_Tooltip').tooltip({ content:("The date that the model is available for purchase.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.default_auto_power_down_apd_timing_minutes_Tooltip').tooltip({ content:("The predetermined time in minutes after which the device automatically switches from On Mode to Sleep Mode.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.sleep_mode_power_consumption_watts_Tooltip').tooltip({ content:("The condition where the product is connected to a power source, produces neither sound nor picture, neither transmits nor receives program information and\/or data (excluding data transmitted to change the unit\'s condition from Sleep Mode to On Mode), and is waiting to be switched to On Mode by a direct or indirect signal from the consumer (e.g., with the remote control).").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.is_amplifier_consumer_or_commercial_Tooltip').tooltip({ content:("Classification of amplifier based on its signal inputs, type of power cord, and presence of a remote control. Does not apply to products without an amplifier (e.g., optical disc players).").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.markets_Tooltip').tooltip({ content:("Includes products sold in the U.S. and\/or Canada and other ENERGY STAR partner countries.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.product_type_Tooltip').tooltip({ content:("Eligible product types include: Blu-ray disc player, DVD player, CD player, audio amplifiers (limited bandwidth and full spectrum), home theater AV receiver, home theater in a box, compact\/shelf audio system, iPod\/MP3 player dock, clock radio, subwoofer, and powered speaker system.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.video_player_type_Tooltip').tooltip({ content:("The most consumptive optical disk player\/recorder present in the device.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.model_name_Tooltip').tooltip({ content:("An identifier assigned by the manufacturer or private labeler to a product or family\/series of products for sales and marketing purposes.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.video_playback_power_consumption_watts_Tooltip').tooltip({ content:("The average On Mode power during video playback. For High Definition (HD) devices, this is the average of the power when playing HD and Standard Definition (SD) content.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.on_mode_amplifier_efficiency_Tooltip').tooltip({ content:("The efficiency of the amplifier at 1\/8 Maximum Undistorted Power. Excludes the audio playback power of any embedded disc players used during the test.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.model_number_Tooltip').tooltip({ content:("A distinguishing, alphanumeric identifier, assigned to a product by the manufacturer or private labeler. The model number may include a wildcard that can be replaced by any letter or digit and still accurately capture what is covered by the model\u2019s ENERGY STAR certification; an asterisk symbol (*) represents a letter, and a number symbol (#) a digit.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.audio_playback_power_consumption_watts_Tooltip').tooltip({ content:("The average On Mode power during audio playback.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                



                 
                    $('.amplifier_input_power_at_1_8_maximum_undistorted_power_watts_Tooltip').tooltip({ content:("The input power at which the efficiency of an amplifier is tested, equal to 1\/8 of the power at which the total harmonic distortion of all the channels is 1% or greater.").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    


        
            
            


                
                    $('.energystarcertified_Tooltip').remove();
                



                
            
        
    


        
            
            


                



                 
                    $('.pd_id_Tooltip').tooltip({ content:("The ENERGY STAR Unique ID (ESUID) is a string of\nseven numbers EPA assigns to an ENERGY STAR model or set of models with unique\nperformance characteristics. This ESUID is unique to both the model and product\nspecification version and is assigned by EPA upon receipt of certification\ninformation from the certification body. Each row within the product list will\nhave a unique ESUID. Developers may wish to use this ESUID to track information\non certified models in their information systems.\n").replace(/\n/g, '<br />'), position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: positioningFunction}
                     
                    
                    
                    
                    
                    
                        });
                
            
        
    

    
    });