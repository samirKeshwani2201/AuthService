const express = require('express');
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const db = require("./models/index");
const { User, Role } = require("./models/index");


const app = express();


const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api", apiRoutes);
    app.listen(PORT, async () => {
        console.log(`Server started on port ${PORT}!`);
        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true });
        }
        const u1 = await User.findByPk(1);

        // // giving u1 the role 1 ie Admin if id of admin is 1
        // // const r1 = await Role.findByPk(1);
        const r1 = await Role.findByPk(2);
        console.log(await u1.getRoles());
        // u1.addRole(r1);
    });
};


prepareAndStartServer();