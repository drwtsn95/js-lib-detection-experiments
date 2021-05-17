$(document).ready(function(){
    var perfil;
    $('#uno').click(function(){
        perfil='esforzado';
       console.log(perfil);
    })
    
    $('#dos').click(function(){
        perfil = 'familión';
        console.log(perfil);
    })

    $('#tres').click(function(){
        perfil = 'emprendedor';
        console.log(perfil);
    })
    
    $('#cuatro').click(function(){
        perfil = 'nuevo adulto';
        console.log(perfil);
    })
    
    
    $('#sgBtn').click(function(){
        if(perfil){
            $('#sgBtn').attr('href','cuarto.php');
            $.ajax({
                url:'segundo.php',
                type:'POST',
                data:perfil,
                datatype:'html',
                success:function(){
                    console.log('Todo bien')
                }, error:function(){
                    console.log('Algo salió mal');
                }
            
            })
        }else{
            alert('Seleccione alguna imagen');
        }
    })
})