const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const fileUpload = require("express-fileupload");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const app = express();
const PORT = config.get("serverPORT");
const corsMiddleware = require("./middleware/cors.middleware");

app.use(fileUpload({
    defCharset: 'utf8',
    defParamCharset: 'utf8'
}));
app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);
const start = async () => {
    try {
        await mongoose.connect(config.get("dbURL"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
           console.log("Server started on port", PORT);
        });
    } catch (e) {
        console.log(e);
    }
}

start();