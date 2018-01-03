var bcrypt = require('bcrypt'),
    queries = require('../../modules/Queries'),
    validate = require('../../modules/Validation');

module.exports = {
    index: function(req, res){
        res.render('admin/login',{title: "login", heading: "Login", scripts: [{'script': 'Util.js'},{'script': 'login.js'}] });
    },
    login: function(req, res){
        var data = JSON.parse(req.body.data);

        /* VALIDATES THE EMAIL AND PASSWORD TO MAKE SURE THEY ARE CORRECT FORMAT */
        if(!validate.validate(data.email, "email") || !validate.validate(data.password, "password")){
            res.send('badlogin');
            return;
        }

        /* IF YOU WANTED TO CREATE A HASHED PASSWORD YOU COULD USE THIS BCRYPT METHOD TO CREATE THE HASH.  JUST ENTER THE PASSWORD IN THE FIRST PARAMETER AND IT WILL OUTPUT A HASH.  I USED THIS TO CREATE THE HASH FOR THE WORD "PASSWORD"
        bcrypt.hash("password", 10, function(err, hash) {
            console.log(hash);
        });*/

        /* FIRST CHECK TO SEE IF PASSWORD IS THERE, THEN CHECK TO SEE IF THE CORRECT PASSWORD WAS ENTERED.  DEPENDING ON CIRCUMSTANCE RETURN APPROPRIATE MESSAGE. */
        var sql = "SELECT password FROM admin WHERE email=?";
        var inserts = [data.email];
        queries.bindedSelect(sql, inserts, function(err, result){
            if(err){
                res.send('error');
            }
            else {
                if(result.length === 0){
                    res.send('emailnotfound');
                }
                else {
                    bcrypt.compare(data.password, result[0].password, function(err, ret) {
                        if(ret){
                            req.session.regenerate(function(err){
                                if(err){
                                    console.log(err)
                                }
                                /*IF SUCCESSFUL LOGIN CREATE SESSION SUCCESS PROPERTY*/
                                else{
                                    req.session.success = 'access approved';
                                    res.send('loginsuccess');
                                }
                            });
                        }
                        else {
                            res.send('loginerror');
                        }
                        
                    });
                }
            }
        });
    }
}

