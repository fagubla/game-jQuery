;(function($, window, undefined){
    $.fn.sound = function() {
        var number = 3;
        var ptj = 100;
        var container = this;
        
        
        var title = $("<h2 />", {
            id : "title",
            text : "¿A qué pertenece?"
        });
        
        var score = $("<h4 />", {
            id : "score",
            text : "SCORE",
            value: 0
        });
        
        var div = $("<div />", {
            id : "wrapper"
        });
        
        this.append(title);
        this.append(score);
        
        this.append("<p id='asd'></p>");
        
        reload(number);
        
        function reload(number){
            container.append(div);
            $('#wrapper').empty();
            if(number > 0){
                $.getJSON("archivo.json", function(datos) {
                    var v = datos[0].Value;
                    $.each(datos, function(id, data){
                        var d = null;
                        if(data.Type != "sound"){
                            d = agregar(data.Value, data.Url, v, score);
                            div.append(d);
                        } else {
                            d = agregarS(data.Value, data.Url);
                            div.append(d);
                        }
                
                    });
                });
       //console.log(this[0]);
            function agregar (name, url, v,s) {
                var img = $("<img />", {
                    id: "sol", 
                    alt: name, 
                    src: "img/"+url+".jpg",
                    css: 
                        {
                        "width": "230px",
                        "padding-right": "50px"
                    },
                    click: function (e) { 
                        if(v == name){
                            var ss = parseInt($(s).attr("value")) + ptj;
                            $(s).attr("value",ss);
                            console.log($(s).attr("value"));
                            number = number -1;
                            $('#asd').text(ss);
                            alert("Correcto",reload(number));

                        } else {
                           number = number -1;
                            alert("Incorrecto",reload(number));

                        }
                    }
                });
            return img;
            }
        
                function agregarS (val, url) {
                    var btn = $("<button />", {
                        text: "Reproducir",
                        value : val,
                    css: 
                        {
                        "width": "200px",
                        "padding-right": "50px"
                    },
                    click: function (e) { 
                        var audio = new Audio('sound/'+url+'.ogg');
                        audio.play();
                        console.log(this);
                    }
                });
                return btn;
                }
                
            }
        }
        
    }
    
})(jQuery, window);