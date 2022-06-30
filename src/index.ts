/*
 * @Author: shimingxia
 * @Date: 2022-06-30 18:19:18
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-06-30 18:54:47
 * @Description: 
 */
import * as Koa from 'koa'
import * as bodify from 'koa-body';

const app = new Koa()
app.use(
    bodify({
        multipart:true,
        strict:false
    })
)


import { load } from './utils/decors';
import {resolve} from 'path'

const router = load(resolve(__dirname, './routes'));

app.use(router.routes())

app.listen(3000 ,() => {
    console.log('服务器启动成功。。')
})

