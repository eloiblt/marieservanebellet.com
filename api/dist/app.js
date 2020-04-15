"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const constants = __importStar(require("./config/constants"));
// import picturesRouter from './routes/picturesRouter';
// import loginRouter from './routes/loginRouter';
// import categoryPictures from './routes/categoryPaintingRouter';
const app = express_1.default();
app.use(express_1.default.json());
if (process.env.NODE_ENV === 'development') {
    console.log('Development environnement');
    app.use(cors_1.default()); // allow *
}
else {
    app.use(cors_1.default({
        origin: constants.frontUrl,
        optionsSuccessStatus: 200
    })); // allow front only
}
var port = process.env.PORT || '3000';
app.set('port', port);
app.listen(port, () => console.log('Server listening on port ' + port));
// app.use('/login', loginRouter);
// app.use('/pictures', picturesRouter);
// app.use('/categoryPictures', categoryPictures);
app.get('/env', (req, res) => {
    res.send(constants);
});
//# sourceMappingURL=app.js.map