import bodyParser from 'body-parser';
import express from 'express';
import adminRoutes from '~/routes/admin';
import shopRoutes from '~/routes/shop';
import path from 'path';
import { get404 } from './controllers/error.controller';
import { getFaviconResponse } from '~/controllers/favicon.controller';
import utils from './utils/core';

const app = express();

app.set('view engine', 'pug'); //Đặt template engine mặc định của Express thành Pug. Điều này có nghĩa rằng bạn có thể sử dụng các tệp pug để xây dựng giao diện người dùng của ứng dụng

app.set('views', path.join(utils.rootDir, 'web', 'views')); //Cấu hình đường dẫn đến thư mục chứa các file giao diện người dùng

app.use('/favicon.ico', getFaviconResponse);

app.use('/views', get404); //Vì mình public folder web bên dưới (dòng 24). Trong web có folder views, folder này mình không muốn public nên mình set 1 route như vậy để không còn public nữa

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
//Đây là một phần của cấu hình middleware trong Express.js để xử lý dữ liệu gửi đến từ các biểu mẫu HTML (bên client) dưới dạng dữ liệu URL-encoded
//body-parser: Middleware này giúp bạn xử lý dữ liệu được gửi từ yêu cầu HTTP, đặc biệt là dữ liệu từ biểu mẫu HTML (bên client).

app.use(express.static(path.join(utils.rootDir, 'web'))); //Cấu hình middleware để phục vụ các tệp tĩnh (ví dụ: CSS, JavaScript, hình ảnh, v.v...)

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(get404);

app.listen(3979);
