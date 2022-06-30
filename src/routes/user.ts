/*
 * @Author: shimingxia
 * @Date: 2022-06-30 18:19:18
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-06-30 18:55:10
 * @Description: 
 */
import * as Koa from 'koa'
import { get, post, middlewares, querystring } from '../utils/decors'
const users = [{ name: 'tom', age: 20 }]
const api = {
    findByName(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name === 'xia') {
                    reject('用户已存在')
                } else {
                  resolve(1)
                }
            }, 500)
        })
    }
}

export default class User {
    @get('/users')
    @querystring({
        age: { type: 'int', required: false, max: 200, convertType: 'int' },
    })
    public list(ctx: Koa.Context) {
        ctx.body = { ok: 1, data: users }
    }

    @post('/users', {
        middlewares: [
            async function validation(ctx: Koa.Context, next: () => Promise<any>) {
                // 用户名必填
                const name = ctx.request.body.name
                if (!name) {
                    throw "请输入用户名";
                }
                // 用户名不能重复
                try {
                    await api.findByName(name);
                    // 校验通过
                    await next();
                } catch (error) {
                    throw error;
                }
            }
        ]
    })
    public add(ctx: Koa.Context) {
        users.push(ctx.request.body);
        ctx.body = { ok: 1 }
    }

}