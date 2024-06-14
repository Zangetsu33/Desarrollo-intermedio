const controller = {}

controller.list = (req, res) => {
    req.getConnection((_err, conn) =>{
        conn.query('SELECT * FROM users', (_err, users) =>{
            if(_err) {
            res.json(_err);
            }
            console.log(users);
            res.json(users);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    // Verificar los datos recibidos
    console.log('Datos recibidos:', data);

    req.getConnection((err, conn) => {
        if (err) {
            console.error("Error al conectar a la base de datos:", err);
            res.status(500).send("Error al conectar a la base de datos");
            return;
        }

        conn.query('INSERT INTO users SET ?', [data], (err, result) => {
            if (err) {
                console.error("Error al ejecutar la consulta:", err);
                res.status(500).send("Error al ejecutar la consulta");
                return;
            }

                console.log('Datos insertados con éxito:', result);
                res.redirect('/');
            });
        });
    };

    controller.delete = (req, res) => {
        const { id } = req.params;

        // Verificar el id recibido
        console.log('ID recibido para eliminar:', id);

    req.getConnection((err, conn) => {
        if (err) {
            console.error("Error al conectar a la base de datos:", err);
            res.status(500).send("Error al conectar a la base de datos");
            return;
        }

        conn.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
            if (err) {
                console.error("Error al ejecutar la consulta:", err);
                res.status(500).send("Error al ejecutar la consulta");
                return;
            }

            console.log('Registro eliminado con éxito:', result);
            res.redirect('/');
        });
    });
};

controller.search = (req, res) => {
    const { searchTerm } = req.body; // Asumiendo que el término de búsqueda se envía en el cuerpo de la solicitud.

    // Verificar el término de búsqueda recibido
    console.log('Término de búsqueda recibido:', searchTerm);

    req.getConnection((err, conn) => {
        if (err) {
            console.error("Error al conectar a la base de datos:", err);
            res.status(500).send("Error al conectar a la base de datos");
            return;
        }

        const query = 'SELECT * FROM users WHERE name LIKE ? OR email LIKE ?';
        const queryParams = [`%${searchTerm}%`, `%${searchTerm}%`];

        conn.query(query, queryParams, (err, results) => {
            if (err) {
                console.error("Error al ejecutar la consulta:", err);
                res.status(500).send("Error al ejecutar la consulta");
                return;
            }

            console.log('Resultados de la búsqueda:', results);
            res.render('searchResults', { data: results }); // Asume que tienes una vista llamada 'searchResults.ejs'
        });
    });
};
module.exports = controller;