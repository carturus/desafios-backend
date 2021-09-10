
  module.exports= {
      permisoAdministrador:function (req, res, next) {
        const url = req.originalUrl
        const metodo = req.method
        if (req.query.administrador) next()
            else {
            res.status(500).send({error: '-1', descripcion: `ruta ${url} método ${metodo} no autorizada`})
        }
      },
      checkAuthentication:function(req, res, next) {
        if (req.isAuthenticated()) {
          next();
        } else {
          res.redirect("/auth/login");
        }
      }
    
  }
