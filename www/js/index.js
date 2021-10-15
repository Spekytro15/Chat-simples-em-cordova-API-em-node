const url ="" ;

const user = "nome do primeiro usuario"
const user2 ="nome do segundo usuario"
$("#btn-cadastro").click(function(){
  var nome =  $("#nome-user").val(); 
  var  nomeuser2 = $("#nome-user2").val();
db.transaction(function(tx) {
        tx.executeSql("INSERT INTO usuario(nome,nomepar) VALUES (?,?)", [nome,nomeuser2], onSuccess, onError);
        user = nome;
        user2 = nomeuser2;
        $('#tela-1').hide();
        $('#tela-2').show();
        alert("foi")
       
    })
function onSuccess(transaction, resultSet) {
    console.log('Query completed: ' + JSON.stringify(resultSet));
}

function onError(transaction, error) {
    console.log('Query failed: ' + error.message);
}
})






//btn send


now = new Date
 var codigo = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

$("#btn-send").click(function() {
    var menssagem = $("#text-menssagem").val();
    

    $.ajax({
            type: 'POST',
            url: url+"/alert/menssagem/"+user,
            data: {
                nome: user,
                codigo: codigo,
                menssagem: menssagem
                

            },
            dataType: "json",
            success: function(json) {
                $("#sucess").html("<p>" + json.menssage + "</p>");


            },
            error: function() {
                $("#error").html("<p>Erro</p>");
                console.log("error")


            }


        })
        .done(function(menssage) {
            var menssagem = $("#text-menssagem").val("");
           
        });
})
/* saida de menssagem  */

setInterval(function(){ menssagem_select(); }, 1000);

function menssagem_select(){
$.get(url+"/alert/select/", function(data) {
    $("#recebimento").html("");
    for (linha = 0; linha < data.length; linha++) {
    if(data[linha].nome == user){
           var menssagem = '<div class="menssagem-1 right">'
           menssagem +='<p class="right">'+ data[linha].nome +'</p>'
           menssagem +='<h3 style="font-size: 13pt;" class="menssagem right ">'+data[linha].menssagem +'</h3>'
           menssagem +=' <p style="left">'+data[linha].codigo +'</p>'
           menssagem +=' </div>'
        $("#recebimento").append(menssagem);

    }
    if(data[linha].nome == user2){
        var menssagem = '<div  class="menssagem-2 left">'
        menssagem +='<p class="left">'+ data[linha].nome +'</p>'
        menssagem +='<h3 style="font-size: 13pt;" class="menssagem left ">'+data[linha].menssagem +'</h3>'
        menssagem +=' <p style="right">'+data[linha].codigo +'</p>'
        menssagem +=' </div>'
     $("#recebimento").append(menssagem);

 }
}


});}
