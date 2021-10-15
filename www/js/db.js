var consulta;


document.addEventListener('deviceready', function() {
    var dbSize = 5 * 1024 * 1024; // 5MB

    window.db = window.sqlitePlugin.openDatabase({
        name: 'my.db',
        location: 'default',
        androidDatabaseProvider: 'system'
    });


    db.transaction(function(tx) {
        tx.executeSql("create table if not exists usuario(_id integer primary key,nome text,nomepar text)", [], onSuccess, onError);

    });


    function onSuccess(transaction, resultSet) {
        console.log('Query completed: ' + JSON.stringify(resultSet));
    }

    function onError(transaction, error) {
        console.log('Query failed: ' + error.message);
    }

    db.transaction(function(tx) {
        var sql = 'select * from usuario  ';
        tx.executeSql(sql, [], function(_, result) {

            db.transaction(function(tx) {
                    tx.executeSql('select * from usuario ', [], function(tx, rs) {

                            if (rs.rows.length == 1) {
                                $('#tela-1').hide();
                
                                $('#tela-2').show();

                            } else {
                               console.log( rs.rows.length);

                            }



                        },
                        function(tx, error) {
                            console.log('SELECT error: ' + error.message);
                        });
                },
                function(error) {
                    console.log('Transaction ERROR: ' + error.message);
                },
                function() {
                    console.log('Populated database OK');
                });


        });
    });

})